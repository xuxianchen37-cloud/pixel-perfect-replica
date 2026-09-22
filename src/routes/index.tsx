import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Clock,
  Compass,
  DoorOpen,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getTodaySchedule } from "@/services/scheduleService";
import { recommendStudySpace } from "@/services/studyService";
import { askCampusAI, type AiReply } from "@/lib/aiAssistant";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampusMind · 我的智慧校园" },
      {
        name: "description",
        content: "CampusMind 学生智慧校园面板：今日课程、重要通知、空闲教室推荐与 AI 校园助手。",
      },
      { property: "og:title", content: "CampusMind · 我的智慧校园" },
      {
        property: "og:description",
        content: "一个页面掌握课程、通知、空闲自习教室与校园导航。",
      },
    ],
  }),
  component: Dashboard,
});

const quickLinks = [
  { to: "/map", label: "校园导航", icon: Compass },
  { to: "/study", label: "找空教室", icon: DoorOpen },
  { to: "/schedule", label: "查看课表", icon: CalendarDays },
  { to: "/notices", label: "AI通知", icon: Bell },
] as const;

function greeting() {
  const h = new Date().getHours();
  if (h < 6) return "凌晨好";
  if (h < 11) return "早上好";
  if (h < 14) return "中午好";
  if (h < 18) return "下午好";
  return "晚上好";
}

function Dashboard() {
  const todayCourses = getTodaySchedule();
  const topSpace = recommendStudySpace()[0];

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState<AiReply | null>(null);

  async function ask() {
    if (!question.trim() || loading) return;
    setLoading(true);
    setReply(null);
    setReply(await askCampusAI(question));
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {greeting()}，同学 👋
        </h1>
        <p className="mt-2 text-muted-foreground">今天也是高效校园生活的一天。</p>
      </header>

      {/* AI 助手输入框 */}
      <Card className="mb-8 border-primary/25 bg-accent/40 shadow-[var(--shadow-card)]">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-sm font-medium text-accent-foreground">
            <Sparkles className="h-4 w-4" />
            AI 校园助手
          </div>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <Input
              className="bg-background"
              value={question}
              placeholder="问我任何校园问题，例如：第一节高数在哪里？"
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && ask()}
            />
            <Button onClick={ask} disabled={loading || !question.trim()}>
              {loading ? "思考中…" : "发送"}
            </Button>
          </div>

          {loading && (
            <p className="mt-4 text-sm text-muted-foreground">AI 正在查询校园数据……</p>
          )}
          {reply && !loading && (
            <div className="mt-4 rounded-xl border border-border bg-background p-4">
              <p className="text-sm leading-relaxed">{reply.text}</p>
              {reply.buildingId && (
                <Button asChild size="sm" variant="secondary" className="mt-3">
                  <Link to="/map" search={{ to: reply.buildingId }}>
                    查看路线
                  </Link>
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* 今日课程 */}
        <Card className="shadow-[var(--shadow-card)] lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">今日课程</CardTitle>
            <Link
              to="/schedule"
              className="text-sm text-primary hover:underline"
            >
              全部课表
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayCourses.length === 0 && (
              <p className="rounded-xl bg-muted p-6 text-center text-sm text-muted-foreground">
                今天没有课程安排，去自习室充电吧。
              </p>
            )}
            {todayCourses.map((item) => (
              <Link
                key={item.entry.id}
                to="/schedule"
                search={{ course: item.course.id }}
                className="flex items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:bg-secondary"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium">{item.course.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.time} · {item.location}
                  </p>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-5">
          {/* 重要通知 */}
          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">重要通知</CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                to="/notices"
                className="block rounded-xl border border-border p-4 transition-colors hover:bg-secondary"
              >
                <Badge className="bg-destructive text-destructive-foreground">重要</Badge>
                <p className="mt-2 font-medium">四六级报名即将截止</p>
                <p className="mt-1 text-sm text-muted-foreground">截止时间：10月8日 18:00</p>
              </Link>
            </CardContent>
          </Card>

          {/* 空闲教室推荐 */}
          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">空闲教室推荐</CardTitle>
            </CardHeader>
            <CardContent>
              {topSpace ? (
                <div className="rounded-xl border border-border p-4">
                  <p className="flex items-center gap-2 font-medium">
                    <MapPin className="h-4 w-4 text-primary" />
                    {topSpace.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    空闲至：{topSpace.availableTo} · 距离：{topSpace.walkMinutes}分钟
                  </p>
                  <Button asChild size="sm" className="mt-3 w-full">
                    <Link to="/study">去自习</Link>
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">暂无可推荐教室。</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 快捷功能 */}
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {quickLinks.map((q) => (
          <Link
            key={q.to}
            to={q.to}
            className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-5 text-center shadow-[var(--shadow-card)] transition-colors hover:border-primary/40 hover:bg-accent/40"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <q.icon className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium">{q.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
