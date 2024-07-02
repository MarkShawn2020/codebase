import { BooleanIndicator } from 'state-switch';
import { log, } from '../config.js';
const readyMixin = (mixinBase) => {
    class ReadyMixin extends mixinBase {
        readyIndicator;
        constructor(...args) {
            super(...args);
            log.verbose('ReadyMixin', 'constructor()');
            this.readyIndicator = new BooleanIndicator();
        }
        async start() {
            log.verbose('ReadyMixin', 'start()');
            await super.start();
            this.on('ready', () => {
                this.readyIndicator.value(true);
            });
            this.on('logout', () => {
                this.readyIndicator.value(false);
            });
            this.on('reset', () => {
                this.readyIndicator.value(false);
            });
        }
        async stop() {
            log.verbose('ReadyMixin', 'stop()');
            this.readyIndicator.value(false);
            /**
             * Huan(202201) NOTE: super.stop() should be the last line of this method
             *  becasue we should keep the reverse order of logic in start()
             */
            await super.stop();
        }
    }
    return ReadyMixin;
};
export { readyMixin };
