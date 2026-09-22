// 校园数据包 —— 所有校园相关信息集中在此，未来可整体替换为其他高校的数据包
// 或由 Supabase 数据库 / Campus Builder 生成。

export interface Campus {
  id: string;
  name: string;
  short: string;
}

export interface Building {
  id: string;
  name: string;
  type: "teaching" | "library" | "lab" | "sports" | "canteen" | "dorm";
  x: number; // 示意地图百分比坐标
  y: number;
  floors: number;
  openTime: string;
  closeTime: string;
  facilities: string[];
  tip?: string;
}

export interface Classroom {
  id: string;
  buildingId: string;
  room: string;
  floor: number;
  capacity: number;
  facilities: string[];
  quietScore: number;
}

export interface Course {
  id: string;
  name: string;
  teacher: string;
  classroomId: string;
  color: string;
  review: {
    difficulty: number;
    workload: number;
    recommend: number;
    aiSummary: string;
  };
}

export interface TimetableEntry {
  id: string;
  courseId: string;
  day: number; // 1 = 周一
  slot: number; // 1 = 1-2节
}

export interface Notice {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  raw: string;
}

export interface FloorRoom {
  id: string;
  label: string;
  kind: "classroom" | "toilet" | "stairs" | "elevator";
  classroomId?: string;
  span?: number;
}

export const campus: Campus = {
  id: "njust",
  name: "南京理工大学",
  short: "NJUST",
};

export const buildings: Building[] = [
  {
    id: "B001",
    name: "第一教学楼",
    type: "teaching",
    x: 22,
    y: 30,
    floors: 5,
    openTime: "07:00",
    closeTime: "22:30",
    facilities: ["饮水机", "卫生间"],
    tip: "四楼常年安静，适合背书。",
  },
  {
    id: "B002",
    name: "第二教学楼",
    type: "teaching",
    x: 38,
    y: 22,
    floors: 5,
    openTime: "07:00",
    closeTime: "22:30",
    facilities: ["饮水机", "卫生间", "自动售货机"],
    tip: "二楼靠近打印店。",
  },
  {
    id: "B004",
    name: "第四教学楼",
    type: "teaching",
    x: 52,
    y: 36,
    floors: 4,
    openTime: "07:00",
    closeTime: "22:30",
    facilities: ["饮水机", "卫生间", "自动售货机"],
    tip: "三楼东侧有较多自习座位。",
  },
  {
    id: "B010",
    name: "图书馆",
    type: "library",
    x: 68,
    y: 26,
    floors: 6,
    openTime: "08:00",
    closeTime: "22:00",
    facilities: ["空调", "插座", "咖啡吧"],
    tip: "三楼A区人少、插座多。",
  },
  {
    id: "B020",
    name: "实验中心",
    type: "lab",
    x: 76,
    y: 52,
    floors: 5,
    openTime: "08:00",
    closeTime: "21:00",
    facilities: ["实验室", "卫生间"],
  },
  {
    id: "B030",
    name: "体育馆",
    type: "sports",
    x: 30,
    y: 66,
    floors: 3,
    openTime: "06:30",
    closeTime: "21:30",
    facilities: ["更衣室", "淋浴"],
  },
  {
    id: "B040",
    name: "食堂",
    type: "canteen",
    x: 52,
    y: 72,
    floors: 3,
    openTime: "06:30",
    closeTime: "20:30",
    facilities: ["自助餐", "热水"],
  },
  {
    id: "B050",
    name: "宿舍区",
    type: "dorm",
    x: 74,
    y: 78,
    floors: 6,
    openTime: "00:00",
    closeTime: "23:30",
    facilities: ["快递柜", "洗衣房"],
  },
];

export const buildingTypeLabel: Record<Building["type"], string> = {
  teaching: "教学楼",
  library: "图书馆",
  lab: "实验楼",
  sports: "体育场馆",
  canteen: "餐饮",
  dorm: "生活区",
};

