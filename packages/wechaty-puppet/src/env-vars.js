const DEFAULT_LRU_CACHE_SIZE_CONTACT = 500;
const DEFAULT_LRU_CACHE_SIZE_FRIENDSHIP = 100;
const DEFAULT_LRU_CACHE_SIZE_MESSAGE = 500;
const DEFAULT_LRU_CACHE_SIZE_POST = 100;
const DEFAULT_LRU_CACHE_SIZE_ROOM = 100;
const DEFAULT_LRU_CACHE_SIZE_ROOM_INVITATION = 100;
const DEFAULT_LRU_CACHE_SIZE_ROOM_MEMBER = 100;
const getNumberEnv = (env) => (varName, defaultValue) => {
    const strVal = env[varName];
    if (!strVal) {
        return defaultValue;
    }
    const numVal = parseInt(strVal);
    if (isNaN(numVal)) {
        return defaultValue;
    }
    return numVal;
};
const getNumber = getNumberEnv(process.env);
const WECHATY_PUPPET_LRU_CACHE_SIZE_CONTACT = (v) => v ?? getNumber('WECHATY_PUPPET_LRU_CACHE_SIZE_CONTACT', DEFAULT_LRU_CACHE_SIZE_CONTACT);
const WECHATY_PUPPET_LRU_CACHE_SIZE_FRIENDSHIP = (v) => v ?? getNumber('WECHATY_PUPPET_LRU_CACHE_SIZE_FRIENDSHIP', DEFAULT_LRU_CACHE_SIZE_FRIENDSHIP);
const WECHATY_PUPPET_LRU_CACHE_SIZE_MESSAGE = (v) => v ?? getNumber('WECHATY_PUPPET_LRU_CACHE_SIZE_MESSAGE', DEFAULT_LRU_CACHE_SIZE_MESSAGE);
const WECHATY_PUPPET_LRU_CACHE_SIZE_POST = (v) => v ?? getNumber('WECHATY_PUPPET_LRU_CACHE_SIZE_POST', DEFAULT_LRU_CACHE_SIZE_POST);
const WECHATY_PUPPET_LRU_CACHE_SIZE_ROOM = (v) => v ?? getNumber('WECHATY_PUPPET_LRU_CACHE_SIZE_ROOM', DEFAULT_LRU_CACHE_SIZE_ROOM);
const WECHATY_PUPPET_LRU_CACHE_SIZE_ROOM_INVITATION = (v) => v ?? getNumber('WECHATY_PUPPET_LRU_CACHE_SIZE_ROOM_INVITATION', DEFAULT_LRU_CACHE_SIZE_ROOM_INVITATION);
const WECHATY_PUPPET_LRU_CACHE_SIZE_ROOM_MEMBER = (v) => v ?? getNumber('WECHATY_PUPPET_LRU_CACHE_SIZE_ROOM_MEMBER', DEFAULT_LRU_CACHE_SIZE_ROOM_MEMBER);
export { getNumberEnv, WECHATY_PUPPET_LRU_CACHE_SIZE_CONTACT, WECHATY_PUPPET_LRU_CACHE_SIZE_FRIENDSHIP, WECHATY_PUPPET_LRU_CACHE_SIZE_MESSAGE, WECHATY_PUPPET_LRU_CACHE_SIZE_POST, WECHATY_PUPPET_LRU_CACHE_SIZE_ROOM_INVITATION, WECHATY_PUPPET_LRU_CACHE_SIZE_ROOM_MEMBER, WECHATY_PUPPET_LRU_CACHE_SIZE_ROOM, };
