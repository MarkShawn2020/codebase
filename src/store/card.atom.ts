import { IUserBasic } from "@/schema/user.summary"
import { atom } from "jotai"
import { withImmer } from "jotai-immer"
import { atomWithStorage } from "jotai/utils"
import { parseSummary } from "../../packages/common-article/utils"
import { parseJS } from "../../packages/common-general/safe-parse-json"
import { FetchEngine } from "../../packages/common-general/schema"
import { ICardGenOptions, ISummaryParsed } from "../schema/card"
import { ICardDetail } from "../schema/card.basic"
import { getCardUrl } from "../utils"

export const cardAtom = withImmer(
  atomWithStorage<ICardDetail>("card", {
    id: "",

    platformType: "wxmpArticle",
    platformId: "",

    contentSummary: null,
    stat: null,
    author: null,
    cover: null,
    time: null,
    createdAt: null,
    updatedAt: null,
    contentMd: null,
    sourceUrl: null,
    title: null,
    description: null,
    platformData: null,
    iFrames: [],
    videos: [],
    images: [],
  }),
)

export const cardInputAtom = atomWithStorage("card.input", "")

export const cardInputUrlAtom = atomWithStorage("url.toParse", "")
export const cardInputUrlsAtom = withImmer(
  atomWithStorage<{ url: string; disabled?: boolean }[]>("urls.toParse", []),
)

export const cardUserIdAtom = atomWithStorage("card.user.id", "")
export const cardUserAvatarAtom = atomWithStorage("card.user.avatar", "")
export const cardUserNameAtom = atomWithStorage("card.user.name", "")

export const cardGeneratingAtom = atom(false)
export const cardCopyingAtom = atom(false)
export const cardDownloadingAtom = atom(false)
export const cardUploadingAtom = atom(false)
export const cardRenderedAtom = atom(false)

export const cardAuthorWithTitleAtom = atomWithStorage(
  "card.author.with-title",
  false,
)

export const cardNewContentAtom = atomWithStorage("card.new.content", "")

export const refetchCardPageAtom = atomWithStorage("card.page.refetch", false)
export const refetchCardSummaryAtom = atomWithStorage(
  "card.summary.refetch",
  false,
)
export const refetchCardStatAtom = atomWithStorage("card.stat.refetch", false)
export const refetchCardCommentsAtom = atomWithStorage(
  "card.comments.refetch",
  false,
)
export const cardFetchEngineAtom = atomWithStorage<FetchEngine>(
  "card.fetch-engine",
  "fastapi",
)

export const cardMdWithImgAtom = atomWithStorage("card.md-with-img", false)

///////////////////////////////
// derived
//////////////////////////////

export const cardUserAtom = atom<IUserBasic>((get) => ({
  id: get(cardUserIdAtom),
  name: get(cardUserNameAtom),
  avatar: get(cardUserAvatarAtom),
}))

export const cardOssIdAtom = atom<string | null>((get) => {
  const card = get(cardAtom)
  return getCardUrl(
    !card ? undefined : { type: card.platformType, id: card.platformId },
  )
})

export const cardGenOptionsAtom = atom<ICardGenOptions>((get) => ({
  fetchEngine: get(cardFetchEngineAtom),
  mdWithImg: get(cardMdWithImgAtom),
  refetchPage: get(refetchCardPageAtom),
  refetchSummary: get(refetchCardSummaryAtom),
  refetchStat: get(refetchCardStatAtom),
  refetchComments: get(refetchCardCommentsAtom),
}))

export const summaryAtom = atom<ISummaryParsed>((get) => {
  const card = get(cardAtom)
  return parseSummary(JSON.stringify(card?.contentSummary))
})

export const cardInputValidAtom = atom((get) => {
  const v = get(cardInputAtom)
  const p = parseJS<ICardDetail>(v)
  return !!p
})