export const classrooms: Classroom[] = [
  {
    id: "B004-301",
    buildingId: "B004",
    room: "301",
    floor: 3,
    capacity: 80,
    facilities: ["插座", "空调", "投影"],
    quietScore: 3,
  },
  {
    id: "B004-302",
    buildingId: "B004",
    room: "302",
    floor: 3,
    capacity: 60,
    facilities: ["插座", "空调"],
    quietScore: 4,
  },
  {
    id: "B004-303",
    buildingId: "B004",
    room: "303",
    floor: 3,
    capacity: 60,
    facilities: ["插座"],
    quietScore: 3,
  },
  {
    id: "B004-201",
    buildingId: "B004",
    room: "201",
    floor: 2,
    capacity: 90,
    facilities: ["空调", "投影"],
    quietScore: 2,
  },
  {
    id: "B004-101",
    buildingId: "B004",
    room: "101",
    floor: 1,
    capacity: 120,
    facilities: ["空调"],
    quietScore: 2,
  },
  {
    id: "B004-401",
    buildingId: "B004",
    room: "401",
    floor: 4,
    capacity: 50,
    facilities: ["插座", "空调"],
    quietScore: 5,
  },
  {
    id: "B002-205",
    buildingId: "B002",
    room: "205",
    floor: 2,
    capacity: 70,
    facilities: ["插座", "空调"],
    quietScore: 3,
  },
  {
    id: "B001-401",
    buildingId: "B001",
    room: "401",
    floor: 4,
    capacity: 50,
    facilities: ["插座"],
    quietScore: 5,
  },
  {
    id: "B010-3A",
    buildingId: "B010",
    room: "三楼A区",
    floor: 3,
    capacity: 120,
    facilities: ["插座", "空调", "台灯"],
    quietScore: 5,
  },
];

export const courses: Course[] = [
  {
    id: "C001",
    name: "高等数学A",
    teacher: "张老师",
    classroomId: "B004-301",
    color: "sky",
    review: {
      difficulty: 4,
      workload: 3,
      recommend: 4,
      aiSummary: "课程节奏偏快，但知识体系完整，建议课前做好预习。",
    },
  },
  {
    id: "C002",
    name: "大学英语",
    teacher: "李老师",
    classroomId: "B002-205",
    color: "violet",
    review: {
      difficulty: 2,
      workload: 3,
      recommend: 4,
      aiSummary: "课堂互动多，口语练习占比高，出勤要求较严格。",
    },
  },
  {
    id: "C003",
    name: "程序设计基础",
    teacher: "王老师",
    classroomId: "B020-机房",
    color: "emerald",
    review: {
      difficulty: 3,
      workload: 4,
      recommend: 5,
      aiSummary: "实践作业较多，跟上每周实验即可获得不错成绩。",
    },
  },
  {
    id: "C004",
    name: "大学物理",
    teacher: "刘老师",
    classroomId: "B004-201",
    color: "amber",
    review: {
      difficulty: 4,
      workload: 3,
      recommend: 3,
      aiSummary: "公式推导密集，建议结合习题册巩固。",
    },
  },
  {
    id: "C005",
    name: "思想政治理论",
    teacher: "陈老师",
    classroomId: "B001-401",
    color: "rose",
    review: {
      difficulty: 2,
      workload: 2,
      recommend: 4,
      aiSummary: "以课堂讨论与论文为主，注意期末论文选题。",
    },
  },
  {
    id: "C006",
    name: "体育",
    teacher: "赵老师",
    classroomId: "B030-场地2",
    color: "teal",
    review: {
      difficulty: 1,
      workload: 1,
      recommend: 5,
      aiSummary: "以体能测试为主，坚持出勤基本无压力。",
    },
  },
];

export const slotTimes = [
  { slot: 1, label: "1-2节", time: "08:00 - 09:40" },
  { slot: 2, label: "3-4节", time: "10:00 - 11:40" },
  { slot: 3, label: "5-6节", time: "14:00 - 15:40" },
  { slot: 4, label: "7-8节", time: "16:00 - 17:40" },
  { slot: 5, label: "9-10节", time: "19:00 - 20:40" },
];

