
import React, { useState } from 'react';
import { 
  User, Bell, Layout, Moon, Sun, ArrowRight, Layers, Palette, Accessibility, 
  Code, Eye, FileText, List, Box, Tag, AlertCircle, CheckSquare, AlignLeft, Image as ImageIcon,
  Sliders, RadioReceiver, ToggleLeft, MessageSquare, Divide, Loader2, PenTool, BookOpen, MousePointerClick, Plus, Info, AlertTriangle, X, Check, Search, Settings, MoreHorizontal, CreditCard, Star, ChevronRight, Upload, Calendar, Mail, Lock, Bold, Italic, Underline, Home
} from 'lucide-react';
import { Button } from './components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Switch } from "./components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardImage } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion";
import { Badge } from "./components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage, AvatarGroup } from "./components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { Textarea } from "./components/ui/textarea";
import { Checkbox } from "./components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Slider } from "./components/ui/slider";
import { Toggle } from "./components/ui/toggle";
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover";
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./components/ui/form";
import { Separator } from "./components/ui/separator";
import { Skeleton } from "./components/ui/skeleton";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "./components/ui/sheet";
import { Progress } from "./components/ui/progress";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./components/ui/tooltip";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "./components/ui/breadcrumb";
import { MaskedInput } from "./components/ui/masked-input";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "./components/ui/input-otp";
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from "./components/ui/table";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./components/ui/use-toast";
import { cn } from "./lib/utils";

// --- Components ---

const ComponentShowcase = ({ title, children, code, details }: { title: string, children?: React.ReactNode, code: string, details: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "details">("preview");

  return (
    <Card className="overflow-hidden border shadow-sm">
      <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
        <h3 className="font-semibold tracking-tight text-sm uppercase text-muted-foreground">{title}</h3>
        <div className="flex items-center gap-1 rounded-lg border bg-background p-1 shadow-sm">
          <button 
            onClick={() => setActiveTab("preview")}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1 text-xs font-medium transition-colors",
              activeTab === "preview" ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-muted text-muted-foreground"
            )}
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </button>
          <button 
            onClick={() => setActiveTab("code")}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1 text-xs font-medium transition-colors",
              activeTab === "code" ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-muted text-muted-foreground"
            )}
          >
            <Code className="h-3.5 w-3.5" />
            Code
          </button>
          <button 
            onClick={() => setActiveTab("details")}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1 text-xs font-medium transition-colors",
              activeTab === "details" ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-muted text-muted-foreground"
            )}
          >
            <BookOpen className="h-3.5 w-3.5" />
            Details
          </button>
        </div>
      </div>
      <div className="p-6 min-h-[200px] flex flex-col">
        {activeTab === "preview" && (
          <div className="flex-1 w-full flex flex-col justify-center items-center gap-8">
            {children}
          </div>
        )}
        {activeTab === "code" && (
          <div className="relative overflow-hidden rounded-md bg-zinc-950 p-4 text-white">
            <pre className="overflow-x-auto font-mono text-xs leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        )}
        {activeTab === "details" && (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {details}
          </div>
        )}
      </div>
    </Card>
  )
}

const ToastDemo = () => {
    const { toast } = useToast()
    return (
        <div className="flex flex-wrap gap-4">
            <Button onClick={() => toast({ title: "Scheduled: Catch up", description: "Friday, February 10, 2024 at 5:57 PM" })}>
                Default Toast
            </Button>
            <Button variant="destructive" onClick={() => toast({ variant: "destructive", title: "Uh oh! Something went wrong.", description: "There was a problem with your request." })}>
                Destructive
            </Button>
            <Button variant="neobrutalism" onClick={() => toast({ variant: "neobrutalism", title: "Neobrutalism", description: "This is a raw toast style." })}>
                Neobrutalism
            </Button>
        </div>
    )
}

// --- Code Snippets ---

const BUTTON_CODE = `
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="soft">Soft</Button>
<Button variant="shine">Shine</Button>
<Button variant="neobrutalism">Neobrutalism</Button>
`.trim();

