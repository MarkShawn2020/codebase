import type { PostPayload, PostQueryFilter } from '../schemas/post.js';
import type { PuppetSkeleton } from '../puppet/puppet-skeleton.js';
import { DirtyType } from '../schemas/dirty.js';
import type { PaginationRequest, PaginationResponse } from '../schemas/pagination.js';
declare const postMixin: <MinxinBase extends typeof PuppetSkeleton & (abstract new (...args: any[]) => {
    cache: import("../agents/cache-agent.js").CacheAgent;
    __cacheMixinCleanCallbackList: (() => void)[];
    start(): Promise<void>;
    stop(): Promise<void>;
    dirtyPayload(type: DirtyType, id: string): void;
    onDirty({ payloadType, payloadId, }: import("../schemas/event.js").EventDirtyPayload): void;
    __dirtyPayloadAwait(type: DirtyType, id: string): Promise<void>;
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
    __currentUserId?: string | undefined;
    readonly currentUserId: string;
    readonly isLoggedIn: boolean;
    __authQrCode?: string | undefined;
    readonly authQrCode: string | undefined;
    login(userId: string): void;
    logout(reason?: string): Promise<void>;
    selfId(): string;
    logonoff(): boolean;
}) & (abstract new (...args: any[]) => {
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
    readonly options: import("../schemas/puppet.js").PuppetOptions;
    wrapAsync: import("gerror").WrapAsync;
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
})>(baseMixin: MinxinBase) => (abstract new (...args: any[]) => {
    postRawPayload(postId: string): Promise<any>;
    postRawPayloadParser(rawPayload: any): Promise<PostPayload>;
    postPayloadCache(postId: string): undefined | PostPayload;
    postPayload(postId: string): Promise<PostPayload>;
    /**
     * Publish a post
     */
    postPublish(payload: PostPayload): Promise<void | string>;
    /**
     * Search from the server.
     *
     * @param postId
     * @param filter
     * @param pagination
     */
    postSearch(filter: PostQueryFilter, pagination?: PaginationRequest): Promise<PaginationResponse<string[]>>;
    /**
     * List from the local, will return all ids from cache
     */
    postList(): string[];
    postPayloadDirty(id: string): Promise<void>;
    readonly id: string;
    readonly options: import("../schemas/puppet.js").PuppetOptions;
    wrapAsync: import("gerror").WrapAsync;
    start: (() => Promise<void>) & (() => Promise<void>) & (() => Promise<void>);
    stop: (() => Promise<void>) & (() => Promise<void>) & (() => Promise<void>);
    emit(event: any, ...args: any): boolean;
    addListener<E_19 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_19, listener: import("../puppet/events.js").PuppetEventListener[E_19]): any;
    on<E_20 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_20, listener: import("../puppet/events.js").PuppetEventListener[E_20]): any;
    once<E_21 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_21, listener: import("../puppet/events.js").PuppetEventListener[E_21]): any;
    prependListener<E_22 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_22, listener: import("../puppet/events.js").PuppetEventListener[E_22]): any;
    prependOnceListener<E_23 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_23, listener: import("../puppet/events.js").PuppetEventListener[E_23]): any;
    off<E_24 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_24, listener: import("../puppet/events.js").PuppetEventListener[E_24]): any;
    removeAllListeners<E_25 extends keyof import("../puppet/events.js").PuppetEventListener>(event?: E_25 | undefined): any;
    removeListener<E_26 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_26, listener: import("../puppet/events.js").PuppetEventListener[E_26]): any;
    eventNames(): (string | symbol)[];
    rawListeners<E_8 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_8): Function[];
    listeners<E_9 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_9): Function[];
    listenerCount<E_10 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_10): number;
    getMaxListeners(): number;
    setMaxListeners(maxListeners: number): any;
    __events: import("../puppet/events.js").PuppetEventListener;
    cache: import("../agents/cache-agent.js").CacheAgent;
    __cacheMixinCleanCallbackList: (() => void)[];
    dirtyPayload(type: DirtyType, id: string): void;
    onDirty({ payloadType, payloadId, }: import("../schemas/event.js").EventDirtyPayload): void;
    __dirtyPayloadAwait(type: DirtyType, id: string): Promise<void>;
    __currentUserId?: string | undefined;
    readonly currentUserId: string;
    readonly isLoggedIn: boolean;
    __authQrCode?: string | undefined;
    readonly authQrCode: string | undefined;
    login(userId: string): void;
    logout(reason?: string): Promise<void>;
    selfId(): string;
    logonoff(): boolean;
}) & MinxinBase;
type PostMixin = ReturnType<typeof postMixin>;
type ProtectedPropertyPostMixin = 'postPayloadCache' | 'postRawPayload' | 'postRawPayloadParser';
export type { PostMixin, ProtectedPropertyPostMixin, };
export { postMixin };
