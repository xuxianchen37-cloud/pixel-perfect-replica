import type { Building } from "@/data/types";
import { school } from "./school";

const s = school.id;

export const buildings: Building[] = [
  {
    id: "B001",
    schoolId: s,
    name: "图书馆",
    type: "library",
    x: 49.2,
    y: 52.8,
    floorCount: 6,
    openTime: "08:00",
    closeTime: "22:00",
    facilities: [
      "自习区",
      "阅览室",
      "插座",
      "饮水机"
    ],
    tip: "校园中心区域，适合学习、自习和查阅资料。"
  },

  {
    id: "B002",
    schoolId: s,
    name: "体育馆",
    type: "sports",
    x: 7.4,
    y: 39.4,
    floorCount: 2,
    openTime: "06:00",
    closeTime: "22:00",
    facilities: [
      "篮球场",
      "运动场"
    ],
    tip: "校园体育活动主要场所。"
  },

  {
    id: "B003",
    schoolId: s,
    name: "工程训练中心",
    type: "laboratory",
    x: 18.2,
    y: 40.3,
    floorCount: 4,
    openTime: "07:30",
    closeTime: "21:30",
    facilities: [
      "实验室",
      "实践教学空间"
    ],
    tip: "工程实践课程主要地点。"
  },

  {
    id: "B004",
    schoolId: s,
    name: "学生超市",
    type: "service",
    x: 67.8,
    y: 27.8,
    floorCount: 1,
    openTime: "07:00",
    closeTime: "23:00",
    facilities: [
      "购物",
      "生活服务"
    ],
    tip: "学生生活服务区域。"
  },

  {
    id: "B005",
    schoolId: s,
    name: "国际学术交流中心",
    type: "office",
    x: 67.9,
    y: 18.8,
    floorCount: 5,
    openTime: "08:00",
    closeTime: "18:00",
    facilities: [
      "会议室",
      "交流空间"
    ],
    tip: "国际交流和学术活动场所。"
  },

  {
    id: "B006",
    schoolId: s,
    name: "操场",
    type: "sports",
    x: 70.4,
    y: 18.8,
    floorCount: 1,
    openTime: "06:00",
    closeTime: "22:00",
    facilities: [
      "跑道",
      "运动场"
    ],
    tip: "校园运动区域。"
  },

  {
    id: "B007",
    schoolId: s,
    name: "医务室",
    type: "service",
    x: 66.6,
    y: 40.5,
    floorCount: 1,
    openTime: "08:00",
    closeTime: "18:00",
    facilities: [
      "医疗服务"
    ],
    tip: "提供校园医疗服务。"
  },

  {
    id: "B008",
    schoolId: s,
    name: "学生宿舍",
    type: "dormitory",
    x: 78.0,
    y: 30.5,
    floorCount: 6,
    openTime: "00:00",
    closeTime: "24:00",
    facilities: [
      "住宿",
      "生活设施"
    ],
    tip: "学生住宿区域。"
  },

  {
    id: "B009",
    schoolId: s,
    name: "教师公寓",
    type: "dormitory",
    x: 91.2,
    y: 55.0,
    floorCount: 6,
    openTime: "00:00",
    closeTime: "24:00",
    facilities: [
      "住宿"
    ],
    tip: "教师住宿区域。"
  },

  {
    id: "B010",
    schoolId: s,
    name: "北门",
    type: "gate",
    x: 49.2,
    y: 20.8,
    floorCount: 1,
    openTime: "00:00",
    closeTime: "24:00",
    facilities: [
      "出入口"
    ],
    tip: "校园主要入口之一。"
  },

  {
    id: "B011",
    schoolId: s,
    name: "教学楼1",
    type: "teaching",
    x: 43.0,
    y: 81.0,
    floorCount: 5,
    openTime: "07:00",
    closeTime: "22:30",
    facilities: [
      "普通教室",
      "饮水机",
      "卫生间"
    ],
    tip: "本科课程主要教学地点。"
  },

  {
    id: "B012",
    schoolId: s,
    name: "教学楼2",
    type: "teaching",
    x: 42.4,
    y: 34.3,
    floorCount: 5,
    openTime: "07:00",
    closeTime: "22:30",
    facilities: [
      "普通教室",
      "饮水机",
      "卫生间"
    ],
    tip: "教学区域，可用于课程学习和自习。"
  },

  {
    id: "B013",
    schoolId: s,
    name: "教学楼3",
    type: "teaching",
    x: 45.1,
    y: 24.6,
    floorCount: 5,
    openTime: "07:00",
    closeTime: "22:30",
    facilities: [
      "普通教室",
      "饮水机",
      "卫生间"
    ],
    tip: "教学楼区域。"
  }
];
