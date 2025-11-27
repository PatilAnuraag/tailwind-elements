import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const avatarVariants = cva(
  "relative flex h-10 w-10 shrink-0 overflow-hidden",
  {
    variants: {
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
      }
    },
    defaultVariants: {
      shape: "circle"
    }
  }
)

type AvatarProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof avatarVariants>

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, shape, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(avatarVariants({ shape, className }))}
      {...props}
    />
  )
)
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = "AvatarFallback"

const AvatarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex -space-x-4 overflow-hidden p-1", className)}
    {...props}
  >
    {children}
  </div>
))
AvatarGroup.displayName = "AvatarGroup"

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup }