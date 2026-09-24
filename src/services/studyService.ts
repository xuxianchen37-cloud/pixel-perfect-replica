import { classrooms, getBuilding, getClassroom, studySpaces, type Classroom, type StudySpace as StudySpaceData } from "@/data/campus";

export interface StudyFilters {
  startTime: string;
  durationHours: number;
  preferDistance: boolean;
  preferQuiet: boolean;
  needSocket: boolean;
  needAirCon: boolean;
}

export interface StudySpace extends StudySpaceData {
  classroom: Classroom;
  buildingId: string;
  name: string;
}

function hydrate(item: StudySpaceData): StudySpace | null {
  const classroom = getClassroom(item.classroomId);
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
 * 后续逻辑：全校课表 → 排除有课教室 → 计算剩余空闲时间 → 结合距离与设施 → 综合排序。
 */
export function getAvailableClassrooms(): Classroom[] {
  return classrooms.filter((c) => studySpaces.some((s) => s.classroomId === c.id));
}

/** 自习空间推荐。第一版按数据包评分排序，后续替换为真实推荐算法。 */
export function recommendStudySpace(filters?: Partial<StudyFilters>): StudySpace[] {
  const list = studySpaces.map(hydrate).filter((s): s is StudySpace => s !== null);
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
