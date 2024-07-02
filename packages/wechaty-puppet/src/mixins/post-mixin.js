import { log, } from '../config.js';
import { DirtyType } from '../schemas/dirty.js';
const postMixin = (baseMixin) => {
    class PostMixin extends baseMixin {
        constructor(...args) {
            super(...args);
            log.verbose('PuppetPostMixin', 'constructor()');
        }
        postPayloadCache(postId) {
            // log.silly('PuppetPostMixin', 'postPayloadCache(id=%s) @ %s', postId, this)
            if (!postId) {
                throw new Error('no id');
            }
            const cachedPayload = this.cache.post.get(postId);
            if (cachedPayload) {
                // log.silly('PuppetPostMixin', 'postPayloadCache(%s) cache HIT', postId)
            }
            else {
                log.silly('PuppetPostMixin', 'postPayloadCache(%s) cache MISS', postId);
            }
            return cachedPayload;
        }
        async postPayload(postId) {
            log.verbose('PuppetPostMixin', 'postPayload(%s)', postId);
            if (!postId) {
                throw new Error('no id');
            }
            /**
             * 1. Try to get from cache first
             */
            const cachedPayload = this.postPayloadCache(postId);
            if (cachedPayload) {
                return cachedPayload;
            }
            /**
           * 2. Cache not found
           */
            const rawPayload = await this.postRawPayload(postId);
            const payload = await this.postRawPayloadParser(rawPayload);
            this.cache.post.set(postId, payload);
            log.silly('PuppetPostMixin', 'postPayload(%s) cache SET', postId);
            return payload;
        }
        /**
         * List from the local, will return all ids from cache
         */
        postList() {
            log.verbose('PuppetPostMixin', 'postList()');
            return [...this.cache.post.keys()];
        }
        async postPayloadDirty(id) {
            log.verbose('PuppetPostMixin', 'postPayloadDirty(%s)', id);
            await this.__dirtyPayloadAwait(DirtyType.Post, id);
        }
    }
    return PostMixin;
};
export { postMixin };
