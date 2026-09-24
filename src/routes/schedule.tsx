import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Clock, MapPin, Navigation, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { slotTimes, weekDays, getCourse, classroomLabel, buildingIdOf } from "@/data/campus";
import { getWeekSchedule } from "@/services/scheduleService";

export const Route = createFileRoute("/schedule")({
  validateSearch: (search: Record<string, unknown>): { course?: string } =>
    typeof search["course"] === "string" ? { course: search["course"] } : {},
  head: () => ({
    meta: [
      { title: "智慧课表 · CampusMind" },
      {
        name: "description",
        content: "CampusMind 周课表：课程时间、教室位置、AI 课程评价与一键跳转校园地图。",
      },
      { property: "og:title", content: "智慧课表 · CampusMind" },
      { property: "og:description", content: "查看周课表，点击课程了解教室位置并直接导航。" },
    ],
  }),
  component: SchedulePage,
});

const courseColor: Record<string, string> = {
  sky: "bg-sky-500/12 text-sky-700 dark:text-sky-300 border-sky-500/30",
  violet: "bg-violet-500/12 text-violet-700 dark:text-violet-300 border-violet-500/30",
  emerald: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  amber: "bg-amber-500/12 text-amber-700 dark:text-amber-300 border-amber-500/30",
  rose: "bg-rose-500/12 text-rose-700 dark:text-rose-300 border-rose-500/30",
  teal: "bg-teal-500/12 text-teal-700 dark:text-teal-300 border-teal-500/30",
};

function Rating({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`h-1.5 w-5 rounded-full ${i <= value ? "bg-primary" : "bg-muted"}`}
          />
        ))}
      </span>
    </div>
  );
}

function SchedulePage() {
  const { course: courseId } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const week = getWeekSchedule();

  const selected = courseId ? getCourse(courseId) : undefined;
  const selectedBuildingId = selected ? buildingIdOf(selected.classroomId) : "";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">智慧课表</h1>
        <p className="mt-2 text-muted-foreground">点击课程查看详情、教室信息，并直接跳转地图导航。</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="overflow-hidden shadow-[var(--shadow-card)]">
          <CardContent className="overflow-x-auto p-3 sm:p-4">
            <div className="min-w-[640px]">
              <div className="grid grid-cols-[76px_repeat(5,1fr)] gap-2">
                <div />
                {weekDays.map((d) => (
                  <div key={d} className="pb-1 text-center text-sm font-medium">
                    {d}
                  </div>
                ))}

                {slotTimes.map((s) => (
                  <div key={s.slot} className="contents">
                    <div className="flex flex-col justify-center rounded-md bg-muted/50 px-2 py-3 text-center">
                      <span className="text-xs font-medium">{s.label}</span>
                      <span className="mt-0.5 text-[10px] text-muted-foreground">{s.time}</span>
                    </div>
                    {weekDays.map((_, di) => {
                      const item = week.find((i) => i.entry.day === di + 1 && i.entry.slot === s.slot);
                      if (!item)
                        return (
                          <div
                            key={`${s.slot}-${di}`}
                            className="min-h-[76px] rounded-md border border-dashed border-border/60"
                          />
                        );
                      const active = item.course.id === courseId;
                      return (
                        <button
                          key={`${s.slot}-${di}`}
                          onClick={() => void navigate({ search: { course: item.course.id } })}
                          className={`min-h-[76px] rounded-md border p-2 text-left transition hover:brightness-95 ${courseColor[item.course.color] ?? "bg-muted"} ${active ? "ring-2 ring-primary" : ""}`}
                        >
                          <p className="text-sm leading-5 font-medium">{item.course.name}</p>
                          <p className="mt-1 text-[11px] opacity-80">{item.location}</p>
                          <p className="text-[11px] opacity-70">{item.course.teacher}</p>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 课程详情 */}
        <Card className="h-fit shadow-[var(--shadow-card)] lg:sticky lg:top-24">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">课程详情</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!selected && (
              <p className="py-10 text-center text-sm text-muted-foreground">
                点击左侧任意课程，查看教室与 AI 评价。
              </p>
            )}

            {selected && (
              <>
                <div>
                  <p className="text-lg font-semibold">{selected.name}</p>
                  <div className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {selected.teacher}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {classroomLabel(selected.classroomId)}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {week
                        .filter((i) => i.course.id === selected.id)
                        .map((i) => `${weekDays[i.entry.day - 1]} ${i.slotLabel}`)
                        .join(" / ")}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 rounded-lg border p-3">
                  <Rating label="难度" value={selected.review.difficulty} />
                  <Rating label="作业量" value={selected.review.workload} />
                  <Rating label="推荐度" value={selected.review.recommend} />
                </div>

                <div className="rounded-lg bg-accent/50 p-3">
                  <p className="flex items-center gap-1.5 text-xs font-medium text-accent-foreground">
                    <Sparkles className="h-3.5 w-3.5" /> AI 课程小结
                  </p>
                  <p className="mt-1.5 text-sm leading-6">{selected.review.aiSummary}</p>
                </div>

                <Button asChild className="w-full">
                  <Link to="/map" search={{ to: selectedBuildingId }}>
                    <Navigation className="mr-2 h-4 w-4" />在地图中导航
                  </Link>
                </Button>
              </>
            )}

            <div className="border-t pt-4">
              <p className="mb-2 text-xs text-muted-foreground">本周共 {week.length} 节课</p>
              <div className="flex flex-wrap gap-1.5">
                {[...new Set(week.map((i) => i.course.id))].map((id) => {
                  const c = getCourse(id)!;
                  return (
                    <Badge
                      key={id}
                      variant="outline"
                      className="cursor-pointer font-normal"
                      onClick={() => void navigate({ search: { course: id } })}
                    >
                      {c.name}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
