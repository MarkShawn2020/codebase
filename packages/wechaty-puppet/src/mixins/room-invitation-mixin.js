import { log, } from '../config.js';
const roomInvitationMixin = (mixinBase) => {
    class RoomInvitationMixin extends mixinBase {
        constructor(...args) {
            super(...args);
            log.verbose('PuppetRoomInvitationMixin', 'constructor()');
        }
        /**
         *
         * Room Invitation
         *
         */
        /**
         * Issue #155 - https://github.com/wechaty/puppet/issues/155
         *
         * @protected
         */
        roomInvitationPayloadCache(roomInvitationId) {
            // log.silly('PuppetRoomInvitationMixin', 'roomInvitationPayloadCache(id=%s) @ %s', friendshipId, this)
            if (!roomInvitationId) {
                throw new Error('no id');
            }
            const cachedPayload = this.cache.roomInvitation.get(roomInvitationId);
            if (cachedPayload) {
                // log.silly('PuppetRoomInvitationMixin', 'roomInvitationPayloadCache(%s) cache HIT', roomInvitationId)
            }
            else {
                log.silly('PuppetRoomInvitationMixin', 'roomInvitationPayloadCache(%s) cache MISS', roomInvitationId);
            }
            return cachedPayload;
        }
        async roomInvitationPayload(roomInvitationId, newPayload) {
            log.verbose('PuppetRoomInvitationMixin', 'roomInvitationPayload(%s)', roomInvitationId);
            if (typeof newPayload === 'object') {
                this.cache.roomInvitation.set(roomInvitationId, newPayload);
                return;
            }
            /**
             * 1. Try to get from cache first
             */
            const cachedPayload = this.roomInvitationPayloadCache(roomInvitationId);
            if (cachedPayload) {
                return cachedPayload;
            }
            /**
             * 2. Cache not found
             */
            const rawPayload = await this.roomInvitationRawPayload(roomInvitationId);
            const payload = await this.roomInvitationRawPayloadParser(rawPayload);
            return payload;
        }
    }
    return RoomInvitationMixin;
};
export { roomInvitationMixin };
