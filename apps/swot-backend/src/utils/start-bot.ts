import { logger } from "@cs-magic/common"
import { createWechatyBot } from "@cs-magic/swot-bot/create-wechaty-bot"
import { IContext } from "../schema/context.js"
import { syncClients } from "./sync-clients.js"
import { transferMessage } from "./transfer-message.js"

export const startBot = async (context: IContext) => {
  // 避免重复登录，会导致 padLocal 报错
  if (!context.bot) {
    logger.info("-- creating bot, context: %o", context)

    const bot = await createWechatyBot()
    bot
      .on("scan", (value, status) => {
        context.scan = { value, status }
        logger.info(`updated scan: ${JSON.stringify(context.scan)}`)
        transferMessage({ type: "scan", data: context.scan }, context.sockets)
      })
      .on("login", (user) => {
        // console.log("-- login: ", user)
        context.scan = null
        syncClients(context)
      })
    context.bot = bot
  }

  // todo: if has cache,  start auto, o.w. wait for triggering in the frontend ?
  if (!context.bot?.isLoggedIn) {
    logger.info("-- starting bot, context: %o", context)
    await context.bot?.start()
  }
}
