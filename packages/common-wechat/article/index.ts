"use server"

import { IMedia } from "@/schema/card"
import { IUserSummary } from "@/schema/user.summary"
import { IWechatArticleDetail } from "@/schema/wechat-article.detail"
import { ICardGenOptions } from "@/store/card.atom"
import { Prisma } from "@prisma/client"
import parse from "node-html-parser"
import { api } from "../../common-api"
import { fetchArticleSummary } from "../../common-article/core"
import { IArticleSummaryParsed } from "../../common-article/schema"
import { parseSummary } from "../../common-article/utils"
import { parseMetaFromHtml } from "../../common-html/utils"
import { html2md } from "../../common-markdown/html2md"
import {
  fetchWechatArticleComments,
  fetchWechatArticleStat,
} from "./detail/providers/wxapi"
import { IWechatArticleComment, IWechatArticleStat } from "./detail/schema"
import WechatArticleUncheckedCreateInput = Prisma.WechatArticleUncheckedCreateInput

export const fetchWechatArticle = async (
  sourceUrl: string,
  options: ICardGenOptions,
  getData: (id: string) => Promise<IWechatArticleDetail | null>,
): Promise<WechatArticleUncheckedCreateInput> => {
  console.log("-- fetchWechatArticle: ", { url: sourceUrl })

  // 1. fetch page
  const { data: pageText } = await api.get<string>(sourceUrl)

  // 2. parse page
  const html = parse(pageText)
  const ogUrl = parseMetaFromHtml(html, "og:url", "property")

  // 2.1. get id(sn) from page
  const id = /sn=(.*?)&/.exec(ogUrl ?? "")![1]!

  // 2.1.1 get data from id
  const dataInDB = await getData(id)

  const contentHtml = html.getElementById("page-content")?.innerHTML ?? null
  const title = parseMetaFromHtml(html, "og:title")
  const coverUrl = parseMetaFromHtml(html, "og:image")!
  const cover: IMedia = {
    url: coverUrl,
    type: "image",
  }
  // const source = "公众号"
  const source = parseMetaFromHtml(html, "og:site_name") // 微信公众平台
  const time =
    new Date(Number(/var ct = "(.*?)"/.exec(pageText)?.[1]) * 1e3) ?? null // 1711455495
  const author: IUserSummary = {
    name: parseMetaFromHtml(html, "author", "name"),
    image: /var hd_head_img = "(.*?)"/.exec(pageText)?.[1] ?? null,
    id: /var user_name = "(.*?)"/.exec(pageText)?.[1] ?? "",
  }
  let comments: IWechatArticleComment[] | null | undefined = undefined
  let stat: IWechatArticleStat | null | undefined = undefined
  let contentMd: string | null | undefined = undefined
  let summary: IArticleSummaryParsed | null | undefined = undefined
  let summaryContent: string | null | undefined = undefined

  if (contentHtml) {
    contentMd = html2md(contentHtml)

    // 2.1. cache summary
    if (!options.summary.cacheIgnored) {
      summary = dataInDB?.summary
      if (summary) console.log("-- summary cached")
    }

    // 2.2. fetch summary
    if (options.summary.enabled && !summary) {
      console.log("-- summary fetching")
      summaryContent = (await fetchArticleSummary(contentMd)) ?? null
      summary = parseSummary(summaryContent)
    }
  }

  // 3.1. stat
  if (options.stat.enabled) {
    if (!options.stat.cacheIgnored) stat = dataInDB?.stat
    if (!stat) stat = (await fetchWechatArticleStat(id)).data
  }

  // 3.2. comments
  if (options.comments.enabled) {
    if (!options.comments.cacheIgnored) comments = dataInDB?.comments
    if (!comments) comments = (await fetchWechatArticleComments(id)).data
  }

  console.log("-- fetched: ", {
    id,
    sourceUrl,
    source,
    author,
    time,
    title,
    cover,
    length: {
      html: contentHtml?.length,
      md: contentMd?.length,
      summary: summaryContent?.length,
    },
    summary,
    stat,
    comments: {
      length: comments?.length,
      first: comments?.[0],
    },
  })

  return {
    id,
    sourceUrl,
    source,
    author,
    time,
    title,
    cover,
    contentHtml,
    summaryContent,
    contentMd,
    summary,
    stat,
    comments,
  }
}
