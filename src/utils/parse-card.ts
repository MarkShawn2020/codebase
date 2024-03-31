"use server"
import { IApi } from "../../packages/common-api/schema"
import {
  fetchBilibiliDetail,
  fetchBvidFromb23tv,
} from "../../packages/common-bilibili/actions"
import { getBvidFromUrl } from "../../packages/common-bilibili/utils"
import { extractFirstURL } from "../../packages/common-utils/parse-url"
import { fetchXiaoHongShuDetail } from "../../packages/common-xiaohongshu/actions"
import { ICardBody } from "../schema/card"
import { ICardGenOptions } from "../store/card.atom"
import { bilibili2card } from "./provider-to-card/bilibili"
import { fetchWechatArticleWithCache } from "./provider-to-card/wechat-article"
import { xiaohongshu2card } from "./provider-to-card/xiaohongshu"

/**
 * 从用户输入的 url 中返回解析出的结构
 * @param inputUrlLike
 * @param options
 */
export const genCardFromUrl = async (
  inputUrlLike: string,
  options: ICardGenOptions,
): Promise<IApi<ICardBody>> => {
  const urlParsed = extractFirstURL(inputUrlLike)
  console.log({ urlParsed })
  if (!urlParsed)
    return {
      success: false,
      message: `invalid url to be parsed from ${inputUrlLike}`,
    }

  const wechatArticleId =
    /mp.weixin.qq.com\/s\/(.*)$/.exec(urlParsed)?.[1] ?? null
  if (wechatArticleId) {
    return {
      success: true,
      data: await fetchWechatArticleWithCache(wechatArticleId, options),
    }
  }

  if (/xhslink|xiaohongshu/.test(urlParsed)) {
    const data = await fetchXiaoHongShuDetail(urlParsed)
    if (!data)
      return {
        success: false,
        message: `failed to fetch xiaohongshu detail from url ${urlParsed}, please try again`,
      }

    return {
      success: true,
      data: xiaohongshu2card(data),
    }
  }

  if (/bilibili|b23.tv/.test(urlParsed)) {
    let bvid: string | null
    if (/bilibili/.test(urlParsed)) bvid = getBvidFromUrl(urlParsed)
    else bvid = (await fetchBvidFromb23tv(urlParsed)).data ?? null

    if (!bvid)
      return {
        success: false,
        message: `invalid bilibili url to be parsed from ${urlParsed}`,
      }

    const resDetail = await fetchBilibiliDetail(bvid)
    if (!resDetail.success)
      return { success: false, message: resDetail.message }

    return {
      success: true,
      data: bilibili2card(resDetail.data),
    }
  }

  return { success: false, message: "couldn't decide which platform is" }
}
