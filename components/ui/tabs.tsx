import * as React from "react";
import { cn } from "../../lib/utils";

type TabsVariant = "default" | "underline" | "neobrutalism" | "pills" | "enclosed";

const TabsContext = React.createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant: TabsVariant;
} | null>(null);

const Tabs = ({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
  variant = "default",
  ...props
}: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
  className?: string;
  variant?: TabsVariant;
}) => {
  const [internalState, setInternalState] = React.useState(defaultValue || "");
  const isControlled = value !== undefined;
  const activeTab = isControlled ? value : internalState;
  const setActiveTab = (newValue: string) => {
    if (!isControlled) setInternalState(newValue);
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ activeTab: activeTab!, setActiveTab, variant: variant as TabsVariant }}>
      <div className={cn("", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const listRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => listRef.current!);

    const context = React.useContext(TabsContext);
    if (!context) throw new Error("TabsList must be used within Tabs");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const tabs = Array.from(listRef.current?.querySelectorAll('[role="tab"]:not([disabled])') || []);
        const index = tabs.indexOf(document.activeElement as Element);
        
        if (index === -1) return;

        let nextIndex = index;
        if (e.key === "ArrowRight") {
            nextIndex = index + 1 >= tabs.length ? 0 : index + 1;
        } else if (e.key === "ArrowLeft") {
            nextIndex = index - 1 < 0 ? tabs.length - 1 : index - 1;
        } else {
            return;
        }

        e.preventDefault();
        (tabs[nextIndex] as HTMLElement).focus();
        (tabs[nextIndex] as HTMLElement).click();
    };

    const variant = context.variant;

    return (
      <div
        ref={listRef}
        onKeyDown={handleKeyDown}
        className={cn(
          "inline-flex h-9 items-center justify-center p-1 text-muted-foreground",
          variant === "default" && "rounded-lg bg-muted",
          variant === "underline" && "justify-start border-b w-full rounded-none bg-transparent p-0",
          variant === "neobrutalism" && "bg-transparent border-2 border-foreground gap-2 p-2 h-auto",
          variant === "pills" && "bg-muted/50 rounded-full p-1 gap-1",
          variant === "enclosed" && "border rounded-t-lg border-b-0 bg-muted/20 p-0 h-auto justify-start",
          className
        )}
        {...props}
      />
    );
});
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
>(({ className, value, onClick, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");

  const isActive = context.activeTab === value;
  const variant = context.variant;

  return (
    <button
      ref={ref}
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? "active" : "inactive"}
      tabIndex={isActive ? 0 : -1}
      onClick={(e) => {
        context.setActiveTab(value);
        onClick?.(e);
      }}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        
        variant === "default" && "rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
        
        variant === "underline" && "rounded-none border-b-2 border-transparent data-[state=active]:text-foreground data-[state=active]:border-primary",
        
        variant === "neobrutalism" && "border-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-muted/20",

        variant === "pills" && "rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm px-4",

        variant === "enclosed" && "rounded-none border-r last:border-r-0 border-border/50 data-[state=active]:bg-background data-[state=active]:text-foreground first:rounded-tl-lg px-4 py-2 bg-transparent",

        className
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used within Tabs");

  if (context.activeTab !== value) return null;

  return (
    <div
      ref={ref}
      role="tabpanel"
      tabIndex={0}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 animate-fade-in",
        context.variant === "enclosed" && "border rounded-b-lg p-4 mt-0 bg-background",
        className
      )}
      {...props}
    />
  );
});
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };