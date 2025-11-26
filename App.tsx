import React, { useState } from 'react';
import { 
  User, Bell, Layout, Moon, Sun, ArrowRight, Layers, Palette, Accessibility, 
  Code, Eye, FileText, List, Box, Tag, AlertCircle, CheckSquare, AlignLeft, Image as ImageIcon,
  Sliders, RadioReceiver, ToggleLeft, MessageSquare, Divide, Loader2, PenTool, BookOpen, MousePointerClick, Plus, Info, AlertTriangle, X, Check, Search, Settings, MoreHorizontal, CreditCard, Star
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
import { cn } from "./lib/utils";

// --- Code Snippets ---

const BUTTON_CODE = `
<div className="flex flex-wrap items-center gap-4">
  {/* Styles */}
  <Button variant="default">Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
  <Button variant="soft">Soft</Button>

  {/* Special Effects */}
  <Button variant="shine">Shine</Button>
  <Button variant="link-hover">Link Hover</Button>
  <Button variant="gradient">Gradient</Button>
  <Button variant="neobrutalism">Neobrutalism</Button>

  {/* Shapes & Sizes */}
  <Button shape="pill">Pill</Button>
  <Button shape="square">Square</Button>
  <Button size="sm">Small</Button>
  <Button size="lg">Large</Button>
  <Button size="icon"><Plus /></Button>

  {/* States */}
  <Button isLoading>Loading</Button>
</div>
`.trim();

const BUTTON_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>
      Displays a button or a component that looks like a button.
    </p>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Visual Variants</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Shine:</strong> Animated glare effect on hover.</li>
        <li><strong>Link Hover:</strong> Text with animated underline.</li>
        <li><strong>Neobrutalism:</strong> High contrast, hard borders and shadow offset.</li>
        <li><strong>Soft:</strong> Subtle background tint.</li>
        <li><strong>Gradient:</strong> Multi-color gradient background.</li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Shapes</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Pill:</strong> Fully rounded sides.</li>
        <li><strong>Square:</strong> Sharp corners.</li>
      </ul>
    </div>
  </div>
);

const DIALOG_CODE = `
<Dialog>
  <DialogTrigger asChild>
    <Button variant="default">Open Dialog</Button>
  </DialogTrigger>
  {/* Variant can be default or neobrutalism */}
  <DialogContent variant="neobrutalism" className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      {/* Content */}
    </div>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
`.trim();

const DIALOG_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>
      A modal dialog that interrupts the user with important content and expects a response.
    </p>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Accessibility Features</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Focus Trap:</strong> Focus is trapped within the modal when open to prevent interaction with the background.</li>
        <li><strong>Scroll Lock:</strong> The body scroll is disabled to prevent scrolling background content.</li>
        <li><strong>Screen Readers:</strong> proper <code>role="dialog"</code> and <code>aria-modal="true"</code> attributes.</li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Variants</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Neobrutalism:</strong> Hard borders and hard shadow.</li>
      </ul>
    </div>
  </div>
);

const SWITCH_CODE = `
<div className="space-y-4">
  <div className="flex items-center space-x-2">
    {/* Controlled or Uncontrolled (defaultChecked) */}
    <Switch id="airplane-mode" defaultChecked />
    <Label htmlFor="airplane-mode">Airplane Mode</Label>
  </div>
  
  <div className="flex items-center space-x-2">
    <Switch id="neo-mode" variant="neobrutalism" />
    <Label htmlFor="neo-mode">Neobrutalism</Label>
  </div>

  <div className="flex items-center space-x-2">
    <Switch id="small-mode" size="sm" />
    <Label htmlFor="small-mode">Compact</Label>
  </div>

   <div className="flex items-center space-x-2">
    <Switch id="disabled-mode" disabled />
    <Label htmlFor="disabled-mode">Disabled</Label>
  </div>
</div>
`.trim();

const SWITCH_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>
      A control that allows the user to toggle between checked and not checked.
    </p>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Variants</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Neobrutalism:</strong> Rectangular track, square thumb, thick borders.</li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Key Features</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Uncontrolled:</strong> Works with <code>defaultChecked</code> - no React state needed.</li>
        <li><strong>Hidden Input:</strong> Renders a hidden input for form submission if <code>name</code> is provided.</li>
      </ul>
    </div>
  </div>
);

const SELECT_CODE = `
<div className="grid gap-4">
  {/* Default */}
  <Select>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Theme" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="light">Light</SelectItem>
      <SelectItem value="dark">Dark</SelectItem>
      <SelectItem value="system">System</SelectItem>
    </SelectContent>
  </Select>

  {/* Neobrutalism */}
  <Select>
    <SelectTrigger className="w-[180px]" variant="neobrutalism">
      <SelectValue placeholder="Style" />
    </SelectTrigger>
    <SelectContent variant="neobrutalism">
      <SelectItem value="bold">Bold</SelectItem>
      <SelectItem value="outline">Outline</SelectItem>
    </SelectContent>
  </Select>
  
  {/* Disabled */}
  <Select disabled>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Disabled" />
    </SelectTrigger>
  </Select>
</div>
`.trim();

const SELECT_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>
      Displays a list of options for the user to pick from—triggered by a button.
    </p>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Variants</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Neobrutalism:</strong> Hard borders and shadows for trigger and content.</li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Key Features</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Portal Rendering:</strong> Content renders outside the DOM hierarchy to avoid overflow clipping.</li>
        <li><strong>Keyboard Navigation:</strong> Full arrow key support for navigating options.</li>
      </ul>
    </div>
  </div>
);

