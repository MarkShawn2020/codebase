import type { Puppet } from '../puppet/puppet-abstract.js';
import type { PuppetInterface } from '../puppet/puppet-interface.js';
import type { PuppetSkeleton } from '../puppet/puppet-skeleton.js';
declare const validateMixin: <MixinBase extends typeof PuppetSkeleton>(mixinBase: MixinBase) => ((abstract new (...args: any[]) => {
    readonly id: string;
    readonly options: import("../schemas/puppet.js").PuppetOptions;
    wrapAsync: import("gerror").WrapAsync;
    start(): Promise<void>;
    stop(): Promise<void>;
    emit(event: any, ...args: any): boolean;
    addListener<E extends keyof import("../puppet/events.js").PuppetEventListener>(event: E, listener: import("../puppet/events.js").PuppetEventListener[E]): any;
    on<E_1 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_1, listener: import("../puppet/events.js").PuppetEventListener[E_1]): any;
    once<E_2 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_2, listener: import("../puppet/events.js").PuppetEventListener[E_2]): any;
    prependListener<E_3 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_3, listener: import("../puppet/events.js").PuppetEventListener[E_3]): any;
    prependOnceListener<E_4 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_4, listener: import("../puppet/events.js").PuppetEventListener[E_4]): any;
    off<E_5 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_5, listener: import("../puppet/events.js").PuppetEventListener[E_5]): any;
    removeAllListeners<E_6 extends keyof import("../puppet/events.js").PuppetEventListener>(event?: E_6 | undefined): any;
    removeListener<E_7 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_7, listener: import("../puppet/events.js").PuppetEventListener[E_7]): any;
    eventNames(): (string | symbol)[];
    rawListeners<E_8 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_8): Function[];
    listeners<E_9 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_9): Function[];
    listenerCount<E_10 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_10): number;
    getMaxListeners(): number;
    setMaxListeners(maxListeners: number): any;
    __events: import("../puppet/events.js").PuppetEventListener;
}) & {
    /**
     * Check if obj satisfy Puppet interface
     */
    validInterface(target: any): target is PuppetInterface;
    /**
     * loose check instance of Puppet
     */
    validInstance(target: any): target is Puppet;
    /**
     * Huan(202110): I believe `valid()` will be a better performance than `validInterface()`
     *  because it will check `instanceof` first, which I believe it will be the most case
     *  and it will be faster than `interfaceOfPuppet()`
     */
    valid(target: any): target is PuppetInterface;
}) & MixinBase;
type ValidateMixin = ReturnType<typeof validateMixin>;
/**
 * Huan(202110): it seems that that static properties should not be mixed in
 */
type ProtectedPropertyValidateMixin = never;
export type { ProtectedPropertyValidateMixin, ValidateMixin, };
export { validateMixin };