const BUTTON_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>Displays a button or a component that looks like a button.</p>
    <ul className="list-disc pl-4 space-y-1">
      <li><strong>Variants:</strong> default, secondary, destructive, outline, ghost, link, soft, shine, neobrutalism.</li>
      <li><strong>Sizes:</strong> default, sm, lg, icon.</li>
      <li><strong>Shapes:</strong> default, pill, square.</li>
      <li><strong>Props:</strong> isLoading, asChild.</li>
    </ul>
  </div>
);

const ALERT_CODE = `
<Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>You can add components to your app using the cli.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
</Alert>
`.trim();

const ALERT_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>Displays a callout for user attention.</p>
    <ul className="list-disc pl-4 space-y-1">
      <li><strong>Variants:</strong> default, destructive, success, warning, info, left-accent, neobrutalism.</li>
    </ul>
  </div>
);

const BADGE_CODE = `
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="success">Success</Badge>
`.trim();

const BADGE_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>Displays a badge or a component that looks like a badge.</p>
    <ul className="list-disc pl-4 space-y-1">
      <li><strong>Variants:</strong> default, secondary, outline, destructive, success, warning, info, neutral, soft-*.</li>
    </ul>
  </div>
);

const CARD_CODE = `
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
`.trim();

const CARD_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>Displays a card with header, content, and footer.</p>
    <ul className="list-disc pl-4 space-y-1">
      <li><strong>Variants:</strong> default, ghost, interactive, neobrutalism, brutal.</li>
    </ul>
  </div>
);

const INPUT_CODE = `
<Input type="email" placeholder="Email" />
<Input disabled type="email" placeholder="Email" />
<Input variant="filled" placeholder="Filled" />
<Input variant="flushed" placeholder="Flushed" />
<Input variant="material" placeholder="Material" />
`.trim();

const INPUT_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>Displays a form input field or a component that looks like an input field.</p>
    <ul className="list-disc pl-4 space-y-1">
        <li><strong>Variants:</strong> default, filled, flushed, material, neobrutalism.</li>
    </ul>
  </div>
);

const SELECT_CODE = `
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="blueberry">Blueberry</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
`.trim();

const SELECT_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>Displays a list of options for the user to pick from—triggered by a button.</p>
    <ul className="list-disc pl-4 space-y-1">
        <li>Fully accessible with keyboard navigation.</li>
        <li><strong>Variants:</strong> default, neobrutalism.</li>
    </ul>
  </div>
);

const CHECKBOX_CODE = `
<div className="items-top flex space-x-2">
  <Checkbox id="terms1" />
  <div className="grid gap-1.5 leading-none">
    <label
      htmlFor="terms1"
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      Accept terms and conditions
    </label>
    <p className="text-sm text-muted-foreground">
      You agree to our Terms of Service and Privacy Policy.
    </p>
  </div>
</div>
`.trim();

const CHECKBOX_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>A control that allows the user to toggle between checked and not checked.</p>
    <ul className="list-disc pl-4 space-y-1">
        <li><strong>Variants:</strong> default, circle, neobrutalism.</li>
    </ul>
  </div>
);

const SWITCH_CODE = `
<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>
`.trim();

const SWITCH_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>A control that allows the user to toggle between checked and not checked.</p>
    <ul className="list-disc pl-4 space-y-1">
        <li><strong>Variants:</strong> default, neobrutalism.</li>
        <li><strong>Sizes:</strong> default, sm.</li>
    </ul>
  </div>
);

const SLIDER_CODE = `
<Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" />
`.trim();

const SLIDER_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>An input where the user selects a value from within a given range.</p>
    <ul className="list-disc pl-4 space-y-1">
        <li>Supports single or multiple thumbs.</li>
        <li><strong>Variants:</strong> default, thick, neobrutalism.</li>
    </ul>
  </div>
);

const DIALOG_CODE = `
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button type="submit">Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
`.trim();

