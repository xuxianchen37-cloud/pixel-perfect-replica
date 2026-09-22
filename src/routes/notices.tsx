import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, CalendarClock, CheckCircle2, ListTodo, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { getNotices, parseNoticeWithAI, type ParsedNotice } from "@/services/noticeService";

export const Route = createFileRoute("/notices")({
  head: () => ({
    meta: [
      { title: "AI 通知解析 · CampusMind" },
      {
        name: "description",
        content: "CampusMind 用 AI 把冗长校园通知拆成重要程度、截止时间与待办清单。",
      },
      { property: "og:title", content: "AI 通知解析 · CampusMind" },
      { property: "og:description", content: "一键读懂教务通知：重要程度、截止时间、待办事项。" },
    ],
  }),
  component: NoticesPage,
});

const importanceStyle: Record<ParsedNotice["importance"], string> = {
  高: "bg-destructive text-destructive-foreground",
  中: "bg-[var(--color-warning,theme(colors.amber.500))] text-white",
  低: "bg-secondary text-secondary-foreground",
};

function NoticesPage() {
  const notices = getNotices();
  const [activeId, setActiveId] = useState(notices[0]?.id ?? "");
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);
  const [parsed, setParsed] = useState<ParsedNotice | null>(null);
  const [done, setDone] = useState<string[]>([]);

  const active = notices.find((n) => n.id === activeId);

  async function analyze(payload: { noticeId?: string; text?: string }) {
    setLoading(true);
    setParsed(null);
    setDone([]);
    try {
      setParsed(await parseNoticeWithAI(payload));
    } finally {
      setLoading(false);
    }
  }

  function toggleTodo(t: string) {
    setDone((d) => (d.includes(t) ? d.filter((x) => x !== t) : [...d, t]));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">AI 通知</h1>
        <p className="mt-2 text-muted-foreground">把冗长的教务通知，变成一眼看懂的待办清单。</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 左：通知原文 */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {notices.map((n) => (
              <Button
                key={n.id}
                size="sm"
                variant={n.id === activeId ? "default" : "outline"}
                onClick={() => {
                  setActiveId(n.id);
                  setParsed(null);
                }}
              >
                {n.source}
              </Button>
            ))}
          </div>

          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base leading-6">{active?.title}</CardTitle>
              <p className="text-xs text-muted-foreground">
                {active?.source} · 发布于 {active?.publishedAt}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-7 whitespace-pre-line text-muted-foreground">{active?.raw}</p>
              <Button className="mt-4 w-full" onClick={() => analyze({ noticeId: activeId })} disabled={loading}>
                <Sparkles className="mr-2 h-4 w-4" />
                {loading ? "AI 解析中…" : "AI 解析这条通知"}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">粘贴任意通知</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                rows={4}
                value={custom}
                placeholder="把辅导员群里的通知粘贴到这里…"
                onChange={(e) => setCustom(e.target.value)}
              />
              <Button
                variant="outline"
                className="mt-3 w-full"
                disabled={loading || !custom.trim()}
                onClick={() => analyze({ text: custom })}
              >
                解析粘贴内容
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 右：AI 总结 */}
        <Card className="h-fit border-primary/25 bg-accent/30 shadow-[var(--shadow-card)] lg:sticky lg:top-24">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-primary" /> AI 总结结果
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading && (
              <div className="space-y-3">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-20 w-full" />
              </div>
            )}

            {!loading && !parsed && (
              <p className="py-10 text-center text-sm text-muted-foreground">
                选择左侧通知并点击「AI 解析」，结果会显示在这里。
              </p>
            )}

            {!loading && parsed && (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base font-semibold">{parsed.title}</span>
                  <Badge className={importanceStyle[parsed.importance]}>
                    <AlertTriangle className="mr-1 h-3 w-3" />重要程度 {parsed.importance}
                  </Badge>
                </div>

                <p className="rounded-lg bg-background p-3 text-sm leading-6">{parsed.summary}</p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-background p-3">
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarClock className="h-3.5 w-3.5" /> 截止时间
                    </p>
                    <p className="mt-1 text-sm font-medium">{parsed.deadline}</p>
                  </div>
                  <div className="rounded-lg bg-background p-3">
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Users className="h-3.5 w-3.5" /> 适用对象
                    </p>
                    <p className="mt-1 text-sm font-medium">{parsed.audience}</p>
                  </div>
                </div>

                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <ListTodo className="h-3.5 w-3.5" /> 待办事项（{done.length}/{parsed.todos.length}）
                  </p>
                  <ul className="space-y-1.5">
                    {parsed.todos.map((t) => {
                      const checked = done.includes(t);
                      return (
                        <li key={t}>
                          <button
                            onClick={() => toggleTodo(t)}
                            className={`flex w-full items-center gap-2 rounded-md bg-background px-3 py-2 text-left text-sm transition hover:bg-background/70 ${checked ? "text-muted-foreground line-through" : ""}`}
                          >
                            <CheckCircle2
                              className={`h-4 w-4 shrink-0 ${checked ? "text-primary" : "text-muted-foreground/40"}`}
                            />
                            {t}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
