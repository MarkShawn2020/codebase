import { serviceCtlMixin, } from 'state-switch';
import { log, } from '../config.js';
import { WatchdogAgent } from '../agents/watchdog-agent.js';
const serviceMixin = (mixinBase) => {
    const serviceBase = serviceCtlMixin('PuppetServiceMixin', { log })(mixinBase);
    let PUPPET_COUNTER = 0;
    class ServiceMixin extends serviceBase {
        __counter;
        __watchdog;
        constructor(...args) {
            super(...args);
            this.__counter = PUPPET_COUNTER++;
            log.verbose('PuppetServiceMixin', 'constructor() #%s', this.__counter);
            this.__watchdog = new WatchdogAgent(this);
        }
        async start() {
            log.verbose('PuppetServiceMixin', 'start()');
            await super.start();
            this.__watchdog.start();
            this.emit('start');
        }
        async stop() {
            log.verbose('PuppetServiceMixin', 'stop()');
            this.__watchdog.stop();
            await super.stop();
            this.emit('stop');
        }
    }
    return ServiceMixin;
};
export { serviceMixin };
