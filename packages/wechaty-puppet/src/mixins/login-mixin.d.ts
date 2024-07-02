import type { PuppetSkeleton } from '../puppet/puppet-skeleton.js';
declare const loginMixin: <MixinBase extends typeof PuppetSkeleton>(mixinBase: MixinBase) => (abstract new (...args: any[]) => {
    /**
     * @internal used by public API `currentUserId`
     */
    __currentUserId?: string | undefined;
    /**
     * The current logged in user id.
     */
    readonly currentUserId: string;
    /**
     * Boolean value indicates whether the user is logged in or not.
     */
    readonly isLoggedIn: boolean;
    __authQrCode?: string | undefined;
    readonly authQrCode: string | undefined;
    start(): Promise<void>;
    /**
     * ref: https://github.com/wechaty/puppet/issues/184
     */
    stop(): Promise<void>;
    /**
     * Need to be called internally when the puppet is logined.
     * this method will emit a `login` event
     * @internal for puppet internal usage
     */
    login(userId: string): void;
    /**
     * Need to be called internally/externally when the puppet need to be logouted
     * this method will emit a `logout` event,
     *
     * Note: must set `this.currentUserId = undefined` in this function.
     */
    logout(reason?: string): Promise<void>;
    /**
     * @deprecated use `currentUserId` instead. (will be removed in v2.0)
     */
    selfId(): string;
    /**
     * @deprecated use isLoggedIn instead. will be removed in v2.0
     */
    logonoff(): boolean;
    readonly id: string;
    readonly options: import("../schemas/puppet.js").PuppetOptions;
    wrapAsync: import("gerror").WrapAsync;
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
type LoginMixin = ReturnType<typeof loginMixin>;
type ProtectedPropertyLoginMixin = '__authQrCode' | '__currentUserId' | 'login' | 'logonoff';
export type { LoginMixin, ProtectedPropertyLoginMixin, };
export { loginMixin };
