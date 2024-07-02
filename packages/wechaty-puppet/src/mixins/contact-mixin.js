import { log, } from '../config.js';
import { DirtyType } from '../schemas/dirty.js';
const contactMixin = (mixinBase) => {
    class ContactMixin extends mixinBase {
        constructor(...args) {
            super(...args);
            log.verbose('PuppetContactMixin', 'constructor()');
        }
        // async contactRoomList (
        //   contactId: string,
        // ): Promise<string[] /* roomId */> {
        //   log.verbose('PuppetContactMixin', 'contactRoomList(%s)', contactId)
        //   const roomIdList = await this.roomList()
        //   const roomPayloadList = await Promise.all(
        //     roomIdList.map(
        //       roomId => this.roomPayload(roomId),
        //     ),
        //   )
        //   const resultRoomIdList = roomPayloadList
        //     .filter(roomPayload => roomPayload.memberIdList.includes(contactId))
        //     .map(payload => payload.id)
        //   return resultRoomIdList
        // }
        /**
         * @param query {string | Object} if string, then search `name` & `alias`
         */
        async contactSearch(query, searchIdList) {
            log.verbose('PuppetContactMixin', 'contactSearch(query=%s, %s)', JSON.stringify(query), searchIdList
                ? `idList.length = ${searchIdList.length}`
                : '');
            /**
             * Huan(202110): optimize for search id
             */
            if (typeof query !== 'string' && query?.id) {
                try {
                    // make sure the contact id has valid payload
                    await this.contactPayload(query.id);
                    return [query.id];
                }
                catch (e) {
                    log.verbose('PuppetContactMixin', 'contactSearch() payload not found for id "%s"', query.id);
                    await this.contactPayloadDirty(query.id);
                    return [];
                }
            }
            /**
             * Deal non-id queries
             */
            if (!searchIdList) {
                searchIdList = await this.contactList();
            }
            log.silly('PuppetContactMixin', 'contactSearch() searchIdList.length = %d', searchIdList.length);
            if (!query) {
                return searchIdList;
            }
            if (typeof query === 'string') {
                const nameIdList = await this.contactSearch({ name: query }, searchIdList);
                const aliasIdList = await this.contactSearch({ alias: query }, searchIdList);
                return Array.from(new Set([
                    ...nameIdList,
                    ...aliasIdList,
                ]));
            }
            const filterFunction = this.contactQueryFilterFactory(query);
            const BATCH_SIZE = 16;
            let batchIndex = 0;
            const resultIdList = [];
            const matchId = async (id) => {
                try {
                    /**
                     * Does LRU cache matter at here?
                     */
                    // const rawPayload = await this.contactRawPayload(id)
                    // const payload    = await this.contactRawPayloadParser(rawPayload)
                    const payload = await this.contactPayload(id);
                    if (filterFunction(payload)) {
                        return id;
                    }
                }
                catch (e) {
                    this.emit('error', e);
                    await this.contactPayloadDirty(id);
                }
                return undefined;
            };
            while (BATCH_SIZE * batchIndex < searchIdList.length) {
                const batchSearchIdList = searchIdList.slice(BATCH_SIZE * batchIndex, BATCH_SIZE * (batchIndex + 1));
                /**
                 * Huan(202110): TODO: use an iterator with works to control the concurrency of Promise.all.
                 *  @see https://stackoverflow.com/a/51020535/1123955
                 */
                const matchBatchIdFutureList = batchSearchIdList.map(matchId);
                const matchBatchIdList = await Promise.all(matchBatchIdFutureList);
                const batchSearchIdResultList = matchBatchIdList.filter(id => !!id);
                resultIdList.push(...batchSearchIdResultList);
                batchIndex++;
            }
            log.silly('PuppetContactMixin', 'contactSearch() searchContactPayloadList.length = %d', resultIdList.length);
            return resultIdList;
        }
        /**
         * Issue #155 - https://github.com/wechaty/puppet/issues/155
         *
         * @protected
         */
        contactQueryFilterFactory(query) {
            log.verbose('PuppetContactMixin', 'contactQueryFilterFactory(%s)', JSON.stringify(query));
            /**
             * Clean the query for keys with empty value
             */
            Object.keys(query).forEach(key => {
                if (query[key] === undefined) {
                    delete query[key];
                }
            });
            if (Object.keys(query).length < 1) {
                throw new Error('query must provide at least one key. current query is empty.');
            }
            else if (Object.keys(query).length > 1) {
                throw new Error('query only support one key. multi key support is not available now.');
            }
            // Huan(202105): we use `!` at here because the above `if` checks
            const filterKey = Object.keys(query)[0].toLowerCase();
            const isValid = [
                'alias',
                'id',
                'name',
                'weixin',
            ].includes(filterKey);
            if (!isValid) {
                throw new Error('key not supported: ' + filterKey);
            }
            // TypeScript bug: have to set `undefined | string | RegExp` at here, or the later code type check will get error
            const filterValue = query[filterKey];
            if (!filterValue) {
                throw new Error('filterValue not found for filterKey: ' + filterKey);
            }
            let filterFunction;
            if (typeof filterValue === 'string') {
                filterFunction = (payload) => filterValue === payload[filterKey];
            }
            else if (filterValue instanceof RegExp) {
                filterFunction = (payload) => !!payload[filterKey] && filterValue.test(payload[filterKey]);
            }
            else {
                throw new Error('unsupported filterValue type: ' + typeof filterValue);
            }
            return filterFunction;
        }
        /**
         * Check a Contact Id if it's still valid.
         *  For example: talk to the server, and see if it should be deleted in the local cache.
         */
        async contactValidate(contactId) {
            log.silly('PuppetContactMixin', 'contactValidate(%s) base class just return `true`', contactId);
            return true;
        }
        /**
         * Issue #155 - https://github.com/wechaty/puppet/issues/155
         *
         * @protected
         */
        contactPayloadCache(contactId) {
            // log.silly('PuppetContactMixin', 'contactPayloadCache(id=%s) @ %s', contactId, this)
            if (!contactId) {
                throw new Error('no id');
            }
            const cachedPayload = this.cache.contact.get(contactId);
            if (cachedPayload) {
                // log.silly('PuppetContactMixin', 'contactPayload(%s) cache HIT', contactId)
            }
            else {
                log.silly('PuppetContactMixin', 'contactPayload(%s) cache MISS', contactId);
            }
            return cachedPayload;
        }
        async contactPayload(contactId) {
            // log.silly('PuppetContactMixin', 'contactPayload(id=%s) @ %s', contactId, this)
            if (!contactId) {
                throw new Error('no id');
            }
            /**
             * 1. Try to get from cache first
             */
            const cachedPayload = this.contactPayloadCache(contactId);
            if (cachedPayload) {
                return cachedPayload;
            }
            /**
             * 2. Cache not found
             */
            const rawPayload = await this.contactRawPayload(contactId);
            const payload = await this.contactRawPayloadParser(rawPayload);
            this.cache.contact.set(contactId, payload);
            log.silly('PuppetContactMixin', 'contactPayload(%s) cache SET', contactId);
            return payload;
        }
        async contactPayloadDirty(id) {
            log.verbose('PuppetContactMixin', 'contactPayloadDirty(%s)', id);
            await this.__dirtyPayloadAwait(DirtyType.Contact, id);
        }
    }
    return ContactMixin;
};
export { contactMixin };
