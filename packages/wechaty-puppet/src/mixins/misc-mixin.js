import { log, NAME, VERSION, } from '../config.js';
const miscMixin = (mixinBase) => {
    class MiscMixin extends mixinBase {
        constructor(...args) {
            super(...args);
            log.verbose('PuppetMiscMixin', 'constructor()');
        }
        toString() {
            let memoryName;
            try {
                memoryName = this.memory.name || 'NONAME';
            }
            catch (_) {
                memoryName = 'NOMEMORY';
            }
            return [
                'Puppet',
                '<',
                this.constructor.name,
                '>',
                '(',
                memoryName,
                ')',
            ].join('');
        }
        /**
          * Get the NPM name of the Puppet
          */
        name() {
            return NAME;
        }
        /**
          * Get version from the Puppet Implementation
          */
        version() {
            return VERSION;
        }
        /**
          * will be used by semver.satisfied(version, range)
          */
        wechatyVersionRange(strict = false) {
            // FIXME: for development, we use `*` if not set
            if (strict) {
                return '^0.16.0';
            }
            return '*';
            // TODO: test and uncomment the following codes after promote the `wehcaty-puppet` as a solo NPM module
            // if (this.pkg.dependencies && this.pkg.dependencies.wechaty) {
            //   throw new Error('Wechaty Puppet Implementation should add `wechaty` from `dependencies` to `peerDependencies` in package.json')
            // }
            // if (!this.pkg.peerDependencies || !this.pkg.peerDependencies.wechaty) {
            //   throw new Error('Wechaty Puppet Implementation should add `wechaty` to `peerDependencies`')
            // }
            // if (!this.pkg.engines || !this.pkg.engines.wechaty) {
            //   throw new Error('Wechaty Puppet Implementation must define `package.engines.wechaty` for a required Version Range')
            // }
            // return this.pkg.engines.wechaty
        }
    }
    return MiscMixin;
};
export { miscMixin };
