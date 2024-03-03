"use client"
import { Sidebar } from "@/components/layout/sidebar"
import { Separator } from "../../../../packages/common/components/ui/separator"
import { PropsWithChildren, useEffect } from "react"
import { useAtom } from "jotai"
import { api } from "../../../../packages/common/lib/trpc/react"
import {
  convDetailAtom,
  convIdAtom,
  convsAtom,
  latestRequestAtom,
} from "@/store/conv.atom"
import { persistedAppsAtom } from "@/store/app.atom"
import { userQueryAtom } from "../../../../packages/common/store/user"
import { useQueryInChat } from "@/hooks/use-query-conv"

export default function ConversationLayout({ children }: PropsWithChildren) {
  const { data: convsInDB } = api.queryLLM.listConv.useQuery()

  const [convs, setConvs] = useAtom(convsAtom)
  const [conv, setConv] = useAtom(convDetailAtom)
  const [convId] = useAtom(convIdAtom)
  const [latestRequest] = useAtom(latestRequestAtom)
  const [, setPersistedApps] = useAtom(persistedAppsAtom)
  const [query] = useAtom(userQueryAtom)

  const queryInChat = useQueryInChat()

  // 1. 获取列表数据
  useEffect(() => {
    if (convsInDB) setConvs(convsInDB)
  }, [convsInDB])

  // 2. 当 conv 更新后，用 conv 里的 config 覆盖本地的 config
  useEffect(() => {
    if (latestRequest?.responses)
      setPersistedApps(latestRequest.responses.map((r) => r.app))
  }, [latestRequest])

  // 3. 如果本地有conv，且有用户输入的话，则自动触发一次会话请求
  useEffect(() => {
    if (conv && query) queryInChat() // 用户带着问题来的
  }, [conv])

  // 4. 当离开会话的时候，置空
  useEffect(() => {
    return () => {
      setConv(null)
    }
  }, [])

  return (
    <div className={"w-full h-full overflow-hidden flex border-y"}>
      <Sidebar />

      <Separator orientation={"vertical"} />

      <div className={"grow overflow-hidden h-full"}>{children}</div>
    </div>
  )
}
