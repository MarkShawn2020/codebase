import { log, } from '../config.js';
const tapMixin = (baseMixin) => {
    class TapMixin extends baseMixin {
        constructor(...args) {
            super(...args);
            log.verbose('TapMixin', 'constructor()');
        }
    }
    return TapMixin;
};
export { tapMixin };
