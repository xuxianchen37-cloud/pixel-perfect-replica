import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  CalendarDays,
  Check,
  Building2,
  Cpu,
  Image as ImageIcon,
  Loader2,
  Rocket,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { buildSteps, importCampusData, type CampusDraft } from "@/services/campusBuilderService";

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "Campus Builder · CampusMind" },
      {
        name: "description",
        content: "上传校园地图、建筑数据与课表，用 AI 一键生成属于你学校的智慧校园。",
      },
      { property: "og:title", content: "Campus Builder · CampusMind" },
      { property: "og:description", content: "四步把一所大学的原始资料变成可用的智慧校园应用。" },
    ],
  }),
  component: BuilderPage,
});

const uploads = [
  { key: "mapFile", label: "校园地图", desc: "平面图或卫星截图（PNG / JPG）", icon: ImageIcon },
  { key: "buildingFile", label: "建筑与教室数据", desc: "建筑、楼层、教室表（CSV / Excel）", icon: Building2 },
  { key: "timetableFile", label: "教务课表", desc: "全校课表导出文件（CSV）", icon: CalendarDays },
  { key: "floorPlanFile", label: "楼层平面图", desc: "可选，用于室内导航（PNG / PDF）", icon: Cpu },
] as const;

function BuilderPage() {
  const [draft, setDraft] = useState<CampusDraft>({ schoolName: "", shortName: "" });
  const [running, setRunning] = useState(false);
  const [doneIndex, setDoneIndex] = useState(-1);
  const [result, setResult] = useState<string | null>(null);

  const filled = uploads.filter((u) => draft[u.key]).length;

  function pick(key: (typeof uploads)[number]["key"], file: File | undefined) {
    if (!file) return;
    setDraft((d) => ({ ...d, [key]: file.name }));
  }

  function loadDemo() {
    setDraft({
      schoolName: "南京理工大学",
      shortName: "NJUST",
      mapFile: "njust-campus-map.png",
      buildingFile: "njust-buildings.csv",
      timetableFile: "njust-timetable-2026.csv",
      floorPlanFile: "building-04-floors.pdf",
    });
  }

  async function run() {
    setRunning(true);
    setResult(null);
    setDoneIndex(-1);
    const res = await importCampusData(draft, (_step, index) => setDoneIndex(index));
    setRunning(false);
    setResult(res.campusId);
  }

  const progress = ((doneIndex + 1) / buildSteps.length) * 100;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Campus Builder</h1>
        <p className="mt-2 text-muted-foreground">
          上传一所大学的原始资料，AI 自动生成属于这所学校的智慧校园。
        </p>
      </header>

      <Card className="mb-6 shadow-[var(--shadow-card)]">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">1. 学校信息</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <div>
            <Label className="mb-1.5 block text-xs text-muted-foreground">学校名称</Label>
            <Input
              value={draft.schoolName}
              placeholder="例如 南京理工大学"
              onChange={(e) => setDraft((d) => ({ ...d, schoolName: e.target.value }))}
            />
          </div>
          <div>
            <Label className="mb-1.5 block text-xs text-muted-foreground">英文简称</Label>
            <Input
              value={draft.shortName}
              placeholder="例如 NJUST"
              onChange={(e) => setDraft((d) => ({ ...d, shortName: e.target.value }))}
            />
          </div>
          <Button variant="outline" onClick={loadDemo}>
            载入演示数据
          </Button>
        </CardContent>
      </Card>

      <Card className="mb-6 shadow-[var(--shadow-card)]">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base">
            <span>2. 上传校园数据</span>
            <Badge variant="secondary">
              {filled}/{uploads.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {uploads.map((u) => {
            const value = draft[u.key];
            const Icon = u.icon;
            return (
              <label
                key={u.key}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border border-dashed p-4 transition hover:bg-accent/40 ${value ? "border-primary bg-accent/30" : ""}`}
              >
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => pick(u.key, e.target.files?.[0])}
                />
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                  {value ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{u.label}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {value ?? u.desc}
                  </span>
                </span>
                <Upload className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
              </label>
            );
          })}
        </CardContent>
      </Card>

      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">3. AI 生成智慧校园</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={result ? 100 : progress} />
          <ol className="space-y-2">
            {buildSteps.map((s, i) => {
              const finished = i <= doneIndex;
              const current = running && i === doneIndex + 1;
              return (
                <li key={s.key} className="flex items-center gap-3 text-sm">
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-full text-xs ${finished ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                  >
                    {finished ? <Check className="h-3.5 w-3.5" /> : current ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      i + 1
                    )}
                  </span>
                  <span className={finished ? "" : "text-muted-foreground"}>{s.label}</span>
                </li>
              );
            })}
          </ol>

          <Button className="w-full" onClick={run} disabled={running || !draft.schoolName.trim()}>
            <Rocket className="mr-2 h-4 w-4" />
            {running ? "AI 生成中…" : "开始生成"}
          </Button>

          {result && (
            <p className="rounded-lg bg-accent/50 p-4 text-sm text-accent-foreground">
              🎉 「{draft.schoolName}」智慧校园已生成（校园编号 {result}），课表、地图与自习推荐已接入。
            </p>
          )}

          <p className="text-xs text-muted-foreground">
            当前为原型演示流程，后续可接入真实文件解析与数据库。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
