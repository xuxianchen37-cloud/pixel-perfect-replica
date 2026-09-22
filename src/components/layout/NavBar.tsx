import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bot, GraduationCap, Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AiAssistantDialog } from "@/components/AiAssistantDialog";
import { campus } from "@/data/campus";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "首页" },
  { to: "/map", label: "智慧地图" },
  { to: "/notices", label: "AI通知" },
  { to: "/schedule", label: "智慧课表" },
  { to: "/study", label: "自习空间" },
] as const;

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-base font-semibold tracking-tight">CampusMind</span>
            <span className="text-[11px] text-muted-foreground">{campus.name}</span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
              )}
              activeProps={{ className: "bg-accent text-accent-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => setAssistantOpen(true)}
          >
            <Sparkles className="h-4 w-4" />
            AI助手
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="sm:hidden"
            aria-label="AI助手"
            onClick={() => setAssistantOpen(true)}
          >
            <Bot className="h-4 w-4" />
          </Button>

          <Avatar className="h-9 w-9 border border-border">
            <AvatarFallback className="bg-accent text-xs font-medium text-accent-foreground">
              同学
            </AvatarFallback>
          </Avatar>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="md:hidden" aria-label="打开菜单">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>CampusMind</SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-1 px-4">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    activeOptions={{ exact: item.to === "/" }}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                    activeProps={{ className: "bg-accent text-accent-foreground" }}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/builder"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  Campus Builder
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <AiAssistantDialog open={assistantOpen} onOpenChange={setAssistantOpen} />
    </header>
  );
}
