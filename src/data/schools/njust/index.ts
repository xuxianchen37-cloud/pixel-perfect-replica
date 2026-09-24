import type { CampusDataset } from "@/data/types";
import { buildingTypeLabels, demoImport, school, weekDays } from "./school";
import { buildings, classrooms, defaults, floors } from "./buildings";
import { courses, slots, timetable } from "./courses";
import { notices } from "./notices";
import { studySpaces } from "./studySpaces";

export const njustMap = { school, buildingTypeLabels, weekDays, demoImport, defaults };
export const njustBuildings = { buildings, floors, classrooms, studySpaces };
export const njustCourses = { courses, slots, timetable };
export const njustNotices = { notices };

export const njust: CampusDataset = {
  ...njustMap,
  ...njustBuildings,
  ...njustCourses,
  ...njustNotices,
};
