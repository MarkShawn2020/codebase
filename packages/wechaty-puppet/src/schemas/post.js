/**
 * Huan(202201): numbers must be keep unchanged across versions
 */
var PostType;
(function (PostType) {
    PostType[PostType["Unspecified"] = 0] = "Unspecified";
    PostType[PostType["Moment"] = 1] = "Moment";
    PostType[PostType["Channel"] = 2] = "Channel";
    PostType[PostType["Message"] = 3] = "Message";
})(PostType || (PostType = {}));
const isPostPayloadClient = (payload) => payload instanceof Object
    && !payload.id // <- Huan(202201): here is enough to check if it's a PostPayloadClient
    && Array.isArray(payload.sayableList)
    && payload.sayableList.length > 0
    && payload.sayableList[0] instanceof Object
    && typeof payload.sayableList[0].type !== 'undefined';
const isPostPayloadServer = (payload) => payload instanceof Object
    && !!payload.id // <- Huan(202201): here is enough to check if it's a PostPayloadServer
    && Array.isArray(payload.sayableList)
    && payload.sayableList.length > 0
    && typeof payload.sayableList[0] === 'string';
export { isPostPayloadClient, isPostPayloadServer, PostType, };
