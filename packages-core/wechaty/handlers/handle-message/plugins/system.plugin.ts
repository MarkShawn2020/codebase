import { FileBox } from "file-box"
import yaml from "js-yaml"
import { z } from "zod"
import { prisma } from "../../../../../packages-to-classify/db/providers/prisma"
import { llmModelTypeSchema } from "../../../../../packages-to-classify/llm/schema/llm.models"
import { FeatureMap } from "../../../schema/commands"
import { parseLimitedCommand } from "../../../utils/parse-command"
import { BasePlugin } from "./base.plugin"

const commandTypeSchema = z.enum([
  "list-models",
  // "list-langs",
  "set-avatar",
  "set-preference",
  "sync-rooms",
  "sync-contacts",
])
type CommandType = z.infer<typeof commandTypeSchema>
const i18n: FeatureMap<CommandType> = {
  en: {
    title: "Operating System",
    description: "There are some administrative commands",
    commands: {
      "list-models": {
        type: "list-models",
        description: "list supported LLM models",
      },

      // "list-langs": {
      //   type: "list-langs",
      //   description: "list supported languages",
      // },

      "set-avatar": {
        type: "set-avatar",
      },
      "set-preference": {
        type: "set-preference",
      },
      "sync-rooms": {
        type: "sync-rooms",
      },
      "sync-contacts": {
        type: "sync-contacts",
      },
    },
  },
}

export class SystemPlugin extends BasePlugin {
  public i18n = i18n

  async parse(input?: string) {
    if (!input) return this.help()

    const commands = this.i18n[await this.getLang()]?.commands
    if (!commands) return

    const parsed = parseLimitedCommand(
      input,
      z.enum(Object.keys(commands) as [string, ...string[]]),
    )
    if (parsed) {
      const commandKeyInInput = parsed.command
      const commandKeyInEnum = commands[commandKeyInInput]?.type
      const commandType = await commandTypeSchema.parseAsync(commandKeyInEnum)
      switch (commandType) {
        case "list-models":
          await this.listModels()
          break

        case "set-avatar":
          const avatarUrl = await z
            .string()
            .min(1)
            .startsWith("http")
            .parseAsync(parsed.args)
          console.log({ avatarUrl })
          await this.bot.currentUser.avatar(FileBox.fromUrl(avatarUrl))
          console.log("-- done set avatar")
          break

        case "set-preference": {
          const [key, val] = parsed.args.split(/\s*=\s*/)
          // todo: validate key
          if (!key || !val) return
          await this.updatePreferenceInDB(key, val, "当前会话配置已更新 ~")
          break
        }

        case "sync-rooms": {
          const rooms = await this.bot.Room.findAll()
          const result = await Promise.all(
            rooms.map(async (room) => {
              const data = room.payload
              return !data
                ? undefined
                : await prisma.wechatRoom.upsert({
                    where: { id: data.id },
                    create: data,
                    update: data,
                  })
            }),
          )
          await this.reply(
            `updated: ${result.filter((i) => !!i).length} / ${result.length}`,
          )
          break
        }

        case "sync-contacts": {
          const contacts = await this.bot.Contact.findAll()
          const result = await Promise.all(
            contacts.map(async (contact) => {
              const data = contact.payload
              return !data
                ? undefined
                : await prisma.wechatUser.upsert({
                    where: { id: data.id },
                    create: data,
                    update: data,
                  })
            }),
          )
          await this.reply(
            `updated: ${result.filter((i) => !!i).length} / ${result.length}`,
          )
          break
        }
      }
    }
  }

  async listModels() {
    return this.standardReply(
      [...llmModelTypeSchema.options.map((o, i) => `${i + 1}. ${o}`)].join(
        "\n",
      ),
    )
  }
}
