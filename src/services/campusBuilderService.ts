export interface CampusDraft {
  schoolName: string;
  shortName: string;
  mapFile?: string;
  buildingFile?: string;
  timetableFile?: string;
  floorPlanFile?: string;
}

export interface BuildStep {
  key: string;
  label: string;
}

export const buildSteps: BuildStep[] = [
  { key: "buildings", label: "建筑数据处理完成" },
  { key: "courses", label: "教学数据处理完成" },
  { key: "structure", label: "校园信息结构化完成" },
  { key: "graph", label: "Campus Graph 建立完成" },
];

/**
 * 导入校园数据包并生成校园实例。
 * 第一版：模拟解析过程与进度。
 * 后续：替换为真实的 CSV / 图片解析与 Campus Graph 构建。
 */
export async function importCampusData(
  draft: CampusDraft,
  onProgress?: (step: BuildStep, index: number) => void,
): Promise<{ ok: true; campusId: string }> {
  for (let i = 0; i < buildSteps.length; i++) {
    await new Promise((r) => setTimeout(r, 750));
    onProgress?.(buildSteps[i]!, i);
  }
  return { ok: true, campusId: draft.shortName.toLowerCase() || "campus" };
}
