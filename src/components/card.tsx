"use client"

import { forwardRef, HTMLAttributes } from "react"
import { cnPingFangFonts } from "../../packages/common-font"
import { cn } from "../../packages/common-ui-shadcn/utils"
import { CardHeader } from "./card-vidw-header"
import { CardContent } from "./card-view-content"
import { CardFooter } from "./card-view-footer"

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "corner-gradient w-full max-w-[375px]",
          cnPingFangFonts.className,
          className,
        )}
        {...props}
      >
        <CardHeader />
        <div className={"w-full grow gap-2 p-2 min-h-72"}>
          <CardContent />
        </div>
        <CardFooter />
      </div>
    )
  },
)
Card.displayName = "Card"