const CARD_CODE = `
<div className="grid grid-cols-2 gap-4">
  {/* Default */}
  <Card>
    <CardHeader>
      <CardTitle>Default</CardTitle>
      <CardDescription>Standard border & shadow</CardDescription>
    </CardHeader>
    <CardContent>Content</CardContent>
  </Card>

  {/* Brutal */}
  <Card variant="brutal">
    <CardHeader>
      <CardTitle className="text-white">Brutal</CardTitle>
    </CardHeader>
    <CardContent>Solid bold style.</CardContent>
  </Card>

  {/* Ghost */}
  <Card variant="ghost">
     <CardContent className="pt-6">No border, subtle bg.</CardContent>
  </Card>

  {/* Neobrutalism */}
  <Card variant="neobrutalism">
     <CardContent className="pt-6">Hard borders.</CardContent>
  </Card>
</div>
`.trim();

const CARD_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>
      A container component that groups related content and actions.
    </p>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Variants</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Default:</strong> Standard border and shadow.</li>
        <li><strong>Brutal:</strong> Solid primary color background with high contrast text.</li>
        <li><strong>Neobrutalism:</strong> Hard black borders and offset shadows.</li>
        <li><strong>Interactive:</strong> Hover scale and shadow effect.</li>
        <li><strong>Ghost:</strong> No border, subtle background, flat look.</li>
      </ul>
    </div>
  </div>
);

const TABS_CODE = `
{/* Pills Variant */}
<Tabs defaultValue="account" className="w-[400px]" variant="pills">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">...</TabsContent>
</Tabs>

{/* Enclosed Variant */}
<Tabs defaultValue="account" className="w-[400px]" variant="enclosed">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">...</TabsContent>
</Tabs>

{/* Underline Variant */}
<Tabs defaultValue="account" className="w-[400px]" variant="underline">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
</Tabs>
`.trim();

const TABS_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>
      A set of layered sections of content—known as tab panels—that are displayed one at a time.
    </p>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Variants</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Pills:</strong> Segmented control style with rounded active state.</li>
        <li><strong>Enclosed:</strong> Tabs connected to a bordered content box.</li>
        <li><strong>Underline:</strong> Minimal border-bottom style.</li>
        <li><strong>Neobrutalism:</strong> Hard borders and active tab shadow.</li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Accessibility</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Keyboard Navigation:</strong> Arrow keys move focus between tabs automatically.</li>
        <li><strong>ARIA Roles:</strong> Uses <code>tablist</code>, <code>tab</code>, and <code>tabpanel</code>.</li>
      </ul>
    </div>
  </div>
);

const ACCORDION_CODE = `
{/* Default Single */}
<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>
</Accordion>

{/* Multiple Boxed */}
<Accordion type="multiple" variant="boxed" className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Item 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Item 2</AccordionTrigger>
    <AccordionContent>Content 2</AccordionContent>
  </AccordionItem>
</Accordion>
`.trim();

const ACCORDION_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>
      A vertically stacked set of interactive headings that each reveal a section of content.
    </p>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Variants</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Default:</strong> Clean look with bottom borders.</li>
        <li><strong>Boxed:</strong> Separate boxes for each item with rounded corners.</li>
        <li><strong>Neobrutalism:</strong> Thick borders and hard shadows.</li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Features</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Multiple:</strong> Set <code>type="multiple"</code> to allow multiple sections to be open at once.</li>
        <li><strong>Keyboard:</strong> Supports Up/Down arrow key navigation between headers.</li>
      </ul>
    </div>
  </div>
);

const BADGE_CODE = `
<div className="flex flex-wrap gap-2">
  <Badge variant="default">Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="neutral">Neutral</Badge>
  <Badge variant="outline">Outline</Badge>
  <Badge variant="neobrutalism">Neo</Badge>
  
  {/* Semantic Soft Badges */}
  <Badge variant="soft-success">Success</Badge>
  <Badge variant="soft-warning">Warning</Badge>
  <Badge variant="soft-destructive">Error</Badge>
  <Badge variant="soft-info">Info</Badge>
</div>
`.trim();

const BADGE_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>
      A small visual indicator for status, categories, or counts.
    </p>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Variants</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Neutral:</strong> Gray/Slate styling for general tags.</li>
        <li><strong>Soft:</strong> Pastel background with darker text (e.g., <code>soft-success</code>), popular in dashboards.</li>
        <li><strong>Neobrutalism:</strong> Square corners, thick border, shadow.</li>
      </ul>
    </div>
  </div>
);

const AVATAR_CODE = `
<div className="flex gap-4 items-end">
    {/* Circle (Default) */}
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    
    {/* Square */}
    <Avatar shape="square">
      <AvatarImage src="https://github.com/vercel.png" />
      <AvatarFallback>VC</AvatarFallback>
    </Avatar>
    
    {/* Group */}
    <AvatarGroup>
      <Avatar><AvatarImage src="https://i.pravatar.cc/150?u=1" /></Avatar>
      <Avatar><AvatarImage src="https://i.pravatar.cc/150?u=2" /></Avatar>
      <Avatar><AvatarFallback>+5</AvatarFallback></Avatar>
    </AvatarGroup>
</div>
`.trim();

const AVATAR_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>
      An image element with a fallback for representing the user.
    </p>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Features</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Shapes:</strong> Circle (default) or Square.</li>
        <li><strong>Fallback:</strong> Automatically shows the fallback text/icon if the image fails to load.</li>
        <li><strong>Group:</strong> Stacks avatars with negative margins.</li>
      </ul>
    </div>
  </div>
);

const ALERT_CODE = `
<div className="space-y-4">
  <Alert variant="left-accent">
    <Info className="h-4 w-4" />
    <AlertTitle>Note</AlertTitle>
    <AlertDescription>
      Left bordered accent style.
    </AlertDescription>
  </Alert>

  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      Something went wrong.
    </AlertDescription>
  </Alert>
  
  <Alert variant="warning">
    <AlertTriangle className="h-4 w-4" />
    <AlertTitle>Warning</AlertTitle>
    <AlertDescription>
      Your account is expiring soon.
    </AlertDescription>
  </Alert>
</div>
`.trim();

