var ContactGender;
(function (ContactGender) {
    ContactGender[ContactGender["Unknown"] = 0] = "Unknown";
    ContactGender[ContactGender["Male"] = 1] = "Male";
    ContactGender[ContactGender["Female"] = 2] = "Female";
})(ContactGender || (ContactGender = {}));
/**
 * Huan(202004) TODO: Lock the ENUM number (like protobuf) ?
 */
var ContactType;
(function (ContactType) {
    ContactType[ContactType["Unknown"] = 0] = "Unknown";
    ContactType[ContactType["Individual"] = 1] = "Individual";
    ContactType[ContactType["Official"] = 2] = "Official";
    ContactType[ContactType["Corporation"] = 3] = "Corporation";
})(ContactType || (ContactType = {}));
export { ContactGender, ContactType, };
