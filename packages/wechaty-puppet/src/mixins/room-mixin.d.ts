import type { FileBoxInterface } from 'file-box';
import type { RoomPayload, RoomPayloadFilterFunction, RoomQueryFilter } from '../schemas/room.js';
import type { PuppetSkeleton } from '../puppet/puppet-skeleton.js';
import { DirtyType } from '../schemas/dirty.js';
declare const roomMixin: <MixinBase extends typeof PuppetSkeleton & (abstract new (...args: any[]) => {
    contactSelfName(name: string): Promise<void>;
    contactSelfQRCode(): Promise<string>;
    contactSelfSignature(signature: string): Promise<void>;
    contactAlias(contactId: string): Promise<string>;
    contactAlias(contactId: string, alias: string | null): Promise<void>;
    contactAvatar(contactId: string): Promise<FileBoxInterface>;
    contactAvatar(contactId: string, file: FileBoxInterface): Promise<void>;
    contactPhone(contactId: string, phoneList: string[]): Promise<void>;
    contactCorporationRemark(contactId: string, corporationRemark: string | null): Promise<void>;
    contactDescription(contactId: string, description: string | null): Promise<void>;
    contactList(): Promise<string[]>;
    contactRawPayload(contactId: string): Promise<any>;
    contactRawPayloadParser(rawPayload: any): Promise<import("../schemas/contact.js").ContactPayload>;
    contactSearch(query?: string | import("../schemas/contact.js").ContactQueryFilter | undefined, searchIdList?: string[] | undefined): Promise<string[]>;
    contactQueryFilterFactory(query: import("../schemas/contact.js").ContactQueryFilter): import("../schemas/contact.js").ContactPayloadFilterFunction;
    contactValidate(contactId: string): Promise<boolean>;
    contactPayloadCache(contactId: string): import("../schemas/contact.js").ContactPayload | undefined;
    contactPayload(contactId: string): Promise<import("../schemas/contact.js").ContactPayload>;
    contactPayloadDirty(id: string): Promise<void>;
    cache: import("../agents/cache-agent.js").CacheAgent;
    __cacheMixinCleanCallbackList: (() => void)[];
    start: (() => Promise<void>) & (() => Promise<void>) & (() => Promise<void>);
    stop: (() => Promise<void>) & (() => Promise<void>) & (() => Promise<void>);
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
}) & (abstract new (...args: any[]) => {
    roomMemberList(roomId: string): Promise<string[]>;
    roomMemberRawPayload(roomId: string, contactId: string): Promise<any>;
    roomMemberRawPayloadParser(rawPayload: any): Promise<import("../schemas/room.js").RoomMemberPayload>;
    roomMemberSearch(roomId: string, query: string | symbol | import("../schemas/room.js").RoomMemberQueryFilter, memberIdList?: string[] | undefined): Promise<string[]>;
    roomMemberPayload(roomId: string, memberId: string): Promise<import("../schemas/room.js").RoomMemberPayload>;
    roomMemberPayloadDirty(id: string): Promise<void>;
    readonly id: string;
    readonly options: import("../schemas/puppet.js").PuppetOptions;
    wrapAsync: import("gerror").WrapAsync;
    start: (() => Promise<void>) & (() => Promise<void>) & (() => Promise<void>);
    stop: (() => Promise<void>) & (() => Promise<void>) & (() => Promise<void>);
    emit(event: any, ...args: any): boolean;
    addListener<E_27 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_27, listener: import("../puppet/events.js").PuppetEventListener[E_27]): any;
    on<E_28 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_28, listener: import("../puppet/events.js").PuppetEventListener[E_28]): any;
    once<E_29 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_29, listener: import("../puppet/events.js").PuppetEventListener[E_29]): any;
    prependListener<E_30 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_30, listener: import("../puppet/events.js").PuppetEventListener[E_30]): any;
    prependOnceListener<E_31 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_31, listener: import("../puppet/events.js").PuppetEventListener[E_31]): any;
    off<E_32 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_32, listener: import("../puppet/events.js").PuppetEventListener[E_32]): any;
    removeAllListeners<E_33 extends keyof import("../puppet/events.js").PuppetEventListener>(event?: E_33 | undefined): any;
    removeListener<E_34 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_34, listener: import("../puppet/events.js").PuppetEventListener[E_34]): any;
    eventNames(): (string | symbol)[];
    rawListeners<E_8 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_8): Function[];
    listeners<E_9 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_9): Function[];
    listenerCount<E_10 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_10): number;
    getMaxListeners(): number;
    setMaxListeners(maxListeners: number): any;
    __events: import("../puppet/events.js").PuppetEventListener;
    contactSelfName(name: string): Promise<void>;
    contactSelfQRCode(): Promise<string>;
    contactSelfSignature(signature: string): Promise<void>;
    contactAlias(contactId: string): Promise<string>;
    contactAlias(contactId: string, alias: string | null): Promise<void>;
    contactAvatar(contactId: string): Promise<FileBoxInterface>;
    contactAvatar(contactId: string, file: FileBoxInterface): Promise<void>;
    contactPhone(contactId: string, phoneList: string[]): Promise<void>;
    contactCorporationRemark(contactId: string, corporationRemark: string | null): Promise<void>;
    contactDescription(contactId: string, description: string | null): Promise<void>;
    contactList(): Promise<string[]>;
    contactRawPayload(contactId: string): Promise<any>;
    contactRawPayloadParser(rawPayload: any): Promise<import("../schemas/contact.js").ContactPayload>;
    contactSearch(query?: string | import("../schemas/contact.js").ContactQueryFilter | undefined, searchIdList?: string[] | undefined): Promise<string[]>;
    contactQueryFilterFactory(query: import("../schemas/contact.js").ContactQueryFilter): import("../schemas/contact.js").ContactPayloadFilterFunction;
    contactValidate(contactId: string): Promise<boolean>;
    contactPayloadCache(contactId: string): import("../schemas/contact.js").ContactPayload | undefined;
    contactPayload(contactId: string): Promise<import("../schemas/contact.js").ContactPayload>;
    contactPayloadDirty(id: string): Promise<void>;
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
})>(mixinBase: MixinBase) => (abstract new (...args: any[]) => {
    /**
     *
     * Room
     *
     */
    roomAdd(roomId: string, contactId: string | string[], inviteOnly?: boolean): Promise<void>;
    roomAvatar(roomId: string): Promise<FileBoxInterface>;
    roomCreate(contactIdList: string[], topic?: string): Promise<string>;
    roomDel(roomId: string, contactId: string | string[]): Promise<void>;
    roomList(): Promise<string[]>;
    roomQRCode(roomId: string): Promise<string>;
    roomQuit(roomId: string): Promise<void>;
    roomTopic(roomId: string): Promise<string>;
    roomTopic(roomId: string, topic: string): Promise<void>;
    /**
     * Issue #155 - https://github.com/wechaty/puppet/issues/155
     *
     * @protected
     */
    roomRawPayload(roomId: string): Promise<any>;
    /**
     * Issue #155 - https://github.com/wechaty/puppet/issues/155
     *
     * @protected
     */
    roomRawPayloadParser(rawPayload: any): Promise<RoomPayload>;
    /**
      *
      * RoomMember
      *
      */
    roomAnnounce(roomId: string): Promise<string>;
    /**
      *
      * RoomMember
      *
      */
    roomAnnounce(roomId: string, text: string): Promise<void>;
    roomSearch(query?: RoomQueryFilter): Promise<string[]>;
    /**
     * Issue #155 - https://github.com/wechaty/puppet/issues/155
     *
     * @protected
     */
    roomQueryFilterFactory(query: RoomQueryFilter): RoomPayloadFilterFunction;
    /**
      * Check a Room Id if it's still valid.
      *  For example: talk to the server, and see if it should be deleted in the local cache.
      */
    roomValidate(roomId: string): Promise<boolean>;
    /**
     * Issue #155 - https://github.com/wechaty/puppet/issues/155
     *
     * @protected
     */
    roomPayloadCache(roomId: string): undefined | RoomPayload;
    roomPayload(roomId: string): Promise<RoomPayload>;
    roomPayloadDirty(id: string): Promise<void>;
    readonly id: string;
    readonly options: import("../schemas/puppet.js").PuppetOptions;
    wrapAsync: import("gerror").WrapAsync;
    start: (() => Promise<void>) & (() => Promise<void>) & (() => Promise<void>);
    stop: (() => Promise<void>) & (() => Promise<void>) & (() => Promise<void>);
    emit(event: any, ...args: any): boolean;
    addListener<E_35 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_35, listener: import("../puppet/events.js").PuppetEventListener[E_35]): any;
    on<E_36 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_36, listener: import("../puppet/events.js").PuppetEventListener[E_36]): any;
    once<E_37 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_37, listener: import("../puppet/events.js").PuppetEventListener[E_37]): any;
    prependListener<E_38 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_38, listener: import("../puppet/events.js").PuppetEventListener[E_38]): any;
    prependOnceListener<E_39 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_39, listener: import("../puppet/events.js").PuppetEventListener[E_39]): any;
    off<E_40 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_40, listener: import("../puppet/events.js").PuppetEventListener[E_40]): any;
    removeAllListeners<E_41 extends keyof import("../puppet/events.js").PuppetEventListener>(event?: E_41 | undefined): any;
    removeListener<E_42 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_42, listener: import("../puppet/events.js").PuppetEventListener[E_42]): any;
    eventNames(): (string | symbol)[];
    rawListeners<E_8 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_8): Function[];
    listeners<E_9 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_9): Function[];
    listenerCount<E_10 extends keyof import("../puppet/events.js").PuppetEventListener>(event: E_10): number;
    getMaxListeners(): number;
    setMaxListeners(maxListeners: number): any;
    __events: import("../puppet/events.js").PuppetEventListener;
    contactSelfName(name: string): Promise<void>;
    contactSelfQRCode(): Promise<string>;
    contactSelfSignature(signature: string): Promise<void>;
    contactAlias(contactId: string): Promise<string>;
    contactAlias(contactId: string, alias: string | null): Promise<void>;
    contactAvatar(contactId: string): Promise<FileBoxInterface>;
    contactAvatar(contactId: string, file: FileBoxInterface): Promise<void>;
    contactPhone(contactId: string, phoneList: string[]): Promise<void>;
    contactCorporationRemark(contactId: string, corporationRemark: string | null): Promise<void>;
    contactDescription(contactId: string, description: string | null): Promise<void>;
    contactList(): Promise<string[]>;
    contactRawPayload(contactId: string): Promise<any>;
    contactRawPayloadParser(rawPayload: any): Promise<import("../schemas/contact.js").ContactPayload>;
    contactSearch(query?: string | import("../schemas/contact.js").ContactQueryFilter | undefined, searchIdList?: string[] | undefined): Promise<string[]>;
    contactQueryFilterFactory(query: import("../schemas/contact.js").ContactQueryFilter): import("../schemas/contact.js").ContactPayloadFilterFunction;
    contactValidate(contactId: string): Promise<boolean>;
    contactPayloadCache(contactId: string): import("../schemas/contact.js").ContactPayload | undefined;
    contactPayload(contactId: string): Promise<import("../schemas/contact.js").ContactPayload>;
    contactPayloadDirty(id: string): Promise<void>;
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
    roomMemberList(roomId: string): Promise<string[]>;
    roomMemberRawPayload(roomId: string, contactId: string): Promise<any>;
    roomMemberRawPayloadParser(rawPayload: any): Promise<import("../schemas/room.js").RoomMemberPayload>;
    roomMemberSearch(roomId: string, query: string | symbol | import("../schemas/room.js").RoomMemberQueryFilter, memberIdList?: string[] | undefined): Promise<string[]>;
    roomMemberPayload(roomId: string, memberId: string): Promise<import("../schemas/room.js").RoomMemberPayload>;
    roomMemberPayloadDirty(id: string): Promise<void>;
}) & MixinBase;
type RoomMixin = ReturnType<typeof roomMixin>;
type ProtectedPropertyRoomMixin = 'roomPayloadCache' | 'roomQueryFilterFactory' | 'roomRawPayload' | 'roomRawPayloadParser';
export type { RoomMixin, ProtectedPropertyRoomMixin, };
export { roomMixin };
