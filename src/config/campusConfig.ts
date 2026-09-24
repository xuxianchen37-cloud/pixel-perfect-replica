// 校园配置入口 —— 接入新大学只需：
// 1. 在 src/data/schools/<schoolId>/ 下按 src/data/types.ts 的模型提供数据文件
// 2. 在 dataSources 中注册
// 3. 修改下面的 campusConfig 指向新的数据源
import type { CampusDataset } from "@/data/types";
import { njustBuildings, njustCourses, njustMap, njustNotices } from "@/data/schools/njust";

export interface CampusConfig {
  schoolId: string;
  schoolName: string;
  /** 数据源 key，格式 "<schoolId>/<模块>" */
  map: string;
  buildings: string;
  courses: string;
  notices: string;
}

export const campusConfig: CampusConfig = {
  schoolId: "njust",
  schoolName: "南京理工大学",
  map: "njust/map",
  buildings: "njust/buildings",
  courses: "njust/courses",
  notices: "njust/notices",
};

type MapData = Pick<CampusDataset, "school" | "buildingTypeLabels" | "weekDays" | "demoImport" | "defaults">;
type BuildingsData = Pick<CampusDataset, "buildings" | "floors" | "classrooms" | "studySpaces">;
type CoursesData = Pick<CampusDataset, "courses" | "slots" | "timetable">;
type NoticesData = Pick<CampusDataset, "notices">;

/** 已注册的数据源（未来可替换为数据库 / Campus Builder 生成结果） */
export const dataSources = {
  map: { "njust/map": njustMap } as Record<string, MapData>,
  buildings: { "njust/buildings": njustBuildings } as Record<string, BuildingsData>,
  courses: { "njust/courses": njustCourses } as Record<string, CoursesData>,
  notices: { "njust/notices": njustNotices } as Record<string, NoticesData>,
};

function pick<T>(group: Record<string, T>, key: string, kind: string): T {
  const v = group[key];
  if (!v) throw new Error(`campusConfig: 未找到 ${kind} 数据源 "${key}"`);
  return v;
}

export function loadCampusDataset(config: CampusConfig = campusConfig): CampusDataset {
  const map = pick(dataSources.map, config.map, "map");
  return {
    ...map,
    school: { ...map.school, id: config.schoolId, name: config.schoolName },
    ...pick(dataSources.buildings, config.buildings, "buildings"),
    ...pick(dataSources.courses, config.courses, "courses"),
    ...pick(dataSources.notices, config.notices, "notices"),
  };
}
