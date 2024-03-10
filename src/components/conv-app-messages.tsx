import { useEffect, useRef } from "react"
import { useSoftKeyboardOn } from "../hooks/use-soft-keyboard-on"
import { IMessageInChat } from "../schema/message"
import { ConvAppMessage } from "./conv-app-message"

export const ConvAppMessages = ({
  appId,
  logo,
  context,
}: {
  appId: string
  logo: string | null
  context: IMessageInChat[]
}) => {
  const scroll = () => {
    refScroll.current?.scrollIntoView({ behavior: "auto" })
  }

  const refScroll = useRef<HTMLDivElement>(null)
  useEffect(() => {
    scroll()
  }, [context])

  const softKeyboardOn = useSoftKeyboardOn()
  useEffect(() => {
    scroll()
  }, [softKeyboardOn])

  return (
    <div className={"flex flex-col"}>
      {context.map((m, index) => (
        <ConvAppMessage m={m} logo={logo} key={index} />
      ))}

      <div ref={refScroll} />
    </div>
  )
}
