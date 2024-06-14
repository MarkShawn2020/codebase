import { Badge } from "@cs-magic/common/deps/ui-shadcn/components/ui/badge"
import { cn } from "@cs-magic/common/deps/ui-shadcn/utils"

export const Tags = ({ tags }: { tags: string[] | null | undefined }) => {
  if (!tags?.length) return null

  return (
    <div className={"flex flex-wrap items-center gap-0"}>
      {tags.slice(0, 3).map((tag) => (
        <Badge
          className={cn(
            "text-nowrap",
            "bg-transparent",
            "text-primary2/75",
            // "px-0"
            // "bg-muted"
          )}
          key={tag}
        >
          #{tag}
        </Badge>
      ))}
    </div>
  )
}