export const weekDays = ["周一", "周二", "周三", "周四", "周五"];

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

export const notices: Notice[] = [
  {
    id: "N001",
    title: "关于2026年下半年全国大学英语四六级考试报名的通知",
    source: "教务处",
    publishedAt: "09-24",
    raw: "各学院、各位同学：\n根据全国大学英语四、六级考试委员会安排，我校2026年下半年CET考试报名工作现已开始。请2026级本科生于10月8日18:00前登录教务系统完成报名，核对本人照片信息，选择考试类型（CET-4/CET-6）并完成网上缴费。逾期系统关闭，不再补报。\n特此通知。",
  },
  {
    id: "N002",
    title: "关于开展2026-2027学年国家奖学金评审工作的通知",
    source: "学生工作处",
    publishedAt: "09-20",
    raw: "各位同学：\n本学年国家奖学金、国家励志奖学金评审工作启动。申请人须在10月15日前提交申请表、成绩单及获奖材料至辅导员处，由学院初审后公示3个工作日。请务必确认材料签字齐全。",
  },
  {
    id: "N003",
    title: "第十二届校园科技文化节活动报名通知",
    source: "校团委",
    publishedAt: "09-18",
    raw: "同学们：\n第十二届校园科技文化节将于10月20日至10月30日举行，设有机器人挑战赛、创意编程赛、科普讲解大赛等项目。以个人或团队形式于10月12日前在“第二课堂”平台报名，每队不超过5人。",
  },
];

export const floorPlans: Record<string, Record<number, FloorRoom[]>> = {
  B004: {
    1: [
      { id: "B004-101", label: "101", kind: "classroom", classroomId: "B004-101", span: 2 },
      { id: "B004-102", label: "102", kind: "classroom" },
      { id: "B004-1-stairs", label: "楼梯", kind: "stairs" },
      { id: "B004-1-toilet", label: "卫生间", kind: "toilet" },
      { id: "B004-1-elevator", label: "电梯", kind: "elevator" },
    ],
    2: [
      { id: "B004-201", label: "201", kind: "classroom", classroomId: "B004-201", span: 2 },
      { id: "B004-202", label: "202", kind: "classroom" },
      { id: "B004-2-stairs", label: "楼梯", kind: "stairs" },
      { id: "B004-2-toilet", label: "卫生间", kind: "toilet" },
      { id: "B004-2-elevator", label: "电梯", kind: "elevator" },
    ],
    3: [
      { id: "B004-301", label: "301", kind: "classroom", classroomId: "B004-301" },
      { id: "B004-302", label: "302", kind: "classroom", classroomId: "B004-302" },
      { id: "B004-303", label: "303", kind: "classroom", classroomId: "B004-303" },
      { id: "B004-3-stairs", label: "楼梯", kind: "stairs" },
      { id: "B004-3-toilet", label: "卫生间", kind: "toilet" },
      { id: "B004-3-elevator", label: "电梯", kind: "elevator" },
    ],
    4: [
      { id: "B004-401", label: "401", kind: "classroom", classroomId: "B004-401", span: 2 },
      { id: "B004-4-stairs", label: "楼梯", kind: "stairs" },
      { id: "B004-4-toilet", label: "卫生间", kind: "toilet" },
      { id: "B004-4-elevator", label: "电梯", kind: "elevator" },
    ],
  },
};

export const getBuilding = (id: string) => buildings.find((b) => b.id === id);
export const getClassroom = (id: string) => classrooms.find((c) => c.id === id);
export const getCourse = (id: string) => courses.find((c) => c.id === id);

/** 把 classroomId（例如 B004-301）转成可读地点，例如 第四教学楼301 */
export function classroomLabel(classroomId: string) {
  const [buildingId, room] = classroomId.split("-");
  const building = getBuilding(buildingId);
  return building ? `${building.name}${room}` : classroomId;
}
