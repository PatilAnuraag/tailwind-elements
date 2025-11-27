
import React, { useState } from 'react';
import { 
  User, Bell, Layout, Moon, Sun, ArrowRight, Layers, Palette, Accessibility, 
  Code, Eye, FileText, List, Box, Tag, AlertCircle, CheckSquare, AlignLeft, Image as ImageIcon,
  Sliders, RadioReceiver, ToggleLeft, MessageSquare, Divide, Loader2, PenTool, BookOpen, MousePointerClick, Plus, Info, AlertTriangle, X, Check, Search, Settings, MoreHorizontal, CreditCard, Star, ChevronRight, Upload, Calendar, Mail, Lock
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

// --- Code Snippets & Details ---

const BUTTON_CODE = `
{/* Variants */}
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="soft">Soft</Button>
<Button variant="shine">Shine</Button>
<Button variant="neobrutalism">Neobrutalism</Button>

{/* Shapes */}
<Button shape="pill">Pill</Button>
<Button shape="square">Square</Button>

{/* Sizes */}
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Plus /></Button>

{/* States */}
<Button isLoading>Loading</Button>
<Button disabled>Disabled</Button>
`.trim();

const BUTTON_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>Displays a button or a component that looks like a button.</p>
    <ul className="list-disc pl-4 space-y-1">
      <li><strong>Variants:</strong> default, secondary, outline, ghost, link, soft, shine, link-hover, gradient, neobrutalism.</li>
      <li><strong>Sizes:</strong> default, sm, lg, icon.</li>
      <li><strong>Shapes:</strong> default, pill, square.</li>
    </ul>
  </div>
);

const INPUT_CODE = `
<Input placeholder="Default input" />
<Input variant="filled" placeholder="Filled input" />
<Input variant="flushed" placeholder="Flushed input" />
<Input variant="material" placeholder="Material input" />
<Input variant="neobrutalism" placeholder="Neobrutalism" />
<Input disabled placeholder="Disabled" />
<MaskedInput mask="(999) 999-9999" placeholder="Phone Mask" />
`.trim();

const INPUT_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>Displays a form input field or a component that looks like an input field.</p>
    <ul className="list-disc pl-4 space-y-1">
      <li><strong>Variants:</strong> default, filled, flushed, material, neobrutalism.</li>
      <li><strong>MaskedInput:</strong> Built-in pattern enforcement for phones, dates, etc.</li>
    </ul>
  </div>
);

const TEXTAREA_CODE = `
<Textarea placeholder="Type your message here." />
<Textarea variant="filled" placeholder="Filled textarea" />
<Textarea variant="neobrutalism" placeholder="Neobrutalism" />
`.trim();

const TEXTAREA_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>Displays a form textarea field.</p>
    <ul className="list-disc pl-4 space-y-1">
      <li><strong>Variants:</strong> default, filled, flushed, neobrutalism.</li>
    </ul>
  </div>
);

const CHECKBOX_CODE = `
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>

<Checkbox variant="circle" />
<Checkbox variant="neobrutalism" checked />
`.trim();

const CHECKBOX_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>A control that allows the user to toggle between checked and not checked.</p>
    <ul className="list-disc pl-4 space-y-1">
      <li><strong>Variants:</strong> default, circle, neobrutalism.</li>
    </ul>
  </div>
);

const RADIO_CODE = `
<RadioGroup defaultValue="comfortable">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
</RadioGroup>

<RadioGroup variant="neobrutalism" defaultValue="a">
  <RadioGroupItem value="a" />
</RadioGroup>
`.trim();

const RADIO_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.</p>
    <ul className="list-disc pl-4 space-y-1">
      <li><strong>Variants:</strong> default, neobrutalism.</li>
    </ul>
  </div>
);

const SWITCH_CODE = `
<Switch />
<Switch defaultChecked />
<Switch variant="neobrutalism" />
<Switch size="sm" />
<Switch disabled />
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
<Slider defaultValue={[50]} max={100} step={1} />
<Slider defaultValue={[25, 75]} max={100} step={1} />
<Slider variant="thick" defaultValue={[50]} />
<Slider variant="neobrutalism" defaultValue={[60]} />
`.trim();

