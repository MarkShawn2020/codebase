import { Prisma } from "@prisma/client"
import { Message } from "wechaty"
import { prisma } from "../../../packages/common-db/providers/prisma"

export const getConvTable = (
  message: Message,
): Prisma.WechatUserDelegate & Prisma.WechatRoomDelegate =>
  prisma[
    message.room() ? "wechatRoom" : "wechatUser"
  ] as Prisma.WechatUserDelegate & Prisma.WechatRoomDelegate