const DIALOG_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.</p>
    <ul className="list-disc pl-4 space-y-1">
        <li>Manages focus trap and body scroll locking.</li>
        <li><strong>Variants:</strong> default, neobrutalism.</li>
    </ul>
  </div>
);

const SHEET_CODE = `
<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    {/* Content */}
    <SheetFooter>
      <Button type="submit">Save changes</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
`.trim();

const SHEET_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>Extends the Dialog component to display content that complements the main screen.</p>
    <ul className="list-disc pl-4 space-y-1">
        <li><strong>Sides:</strong> top, right, bottom, left.</li>
        <li><strong>Variants:</strong> default, neobrutalism.</li>
    </ul>
  </div>
);

const ACCORDION_CODE = `
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>
`.trim();

const ACCORDION_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>A vertically stacked set of interactive headings that each reveal a section of content.</p>
    <ul className="list-disc pl-4 space-y-1">
        <li><strong>Variants:</strong> default, boxed, neobrutalism.</li>
    </ul>
  </div>
);

const TABS_CODE = `
<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>
`.trim();

const TABS_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>A set of layered sections of content—known as tab panels—that are displayed one at a time.</p>
    <ul className="list-disc pl-4 space-y-1">
        <li><strong>Variants:</strong> default, underline, pills, enclosed, neobrutalism.</li>
    </ul>
  </div>
);

const TOOLTIP_CODE = `
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Hover</Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Add to library</p>
  </TooltipContent>
</Tooltip>
`.trim();

const TOOLTIP_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.</p>
</div>
);

const TOAST_CODE = `
const { toast } = useToast()

<Button onClick={() => toast({
  title: "Success",
  description: "Your changes have been saved."
})}>
  Show Toast
</Button>
`.trim();

const TOAST_DETAILS = (
    <div className="space-y-4 text-sm text-muted-foreground">
        <p>A succinct message that is displayed temporarily.</p>
        <ul className="list-disc pl-4 space-y-1">
            <li><strong>Hook:</strong> useToast() for triggering.</li>
            <li><strong>Variants:</strong> default, destructive, success, neobrutalism.</li>
        </ul>
    </div>
);

const OTP_CODE = `
<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
`.trim();

const OTP_DETAILS = (
    <div className="space-y-4 text-sm text-muted-foreground">
        <p>Accessible one-time password input component.</p>
    </div>
);

const TABLE_CODE = `
<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV-001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
`.trim();

const TABLE_DETAILS = (
    <div className="space-y-4 text-sm text-muted-foreground">
        <p>A responsive table component.</p>
        <ul className="list-disc pl-4 space-y-1">
            <li><strong>Variants:</strong> default, neobrutalism (grid lines).</li>
        </ul>
    </div>
);

const SKELETON_CODE = `
<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>
`.trim();

const SKELETON_DETAILS = (
    <div className="space-y-4 text-sm text-muted-foreground">
        <p>Use to show a placeholder while content is loading.</p>
    </div>
);

const SEPARATOR_CODE = `
<div>
  <div className="space-y-1">
    <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
    <p className="text-sm text-muted-foreground">
      An open-source UI component library.
    </p>
  </div>
  <Separator className="my-4" />
  <div className="flex h-5 items-center space-x-4 text-sm">
    <div>Blog</div>
    <Separator orientation="vertical" />
    <div>Docs</div>
    <Separator orientation="vertical" />
    <div>Source</div>
  </div>
</div>
`.trim();

const SEPARATOR_DETAILS = (
    <div className="space-y-4 text-sm text-muted-foreground">
        <p>Visually or semantically separates content.</p>
        <ul className="list-disc pl-4 space-y-1">
            <li><strong>Variants:</strong> default, dashed, dotted.</li>
        </ul>
    </div>
);

const BREADCRUMB_CODE = `
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
`.trim();

const BREADCRUMB_DETAILS = (
    <div className="space-y-4 text-sm text-muted-foreground">
        <p>Displays the path to the current resource using a hierarchy of links.</p>
    </div>
);

