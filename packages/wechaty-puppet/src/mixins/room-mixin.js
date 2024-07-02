import { log, } from '../config.js';
import { DirtyType } from '../schemas/dirty.js';
const roomMixin = (mixinBase) => {
    class RoomMixin extends mixinBase {
        constructor(...args) {
            super(...args);
            log.verbose('PuppetRoomMixin', 'constructor()');
        }
        async roomSearch(query) {
            log.verbose('PuppetRoomMixin', 'roomSearch(%s)', query ? JSON.stringify(query) : '');
            /**
             * Huan(202110): optimize for search id
             */
            if (query?.id) {
                try {
                    // make sure the room id has valid payload
                    await this.roomPayload(query.id);
                    return [query.id];
                }
                catch (e) {
                    log.verbose('PuppetRoomMixin', 'roomSearch() payload not found for id "%s"', query.id);
                    await this.roomPayloadDirty(query.id);
                    return [];
                }
            }
            /**
             * Deal with non-id queries
             */
            const allRoomIdList = await this.roomList();
            log.silly('PuppetRoomMixin', 'roomSearch() allRoomIdList.length=%d', allRoomIdList.length);
            if (!query || Object.keys(query).length <= 0) {
                return allRoomIdList;
            }
            const roomPayloadList = [];
            const BATCH_SIZE = 10;
            let batchIndex = 0;
            while (batchIndex * BATCH_SIZE < allRoomIdList.length) {
                const batchRoomIds = allRoomIdList.slice(BATCH_SIZE * batchIndex, BATCH_SIZE * (batchIndex + 1));
                /**
                 * Huan(202110): TODO: use an iterator with works to control the concurrency of Promise.all.
                 *  @see https://stackoverflow.com/a/51020535/1123955
                 */
                const batchPayloads = (await Promise.all(batchRoomIds.map(async (id) => {
                    try {
                        return await this.roomPayload(id);
                    }
                    catch (e) {
                        // log.silly('PuppetRoomMixin', 'roomSearch() roomPayload exception: %s', (e as Error).message)
                        this.emit('error', e);
                        // Remove invalid room id from cache to avoid getting invalid room payload again
                        await this.roomPayloadDirty(id);
                        await this.roomMemberPayloadDirty(id);
                        // compatible with {} payload
                        return {};
                    }
                }))).filter(payload => Object.keys(payload).length > 0);
                roomPayloadList.push(...batchPayloads);
                batchIndex++;
            }
            const filterFunction = this.roomQueryFilterFactory(query);
            const roomIdList = roomPayloadList
                .filter(filterFunction)
                .map(payload => payload.id);
            log.silly('PuppetRoomMixin', 'roomSearch() roomIdList filtered. result length=%d', roomIdList.length);
            return roomIdList;
        }
        /**
         * Issue #155 - https://github.com/wechaty/puppet/issues/155
         *
         * @protected
         */
        roomQueryFilterFactory(query) {
            log.verbose('PuppetRoomMixin', 'roomQueryFilterFactory(%s)', JSON.stringify(query));
            if (Object.keys(query).length < 1) {
                throw new Error('query must provide at least one key. current query is empty.');
            }
            else if (Object.keys(query).length > 1) {
                throw new Error('query only support one key. multi key support is not available now.');
            }
            // Huan(202105): we use `Object.keys(query)[0]!` with `!` at here because we have the above `if` checks
            // TypeScript bug: have to set `undefined | string | RegExp` at here, or the later code type check will get error
            const filterKey = Object.keys(query)[0].toLowerCase();
            const isValid = [
                'topic',
                'id',
            ].includes(filterKey);
            if (!isValid) {
                throw new Error('query key unknown: ' + filterKey);
            }
            const filterValue = query[filterKey];
            if (!filterValue) {
                throw new Error('filterValue not found for filterKey: ' + filterKey);
            }
            let filterFunction;
            if (filterValue instanceof RegExp) {
                filterFunction = (payload) => filterValue.test(payload[filterKey]);
            }
            else { // if (typeof filterValue === 'string') {
                filterFunction = (payload) => filterValue === payload[filterKey];
            }
            return filterFunction;
        }
        /**
          * Check a Room Id if it's still valid.
          *  For example: talk to the server, and see if it should be deleted in the local cache.
          */
        async roomValidate(roomId) {
            log.silly('PuppetRoomMixin', 'roomValidate(%s) base class just return `true`', roomId);
            return true;
        }
        /**
         * Issue #155 - https://github.com/wechaty/puppet/issues/155
         *
         * @protected
         */
        roomPayloadCache(roomId) {
            // log.silly('PuppetRoomMixin', 'roomPayloadCache(id=%s) @ %s', roomId, this)
            if (!roomId) {
                throw new Error('no id');
            }
            const cachedPayload = this.cache.room.get(roomId);
            if (cachedPayload) {
                // log.silly('PuppetRoomMixin', 'roomPayloadCache(%s) cache HIT', roomId)
            }
            else {
                log.silly('PuppetRoomMixin', 'roomPayloadCache(%s) cache MISS', roomId);
            }
            return cachedPayload;
        }
        async roomPayload(roomId) {
            log.verbose('PuppetRoomMixin', 'roomPayload(%s)', roomId);
            if (!roomId) {
                throw new Error('no id');
            }
            /**
              * 1. Try to get from cache first
              */
            const cachedPayload = this.roomPayloadCache(roomId);
            if (cachedPayload) {
                return cachedPayload;
            }
            /**
              * 2. Cache not found
              */
            const rawPayload = await this.roomRawPayload(roomId);
            const payload = await this.roomRawPayloadParser(rawPayload);
            this.cache.room.set(roomId, payload);
            log.silly('PuppetRoomMixin', 'roomPayload(%s) cache SET', roomId);
            return payload;
        }
        async roomPayloadDirty(id) {
            log.verbose('PuppetRoomMixin', 'roomPayloadDirty(%s)', id);
            await this.__dirtyPayloadAwait(DirtyType.Room, id);
        }
    }
    return RoomMixin;
};
export { roomMixin };
