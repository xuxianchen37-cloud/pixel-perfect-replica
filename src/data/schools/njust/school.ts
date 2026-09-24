import type { BuildingType, School } from "@/data/types";

export const school: School = {
  id: "njust",
  name: "南京理工大学",
  shortName: "NJUST",
  memberLabel: "同学",
};

export const buildingTypeLabels: Record<BuildingType, string> = {
  teaching: "教学楼",
  library: "图书馆",
  lab: "实验楼",
  sports: "体育场馆",
  canteen: "餐饮",
  dorm: "生活区",
  laboratory: "实验楼",
  dormitory: "宿舍",
  service: "生活服务",
  office: "办公",
  gate: "校门",
};

export const weekDays = ["周一", "周二", "周三", "周四", "周五"];

export const demoImport = {
  schoolName: school.name,
  shortName: school.shortName,
  mapFile: "njust-campus-map.png",
  buildingFile: "njust-buildings.csv",
  timetableFile: "njust-timetable-2026.csv",
  floorPlanFile: "building-04-floors.pdf",
};