const SLIDER_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>An input where the user selects a value from within a given range.</p>
    <ul className="list-disc pl-4 space-y-1">
      <li><strong>Variants:</strong> default, thick, neobrutalism.</li>
      <li><strong>Features:</strong> Multi-thumb (range) support.</li>
    </ul>
  </div>
);

const TOGGLE_CODE = `
<Toggle aria-label="Toggle italic">
  <Bold className="h-4 w-4" />
</Toggle>
<Toggle variant="outline" aria-label="Toggle italic">
  <Italic className="h-4 w-4" />
</Toggle>
<Toggle variant="neobrutalism" aria-label="Toggle italic">
  <Underline className="h-4 w-4" />
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
    </SelectGroup>
  </SelectContent>
</Select>
`.trim();

const SELECT_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>Displays a list of options for the user to pick from—triggered by a button.</p>
    <ul className="list-disc pl-4 space-y-1">
      <li><strong>Variants:</strong> Default, Neobrutalism.</li>
    </ul>
  </div>
);

const DIALOG_CODE = `
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent variant="neobrutalism">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Make changes to your profile here.</DialogDescription>
    </DialogHeader>
    {/* Content */}
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
`.trim();

const DIALOG_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>A window overlaid on either the primary window or another dialog window.</p>
    <ul className="list-disc pl-4 space-y-1">
      <li><strong>Variants:</strong> Default, Neobrutalism.</li>
    </ul>
  </div>
);

const SHEET_CODE = `
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Sheet</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
    </SheetHeader>
    {/* Content */}
  </SheetContent>
</Sheet>
`.trim();

const SHEET_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>Extends the Dialog component to display content that complements the main screen.</p>
    <ul className="list-disc pl-4 space-y-1">
      <li><strong>Sides:</strong> top, bottom, left, right.</li>
      <li><strong>Variants:</strong> Default, Neobrutalism.</li>
    </ul>
  </div>
);

const POPOVER_CODE = `
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    Place content for the popover here.
  </PopoverContent>
</Popover>
`.trim();

const POPOVER_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>Displays rich content in a portal, triggered by a button.</p>
    <ul className="list-disc pl-4 space-y-1">
      <li><strong>Variants:</strong> Default, Neobrutalism.</li>
    </ul>
  </div>
);

const TOOLTIP_CODE = `
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline" size="icon"><Plus /></Button>
    </TooltipTrigger>
    <TooltipContent side="top" variant="neobrutalism">
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
`.trim();

const TOOLTIP_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.</p>
    <ul className="list-disc pl-4 space-y-1">
      <li><strong>Variants:</strong> Default, Neobrutalism.</li>
    </ul>
  </div>
);

const CARD_CODE = `
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

<Card variant="neobrutalism">...</Card>
<Card variant="ghost">...</Card>
<Card variant="interactive">...</Card>
<Card variant="brutal">...</Card>
`.trim();

const CARD_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>Displays a card with header, content, and footer.</p>
    <ul className="list-disc pl-4 space-y-1">
      <li><strong>Variants:</strong> default, ghost, interactive, neobrutalism, brutal.</li>
    </ul>
  </div>
);

const TABS_CODE = `
<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">...</TabsContent>
  <TabsContent value="password">...</TabsContent>
</Tabs>

{/* Variants: default, underline, pills, enclosed, neobrutalism */}
<Tabs variant="pills">...</Tabs>
`.trim();

const TABS_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>A set of layered sections of content—known as tab panels—that are displayed one at a time.</p>
    <ul className="list-disc pl-4 space-y-1">
      <li><strong>Variants:</strong> default, underline, pills, enclosed, neobrutalism.</li>
    </ul>
  </div>
);

const ACCORDION_CODE = `
<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>
</Accordion>

<Accordion variant="boxed">...</Accordion>
<Accordion variant="neobrutalism">...</Accordion>
`.trim();

const ACCORDION_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>A vertically stacked set of interactive headings that each reveal a section of content.</p>
    <ul className="list-disc pl-4 space-y-1">
      <li><strong>Variants:</strong> default, boxed, neobrutalism.</li>
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
      <BreadcrumbPage>Components</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
