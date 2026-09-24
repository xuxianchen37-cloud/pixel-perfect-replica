import { getNotice, notices, type Notice, type NoticeAnalysis } from "@/data/campus";

export type ParsedNotice = NoticeAnalysis;

export function getNotices(): Notice[] {
  return notices;
}

/** 首页等处展示的重点通知：优先取重要程度为「高」的 */
export function getImportantNotice(): Notice | undefined {
  return notices.find((n) => n.analysis?.importance === "高") ?? notices[0];
}

/**
 * AI 通知解析。
 * 第一版：返回数据包中预置的结构化结果。
 * 后续：替换为真实 LLM API 调用（保持 Promise<ParsedNotice> 接口）。
 */
export async function parseNoticeWithAI(input: { noticeId?: string; text?: string }): Promise<ParsedNotice> {
  await new Promise((r) => setTimeout(r, 650));

  const preset = input.noticeId ? getNotice(input.noticeId)?.analysis : undefined;
  if (preset) return preset;

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
