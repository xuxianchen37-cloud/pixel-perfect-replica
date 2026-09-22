import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Clock, Footprints, Navigation, Plug, Snowflake, Sparkles, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { recommendStudySpace } from "@/services/studyService";

export const Route = createFileRoute("/study")({
  head: () => ({
    meta: [
      { title: "自习空间 · CampusMind" },
      {
        name: "description",
        content: "CampusMind 自习空间推荐：空闲教室、推荐理由、步行距离与可用时间一目了然。",
      },
      { property: "og:title", content: "自习空间 · CampusMind" },
      { property: "og:description", content: "按距离、安静程度和插座空调筛选最合适的空闲教室。" },
    ],
  }),
  component: StudyPage,
});

type SortKey = "score" | "distance" | "quiet";

function StudyPage() {
  const [sort, setSort] = useState<SortKey>("score");
  const [needSocket, setNeedSocket] = useState(false);
  const [needAirCon, setNeedAirCon] = useState(false);

  const spaces = useMemo(
    () =>
      recommendStudySpace({
        needSocket,
        needAirCon,
        preferDistance: sort === "distance",
        preferQuiet: sort === "quiet",
      }),
    [sort, needSocket, needAirCon],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">自习空间</h1>
        <p className="mt-2 text-muted-foreground">现在就能去的空教室，附带推荐理由、距离与可用时间。</p>
      </header>

      <Card className="mb-6 shadow-[var(--shadow-card)]">
        <CardContent className="flex flex-wrap items-center gap-6 pt-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">排序</span>
            {(
              [
                ["score", "综合推荐"],
                ["distance", "距离最近"],
                ["quiet", "最安静"],
              ] as const
            ).map(([k, label]) => (
              <Button
                key={k}
                size="sm"
                variant={sort === k ? "default" : "outline"}
                onClick={() => setSort(k)}
              >
                {label}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Switch id="socket" checked={needSocket} onCheckedChange={setNeedSocket} />
            <Label htmlFor="socket" className="text-sm">
              必须有插座
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="ac" checked={needAirCon} onCheckedChange={setNeedAirCon} />
            <Label htmlFor="ac" className="text-sm">
              必须有空调
            </Label>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {spaces.map((s, i) => (
          <Card key={s.id} className="flex flex-col shadow-[var(--shadow-card)]">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base">{s.name}</CardTitle>
                <Badge variant={s.status === "空闲" ? "default" : "secondary"}>{s.status}</Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {i === 0 && <Badge variant="outline" className="border-primary text-primary">最佳推荐</Badge>}
                <span>综合评分 {s.score}</span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-3 text-sm">
              <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {s.availableFrom} - {s.availableTo}
                </span>
                <span className="flex items-center gap-1.5">
                  <Footprints className="h-4 w-4" />
                  {s.distanceMeters}米 · {s.walkMinutes}分钟
                </span>
                <span className="flex items-center gap-1.5">
                  <Volume2 className="h-4 w-4" />安静度 {s.classroom.quietScore}/5
                </span>
                <span className="flex items-center gap-1.5">
                  {s.classroom.facilities.includes("插座") ? (
                    <Plug className="h-4 w-4" />
                  ) : (
                    <Snowflake className="h-4 w-4" />
                  )}
                  {s.classroom.capacity} 座
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="font-normal">
                    {t}
                  </Badge>
                ))}
              </div>

              <p className="rounded-md bg-accent/50 p-3 text-xs leading-5 text-accent-foreground">
                <Sparkles className="mr-1 inline h-3 w-3" />
                {s.reason}
              </p>

              <Button asChild variant="outline" className="mt-auto w-full">
                <Link to="/map" search={{ to: s.buildingId }}>
                  <Navigation className="mr-2 h-4 w-4" />怎么走
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {spaces.length === 0 && (
        <p className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
          没有符合筛选条件的教室，试试放宽条件。
        </p>
      )}
    </div>
  );
}