const ALERT_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>
      Displays a callout for user attention.
    </p>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Variants</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Left Accent:</strong> Adds a thick colored border to the left side.</li>
        <li><code>default</code>, <code>destructive</code>, <code>success</code>, <code>warning</code>, <code>info</code>.</li>
        <li><code>neobrutalism</code>.</li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Accessibility</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li>Uses <code>role="alert"</code> to announce urgent messages to screen readers immediately.</li>
      </ul>
    </div>
  </div>
);

const RADIO_CODE = `
<div className="flex flex-col gap-6">
  {/* Default Vertical */}
  <RadioGroup defaultValue="1">
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="1" id="r1" />
      <Label htmlFor="r1">Default</Label>
    </div>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="2" id="r2" />
      <Label htmlFor="r2">Comfortable</Label>
    </div>
  </RadioGroup>

  {/* Horizontal Neobrutalism */}
  <RadioGroup defaultValue="A" variant="neobrutalism" className="flex-row gap-4">
    <div className="flex items-center space-x-2 border-2 border-foreground p-2 bg-background">
      <RadioGroupItem value="A" id="ra" />
      <Label htmlFor="ra">Option A</Label>
    </div>
    <div className="flex items-center space-x-2 border-2 border-foreground p-2 bg-background">
      <RadioGroupItem value="B" id="rb" />
      <Label htmlFor="rb">Option B</Label>
    </div>
  </RadioGroup>
</div>
`.trim();

const RADIO_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>
      A set of checkable buttons where no more than one can be checked at a time.
    </p>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Variants</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Neobrutalism:</strong> Square indicators with hard shadow.</li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Accessibility</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li>Container uses <code>role="radiogroup"</code>.</li>
        <li>Items use <code>role="radio"</code>.</li>
      </ul>
    </div>
  </div>
);

const SLIDER_CODE = `
<div className="space-y-8">
  <div className="space-y-2">
    <Label>Default (50%)</Label>
    <Slider defaultValue={[50]} max={100} step={1} />
  </div>

  <div className="space-y-2">
    <Label>Range (20% - 80%)</Label>
    <Slider defaultValue={[20, 80]} max={100} step={1} />
  </div>

  <div className="space-y-2">
     <Label>Neobrutalism</Label>
     <Slider defaultValue={[60]} max={100} step={1} variant="neobrutalism" />
  </div>
  
  <div className="space-y-2">
     <Label>Thick Track</Label>
     <Slider defaultValue={[40]} max={100} step={1} variant="thick" />
  </div>
</div>
`.trim();

const SLIDER_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>
      An input where the user selects a value from within a given range.
    </p>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Interactions</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Range:</strong> Supports multiple handles for range selection.</li>
        <li><strong>Variants:</strong> Standard, Thick, Neobrutalism (Square handles).</li>
      </ul>
    </div>
  </div>
);

const TOGGLE_CODE = `
<div className="flex gap-4 items-center">
  <Toggle aria-label="Toggle italic">
    <AlignLeft className="h-4 w-4" />
  </Toggle>
  
  <Toggle variant="outline" aria-label="Toggle outline">
    <Star className="h-4 w-4" />
  </Toggle>
  
  <Toggle variant="neobrutalism" aria-label="Toggle neo">
     <div className="font-bold">Neo</div>
  </Toggle>
  
  <Toggle size="sm" aria-label="Small">
     <span className="text-xs">Small</span>
  </Toggle>
</div>
`.trim();

const TOGGLE_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>
      A two-state button that can be either on or off.
    </p>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Variants</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Neobrutalism:</strong> Square, hard shadow when active.</li>
      </ul>
    </div>
  </div>
);

const POPOVER_CODE = `
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Edit Settings</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      {/* Content */}
    </div>
  </PopoverContent>
</Popover>

<Popover>
  <PopoverTrigger asChild>
    <Button variant="neobrutalism">Neo Popover</Button>
  </PopoverTrigger>
  <PopoverContent variant="neobrutalism" className="w-80">
    {/* Content */}
  </PopoverContent>
</Popover>
`.trim();

const POPOVER_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>
      Displays rich content in a portal, triggered by a button.
    </p>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Variants</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Neobrutalism:</strong> Hard borders, no radius, shadow.</li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Features</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Click Outside:</strong> Automatically closes when clicking outside the content.</li>
        <li><strong>Portal:</strong> Renders directly into the body to ensure it floats above other content.</li>
      </ul>
    </div>
  </div>
);

const COMPREHENSIVE_FORM_CODE = `
<div className="space-y-6">
  <div className="grid grid-cols-2 gap-4">
    <FormItem>
      <FormLabel>Default Input</FormLabel>
      <FormControl>
        <Input placeholder="John Doe" />
      </FormControl>
    </FormItem>
    <FormItem>
       <FormLabel>Material Style</FormLabel>
       <FormControl>
         <Input placeholder="Bottom border only" variant="material" />
       </FormControl>
    </FormItem>
  </div>
  
  <FormItem>
      <FormLabel>Neobrutalism</FormLabel>
      <FormControl>
        <Input placeholder="Hard borders" variant="neobrutalism" />
      </FormControl>
  </FormItem>

  <FormItem>
    <FormLabel>Bio (Filled)</FormLabel>
    <FormControl>
      <Textarea placeholder="Tell us more..." variant="filled" />
    </FormControl>
  </FormItem>

  <div className="grid grid-cols-2 gap-4">
      <div className="flex items-center space-x-2 border p-4 rounded-md">
        <Checkbox id="terms" variant="circle" />
        <Label htmlFor="terms">Accept terms</Label>
      </div>
      <div className="flex items-center space-x-2 border-2 border-foreground p-4 bg-white dark:bg-black">
        <Checkbox id="marketing" variant="neobrutalism" />
        <Label htmlFor="marketing">Marketing emails</Label>
      </div>
  </div>
</div>
`.trim();