const PROGRESS_CODE = `
<Progress value={33} />
`.trim();

const PROGRESS_DETAILS = (
    <div className="space-y-4 text-sm text-muted-foreground">
        <p>Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.</p>
        <ul className="list-disc pl-4 space-y-1">
            <li><strong>Variants:</strong> default, neobrutalism.</li>
        </ul>
    </div>
);

const POPOVER_CODE = `
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Dimensions</h4>
        <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
      </div>
    </div>
  </PopoverContent>
</Popover>
`.trim();

const POPOVER_DETAILS = (
    <div className="space-y-4 text-sm text-muted-foreground">
        <p>Displays rich content in a portal, triggered by a button.</p>
        <ul className="list-disc pl-4 space-y-1">
            <li><strong>Variants:</strong> default, neobrutalism.</li>
        </ul>
    </div>
);

const TOGGLE_CODE = `
<Toggle aria-label="Toggle italic">
  <Italic className="h-4 w-4" />
</Toggle>
`.trim();

const TOGGLE_DETAILS = (
    <div className="space-y-4 text-sm text-muted-foreground">
        <p>A two-state button that can be either on or off.</p>
        <ul className="list-disc pl-4 space-y-1">
            <li><strong>Variants:</strong> default, outline, neobrutalism.</li>
        </ul>
    </div>
);

const AVATAR_CODE = `
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
`.trim();

const AVATAR_DETAILS = (
    <div className="space-y-4 text-sm text-muted-foreground">
        <p>An image element with a fallback for representing the user.</p>
        <ul className="list-disc pl-4 space-y-1">
            <li><strong>Shapes:</strong> circle, square.</li>
        </ul>
    </div>
);

const RADIOGROUP_CODE = `
<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>
`.trim();

const RADIOGROUP_DETAILS = (
    <div className="space-y-4 text-sm text-muted-foreground">
        <p>A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.</p>
        <ul className="list-disc pl-4 space-y-1">
            <li><strong>Variants:</strong> default, neobrutalism.</li>
        </ul>
    </div>
);

const TEXTAREA_CODE = `
<Textarea placeholder="Type your message here." />
`.trim();

