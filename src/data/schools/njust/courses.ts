import type { Course, TimeSlot, TimetableEntry } from "@/data/types";
import { school } from "./school";

const s = school.id;

export const courses: Course[] = [
  {
    id: "C001",
    schoolId: s,
    name: "高等数学A",
    teacher: "张老师",
    classroomId: "B011-301",
    color: "sky",
    review: { difficulty: 4, workload: 3, recommend: 4, aiSummary: "课程节奏偏快，但知识体系完整，建议课前做好预习。" },
  },
  {
    id: "C002",
    schoolId: s,
    name: "大学英语",
    teacher: "李老师",
    classroomId: "B012-205",
    color: "violet",
    review: { difficulty: 2, workload: 3, recommend: 4, aiSummary: "课堂互动多，口语练习占比高，出勤要求较严格。" },
  },
  {
    id: "C003",
    schoolId: s,
    name: "程序设计基础",
    teacher: "王老师",
    classroomId: "B003-机房",
    color: "emerald",
    review: { difficulty: 3, workload: 4, recommend: 5, aiSummary: "实践作业较多，跟上每周实验即可获得不错成绩。" },
  },
  {
    id: "C004",
    schoolId: s,
    name: "大学物理",
    teacher: "刘老师",
    classroomId: "B011-201",
    color: "amber",
    review: { difficulty: 4, workload: 3, recommend: 3, aiSummary: "公式推导密集，建议结合习题册巩固。" },
  },
  {
    id: "C005",
    schoolId: s,
    name: "思想政治理论",
    teacher: "陈老师",
    classroomId: "B013-401",
    color: "rose",
    review: { difficulty: 2, workload: 2, recommend: 4, aiSummary: "以课堂讨论与论文为主，注意期末论文选题。" },
  },
  {
    id: "C006",
    schoolId: s,
    name: "体育",
    teacher: "赵老师",
    classroomId: "B002-场地2",
    color: "teal",
    review: { difficulty: 1, workload: 1, recommend: 5, aiSummary: "以体能测试为主，坚持出勤基本无压力。" },
  },
];

export const slots: TimeSlot[] = [
  { slot: 1, label: "1-2节", time: "08:00 - 09:40" },
  { slot: 2, label: "3-4节", time: "10:00 - 11:40" },
  { slot: 3, label: "5-6节", time: "14:00 - 15:40" },
  { slot: 4, label: "7-8节", time: "16:00 - 17:40" },
  { slot: 5, label: "9-10节", time: "19:00 - 20:40" },
];

export const timetable: TimetableEntry[] = [
  { id: "T01", courseId: "C001", day: 1, slot: 1 },
  { id: "T02", courseId: "C002", day: 1, slot: 2 },
  { id: "T03", courseId: "C004", day: 1, slot: 4 },
  { id: "T04", courseId: "C003", day: 2, slot: 1 },
  { id: "T05", courseId: "C005", day: 2, slot: 3 },
  { id: "T06", courseId: "C001", day: 3, slot: 1 },
  { id: "T07", courseId: "C006", day: 3, slot: 3 },
  { id: "T08", courseId: "C002", day: 4, slot: 2 },
  { id: "T09", courseId: "C003", day: 4, slot: 4 },
  { id: "T10", courseId: "C004", day: 5, slot: 1 },
  { id: "T11", courseId: "C005", day: 5, slot: 3 },
];