`.trim();

const BREADCRUMB_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>Displays the path to the current resource using a hierarchy of links.</p>
  </div>
);

const ALERT_CODE = `
<Alert variant="default">...</Alert>
<Alert variant="destructive">...</Alert>
<Alert variant="success">...</Alert>
<Alert variant="warning">...</Alert>
<Alert variant="info">...</Alert>
<Alert variant="left-accent">...</Alert>
<Alert variant="neobrutalism">...</Alert>
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
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="neutral">Neutral</Badge>
<Badge variant="neobrutalism">Neo</Badge>
<Badge variant="soft-success">Soft</Badge>
`.trim();

const BADGE_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>Displays a badge or a component that looks like a badge.</p>
    <ul className="list-disc pl-4 space-y-1">
      <li><strong>Variants:</strong> default, secondary, destructive, outline, neutral, success, warning, info, soft variants, neobrutalism.</li>
    </ul>
  </div>
);

const AVATAR_CODE = `
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

<Avatar shape="square">...</Avatar>

<AvatarGroup>
  <Avatar>...</Avatar>
  <Avatar>...</Avatar>
</AvatarGroup>
`.trim();

const AVATAR_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>An image element with a fallback for representing the user.</p>
    <ul className="list-disc pl-4 space-y-1">
      <li><strong>Shapes:</strong> circle, square.</li>
    </ul>
  </div>
);

const PROGRESS_CODE = `
<Progress value={33} />
<Progress value={66} variant="neobrutalism" />
`.trim();

const PROGRESS_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>Displays an indicator showing the completion progress of a task.</p>
  </div>
);

const SKELETON_CODE = `
<Skeleton className="h-4 w-[250px]" />
<Skeleton variant="circle" className="h-12 w-12" />
`.trim();

const SKELETON_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>Use to show a placeholder while content is loading.</p>
  </div>
);

const SEPARATOR_CODE = `
<Separator />
<Separator variant="dashed" />
<Separator variant="dotted" />
`.trim();

const SEPARATOR_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>Visually or semantically separates content.</p>
    <ul className="list-disc pl-4 space-y-1">
      <li><strong>Variants:</strong> default, dashed, dotted.</li>
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
          <Badge variant="neutral" className="mb-4">v1.0.0 Now Available</Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Accessible UI Components <br className="hidden md:block"/> for <span className="text-primary">React & Tailwind</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
             A high-quality, copy-paste component library. Built with pure React hooks and standard DOM elements. Zero heavy dependencies.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="default" className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">Documentation</Button>
          </div>
        </section>

        {/* Components Grid */}
        <div className="grid grid-cols-1 gap-12">
          
          <ComponentShowcase title="Buttons" code={BUTTON_CODE} details={BUTTON_DETAILS}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="soft">Soft</Button>
              <Button variant="shine">Shine</Button>
              <Button variant="link-hover">Link Hover</Button>
              <Button variant="neobrutalism">Neobrutalism</Button>
              <div className="w-full"></div>
              <Button shape="pill">Pill</Button>
              <Button shape="square">Square</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button size="icon"><Plus className="h-4 w-4" /></Button>
              <div className="w-full"></div>
              <Button isLoading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
          </ComponentShowcase>

          <ComponentShowcase title="Input" code={INPUT_CODE} details={INPUT_DETAILS}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
               <Input placeholder="Default input" />
               <Input variant="filled" placeholder="Filled input" />
               <Input variant="flushed" placeholder="Flushed input" />
               <Input variant="material" placeholder="Material input" />
               <Input variant="neobrutalism" placeholder="Neobrutalism" />
               <Input disabled placeholder="Disabled input" />
               <MaskedInput mask="(999) 999-9999" placeholder="Phone (555) 555-5555" />
            </div>
          </ComponentShowcase>

          <ComponentShowcase title="Textarea" code={TEXTAREA_CODE} details={TEXTAREA_DETAILS}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
               <Textarea placeholder="Default textarea" />
               <Textarea variant="filled" placeholder="Filled textarea" />
               <Textarea variant="neobrutalism" placeholder="Neobrutalism" />
            </div>
          </ComponentShowcase>

          <ComponentShowcase title="Select" code={SELECT_CODE} details={SELECT_DETAILS}>
            <div className="flex flex-wrap gap-4 w-full max-w-2xl">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Default Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]" variant="neobrutalism">
                  <SelectValue placeholder="Neobrutalism" />
                </SelectTrigger>
                <SelectContent variant="neobrutalism">
                  <SelectGroup>
                    <SelectLabel>Tech</SelectLabel>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="vue">Vue</SelectItem>
                    <SelectItem value="angular">Angular</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
               <Select disabled>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Disabled" />
                </SelectTrigger>
              </Select>
            </div>
          </ComponentShowcase>

          <ComponentShowcase title="Checkbox" code={CHECKBOX_CODE} details={CHECKBOX_DETAILS}>
             <div className="flex flex-wrap gap-8">
                <div className="flex items-center space-x-2">
                   <Checkbox id="c1" />
                   <Label htmlFor="c1">Default</Label>
                </div>
                <div className="flex items-center space-x-2">
                   <Checkbox id="c2" variant="circle" defaultChecked />
                   <Label htmlFor="c2">Circle</Label>
                </div>
                <div className="flex items-center space-x-2">
                   <Checkbox id="c3" variant="neobrutalism" />
                   <Label htmlFor="c3">Neobrutalism</Label>
                </div>
                <div className="flex items-center space-x-2">
                   <Checkbox id="c4" disabled defaultChecked />
                   <Label htmlFor="c4">Disabled</Label>
                </div>
             </div>
          </ComponentShowcase>

          <ComponentShowcase title="Radio Group" code={RADIO_CODE} details={RADIO_DETAILS}>
            <div className="flex flex-wrap gap-12">
               <RadioGroup defaultValue="1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="r1" />
                    <Label htmlFor="r1">Default 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="r2" />
                    <Label htmlFor="r2">Default 2</Label>
                  </div>
               </RadioGroup>

               <RadioGroup defaultValue="a" variant="neobrutalism">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="a" id="ra" />
                    <Label htmlFor="ra">Option A</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="b" id="rb" />
                    <Label htmlFor="rb">Option B</Label>
                  </div>
               </RadioGroup>
            </div>
          </ComponentShowcase>

          <ComponentShowcase title="Switch" code={SWITCH_CODE} details={SWITCH_DETAILS}>
             <div className="flex flex-wrap items-center gap-8">
                <div className="flex items-center gap-2">
                   <Switch id="s1" />
                   <Label htmlFor="s1">Default</Label>
                </div>
                <div className="flex items-center gap-2">
                   <Switch id="s2" defaultChecked />
                   <Label htmlFor="s2">Checked</Label>
                </div>
                <div className="flex items-center gap-2">
                   <Switch id="s3" variant="neobrutalism" defaultChecked />
                   <Label htmlFor="s3">Neobrutalism</Label>
                </div>
                <div className="flex items-center gap-2">
                   <Switch id="s4" size="sm" />
                   <Label htmlFor="s4">Small</Label>
                </div>
             </div>
          </ComponentShowcase>

          <ComponentShowcase title="Slider" code={SLIDER_CODE} details={SLIDER_DETAILS}>
             <div className="flex flex-col gap-6 w-full max-w-md">
                <div className="space-y-2">
                   <Label>Default</Label>
                   <Slider defaultValue={[50]} max={100} step={1} />
                </div>
                <div className="space-y-2">
                   <Label>Range</Label>
                   <Slider defaultValue={[20, 80]} max={100} step={1} />
                </div>
                <div className="space-y-2">
                   <Label>Thick</Label>
                   <Slider defaultValue={[60]} max={100} step={1} variant="thick" />
                </div>
                <div className="space-y-2">
                   <Label>Neobrutalism</Label>
                   <Slider defaultValue={[40]} max={100} step={1} variant="neobrutalism" />
                </div>
             </div>
          </ComponentShowcase>

          <ComponentShowcase title="Toggle" code={TOGGLE_CODE} details={TOGGLE_DETAILS}>
             <div className="flex gap-4">
                <Toggle aria-label="Toggle bold">
                   <div className="font-bold">B</div>
                </Toggle>
                <Toggle variant="outline" aria-label="Toggle italic">
                   <div className="italic">I</div>
                </Toggle>
                <Toggle variant="neobrutalism" aria-label="Toggle underline">
                   <div className="underline">U</div>
                </Toggle>
                <Toggle size="sm" aria-label="Small">
                   <div className="text-xs">S</div>
                </Toggle>
             </div>
          </ComponentShowcase>

          <ComponentShowcase title="Dialog" code={DIALOG_CODE} details={DIALOG_DETAILS}>
              <div className="flex gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Default Dialog</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>Make changes to your profile here.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue="Pedro Duarte" />
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="neobrutalism">Neobrutalism</Button>
                  </DialogTrigger>
                  <DialogContent variant="neobrutalism" className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Neobrutalism</DialogTitle>
                      <DialogDescription>Hard shadows and borders.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                       <p>This dialog has a distinct style.</p>
                    </div>
                    <DialogFooter>
                      <Button variant="neobrutalism">Okay</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
          </ComponentShowcase>

          <ComponentShowcase title="Sheet" code={SHEET_CODE} details={SHEET_DETAILS}>
             <div className="flex gap-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Right Sheet</Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <div className="py-4">Content goes here</div>
                  </SheetContent>
                </Sheet>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Left Sheet</Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Sidebar</SheetTitle>
                    </SheetHeader>
                    <div className="py-4">Content goes here</div>
                  </SheetContent>
                </Sheet>
                 <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="neobrutalism">Neobrutalism</Button>
                  </SheetTrigger>
                  <SheetContent side="right" variant="neobrutalism">
                    <SheetHeader>
                      <SheetTitle>Neobrutalism</SheetTitle>
                    </SheetHeader>
                    <div className="py-4">Content goes here</div>
                  </SheetContent>
                </Sheet>
             </div>
          </ComponentShowcase>

          <ComponentShowcase title="Popover" code={POPOVER_CODE} details={POPOVER_DETAILS}>
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
                    <div className="grid gap-2">
                      <Label htmlFor="width">Width</Label>
                      <Input id="width" defaultValue="100%" className="h-8" />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
          </ComponentShowcase>

          <ComponentShowcase title="Tooltip" code={TOOLTIP_CODE} details={TOOLTIP_DETAILS}>
            <div className="flex gap-4">
               <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon"><Info className="h-5 w-5" /></Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Default Tooltip</p>
                    </TooltipContent>
                  </Tooltip>
               </TooltipProvider>

               <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="neobrutalism" size="sm">Hover Me</Button>
                    </TooltipTrigger>
                    <TooltipContent variant="neobrutalism">
                      <p>Neobrutalism</p>
                    </TooltipContent>
                  </Tooltip>
               </TooltipProvider>
            </div>
          </ComponentShowcase>

          <ComponentShowcase title="Card" code={CARD_CODE} details={CARD_DETAILS}>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <Card>
                    <CardHeader>
                      <CardTitle>Default</CardTitle>
                      <CardDescription>Standard card style.</CardDescription>
                    </CardHeader>
                    <CardContent>Content area.</CardContent>
                 </Card>
                 
                 <Card variant="neobrutalism">
                    <CardHeader>
                      <CardTitle>Neobrutalism</CardTitle>
                    </CardHeader>
                    <CardContent>Bold borders.</CardContent>
                 </Card>

                 <Card variant="brutal">
                    <CardHeader>
                      <CardTitle className="text-white">Brutal</CardTitle>
                    </CardHeader>
                    <CardContent className="text-white">Solid color blocks.</CardContent>
                 </Card>

                 <Card variant="ghost">
                    <CardHeader>
                      <CardTitle>Ghost</CardTitle>
                    </CardHeader>
                    <CardContent>No border, subtle background.</CardContent>
                 </Card>

                 <Card variant="interactive">
                    <CardHeader>
                      <CardTitle>Interactive</CardTitle>
                    </CardHeader>
                    <CardContent>Hover effects enabled.</CardContent>
                 </Card>
             </div>
          </ComponentShowcase>

          <ComponentShowcase title="Tabs" code={TABS_CODE} details={TABS_DETAILS}>
             <div className="flex flex-col gap-8 w-full max-w-md">
                <Tabs defaultValue="a">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="a">Account</TabsTrigger>
                    <TabsTrigger value="b">Password</TabsTrigger>
                  </TabsList>
                  <TabsContent value="a" className="p-4 border rounded-md mt-2">Account Content</TabsContent>
                  <TabsContent value="b" className="p-4 border rounded-md mt-2">Password Content</TabsContent>
                </Tabs>

                <Tabs defaultValue="a" variant="underline">
                  <TabsList className="w-full">
                    <TabsTrigger value="a">Underline</TabsTrigger>
                    <TabsTrigger value="b">Style</TabsTrigger>
                  </TabsList>
                </Tabs>

                <Tabs defaultValue="a" variant="pills">
                  <TabsList>
                    <TabsTrigger value="a">Pills</TabsTrigger>
                    <TabsTrigger value="b">Style</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <Tabs defaultValue="a" variant="enclosed">
                   <TabsList>
                    <TabsTrigger value="a">Enclosed</TabsTrigger>
                    <TabsTrigger value="b">Style</TabsTrigger>
                   </TabsList>
                   <TabsContent value="a">Enclosed Content</TabsContent>
                </Tabs>
             </div>
          </ComponentShowcase>

          <ComponentShowcase title="Accordion" code={ACCORDION_CODE} details={ACCORDION_DETAILS}>
             <div className="w-full max-w-md space-y-6">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Default Accordion</AccordionTrigger>
                    <AccordionContent>Content goes here.</AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible variant="boxed">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Boxed Variant</AccordionTrigger>
                    <AccordionContent>Content goes here.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Another Item</AccordionTrigger>
                    <AccordionContent>Content goes here.</AccordionContent>
                  </AccordionItem>
                </Accordion>

                 <Accordion type="single" collapsible variant="neobrutalism">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Neobrutalism</AccordionTrigger>
                    <AccordionContent>Content goes here.</AccordionContent>
                  </AccordionItem>
                </Accordion>
             </div>
          </ComponentShowcase>

          <ComponentShowcase title="Breadcrumb" code={BREADCRUMB_CODE} details={BREADCRUMB_DETAILS}>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Components</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
          </ComponentShowcase>

          <ComponentShowcase title="Alert" code={ALERT_CODE} details={ALERT_DETAILS}>
             <div className="grid gap-4 w-full max-w-2xl">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Default</AlertTitle>
                  <AlertDescription>Standard info alert.</AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Destructive</AlertTitle>
                  <AlertDescription>Critical error occurred.</AlertDescription>
                </Alert>
                <Alert variant="success">
                  <Check className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>Operation completed successfully.</AlertDescription>
                </Alert>
                 <Alert variant="warning">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>Action requires attention.</AlertDescription>
                </Alert>
                <Alert variant="left-accent">
                   <Info className="h-4 w-4" />
                   <AlertTitle>Left Accent</AlertTitle>
                   <AlertDescription>Styled with a left border.</AlertDescription>
                </Alert>
             </div>
          </ComponentShowcase>

          <ComponentShowcase title="Badge" code={BADGE_CODE} details={BADGE_DETAILS}>
             <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="neutral">Neutral</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="neobrutalism">Neo</Badge>
             </div>
             <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="soft-success">Soft Success</Badge>
                <Badge variant="soft-warning">Soft Warning</Badge>
                <Badge variant="soft-info">Soft Info</Badge>
                <Badge variant="soft-destructive">Soft Destructive</Badge>
             </div>
          </ComponentShowcase>

          <ComponentShowcase title="Avatar" code={AVATAR_CODE} details={AVATAR_DETAILS}>
             <div className="flex items-center gap-8">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar shape="square">
                   <AvatarImage src="https://github.com/vercel.png" />
                   <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <AvatarGroup>
                   <Avatar><AvatarFallback>A</AvatarFallback></Avatar>
                   <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
                   <Avatar><AvatarFallback>+2</AvatarFallback></Avatar>
                </AvatarGroup>
             </div>
          </ComponentShowcase>

          <ComponentShowcase title="Progress" code={PROGRESS_CODE} details={PROGRESS_DETAILS}>
             <div className="flex flex-col gap-6 w-full max-w-md">
                <Progress value={33} />
                <Progress value={66} variant="neobrutalism" />
             </div>
          </ComponentShowcase>

          <ComponentShowcase title="Skeleton" code={SKELETON_CODE} details={SKELETON_DETAILS}>
             <div className="flex items-center space-x-4">
                <Skeleton variant="circle" className="h-12 w-12" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
             </div>
          </ComponentShowcase>

          <ComponentShowcase title="Separator" code={SEPARATOR_CODE} details={SEPARATOR_DETAILS}>
             <div className="w-full max-w-md space-y-4">
                <div className="text-sm font-medium">Standard</div>
                <Separator />
                <div className="text-sm font-medium">Dashed</div>
                <Separator variant="dashed" />
                <div className="text-sm font-medium">Dotted</div>
                <Separator variant="dotted" />
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
