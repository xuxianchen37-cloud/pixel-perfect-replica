import { notices, type Notice } from "@/data/campus";

export interface ParsedNotice {
  title: string;
  importance: "高" | "中" | "低";
  summary: string;
  audience: string;
  deadline: string;
  todos: string[];
}

const parsedByNotice: Record<string, ParsedNotice> = {
  N001: {
    title: "四六级考试报名",
    importance: "高",
    summary: "2026级本科生需要在10月8日前完成四六级考试报名。",
    audience: "2026级本科生",
    deadline: "10月8日 18:00",
    todos: ["登录报名系统", "核对个人照片", "选择考试类型", "完成缴费"],
  },
  N002: {
    title: "国家奖学金申请",
    importance: "中",
    summary: "符合条件的同学需在10月15日前向辅导员提交奖学金申请材料。",
    audience: "全体本科生（成绩排名前列者）",
    deadline: "10月15日 17:00",
    todos: ["下载申请表", "打印成绩单", "整理获奖证明", "交辅导员签字"],
  },
  N003: {
    title: "校园科技文化节报名",
    importance: "低",
    summary: "科技文化节10月20日开幕，需在10月12日前于第二课堂平台组队报名。",
    audience: "全校学生（每队不超过5人）",
    deadline: "10月12日 23:59",
    todos: ["确定参赛项目", "组建团队（≤5人）", "在第二课堂平台提交报名"],
  },
};

export function getNotices(): Notice[] {
  return notices;
}

/**
 * AI 通知解析。
 * 第一版：返回模拟结构化结果。
 * 后续：替换为真实 LLM API 调用（保持 Promise<ParsedNotice> 接口）。
 */
export async function parseNoticeWithAI(input: { noticeId?: string; text?: string }): Promise<ParsedNotice> {
  await new Promise((r) => setTimeout(r, 650));

  if (input.noticeId && parsedByNotice[input.noticeId]) {
    return parsedByNotice[input.noticeId]!;
  }

  const text = (input.text ?? "").trim();
  if (!text) throw new Error("请输入需要解析的通知内容");

  return {
    title: text.slice(0, 14) + (text.length > 14 ? "…" : ""),
    importance: text.includes("截止") || text.includes("务必") ? "高" : "中",
    summary: "AI 已提炼该通知要点：请在规定时间前完成相应流程并留意材料要求。",
    audience: "通知中提及的学生群体",
    deadline: "以通知原文时间为准",
    todos: ["阅读通知原文", "准备所需材料", "在截止时间前完成提交"],
  };
}
