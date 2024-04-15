import { Contact } from "wechaty-puppet/payloads"
import { type BackendType } from "../common-llm/schema/llm"
import { type LlmModelType } from "../common-llm/schema/providers"

type IUser = Contact

export type IBotPreference = {
  model: LlmModelType
  backend: BackendType
  handlers: string[]
}

export type IBotStaticContext = {
  version: string
  startTime: number
}

export type IBotDynamicContext = {
  name: string
}

export type IBotContext = IBotStaticContext & IBotDynamicContext

export type IBotTemplate = {
  basic: string
  help: string
  status: string
}

export type IWechatBotTransfer =
  | {
      type: "scan"
      data: { value: string; status: number }
    }
  | {
      type: "login"
      data: IUser
    }
  | {
      type: "loggedIn"
      data: boolean
    }

export type { IUser }
