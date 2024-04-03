import { $Enums } from "@prisma/client"
import {
  IWechatArticleComment,
  IWechatArticleStat,
} from "../../packages/common-platform-wechat/article/detail/schema"

export type ICardPlatform<T extends $Enums.PlatformType> =
  T extends "wechatArticle"
    ? {
        stat?: IWechatArticleStat
        comments?: IWechatArticleComment[]
      }
    : object

export type ICardStat = {
  reads?: number
  likes?: number
  comments?: number
}

export type IMedia = {
  url: string
  ratio?: number
}

export type IModel = {
  name: string
}

export type ActionType = "generate" | "copy" | "download" | "upload"

export type ICardGenOption = {
  enabled: boolean
  cacheIgnored: boolean
}
export type ICardGenOptions = {
  summary: ICardGenOption
  stat: ICardGenOption
  comments: ICardGenOption
}
