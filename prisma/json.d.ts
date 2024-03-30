declare global {
  // 要放在里面
  import { IMedia } from "@/schema/card"
  import {
    IWechatArticleStat,
    IWechatArticleComment,
  } from "../packages/common-wechat/article/fetch/detail/schema"

  namespace PrismaJson {
    type IWechatArticleStat = IWechatArticleStat
    type IWechatArticleComment = IWechatArticleComment
    type IMedia = IMedia
  }
}
