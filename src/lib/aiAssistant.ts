import { getTodaySchedule } from "@/services/scheduleService";
import { recommendStudySpace } from "@/services/studyService";
import { buildingIdOf, buildings, campusDefaults, getBuilding } from "@/data/campus";

export interface AiReply {
  text: string;
  buildingId?: string | undefined;
}

/**
 * 校园问答。第一版基于当前学校数据包做规则式回答，
 * 后续替换为真实 LLM + 校园知识库检索。
 */
export async function askCampusAI(question: string): Promise<AiReply> {
  await new Promise((r) => setTimeout(r, 600));
  const q = question.trim();

  const matchedBuilding = buildings.find((b) => q.includes(b.name));
  if (matchedBuilding) {
    return {
      text: `${matchedBuilding.name}的开放时间是 ${matchedBuilding.openTime} - ${matchedBuilding.closeTime}，从你当前位置步行约 8 分钟。`,
      buildingId: matchedBuilding.id,
    };
  }

  const first = getTodaySchedule()[0];
  const courseReply = (): AiReply | null =>
    first
      ? {
          text: `你的第一节${first.course.name}在${first.location}，${first.time}上课，距离当前位置约8分钟。`,
          buildingId: buildingIdOf(first.course.classroomId),
        }
      : null;

  if (q.includes("第一节") || q.includes("课")) {
    const r = courseReply();
    if (r) return r;
  }

  if (q.includes("自习") || q.includes("空教室")) {
    const s = recommendStudySpace()[0];
    if (s) {
      return {
        text: `推荐${s.name}，${s.availableFrom} - ${s.availableTo} 空闲，${s.tags.join("、")}，距离约${s.distanceMeters}米。`,
        buildingId: s.buildingId,
      };
    }
  }

  const fallback = courseReply();
  if (fallback) return fallback;
  const focus = getBuilding(campusDefaults.focusBuildingId);
  return { text: "你可以问我建筑位置、今天的课程或空闲教室。", buildingId: focus?.id };
}
