import { interfaceOfPuppet, looseInstanceOfPuppet, } from '../puppet/interface-of.js';
const validateMixin = (mixinBase) => {
    class ValidateMixin extends mixinBase {
        /**
         * Check if obj satisfy Puppet interface
         */
        static validInterface(target) {
            return interfaceOfPuppet(target);
        }
        /**
         * loose check instance of Puppet
         */
        static validInstance(target) {
            return looseInstanceOfPuppet(target);
        }
        /**
         * Huan(202110): I believe `valid()` will be a better performance than `validInterface()`
         *  because it will check `instanceof` first, which I believe it will be the most case
         *  and it will be faster than `interfaceOfPuppet()`
         */
        static valid(target) {
            if (this.validInstance(target) || this.validInterface(target)) {
                return true;
            }
            return false;
        }
    }
    return ValidateMixin;
};
export { validateMixin };
