import type { Classroom, Floor, Room } from "@/data/types";

export const classrooms: Classroom[] = [
  { id: "B011-301", buildingId: "B011", room: "301", floor: 3, capacity: 80, facilities: ["插座", "空调", "投影"], quietScore: 3 },
  { id: "B011-302", buildingId: "B011", room: "302", floor: 3, capacity: 60, facilities: ["插座", "空调"], quietScore: 4 },
  { id: "B011-303", buildingId: "B011", room: "303", floor: 3, capacity: 60, facilities: ["插座"], quietScore: 3 },
  { id: "B011-201", buildingId: "B011", room: "201", floor: 2, capacity: 90, facilities: ["空调", "投影"], quietScore: 2 },
  { id: "B011-101", buildingId: "B011", room: "101", floor: 1, capacity: 120, facilities: ["空调"], quietScore: 2 },
  { id: "B011-401", buildingId: "B011", room: "401", floor: 4, capacity: 50, facilities: ["插座", "空调"], quietScore: 5 },
  { id: "B012-205", buildingId: "B012", room: "205", floor: 2, capacity: 70, facilities: ["插座", "空调"], quietScore: 3 },
  { id: "B013-401", buildingId: "B013", room: "401", floor: 4, capacity: 50, facilities: ["插座"], quietScore: 5 },
  { id: "B001-3A", buildingId: "B001", room: "三楼A区", floor: 3, capacity: 120, facilities: ["插座", "空调", "台灯"], quietScore: 5 },
];

function common(buildingId: string, level: number): Room[] {
  return [
    { id: `${buildingId}-${level}-stairs`, buildingId, level, label: "楼梯", kind: "stairs" },
    { id: `${buildingId}-${level}-toilet`, buildingId, level, label: "卫生间", kind: "toilet" },
    { id: `${buildingId}-${level}-elevator`, buildingId, level, label: "电梯", kind: "elevator" },
  ];
}

function classroomRoom(buildingId: string, level: number, label: string, span?: number): Room {
  const id = `${buildingId}-${label}`;
  return { id, buildingId, level, label, kind: "classroom", classroomId: id, ...(span ? { span } : {}) };
}

export const floors: Floor[] = [
  { id: "B011-F1", buildingId: "B011", level: 1, rooms: [classroomRoom("B011", 1, "101", 2), ...common("B011", 1)] },
  { id: "B011-F2", buildingId: "B011", level: 2, rooms: [classroomRoom("B011", 2, "201", 2), ...common("B011", 2)] },
  {
    id: "B011-F3",
    buildingId: "B011",
    level: 3,
    rooms: [classroomRoom("B011", 3, "301"), classroomRoom("B011", 3, "302"), classroomRoom("B011", 3, "303"), ...common("B011", 3)],
  },
  { id: "B011-F4", buildingId: "B011", level: 4, rooms: [classroomRoom("B011", 4, "401", 2), ...common("B011", 4)] },
];

/** 页面默认起点 / 默认关注建筑 */
export const defaults = {
  originBuildingId: "B008",
  focusBuildingId: "B011",
};