const COMPREHENSIVE_FORM_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>
      A complete suite of form components including structural wrappers, inputs, textareas, and checkboxes.
    </p>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Input Variants</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Default:</strong> Standard bordered input.</li>
        <li><strong>Filled:</strong> Gray background, no border.</li>
        <li><strong>Flushed:</strong> Underline only (classic style).</li>
        <li><strong>Material:</strong> Bottom border with animation support.</li>
        <li><strong>Neobrutalism:</strong> Hard borders and shadow offset.</li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Automatic Accessibility</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Layout Wrappers:</strong> <code>FormItem</code>, <code>FormLabel</code>, and <code>FormControl</code> handle ID generation and linking (e.g., <code>for/id</code>, <code>aria-describedby</code>) automatically.</li>
      </ul>
    </div>
  </div>
);

const SEPARATOR_CODE = `
<div className="w-full max-w-[300px] border p-4 rounded-lg bg-card text-card-foreground">
    <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Settings</h4>
        <p className="text-sm text-muted-foreground">Manage your preferences.</p>
    </div>
    <Separator className="my-4" />
    <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Profile</div>
        <Separator orientation="vertical" />
        <div>Account</div>
        <Separator orientation="vertical" variant="dotted" />
        <div>Billing</div>
    </div>
    <Separator className="my-4" variant="dashed" />
    <Button size="sm" variant="ghost" className="w-full">Save Changes</Button>
</div>
`.trim();

const SEPARATOR_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>
      Visually or semantically separates content.
    </p>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Variants</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Default:</strong> Solid line.</li>
        <li><strong>Dashed:</strong> Dashed line style.</li>
        <li><strong>Dotted:</strong> Dotted line style.</li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Accessibility</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li>Uses <code>role="separator"</code> for semantic separation.</li>
        <li>Supports <code>decorative</code> prop to remove from accessibility tree (role="none").</li>
      </ul>
    </div>
  </div>
);

const SKELETON_CODE = `
<div className="flex items-start space-x-4">
  <Skeleton variant="circle" className="h-10 w-10 shrink-0" />
  <div className="space-y-2 w-full">
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-32 w-full rounded-md" /> {/* Simulating image/content */}
    <div className="flex gap-2 pt-2">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-12" />
    </div>
  </div>
</div>
`.trim();

const SKELETON_DETAILS = (
  <div className="space-y-4 text-sm text-muted-foreground">
    <p>
      Use to show a placeholder while content is loading.
    </p>
    <div>
      <h4 className="font-semibold text-foreground mb-1">Features</h4>
      <ul className="list-disc pl-4 space-y-1">
        <li><strong>Variants:</strong> Default (rounded), Circle (fully rounded).</li>
        <li><strong>Animation:</strong> Subtle pulse animation to indicate loading state.</li>
      </ul>
    </div>
  </div>
);

// --- Components ---

