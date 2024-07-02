/**
 * Huan(202201): This enum type value MUST be keep unchanged across versions
 *  because the puppet service client/server might has different versions of the puppet
 */
var TapType;
(function (TapType) {
    TapType[TapType["Unspecified"] = 0] = "Unspecified";
    TapType[TapType["Like"] = 1] = "Like";
})(TapType || (TapType = {}));
export { TapType, };