const TEXTAREA_DETAILS = (
    <div className="space-y-4 text-sm text-muted-foreground">
        <p>Displays a form textarea or a component that looks like a textarea.</p>
        <ul className="list-disc pl-4 space-y-1">
            <li><strong>Variants:</strong> default, filled, flushed, neobrutalism.</li>
        </ul>
    </div>
);

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300">
      <Toaster />
      
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-1 rounded">
              <Layers className="h-6 w-6" />
            </div>
            <span className="font-bold text-xl tracking-tight">Tailwind Elements</span>
          </div>
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
             </Button>
             <Button asChild variant="neobrutalism" size="sm">
                <a href="https://github.com/PatilAnuraag/tailwind-elements" target="_blank" rel="noreferrer">
                  GitHub
                </a>
             </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-16">
        
        {/* Hero */}
        <section className="text-center space-y-6 py-10">
          <Badge variant="neutral" className="mb-4">v1.1.0: Now with Toasts, Tables, OTP & More</Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Accessible UI Components <br className="hidden md:block"/> for <span className="text-primary">React & Tailwind</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
             A high-quality, copy-paste component library. Built with pure React hooks and standard DOM elements. Zero heavy dependencies.
          </p>
        </section>

        {/* Components Grid */}
        <div className="grid grid-cols-1 gap-16">
          
          <ComponentShowcase title="Buttons" code={BUTTON_CODE} details={BUTTON_DETAILS}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="soft">Soft</Button>
              <Button variant="shine">Shine</Button>
              <Button variant="neobrutalism">Neobrutalism</Button>
              <Button size="icon"><Plus className="h-4 w-4" /></Button>
              <Button shape="pill">Pill Shape</Button>
              <Button isLoading>Loading</Button>
            </div>
          </ComponentShowcase>

          <ComponentShowcase title="Alerts" code={ALERT_CODE} details={ALERT_DETAILS}>
            <div className="flex flex-col gap-4 w-full max-w-2xl">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>You can add components to your app using the cli.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
              </Alert>
              <Alert variant="success">
                <Check className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Your changes have been saved successfully.</AlertDescription>
              </Alert>
              <Alert variant="left-accent">
                <AlertTitle>Note</AlertTitle>
                <AlertDescription>This is a left-accented alert.</AlertDescription>
              </Alert>
            </div>
          </ComponentShowcase>

          <ComponentShowcase title="Badges" code={BADGE_CODE} details={BADGE_DETAILS}>
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="soft-warning">Soft Warning</Badge>
              <Badge variant="soft-info">Soft Info</Badge>
              <Badge variant="neobrutalism">Neobrutalism</Badge>
            </div>
          </ComponentShowcase>

          <ComponentShowcase title="Cards" code={CARD_CODE} details={CARD_DETAILS}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
              <Card>
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>Clean and simple.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Card content goes here.</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Action</Button>
                </CardFooter>
              </Card>
              
              <Card variant="neobrutalism">
                <CardHeader>
                  <CardTitle>Neobrutalism</CardTitle>
                  <CardDescription>Bold shadows and borders.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">High contrast design.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="neobrutalism" className="w-full">Action</Button>
                </CardFooter>
              </Card>
            </div>
          </ComponentShowcase>

          <ComponentShowcase title="Input & Textarea" code={INPUT_CODE} details={INPUT_DETAILS}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
                <div className="space-y-4">
                    <Label>Default Input</Label>
                    <Input placeholder="Email address" />
                </div>
                <div className="space-y-4">
                    <Label>Filled Input</Label>
                    <Input variant="filled" placeholder="Email address" />
                </div>
                <div className="space-y-4">
                    <Label>Material Input</Label>
                    <Input variant="material" placeholder="Email address" />
                </div>
                <div className="space-y-4">
                    <Label>Neobrutalism Input</Label>
                    <Input variant="neobrutalism" placeholder="Email address" />
                </div>
                <div className="space-y-4 md:col-span-2">
                    <Label>Masked Input (Phone)</Label>
                    <MaskedInput mask="(999) 999-9999" placeholder="(555) 555-5555" />
                </div>
                <div className="space-y-4 md:col-span-2">
                    <Label>Textarea</Label>
                    <Textarea placeholder="Type your message here." />
                </div>
            </div>
          </ComponentShowcase>

          <ComponentShowcase title="Select" code={SELECT_CODE} details={SELECT_DETAILS}>
            <div className="flex flex-wrap gap-8 w-full max-w-xl">
               <div className="flex-1 space-y-2">
                   <Label>Default</Label>
                   <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>North America</SelectLabel>
                          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                          <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                          <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                          <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
                          <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
               </div>
               <div className="flex-1 space-y-2">
                   <Label>Neobrutalism</Label>
                   <Select>
                      <SelectTrigger variant="neobrutalism">
                        <SelectValue placeholder="Select a timezone" />
                      </SelectTrigger>
                      <SelectContent variant="neobrutalism">
                        <SelectGroup>
                          <SelectLabel>North America</SelectLabel>
                          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                          <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                          <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
               </div>
            </div>
          </ComponentShowcase>

          <ComponentShowcase title="Switch & Toggle" code={SWITCH_CODE} details={SWITCH_DETAILS}>
             <div className="flex flex-wrap items-center justify-center gap-12">
                <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" />
                    <Label htmlFor="airplane-mode">Airplane Mode</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch variant="neobrutalism" id="neo-mode" />
                    <Label htmlFor="neo-mode">Neobrutalism</Label>
                </div>
                <div className="flex items-center gap-4">
                    <Toggle aria-label="Toggle italic">
                      <Bold className="h-4 w-4" />
                    </Toggle>
                    <Toggle variant="outline" aria-label="Toggle italic">
                      <Italic className="h-4 w-4" />
                    </Toggle>
                </div>
             </div>
          </ComponentShowcase>

          <ComponentShowcase title="Checkbox & Radio" code={CHECKBOX_CODE} details={CHECKBOX_DETAILS}>
             <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="space-y-4">
                    <h4 className="font-medium">Checkboxes</h4>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Accept terms and conditions
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox variant="circle" id="circle" />
                        <label htmlFor="circle" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Circle Checkbox
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox variant="neobrutalism" id="neo-check" />
                        <label htmlFor="neo-check" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Neobrutalism
                        </label>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <h4 className="font-medium">Radio Groups</h4>
                    <RadioGroup defaultValue="option-one">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label htmlFor="option-one">Option One</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">Option Two</Label>
                      </div>
                    </RadioGroup>
                </div>
             </div>
          </ComponentShowcase>

          <ComponentShowcase title="Slider" code={SLIDER_CODE} details={SLIDER_DETAILS}>
             <div className="w-full max-w-md space-y-8">
                <div className="space-y-2">
                    <Label>Default</Label>
                    <Slider defaultValue={[50]} max={100} step={1} />
                </div>
                <div className="space-y-2">
                    <Label>Range (Multi-thumb)</Label>
                    <Slider defaultValue={[25, 75]} max={100} step={1} />
                </div>
                <div className="space-y-2">
                    <Label>Neobrutalism</Label>
                    <Slider variant="neobrutalism" defaultValue={[60]} max={100} step={1} />
                </div>
             </div>
          </ComponentShowcase>

          <ComponentShowcase title="Tabs" code={TABS_CODE} details={TABS_DETAILS}>
             <Tabs defaultValue="account" className="w-[400px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>
                      Make changes to your account here. Click save when you're done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue="Pedro Duarte" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="password">
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password here. After saving, you'll be logged out.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="current">Current password</Label>
                      <Input id="current" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save password</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </ComponentShowcase>

          <ComponentShowcase title="Accordion" code={ACCORDION_CODE} details={ACCORDION_DETAILS}>
             <Accordion type="single" collapsible className="w-full max-w-md">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It's animated by default, but you can disable it if you
                  prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ComponentShowcase>

          <ComponentShowcase title="Dialog & Sheet" code={DIALOG_CODE} details={DIALOG_DETAILS}>
             <div className="flex gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Username
                        </Label>
                        <Input id="username" value="@peduarte" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Open Sheet</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Edit profile</SheetTitle>
                      <SheetDescription>
                        Make changes to your profile here. Click save when you're done.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Username
                        </Label>
                        <Input id="username" value="@peduarte" className="col-span-3" />
                      </div>
                    </div>
                    <SheetFooter>
                      <Button type="submit">Save changes</Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
             </div>
          </ComponentShowcase>

          <ComponentShowcase title="Popover & Tooltip" code={POPOVER_CODE} details={POPOVER_DETAILS}>
             <div className="flex gap-8 items-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">Open Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Dimensions</h4>
                        <p className="text-sm text-muted-foreground">
                          Set the dimensions for the layer.
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="width">Width</Label>
                          <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon"><Info className="h-5 w-5" /></Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add to library</p>
                      </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
             </div>
          </ComponentShowcase>

          <ComponentShowcase title="Breadcrumb" code={BREADCRUMB_CODE} details={BREADCRUMB_DETAILS}>
             <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </ComponentShowcase>

          <ComponentShowcase title="Avatar" code={AVATAR_CODE} details={AVATAR_DETAILS}>
             <div className="flex gap-4 items-center">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar shape="square">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <AvatarGroup>
                    <Avatar><AvatarImage src="https://github.com/shadcn.png" /></Avatar>
                    <Avatar><AvatarImage src="https://github.com/shadcn.png" /></Avatar>
                    <Avatar><AvatarFallback>+3</AvatarFallback></Avatar>
                </AvatarGroup>
             </div>
          </ComponentShowcase>

          <ComponentShowcase title="Progress & Skeleton" code={PROGRESS_CODE} details={PROGRESS_DETAILS}>
             <div className="w-full max-w-md space-y-8">
                <div className="space-y-2">
                    <Label>Progress</Label>
                    <Progress value={66} />
                </div>
                <div className="space-y-2">
                    <Label>Skeleton</Label>
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                </div>
             </div>
          </ComponentShowcase>

          <ComponentShowcase title="Separator" code={SEPARATOR_CODE} details={SEPARATOR_DETAILS}>
             <div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
                <p className="text-sm text-muted-foreground">
                  An open-source UI component library.
                </p>
              </div>
              <Separator className="my-4" />
              <div className="flex h-5 items-center space-x-4 text-sm">
                <div>Blog</div>
                <Separator orientation="vertical" />
                <div>Docs</div>
                <Separator orientation="vertical" />
                <div>Source</div>
              </div>
            </div>
          </ComponentShowcase>

          {/* New Components */}
          <ComponentShowcase title="Toast" code={TOAST_CODE} details={TOAST_DETAILS}>
             <ToastDemo />
          </ComponentShowcase>

          <ComponentShowcase title="Input OTP" code={OTP_CODE} details={OTP_DETAILS}>
             <div className="flex flex-col gap-6 items-center">
                 <div className="space-y-2 text-center">
                     <Label>Standard</Label>
                     <InputOTP maxLength={6}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                 </div>

                 <div className="space-y-2 text-center">
                     <Label>Neobrutalism</Label>
                     <InputOTP maxLength={4} variant="neobrutalism">
                        <InputOTPGroup>
                            <InputOTPSlot index={0} variant="neobrutalism" />
                            <InputOTPSlot index={1} variant="neobrutalism" />
                            <InputOTPSlot index={2} variant="neobrutalism" />
                            <InputOTPSlot index={3} variant="neobrutalism" />
                        </InputOTPGroup>
                    </InputOTP>
                 </div>
                 
                 <div className="space-y-2 text-center">
                     <Label>Separated</Label>
                     <InputOTP maxLength={4} variant="separated">
                        <InputOTPGroup>
                            <InputOTPSlot index={0} variant="separated" />
                            <InputOTPSlot index={1} variant="separated" />
                            <InputOTPSlot index={2} variant="separated" />
                            <InputOTPSlot index={3} variant="separated" />
                        </InputOTPGroup>
                    </InputOTP>
                 </div>
             </div>
          </ComponentShowcase>

          <ComponentShowcase title="Data Table" code={TABLE_CODE} details={TABLE_DETAILS}>
             <div className="w-full max-w-3xl">
                 <div className="mb-8">
                     <h4 className="mb-2 font-semibold">Default</h4>
                     <Table>
                      <TableCaption>A list of your recent invoices.</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Invoice</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">INV-001</TableCell>
                          <TableCell>Paid</TableCell>
                          <TableCell>Credit Card</TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">INV-002</TableCell>
                          <TableCell>Pending</TableCell>
                          <TableCell>PayPal</TableCell>
                          <TableCell className="text-right">$150.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                 </div>

                 <div>
                     <h4 className="mb-2 font-semibold">Neobrutalism</h4>
                     <Table variant="neobrutalism">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Keyboard</TableCell>
                          <TableCell>Electronics</TableCell>
                          <TableCell className="text-right">$99.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Mouse</TableCell>
                          <TableCell>Electronics</TableCell>
                          <TableCell className="text-right">$49.00</TableCell>
                        </TableRow>
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell colSpan={2}>Total</TableCell>
                          <TableCell className="text-right">$148.00</TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                 </div>
             </div>
          </ComponentShowcase>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/20">
         <div className="container mx-auto px-4 text-center text-muted-foreground">
            <p>&copy; 2024 Tailwind Elements. Built with pure React & Tailwind CSS.</p>
         </div>
      </footer>
    </div>
  );
}