function ComponentShowcase({ 
  title, 
  icon: Icon, 
  description, 
  code, 
  children,
  details,
  className
}: { 
  title: string, 
  icon: any, 
  description: string, 
  code: string, 
  children?: React.ReactNode,
  details?: React.ReactNode,
  className?: string
}) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'details'>('preview');

  return (
    <div className={cn("border rounded-xl bg-card text-card-foreground shadow-sm flex flex-col group", className)}>
       {/* Header */}
       <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 pb-4 p-6 border-b bg-muted/20 rounded-t-xl">
         <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-background border shadow-sm shrink-0">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{description}</p>
            </div>
         </div>
         <div className="flex items-center bg-secondary/50 p-1 rounded-md border border-border/50 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('preview')}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm transition-all", 
                activeTab === 'preview' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
            <button
              onClick={() => setActiveTab('code')}
               className={cn(
                 "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm transition-all", 
                 activeTab === 'code' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
               )}
            >
              <Code className="w-3.5 h-3.5" />
              Code
            </button>
            <button
              onClick={() => setActiveTab('details')}
               className={cn(
                 "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm transition-all", 
                 activeTab === 'details' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
               )}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Details
            </button>
         </div>
       </div>

       {/* Content */}
       <div className="flex-1 relative">
         {activeTab === 'preview' && (
           <div className="p-6 min-h-[350px] flex flex-col items-center justify-center gap-6 rounded-b-xl animate-fade-in relative overflow-hidden group/preview">
             {/* Dynamic Background for Theme Visibility */}
             <div className="absolute inset-0 -z-10 bg-slate-50 dark:bg-zinc-950 transition-colors duration-500">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute left-0 top-0 -ml-[20%] -mt-[20%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 dark:bg-violet-600/30 blur-[120px] animate-pulse" />
                <div className="absolute right-0 bottom-0 -mr-[20%] -mb-[20%] h-[500px] w-[500px] rounded-full bg-sky-500/10 dark:bg-cyan-600/30 blur-[120px] animate-pulse" />
             </div>
             
             <div className="w-full flex flex-col items-center justify-center gap-6 z-10">
                {children}
             </div>
           </div>
         )}
         
         {activeTab === 'code' && (
           <div className="bg-muted/30 rounded-b-xl overflow-hidden min-h-[350px] flex flex-col animate-fade-in relative group/code">
             <div className="p-4 overflow-x-auto flex-1 text-xs">
                <pre className="font-mono text-muted-foreground leading-relaxed">
                    <code>{code}</code>
                </pre>
             </div>
           </div>
         )}

         {activeTab === 'details' && (
           <div className="bg-background rounded-b-xl overflow-hidden min-h-[350px] p-6 animate-fade-in">
             <div className="prose prose-sm dark:prose-invert max-w-none">
                {details || <p className="text-muted-foreground italic">No additional details provided.</p>}
             </div>
           </div>
         )}
       </div>
    </div>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-background text-foreground flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="h-6 w-6 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
              <Layers className="h-4 w-4" />
            </div>
            <span>React + Tailwind UI</span>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 lg:py-32">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
              v1.5.0: Complete Design System
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Accessible components.<br />
              <span className="text-primary">Styled with Tailwind.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A high-quality component showcase powered by pure React and Tailwind CSS. 
              Featuring modern design trends like Neobrutalism across all components.
            </p>
            <div className="flex gap-4 pt-4">
              <Button size="lg" className="gap-2" variant="gradient" shape="pill">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="neobrutalism" onClick={() => window.open('https://github.com/PatilAnuraag/tailwind-elements', '_blank')}>
                View Code
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="flex flex-col items-center text-center p-6 border rounded-lg bg-card/50">
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                <Accessibility className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Accessibility First</h3>
              <p className="text-muted-foreground">Follows WAI-ARIA standards. Screen reader ready and keyboard navigable.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border rounded-lg bg-card/50">
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                <Palette className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Modern Variants</h3>
              <p className="text-muted-foreground">Includes Neobrutalism and Soft UI variants out of the box.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border rounded-lg bg-card/50">
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Zero Dependencies</h3>
              <p className="text-muted-foreground">Built with standard React hooks and DOM elements. No heavy 3rd party component libraries.</p>
            </div>
          </div>

          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Component Library</h2>
            <p className="text-muted-foreground">Interact with the components below or view the source code.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            
            {/* Button Card */}
             <ComponentShowcase 
              title="Button" 
              icon={MousePointerClick} 
              description="Interactive element for actions."
              code={BUTTON_CODE}
              details={BUTTON_DETAILS}
              className="lg:col-span-2 xl:col-span-3"
            >
              <div className="flex flex-col gap-6 w-full items-center">
                {/* Standard Variants */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button variant="default">Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                </div>
                <Separator className="w-1/2" />
                {/* Special Styles */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                   <Button variant="shine">Shine</Button>
                   <Button variant="link-hover">Hover Link</Button>
                   <Button variant="neobrutalism">Neobrutalism</Button>
                   <Button variant="gradient" shape="pill">Gradient</Button>
                   <Button variant="soft">Soft UI</Button>
                </div>
                <Separator className="w-1/2" />
                 {/* Sizes & Shapes */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon" variant="outline" aria-label="Add"><Plus className="h-4 w-4" /></Button>
                    <Button shape="pill" variant="outline">Pill Shape</Button>
                    <Button shape="square" variant="outline">Square</Button>
                </div>
                 <Separator className="w-1/2" />
                 {/* States */}
                 <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button isLoading>Loading</Button>
                    <Button disabled>Disabled</Button>
                 </div>
              </div>
            </ComponentShowcase>

            {/* Modal Card */}
            <ComponentShowcase 
              title="Dialog" 
              icon={Layout} 
              description="Accessible modal dialog."
              code={DIALOG_CODE}
              details={DIALOG_DETAILS}
            >
              <div className="flex flex-col gap-4 w-full max-w-xs">
                <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="default" className="w-full">Open Default Dialog</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>Standard dialog style.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4"><p className="text-sm">Content goes here...</p></div>
                    <DialogFooter><Button>Save</Button></DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="neobrutalism" className="w-full">Open Neobrutalism</Button>
                    </DialogTrigger>
                    <DialogContent variant="neobrutalism" className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Neobrutalism</DialogTitle>
                        <DialogDescription>Hard shadows and borders.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4"><p className="text-sm">Content goes here...</p></div>
                    <DialogFooter><Button variant="neobrutalism">Save</Button></DialogFooter>
                    </DialogContent>
                </Dialog>

                 <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="w-full">Open Destructive</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-destructive flex items-center gap-2"><AlertTriangle className="h-5 w-5"/> Delete Account</DialogTitle>
                        <DialogDescription>This action cannot be undone.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4"><p className="text-sm">Are you sure you want to delete your account?</p></div>
                    <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button variant="destructive">Delete</Button>
                    </DialogFooter>
                    </DialogContent>
                </Dialog>
              </div>
            </ComponentShowcase>

            {/* Switch Card */}
            <ComponentShowcase 
              title="Switch" 
              icon={Bell} 
              description="Toggles between checked and unchecked states."
              code={SWITCH_CODE}
              details={SWITCH_DETAILS}
            >
              <div className="w-full space-y-4 max-w-[280px]">
                <div className="flex items-center justify-between border p-3 rounded-lg">
                  <Label htmlFor="s1" className="text-foreground">Default</Label>
                  <Switch id="s1" defaultChecked />
                </div>
                <div className="flex items-center justify-between border-2 border-foreground p-3 bg-white dark:bg-black">
                  <Label htmlFor="s2" className="text-foreground font-bold">Neobrutalism</Label>
                  <Switch id="s2" variant="neobrutalism" defaultChecked />
                </div>
                 <div className="flex items-center justify-between border p-3 rounded-lg">
                  <Label htmlFor="s3" className="text-foreground">Small</Label>
                  <Switch id="s3" size="sm" />
                </div>
                 <div className="flex items-center justify-between border p-3 rounded-lg opacity-60">
                  <Label htmlFor="s4" className="text-foreground">Disabled</Label>
                  <Switch id="s4" disabled />
                </div>
              </div>
            </ComponentShowcase>

            {/* Select Card */}
            <ComponentShowcase 
              title="Select" 
              icon={User} 
              description="Select one option from a list."
              code={SELECT_CODE}
              details={SELECT_DETAILS}
            >
                <div className="w-full space-y-4 max-w-[280px]">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Mode</SelectLabel>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                   <Select>
                    <SelectTrigger className="w-full" variant="neobrutalism">
                      <SelectValue placeholder="Neobrutalism" />
                    </SelectTrigger>
                    <SelectContent variant="neobrutalism">
                      <SelectGroup>
                        <SelectItem value="neo1">Option 1</SelectItem>
                        <SelectItem value="neo2">Option 2</SelectItem>
                        <SelectItem value="neo3">Option 3</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                   <Select disabled>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Disabled" />
                    </SelectTrigger>
                  </Select>
                </div>
            </ComponentShowcase>

             {/* Radio Group Card */}
             <ComponentShowcase
              title="Radio Group"
              icon={RadioReceiver}
              description="Select one item from a set."
              code={RADIO_CODE}
              details={RADIO_DETAILS}
            >
              <div className="flex flex-col gap-6 w-full max-w-[280px]">
                  <RadioGroup defaultValue="1">
                    <Label className="mb-2 block text-muted-foreground text-xs uppercase tracking-wider">Vertical Default</Label>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="rg1" />
                        <Label htmlFor="rg1" className="text-foreground">Option A</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2" id="rg2" />
                        <Label htmlFor="rg2" className="text-foreground">Option B</Label>
                    </div>
                     <div className="flex items-center space-x-2 opacity-50">
                        <RadioGroupItem value="3" id="rg3" disabled />
                        <Label htmlFor="rg3" className="text-foreground">Disabled</Label>
                    </div>
                  </RadioGroup>
                  
                  <Separator />

                   <RadioGroup defaultValue="1" variant="neobrutalism" className="flex flex-row gap-4">
                    <Label className="w-full block text-muted-foreground text-xs uppercase tracking-wider mb-2">Horizontal Neo</Label>
                    <div className="flex items-center space-x-2 border-2 border-foreground p-2 bg-background">
                        <RadioGroupItem value="1" id="rg-neo1" />
                        <Label htmlFor="rg-neo1" className="text-foreground">Yes</Label>
                    </div>
                     <div className="flex items-center space-x-2 border-2 border-foreground p-2 bg-background">
                        <RadioGroupItem value="2" id="rg-neo2" />
                        <Label htmlFor="rg-neo2" className="text-foreground">No</Label>
                    </div>
                  </RadioGroup>
              </div>
            </ComponentShowcase>

             {/* Slider Card */}
             <ComponentShowcase
              title="Slider"
              icon={Sliders}
              description="Select a value from a range."
              code={SLIDER_CODE}
              details={SLIDER_DETAILS}
            >
               <div className="w-full max-w-[280px] space-y-6 text-foreground">
                  <div className="space-y-2">
                      <div className="flex justify-between">
                         <Label>Default</Label>
                         <span className="text-xs text-muted-foreground">50%</span>
                      </div>
                      <Slider defaultValue={[50]} max={100} step={1} />
                  </div>

                  <div className="space-y-2">
                      <div className="flex justify-between">
                         <Label>Range</Label>
                         <span className="text-xs text-muted-foreground">20 - 80</span>
                      </div>
                      <Slider defaultValue={[20, 80]} max={100} step={1} />
                  </div>

                   <div className="space-y-2">
                       <Label>Thick Variant</Label>
                       <Slider defaultValue={[40]} max={100} step={1} variant="thick" />
                  </div>

                  <div className="space-y-2">
                       <Label>Neobrutalism</Label>
                       <Slider defaultValue={[75]} max={100} step={1} variant="neobrutalism" />
                  </div>
               </div>
            </ComponentShowcase>

            {/* Toggle Card */}
            <ComponentShowcase
              title="Toggle"
              icon={ToggleLeft}
              description="Two-state on/off button."
              code={TOGGLE_CODE}
              details={TOGGLE_DETAILS}
            >
              <div className="flex flex-col gap-4 items-center">
                 <div className="flex gap-4 items-center">
                    <Toggle aria-label="Toggle default">
                        <AlignLeft className="h-4 w-4" />
                    </Toggle>
                    <Toggle variant="outline" aria-label="Toggle outline">
                        <Star className="h-4 w-4" />
                    </Toggle>
                    <Toggle variant="neobrutalism" aria-label="Toggle neo">
                        <span className="font-bold text-xs">BOLD</span>
                    </Toggle>
                 </div>
                 <div className="flex gap-4 items-center">
                     <Toggle size="sm" variant="outline" aria-label="Small">
                        <span className="text-[10px]">Small</span>
                     </Toggle>
                     <Toggle size="lg" variant="outline" aria-label="Large">
                        <span className="text-sm">Large Toggle</span>
                     </Toggle>
                 </div>
              </div>
            </ComponentShowcase>

            {/* Form Building Card - Consolidated */}
             <ComponentShowcase
              title="Form Building"
              icon={PenTool}
              description="Comprehensive form construction with validation."
              code={COMPREHENSIVE_FORM_CODE}
              details={COMPREHENSIVE_FORM_DETAILS}
              className="lg:col-span-2"
            >
               <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-8 text-foreground">
                  {/* Column 1: Inputs */}
                  <div className="space-y-4">
                      <FormItem>
                        <FormLabel>Default Input</FormLabel>
                        <FormControl>
                          <Input placeholder="Standard Input" />
                        </FormControl>
                      </FormItem>

                      <FormItem>
                        <FormLabel>Material Style</FormLabel>
                        <FormControl>
                          <Input placeholder="Bottom border only" variant="material" />
                        </FormControl>
                      </FormItem>
                      
                       <FormItem>
                        <FormLabel>Neobrutalism</FormLabel>
                        <FormControl>
                          <Input placeholder="Hard borders" variant="neobrutalism" />
                        </FormControl>
                      </FormItem>

                      <FormItem>
                        <FormLabel>Disabled</FormLabel>
                        <FormControl>
                          <Input placeholder="Cannot type here" disabled />
                        </FormControl>
                      </FormItem>
                  </div>

                  {/* Column 2: Textarea & Checks */}
                  <div className="space-y-4">
                      <FormItem>
                        <FormLabel>Filled Textarea</FormLabel>
                        <FormControl>
                           <Textarea placeholder="Tell us more..." variant="filled" className="resize-none" rows={3} />
                        </FormControl>
                      </FormItem>

                       <FormItem>
                        <FormLabel>File Input</FormLabel>
                        <FormControl>
                           <Input type="file" />
                        </FormControl>
                      </FormItem>

                       <div className="pt-2 flex flex-col gap-3">
                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                id="terms" 
                                checked={termsAccepted}
                                onCheckedChange={setTermsAccepted}
                                variant="circle"
                                />
                                <Label htmlFor="terms" className="cursor-pointer" onClick={() => setTermsAccepted(!termsAccepted)}>
                                Accept terms (Circle)
                                </Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <Checkbox variant="neobrutalism" id="neo-check" />
                                <Label htmlFor="neo-check">Subscribe (Neo)</Label>
                            </div>
                       </div>
                  </div>
               </div>
            </ComponentShowcase>

            {/* Popover Card */}
            <ComponentShowcase
              title="Popover"
              icon={MessageSquare}
              description="Rich content in a portal."
              code={POPOVER_CODE}
              details={POPOVER_DETAILS}
            >
              <div className="flex flex-col gap-4 items-center">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">Open Settings</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">Dimensions</h4>
                                <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
                            </div>
                            <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="width">Width</Label>
                                    <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="height">Height</Label>
                                    <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="neobrutalism">Open Info</Button>
                    </PopoverTrigger>
                    <PopoverContent variant="neobrutalism" className="w-60">
                         <h4 className="font-bold border-b-2 border-foreground pb-2 mb-2">Neo Popover</h4>
                         <p className="text-sm">Hard borders and shadows. Great for high contrast themes.</p>
                    </PopoverContent>
                </Popover>
              </div>
            </ComponentShowcase>

            {/* Alert Card */}
            <ComponentShowcase
              title="Alert"
              icon={AlertCircle}
              description="Callout for user attention."
              code={ALERT_CODE}
              details={ALERT_DETAILS}
              className="lg:col-span-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <Alert variant="default">
                    <AlertTitle>Default Alert</AlertTitle>
                    <AlertDescription>Standard notification message.</AlertDescription>
                </Alert>

                <Alert variant="destructive">
                   <AlertCircle className="h-4 w-4" />
                   <AlertTitle>Error</AlertTitle>
                   <AlertDescription>Something went wrong.</AlertDescription>
                </Alert>

                <Alert variant="warning">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>Your account is expiring soon.</AlertDescription>
                </Alert>

                <Alert variant="success">
                  <CheckSquare className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>Operation completed successfully.</AlertDescription>
                </Alert>

                 <Alert variant="info">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Info</AlertTitle>
                  <AlertDescription>New features available.</AlertDescription>
                </Alert>

                <Alert variant="left-accent">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Left Accent</AlertTitle>
                    <AlertDescription>Highlighted side border.</AlertDescription>
                </Alert>
              </div>
            </ComponentShowcase>

            {/* Avatar & Badge Card */}
            <ComponentShowcase
              title="Avatar & Badge"
              icon={ImageIcon}
              description="Visual elements for status and users."
              code={AVATAR_CODE + '\n\n' + BADGE_CODE}
              details={
                <div className="space-y-4">
                   {AVATAR_DETAILS}
                   <Separator className="my-2"/>
                   {BADGE_DETAILS}
                </div>
              }
            >
               <div className="flex flex-col items-center gap-8 w-full">
                 <div className="flex flex-wrap gap-8 items-end justify-center">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-xs text-muted-foreground">Default</span>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-xs text-muted-foreground">Square</span>
                        <Avatar shape="square">
                            <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
                            <AvatarFallback>VC</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-xs text-muted-foreground">Group</span>
                        <AvatarGroup>
                            <Avatar>
                            <AvatarImage src="https://i.pravatar.cc/150?u=1" />
                            <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                            <Avatar>
                            <AvatarImage src="https://i.pravatar.cc/150?u=3" />
                            <AvatarFallback>B</AvatarFallback>
                            </Avatar>
                            <Avatar>
                            <AvatarFallback>+3</AvatarFallback>
                            </Avatar>
                        </AvatarGroup>
                    </div>
                 </div>
                 <Separator className="w-3/4" />
                 <div className="flex flex-col gap-3 items-center">
                    <div className="flex gap-2 flex-wrap justify-center">
                        <Badge variant="default">Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="outline" className="border-foreground/40">Outline</Badge>
                        <Badge variant="neutral">Neutral</Badge>
                        <Badge variant="neobrutalism">Neo</Badge>
                    </div>
                     <div className="flex gap-2 flex-wrap justify-center">
                        <Badge variant="soft-success">Success</Badge>
                        <Badge variant="soft-warning">Warning</Badge>
                        <Badge variant="soft-destructive">Error</Badge>
                        <Badge variant="soft-info">Info</Badge>
                    </div>
                 </div>
               </div>
            </ComponentShowcase>

             {/* Skeleton Card */}
             <ComponentShowcase
              title="Skeleton"
              icon={Loader2}
              description="Loading placeholder."
              code={SKELETON_CODE}
              details={SKELETON_DETAILS}
            >
               <div className="flex flex-col gap-6 w-full max-w-[320px]">
                  {/* List Item Skeleton */}
                  <div className="flex items-center space-x-4">
                    <Skeleton variant="circle" className="h-12 w-12 bg-black/10 dark:bg-white/20" />
                    <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full bg-black/10 dark:bg-white/20" />
                    <Skeleton className="h-4 w-[80%] bg-black/10 dark:bg-white/20" />
                    </div>
                  </div>

                  <Separator />

                  {/* Card Skeleton */}
                  <div className="space-y-3">
                     <Skeleton className="h-[125px] w-full rounded-xl bg-black/10 dark:bg-white/20" />
                     <div className="space-y-2">
                        <Skeleton className="h-4 w-full bg-black/10 dark:bg-white/20" />
                        <Skeleton className="h-4 w-[90%] bg-black/10 dark:bg-white/20" />
                     </div>
                  </div>
               </div>
            </ComponentShowcase>
            
            {/* Separator Card */}
            <ComponentShowcase
              title="Separator"
              icon={Divide}
              description="Visually or semantically separates content."
              code={SEPARATOR_CODE}
              details={SEPARATOR_DETAILS}
            >
               <div className="w-full max-w-[280px] text-foreground border rounded-md p-4 bg-card">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium leading-none">Settings</h4>
                  <p className="text-sm text-muted-foreground">
                    User preferences.
                  </p>
                </div>
                <Separator className="my-4" />
                <div className="flex h-5 items-center space-x-4 text-sm">
                  <div>Profile</div>
                  <Separator orientation="vertical" />
                  <div>Billing</div>
                  <Separator orientation="vertical" variant="dotted" />
                  <div>Team</div>
                </div>
                <Separator className="my-4" variant="dashed" />
                <div className="flex flex-col gap-2">
                    <div className="text-sm">Notifications</div>
                    <Separator variant="dotted" />
                    <div className="text-sm">Privacy</div>
                </div>
              </div>
            </ComponentShowcase>

            {/* Card Component */}
            <ComponentShowcase
              title="Card"
              icon={Box}
              description="Container for grouping content."
              code={CARD_CODE}
              details={CARD_DETAILS}
              className="lg:col-span-2 xl:col-span-2"
            >
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                   {/* Default Card */}
                   <Card>
                    <CardHeader>
                      <CardTitle>Default</CardTitle>
                      <CardDescription>Standard border</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">The most common card style used in dashboards.</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm">Action</Button>
                    </CardFooter>
                  </Card>
                   
                   {/* Brutal Card */}
                   <Card variant="brutal">
                    <CardHeader>
                      <CardTitle className="text-white">Brutal</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-primary-foreground/90">Bold solid color.</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="secondary" size="sm">Action</Button>
                    </CardFooter>
                  </Card>

                   {/* Neobrutalism Card */}
                   <Card variant="neobrutalism">
                    <CardHeader>
                      <CardTitle>Neobrutalism</CardTitle>
                      <CardDescription>Hard shadows</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">High contrast style with thick borders.</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="neobrutalism" size="sm">Action</Button>
                    </CardFooter>
                  </Card>

                   {/* Media Card */}
                   <Card className="overflow-hidden">
                       <CardImage src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80" alt="Coding" />
                       <CardHeader>
                           <CardTitle>Media Card</CardTitle>
                       </CardHeader>
                       <CardContent>
                           <p className="text-sm text-muted-foreground">Card with top image.</p>
                       </CardContent>
                   </Card>

                   {/* Ghost Card */}
                    <Card variant="ghost">
                    <CardHeader>
                      <CardTitle>Ghost</CardTitle>
                      <CardDescription>No borders</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Subtle background integration.</p>
                    </CardContent>
                  </Card>
               </div>
            </ComponentShowcase>

            {/* Tabs Component */}
            <ComponentShowcase
              title="Tabs"
              icon={FileText}
              description="Layered sections of content."
              code={TABS_CODE}
              details={TABS_DETAILS}
            >
               <div className="flex flex-col gap-8 w-full max-w-[320px]">
                  <Tabs defaultValue="music" className="w-full" variant="pills">
                    <TabsList className="bg-muted/50 w-full justify-between">
                      <TabsTrigger value="music" className="flex-1">Pills</TabsTrigger>
                      <TabsTrigger value="podcasts" className="flex-1">Podcasts</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <Tabs defaultValue="music" className="w-full" variant="enclosed">
                    <TabsList className="w-full">
                      <TabsTrigger value="music">Enclosed</TabsTrigger>
                      <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
                    </TabsList>
                    <TabsContent value="music">
                        <p className="text-sm text-muted-foreground">Content inside a bordered box.</p>
                    </TabsContent>
                  </Tabs>

                  <Tabs defaultValue="music" className="w-full" variant="underline">
                    <TabsList className="w-full">
                      <TabsTrigger value="music">Underline</TabsTrigger>
                      <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
                    </TabsList>
                  </Tabs>
               </div>
            </ComponentShowcase>
            
            {/* Accordion Component */}
            <ComponentShowcase
              title="Accordion"
              icon={List}
              description="Interactive headings that reveal content."
              code={ACCORDION_CODE}
              details={ACCORDION_DETAILS}
              className="lg:col-span-2"
            >
              <div className="w-full max-w-[500px] space-y-6">
                 <div>
                    <Label className="mb-2 block text-xs uppercase text-muted-foreground">Default</Label>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-2">
                        <AccordionTrigger>Is it styled?</AccordionTrigger>
                        <AccordionContent>Yes. It comes with default styles that matches the other components' aesthetic.</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                 </div>

                  <div>
                     <Label className="mb-2 block text-xs uppercase text-muted-foreground">Neobrutalism</Label>
                     <Accordion type="single" className="w-full" variant="neobrutalism">
                        <AccordionItem value="item-1">
                        <AccordionTrigger>Hard Style</AccordionTrigger>
                        <AccordionContent>Thick borders & hard shadows.</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                  </div>

                   <div>
                     <Label className="mb-2 block text-xs uppercase text-muted-foreground">Multiple Boxed</Label>
                     <Accordion type="multiple" className="w-full" variant="boxed">
                        <AccordionItem value="item-1">
                             <AccordionTrigger>Personal Settings</AccordionTrigger>
                             <AccordionContent>Manage your personal details here.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                             <AccordionTrigger>Security</AccordionTrigger>
                             <AccordionContent>Password and authentication settings.</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                  </div>
              </div>
            </ComponentShowcase>

          </div>
        </section>
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between text-sm text-muted-foreground">
           <p>Built with React & Tailwind CSS</p>
           <div className="flex gap-4">
             <a href="#" className="hover:underline">Docs</a>
             <a href="https://github.com/PatilAnuraag/tailwind-elements" target="_blank" className="hover:underline">GitHub</a>
             <a href="#" className="hover:underline">Twitter</a>
           </div>
        </div>
      </footer>
    </div>
  );
}