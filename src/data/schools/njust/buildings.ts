import type { Building, Classroom, Floor, Room } from "@/data/types";
import { school } from "./school";

const s = school.id;

export const buildings: Building[] = [
  {
    id: "B001",
    schoolId: s,
    name: "第一教学楼",
    type: "teaching",
    x: 22,
    y: 30,
    floorCount: 5,
    openTime: "07:00",
    closeTime: "22:30",
    facilities: ["饮水机", "卫生间"],
    tip: "四楼常年安静，适合背书。",
  },
  {
    id: "B002",
    schoolId: s,
    name: "第二教学楼",
    type: "teaching",
    x: 38,
    y: 22,
    floorCount: 5,
    openTime: "07:00",
    closeTime: "22:30",
    facilities: ["饮水机", "卫生间", "自动售货机"],
    tip: "二楼靠近打印店。",
  },
  {
    id: "B004",
    schoolId: s,
    name: "第四教学楼",
    type: "teaching",
    x: 52,
    y: 36,
    floorCount: 4,
    openTime: "07:00",
    closeTime: "22:30",
    facilities: ["饮水机", "卫生间", "自动售货机"],
    tip: "三楼东侧有较多自习座位。",
  },
  {
    id: "B010",
    schoolId: s,
    name: "图书馆",
    type: "library",
    x: 68,
    y: 26,
    floorCount: 6,
    openTime: "08:00",
    closeTime: "22:00",
    facilities: ["空调", "插座", "咖啡吧"],
    tip: "三楼A区人少、插座多。",
  },
  {
    id: "B020",
    schoolId: s,
    name: "实验中心",
    type: "lab",
    x: 76,
    y: 52,
    floorCount: 5,
    openTime: "08:00",
    closeTime: "21:00",
    facilities: ["实验室", "卫生间"],
  },
  {
    id: "B030",
    schoolId: s,
    name: "体育馆",
    type: "sports",
    x: 30,
    y: 66,
    floorCount: 3,
    openTime: "06:30",
    closeTime: "21:30",
    facilities: ["更衣室", "淋浴"],
  },
  {
    id: "B040",
    schoolId: s,
    name: "食堂",
    type: "canteen",
    x: 52,
    y: 72,
    floorCount: 3,
    openTime: "06:30",
    closeTime: "20:30",
    facilities: ["自助餐", "热水"],
  },
  {
    id: "B050",
    schoolId: s,
    name: "宿舍区",
    type: "dorm",
    x: 74,
    y: 78,
    floorCount: 6,
    openTime: "00:00",
    closeTime: "23:30",
    facilities: ["快递柜", "洗衣房"],
  },
];

export const classrooms: Classroom[] = [
  { id: "B004-301", buildingId: "B004", room: "301", floor: 3, capacity: 80, facilities: ["插座", "空调", "投影"], quietScore: 3 },
  { id: "B004-302", buildingId: "B004", room: "302", floor: 3, capacity: 60, facilities: ["插座", "空调"], quietScore: 4 },
  { id: "B004-303", buildingId: "B004", room: "303", floor: 3, capacity: 60, facilities: ["插座"], quietScore: 3 },
  { id: "B004-201", buildingId: "B004", room: "201", floor: 2, capacity: 90, facilities: ["空调", "投影"], quietScore: 2 },
  { id: "B004-101", buildingId: "B004", room: "101", floor: 1, capacity: 120, facilities: ["空调"], quietScore: 2 },
  { id: "B004-401", buildingId: "B004", room: "401", floor: 4, capacity: 50, facilities: ["插座", "空调"], quietScore: 5 },
  { id: "B002-205", buildingId: "B002", room: "205", floor: 2, capacity: 70, facilities: ["插座", "空调"], quietScore: 3 },
  { id: "B001-401", buildingId: "B001", room: "401", floor: 4, capacity: 50, facilities: ["插座"], quietScore: 5 },
  { id: "B010-3A", buildingId: "B010", room: "三楼A区", floor: 3, capacity: 120, facilities: ["插座", "空调", "台灯"], quietScore: 5 },
];

function common(buildingId: string, level: number): Room[] {
  return [
    { id: `${buildingId}-${level}-stairs`, buildingId, level, label: "楼梯", kind: "stairs" },
    { id: `${buildingId}-${level}-toilet`, buildingId, level, label: "卫生间", kind: "toilet" },
    { id: `${buildingId}-${level}-elevator`, buildingId, level, label: "电梯", kind: "elevator" },
  ];
}

export const floors: Floor[] = [
  {
    id: "B004-F1",
    buildingId: "B004",
    level: 1,
    rooms: [
      { id: "B004-101", buildingId: "B004", level: 1, label: "101", kind: "classroom", classroomId: "B004-101", span: 2 },
      { id: "B004-102", buildingId: "B004", level: 1, label: "102", kind: "classroom" },
      ...common("B004", 1),
    ],
  },
  {
    id: "B004-F2",
    buildingId: "B004",
    level: 2,
    rooms: [
      { id: "B004-201", buildingId: "B004", level: 2, label: "201", kind: "classroom", classroomId: "B004-201", span: 2 },
      { id: "B004-202", buildingId: "B004", level: 2, label: "202", kind: "classroom" },
      ...common("B004", 2),
    ],
  },
  {
    id: "B004-F3",
    buildingId: "B004",
    level: 3,
    rooms: [
      { id: "B004-301", buildingId: "B004", level: 3, label: "301", kind: "classroom", classroomId: "B004-301" },
      { id: "B004-302", buildingId: "B004", level: 3, label: "302", kind: "classroom", classroomId: "B004-302" },
      { id: "B004-303", buildingId: "B004", level: 3, label: "303", kind: "classroom", classroomId: "B004-303" },
      ...common("B004", 3),
    ],
  },
  {
    id: "B004-F4",
    buildingId: "B004",
    level: 4,
    rooms: [
      { id: "B004-401", buildingId: "B004", level: 4, label: "401", kind: "classroom", classroomId: "B004-401", span: 2 },
      ...common("B004", 4),
    ],
  },
];

/** 页面默认起点 / 默认关注建筑 */
export const defaults = {
  originBuildingId: "B050",
  focusBuildingId: "B004",
};
