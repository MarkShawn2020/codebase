import type { PuppetSkeleton } from '../puppet/puppet-skeleton.js';
declare const tagMixin: <MixinBase extends typeof PuppetSkeleton>(mixinBase: MixinBase) => (abstract new (...args: any[]) => {
    /**
     *
     * Tag
     *  tagContactAdd - add a tag for a Contact. Create it first if it not exist.
     *  tagContactRemove - remove a tag from the Contact
     *  tagContactDelete - delete a tag from Wechat
     *  tagContactList(id) - get tags from a specific Contact
     *  tagContactList() - get tags from all Contacts
     *
     */
    tagContactAdd(tagId: string, contactId: string): Promise<void>;
    tagContactDelete(tagId: string): Promise<void>;
    tagContactList(contactId: string): Promise<string[]>;
    tagContactList(): Promise<string[]>;
    tagContactRemove(tagId: string, contactId: string): Promise<void>;
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
}) & MixinBase;
type ProtectedPropertyTagMixin = never;
export type { ProtectedPropertyTagMixin, };
export { tagMixin };
