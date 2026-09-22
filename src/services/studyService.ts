import { classrooms, getBuilding, getClassroom, type Classroom } from "@/data/campus";

export interface StudyFilters {
  startTime: string;
  durationHours: number;
  preferDistance: boolean;
  preferQuiet: boolean;
  needSocket: boolean;
  needAirCon: boolean;
}

export interface StudySpace {
  id: string;
  classroom: Classroom;
  buildingId: string;
  name: string;
  status: "空闲" | "即将空闲";
  availableFrom: string;
  availableTo: string;
  distanceMeters: number;
  walkMinutes: number;
  score: number;
  tags: string[];
  reason: string;
}

const mockSpaces: Omit<StudySpace, "classroom" | "name" | "buildingId">[] = [
  {
    id: "B004-302",
    status: "空闲",
    availableFrom: "14:00",
    availableTo: "17:00",
    distanceMeters: 340,
    walkMinutes: 5,
    score: 94,
    tags: ["安静", "有插座"],
    reason: "距离较近，并且未来2.5小时没有课程安排，适合连续学习。",
  },
  {
    id: "B002-205",
    status: "空闲",
    availableFrom: "14:00",
    availableTo: "16:00",
    distanceMeters: 520,
    walkMinutes: 7,
    score: 88,
    tags: ["有插座", "有空调"],
    reason: "教室宽敞、光线好，但16:00 后有一节大学英语。",
  },
  {
    id: "B010-3A",
    status: "空闲",
    availableFrom: "13:30",
    availableTo: "22:00",
    distanceMeters: 760,
    walkMinutes: 10,
    score: 85,
    tags: ["非常安静", "台灯", "有空调"],
    reason: "开放时间最长，适合整个下午到晚上的长时间学习。",
  },
  {
    id: "B001-401",
    status: "即将空闲",
    availableFrom: "15:00",
    availableTo: "21:30",
    distanceMeters: 610,
    walkMinutes: 8,
    score: 79,
    tags: ["安静", "人少"],
    reason: "15:00 后整层几乎无课，适合小组讨论后自习。",
  },
];

function hydrate(item: (typeof mockSpaces)[number]): StudySpace | null {
  const classroom = getClassroom(item.id);
  if (!classroom) return null;
  const building = getBuilding(classroom.buildingId);
  return {
    ...item,
    classroom,
    buildingId: classroom.buildingId,
    name: `${building?.name ?? classroom.buildingId}${classroom.room}`,
  };
}

/**
 * 获取当前可用教室。
 * 第一版：返回模拟数据。
 * 后续逻辑：全校课表 → 排除有课教室 → 计算剩余空闲时间 → 结合距离与设施 → 综合排序。
 */
export function getAvailableClassrooms(): Classroom[] {
  return classrooms.filter((c) => mockSpaces.some((s) => s.id === c.id));
}

/** 自习空间推荐。第一版按 mock 评分排序，后续替换为真实推荐算法。 */
export function recommendStudySpace(filters?: Partial<StudyFilters>): StudySpace[] {
  const list = mockSpaces.map(hydrate).filter((s): s is StudySpace => s !== null);

  const filtered = list.filter((s) => {
    if (filters?.needSocket && !s.classroom.facilities.includes("插座")) return false;
    if (filters?.needAirCon && !s.classroom.facilities.includes("空调")) return false;
    return true;
  });

  return filtered.sort((a, b) => {
    if (filters?.preferDistance) return a.distanceMeters - b.distanceMeters;
    if (filters?.preferQuiet) return b.classroom.quietScore - a.classroom.quietScore;
    return b.score - a.score;
  });
}
