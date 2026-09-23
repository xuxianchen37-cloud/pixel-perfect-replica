// 统一校园数据模型 —— 与具体学校无关。
// 任意大学只需按这些接口提供数据文件，即可生成一个新的校园实例。

export interface School {
  id: string;
  name: string;
  shortName: string;
  /** 顶部导航、欢迎语等文案中使用的学生称呼 */
  memberLabel: string;
}

export type BuildingType = "teaching" | "library" | "lab" | "sports" | "canteen" | "dorm";

export interface Building {
  id: string;
  schoolId: string;
  name: string;
  type: BuildingType;
  /** 示意地图百分比坐标 */
  x: number;
  y: number;
  floorCount: number;
  openTime: string;
  closeTime: string;
  facilities: string[];
  tip?: string;
}

export type RoomKind = "classroom" | "toilet" | "stairs" | "elevator" | "office";

export interface Room {
  id: string;
  buildingId: string;
  level: number;
  label: string;
  kind: RoomKind;
  /** 若该房间是可用教室，则指向 Classroom.id */
  classroomId?: string;
  /** 平面图中占据的格数 */
  span?: number;
}

export interface Floor {
  id: string;
  buildingId: string;
  level: number;
  rooms: Room[];
}

export interface Classroom {
  id: string;
  buildingId: string;
  /** 房间号，例如 301 / 三楼A区 */
  room: string;
  floor: number;
  capacity: number;
  facilities: string[];
  /** 安静程度 1-5 */
  quietScore: number;
}

export interface CourseReview {
  difficulty: number;
  workload: number;
  recommend: number;
  aiSummary: string;
}

export interface Course {
  id: string;
  schoolId: string;
  name: string;
  teacher: string;
  classroomId: string;
  color: string;
  review: CourseReview;
}

export interface TimeSlot {
  slot: number;
  label: string;
  time: string;
}

export interface TimetableEntry {
  id: string;
  courseId: string;
  /** 1 = 周一 */
  day: number;
  slot: number;
}

export type NoticeImportance = "高" | "中" | "低";

export interface NoticeAnalysis {
  title: string;
  importance: NoticeImportance;
  summary: string;
  audience: string;
  deadline: string;
  todos: string[];
}

export interface Notice {
  id: string;
  schoolId: string;
  title: string;
  source: string;
  publishedAt: string;
  raw: string;
  /** 预置的结构化解析结果（无 AI 时的回退） */
  analysis?: NoticeAnalysis;
}

export interface StudySpace {
  id: string;
  classroomId: string;
  status: "空闲" | "即将空闲";
  availableFrom: string;
  availableTo: string;
  distanceMeters: number;
  walkMinutes: number;
  score: number;
  tags: string[];
  reason: string;
}

/** 校园数据包：一所学校的全部数据 */
export interface CampusDataset {
  school: School;
  buildingTypeLabels: Record<BuildingType, string>;
  buildings: Building[];
  floors: Floor[];
  classrooms: Classroom[];
  courses: Course[];
  slots: TimeSlot[];
  weekDays: string[];
  timetable: TimetableEntry[];
  notices: Notice[];
  studySpaces: StudySpace[];
  /** 页面默认值，避免组件写死具体建筑 ID */
  defaults: {
    originBuildingId: string;
    focusBuildingId: string;
  };
  /** Campus Builder 演示用的示例导入资料 */
  demoImport: {
    schoolName: string;
    shortName: string;
    mapFile: string;
    buildingFile: string;
    timetableFile: string;
    floorPlanFile: string;
  };
}
