import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const tableVariants = cva(
  "w-full caption-bottom text-sm",
  {
    variants: {
      variant: {
        default: "",
        neobrutalism: "border-2 border-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type TableProps = React.HTMLAttributes<HTMLTableElement> & VariantProps<typeof tableVariants>

const TableContext = React.createContext<{ variant?: "default" | "neobrutalism" }>({ variant: "default" })

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant, ...props }, ref) => (
    <TableContext.Provider value={{ variant: variant || "default" }}>
        <div className="relative w-full overflow-auto">
        <table
            ref={ref}
            className={cn(tableVariants({ variant, className }))}
            {...props}
        />
        </div>
    </TableContext.Provider>
  )
)
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
    const { variant } = React.useContext(TableContext)
    return (
        <thead ref={ref} className={cn("[&_tr]:border-b", variant === "neobrutalism" && "[&_tr]:border-2 [&_tr]:border-foreground bg-primary/20", className)} {...props} />
    )
})
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
    const { variant } = React.useContext(TableContext)
    return (
        <tfoot
            ref={ref}
            className={cn(
            "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
            variant === "neobrutalism" && "border-t-2 border-foreground bg-foreground text-background",
            className
            )}
            {...props}
        />
    )
})
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => {
    const { variant } = React.useContext(TableContext)
    return (
        <tr
            ref={ref}
            className={cn(
            "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
            variant === "neobrutalism" && "border-b-2 border-foreground hover:bg-primary/10",
            className
            )}
            {...props}
        />
    )
})
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
    const { variant } = React.useContext(TableContext)
    return (
        <th
            ref={ref}
            className={cn(
            "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
            variant === "neobrutalism" && "text-foreground border-r-2 border-foreground last:border-r-0 font-bold",
            className
            )}
            {...props}
        />
    )
})
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
    const { variant } = React.useContext(TableContext)
    return (
        <td
            ref={ref}
            className={cn(
            "p-4 align-middle [&:has([role=checkbox])]:pr-0",
            variant === "neobrutalism" && "border-r-2 border-foreground last:border-r-0",
            className
            )}
            {...props}
        />
    )
})
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}