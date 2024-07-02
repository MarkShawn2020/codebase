import { MemoryCard } from 'memory-card';
import { log, } from '../config.js';
const memoryMixin = (mixinBase) => {
    class MemoryMixin extends mixinBase {
        _memory;
        get memory() {
            return this._memory;
        }
        constructor(...args) {
            super(...args);
            log.verbose('PuppetMemoryMixin', 'constructor()');
            /**
             * Huan(202110): we init a un-named MemoryCard by default
             *  it can be replaced by `setMemory()` later.
             */
            this._memory = new MemoryCard();
        }
        async start() {
            log.verbose('PuppetMemoryMixin', 'start()');
            try {
                await this.memory.load();
            }
            catch (_) {
                log.silly('PuppetMemoryMixin', 'start() memory has already been loaded before');
            }
            await super.start();
        }
        async stop() {
            log.verbose('PuppetMemoryMixin', 'stop()');
            await super.stop();
        }
        setMemory(memory) {
            log.verbose('PuppetMemoryMixin', 'setMemory(%s)', memory.name);
            if (this._memory.name) {
                throw new Error('Puppet memory can be only set once');
            }
            this._memory = memory;
        }
    }
    return MemoryMixin;
};
export { memoryMixin };
