import { InputWithEnter } from "@cs-magic/common/deps/ui/components/input"
import { useDraftSession } from "@cs-magic/common/deps/hooks/use-user-draft-session"

export const UserInputName = ({
  onEnter,
}: {
  onEnter?: (s: string) => void
}) => {
  const { draft, value, setDraft } = useDraftSession("name")

  return (
    <InputWithEnter
      className={"text-center text-2xl font-black text-primary-foreground"}
      autoFocus
      value={draft ?? ""}
      onChange={(event) => {
        setDraft(event.currentTarget.value)
      }}
      onEnter={(s) => {
        if (onEnter) onEnter(s)
      }}
    />
  )
}
