import { AppMessageType, ReferMsgPayload } from "./message.js"

export const serializeRefMsgPayload = (payload: ReferMsgPayload) => {
  // logger.debug("-- serializeRefMsgPayload: %o", payload)
  return `RefMsg(id=${payload.svrid}, type=${AppMessageType[Number(payload.type)]}, content=${payload.content})`
}
