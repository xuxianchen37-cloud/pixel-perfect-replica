import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Clock, Footprints, MapPin, Navigation, Route as RouteIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { buildingTypeLabel, buildings, getBuilding, type Building } from "@/data/campus";
import { calculateRoute, searchBuildings } from "@/services/mapService";

export const Route = createFileRoute("/map")({
  validateSearch: (search: Record<string, unknown>): { to?: string } =>
    typeof search["to"] === "string" ? { to: search["to"] } : {},
  head: () => ({
    meta: [
      { title: "智慧地图 · CampusMind" },
      {
        name: "description",
        content: "CampusMind 智慧校园地图：搜索教学楼、查看建筑详情并生成步行导航路线。",
      },
      { property: "og:title", content: "智慧地图 · CampusMind" },
      { property: "og:description", content: "搜索校园建筑，查看开放时间与设施，一键生成步行路线。" },
    ],
  }),
  component: MapPage,
});

const typeColor: Record<Building["type"], string> = {
  teaching: "bg-primary",
  library: "bg-violet-500",
  lab: "bg-cyan-500",
  sports: "bg-emerald-500",
  canteen: "bg-amber-500",
  dorm: "bg-rose-500",
};

function MapPage() {
  const { to } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const [keyword, setKeyword] = useState("");
  const [fromId, setFromId] = useState("B050");
  const selectedId = to ?? "B004";
  const selected = getBuilding(selectedId) ?? buildings[0]!;

  const results = useMemo(() => searchBuildings(keyword), [keyword]);
  const route = useMemo(() => calculateRoute(fromId, selected.id), [fromId, selected.id]);

  function select(id: string) {
    void navigate({ search: { to: id } });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">智慧地图</h1>
        <p className="mt-2 text-muted-foreground">搜索校园建筑，查看详情，并生成模拟步行路线。</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          {/* 地图区域 */}
          <Card className="overflow-hidden shadow-[var(--shadow-card)]">
            <CardContent className="p-0">
              <div className="relative aspect-[4/3] w-full bg-[linear-gradient(0deg,var(--color-accent)_1px,transparent_1px),linear-gradient(90deg,var(--color-accent)_1px,transparent_1px)] bg-[length:40px_40px] bg-muted/30">
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* 校园主干道 */}
                  <path d="M0 30 H100 M0 66 H100 M22 0 V100 M52 0 V100 M74 0 V100" stroke="currentColor" className="text-border" strokeWidth="1.2" fill="none" />
                  {route && (
                    <polyline
                      points={route.points.map((p) => `${p.x},${p.y}`).join(" ")}
                      fill="none"
                      stroke="currentColor"
                      className="text-primary"
                      strokeWidth="1.4"
                      strokeDasharray="3 2"
                      strokeLinecap="round"
                    />
                  )}
                </svg>

                {buildings.map((b) => {
                  const active = b.id === selected.id;
                  const isStart = route?.from.id === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => select(b.id)}
                      style={{ left: `${b.x}%`, top: `${b.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                      aria-label={b.name}
                    >
                      <span
                        className={`flex flex-col items-center gap-1 transition ${active ? "scale-110" : "hover:scale-105"}`}
                      >
                        <span
                          className={`grid h-7 w-7 place-items-center rounded-full text-[10px] font-bold text-white shadow-md ring-2 ${typeColor[b.type]} ${active ? "ring-primary" : "ring-background"}`}
                        >
                          {isStart ? "起" : active ? "终" : ""}
                        </span>
                        <span className="whitespace-nowrap rounded bg-background/90 px-1.5 py-0.5 text-[11px] font-medium shadow-sm">
                          {b.name}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 导航路线 */}
          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Navigation className="h-4 w-4 text-primary" /> 模拟导航
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="mb-1.5 text-xs text-muted-foreground">起点</p>
                  <Select value={fromId} onValueChange={setFromId}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {buildings.map((b) => (
                        <SelectItem key={b.id} value={b.id}>
                          {b.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="mb-1.5 text-xs text-muted-foreground">终点</p>
                  <Select value={selected.id} onValueChange={select}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {buildings.map((b) => (
                        <SelectItem key={b.id} value={b.id}>
                          {b.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {route ? (
                <div className="rounded-lg border bg-accent/40 p-4">
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="flex items-center gap-1.5 font-medium">
                      <RouteIcon className="h-4 w-4 text-primary" />约 {route.distanceMeters} 米
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Footprints className="h-4 w-4 text-primary" />步行 {route.walkMinutes} 分钟
                    </span>
                  </div>
                  <ol className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    <li>1. 从{route.from.name}出发，沿主干道前行</li>
                    <li>2. 在校园中轴路口转向{route.to.name}方向</li>
                    <li>3. 抵达{route.to.name}（{buildingTypeLabel[route.to.type]}）</li>
                  </ol>
                </div>
              ) : (
                <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                  起点与终点相同，请选择不同的建筑。
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 右侧：搜索 + 列表 + 详情 */}
        <div className="space-y-6">
          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">搜索建筑</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9"
                  value={keyword}
                  placeholder="输入建筑名称，如 图书馆"
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <div className="mt-3 max-h-64 space-y-1.5 overflow-y-auto">
                {results.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => select(b.id)}
                    className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition hover:bg-accent/60 ${b.id === selected.id ? "border-primary bg-accent/60" : ""}`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${typeColor[b.type]}`} />
                      {b.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{buildingTypeLabel[b.type]}</span>
                  </button>
                ))}
                {results.length === 0 && (
                  <p className="py-6 text-center text-sm text-muted-foreground">没有找到相关建筑</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="h-4 w-4 text-primary" />
                {selected.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{buildingTypeLabel[selected.type]}</Badge>
                <Badge variant="outline">{selected.floors} 层</Badge>
              </div>
              <p className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />开放时间 {selected.openTime} - {selected.closeTime}
              </p>
              <div>
                <p className="mb-1.5 text-xs text-muted-foreground">设施</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.facilities.map((f) => (
                    <Badge key={f} variant="outline" className="font-normal">
                      {f}
                    </Badge>
                  ))}
                </div>
              </div>
              {selected.tip && (
                <p className="rounded-md bg-accent/50 p-3 text-xs text-accent-foreground">
                  💡 {selected.tip}
                </p>
              )}
              <Button asChild variant="outline" className="w-full">
                <Link to="/study">查看该区域自习空间</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
