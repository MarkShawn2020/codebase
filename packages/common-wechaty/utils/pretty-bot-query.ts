import { LangType } from "@/schema/wechat-user"
import { prettyQuery } from "../../common-common/pretty-query"
import { botStaticContext } from "../create-wechaty-bot"
import { CommandType } from "../message-handlers/_all"
import { loadBotDynamicContext } from "./bot-context"

export const prettyBotQuery = async (
  title: string,
  content: string,
  type?: LangType,
  tips?: CommandType[],
) => {
  const context = await loadBotDynamicContext(type ?? "en")
  return prettyQuery(title, content, {
    footer: `${context.name} ${botStaticContext.version}`,
    tips: tips ? tips.join("\n") : undefined,
  })
}
