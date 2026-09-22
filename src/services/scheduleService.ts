import {
  classroomLabel,
  courses,
  getCourse,
  slotTimes,
  timetable,
  type Course,
  type TimetableEntry,
} from "@/data/campus";

export interface ScheduleItem {
  entry: TimetableEntry;
  course: Course;
  location: string;
  time: string;
  slotLabel: string;
}

function toItem(entry: TimetableEntry): ScheduleItem | null {
  const course = getCourse(entry.courseId);
  if (!course) return null;
  const slot = slotTimes.find((s) => s.slot === entry.slot);
  return {
    entry,
    course,
    location: classroomLabel(course.classroomId),
    time: slot?.time ?? "",
    slotLabel: slot?.label ?? "",
  };
}

export function getWeekSchedule(): ScheduleItem[] {
  return timetable.map(toItem).filter((i): i is ScheduleItem => i !== null);
}

export function getScheduleAt(day: number, slot: number): ScheduleItem | undefined {
  return getWeekSchedule().find((i) => i.entry.day === day && i.entry.slot === slot);
}

/** 今日课程（第一版固定展示周一课表作为演示数据） */
export function getTodaySchedule(): ScheduleItem[] {
  const day = new Date().getDay();
  const weekday = day >= 1 && day <= 5 ? day : 1;
  return getWeekSchedule()
    .filter((i) => i.entry.day === weekday)
    .sort((a, b) => a.entry.slot - b.entry.slot);
}

export function searchCourses(keyword: string): Course[] {
  const k = keyword.trim();
  if (!k) return courses;
  return courses.filter(
    (c) => c.name.includes(k) || c.teacher.includes(k) || classroomLabel(c.classroomId).includes(k),
  );
}
