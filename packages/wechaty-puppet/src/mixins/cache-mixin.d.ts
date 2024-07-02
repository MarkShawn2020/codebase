import type { PuppetOptions, EventDirtyPayload } from '../schemas/mod.js';
import { DirtyType } from '../schemas/mod.js';
import { CacheAgent } from '../agents/mod.js';
import type { PuppetSkeleton } from '../puppet/mod.js';
/**
 *
 * Huan(202111) Issue #158 - Refactoring the 'dirty' event, dirtyPayload(),
 *  and XXXPayloadDirty() methods logic & spec
 *
 *    @see https://github.com/wechaty/puppet/issues/158
 *
 */
declare const cacheMixin: <MixinBase extends typeof PuppetSkeleton & (abstract new (...args: any[]) => {
    __currentUserId?: string | undefined;
    readonly currentUserId: string;
    readonly isLoggedIn: boolean;
    __authQrCode?: string | undefined;
    readonly authQrCode: string | undefined;
    start(): Promise<void>;
    stop(): Promise<void>;
    login(userId: string): void;
    logout(reason?: string): Promise<void>;
    selfId(): string;
    logonoff(): boolean;
    readonly id: string;
    readonly options: PuppetOptions;
    wrapAsync: import("gerror").WrapAsync; /**
     *
     * @windmemory(202008): add dirty payload methods
     *
     *  @see https://github.com/wechaty/grpc/pull/79
     *
     * Call this method when you want to notify the server that the data cache need to be invalidated.
     */
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
})>(mixinBase: MixinBase) => (abstract new (...args: any[]) => {
    cache: CacheAgent;
    __cacheMixinCleanCallbackList: (() => void)[];
    start(): Promise<void>;
    stop(): Promise<void>;
    /**
     *
     * @windmemory(202008): add dirty payload methods
     *
     *  @see https://github.com/wechaty/grpc/pull/79
     *
     * Call this method when you want to notify the server that the data cache need to be invalidated.
     */
    dirtyPayload(type: DirtyType, id: string): void;
    /**
     * OnDirty will be registered as a `dirty` event listener,
     *  and it will invalidate the cache.
     */
    onDirty({ payloadType, payloadId, }: EventDirtyPayload): void;
    /**
     * When we are using PuppetService, the `dirty` event will be emitted from the server,
     *  and we need to wait for the `dirty` event so we can make sure the cache has been invalidated.
     */
    __dirtyPayloadAwait(type: DirtyType, id: string): Promise<void>;
    readonly id: string;
    readonly options: PuppetOptions;
    wrapAsync: import("gerror").WrapAsync; /**
     *
     * @windmemory(202008): add dirty payload methods
     *
     *  @see https://github.com/wechaty/grpc/pull/79
     *
     * Call this method when you want to notify the server that the data cache need to be invalidated.
     */
    emit(event: any, ...args: any): boolean;
    addListener<E_11 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_11, listener: import("../puppet/events.js").PuppetEventListener[E_11]): any;
    on<E_12 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_12, listener: import("../puppet/events.js").PuppetEventListener[E_12]): any;
    once<E_13 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_13, listener: import("../puppet/events.js").PuppetEventListener[E_13]): any;
    prependListener<E_14 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_14, listener: import("../puppet/events.js").PuppetEventListener[E_14]): any;
    prependOnceListener<E_15 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_15, listener: import("../puppet/events.js").PuppetEventListener[E_15]): any;
    off<E_16 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_16, listener: import("../puppet/events.js").PuppetEventListener[E_16]): any;
    removeAllListeners<E_17 extends keyof import("../puppet/events.js").PuppetEventListener>(event?: E_17 | undefined): any;
    removeListener<E_18 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_18, listener: import("../puppet/events.js").PuppetEventListener[E_18]): any;
    eventNames(): (string | symbol)[];
    rawListeners<E_8 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_8): Function[];
    listeners<E_9 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_9): Function[];
    listenerCount<E_10 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_10): number;
    getMaxListeners(): number;
    setMaxListeners(maxListeners: number): any;
    __events: import("../puppet/events.js").PuppetEventListener;
    __currentUserId?: string | undefined;
    readonly currentUserId: string;
    readonly isLoggedIn: boolean;
    __authQrCode?: string | undefined;
    readonly authQrCode: string | undefined;
    login(userId: string): void;
    logout(reason?: string): Promise<void>;
    selfId(): string;
    logonoff(): boolean;
}) & MixinBase;
type CacheMixin = ReturnType<typeof cacheMixin>;
type ProtectedPropertyCacheMixin = 'cache' | 'onDirty' | '__cacheMixinCleanCallbackList' | '__dirtyPayloadAwait';
export type { CacheMixin, ProtectedPropertyCacheMixin, };
export { cacheMixin };
