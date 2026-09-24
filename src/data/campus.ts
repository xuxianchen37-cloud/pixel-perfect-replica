// 数据访问层 —— 页面与服务只从这里读取当前学校数据。
// 当前学校由 src/config/campusConfig.ts 决定，本文件不含任何学校特定内容。
import { loadCampusDataset } from "@/config/campusConfig";

export type * from "./types";

const data = loadCampusDataset();

export const campusData = data;
export const campus = { id: data.school.id, name: data.school.name, short: data.school.shortName };
export const school = data.school;
export const buildings = data.buildings;
export const floors = data.floors;
export const classrooms = data.classrooms;
export const courses = data.courses;
export const slotTimes = data.slots;
export const weekDays = data.weekDays;
export const timetable = data.timetable;
export const notices = data.notices;
export const studySpaces = data.studySpaces;
export const buildingTypeLabel = data.buildingTypeLabels;
export const campusDefaults = data.defaults;
export const demoImport = data.demoImport;

export const getBuilding = (id: string) => buildings.find((b) => b.id === id);
export const getClassroom = (id: string) => classrooms.find((c) => c.id === id);
export const getCourse = (id: string) => courses.find((c) => c.id === id);
export const getNotice = (id: string) => notices.find((n) => n.id === id);
export const getFloors = (buildingId: string) =>
  floors.filter((f) => f.buildingId === buildingId).sort((a, b) => a.level - b.level);
export const getRooms = (buildingId: string, level: number) =>
  floors.find((f) => f.buildingId === buildingId && f.level === level)?.rooms ?? [];

/** classroomId 前缀即建筑 ID */
export function buildingIdOf(classroomId: string) {
  return classroomId.split("-")[0] ?? "";
}

/** 把 classroomId 转成可读地点：建筑名 + 房间号 */
export function classroomLabel(classroomId: string) {
  const room = classroomId.split("-").slice(1).join("-");
  const building = getBuilding(buildingIdOf(classroomId));
  return building ? `${building.name}${room}` : classroomId;
}
