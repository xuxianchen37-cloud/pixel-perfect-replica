import { getTodaySchedule } from "@/services/scheduleService";
import { buildings, getCourse } from "@/data/campus";

export interface AiReply {
  text: string;
  buildingId?: string;
}

/**
 * 校园问答。第一版返回基于 mock 数据的规则式回答，
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

  if (q.includes("高数") || q.includes("第一节") || q.includes("课")) {
    const first = getTodaySchedule()[0];
    if (first) {
      const course = getCourse(first.entry.courseId);
      const buildingId = course?.classroomId.split("-")[0];
      return {
        text: `你的第一节${first.course.name}在${first.location}，${first.time}上课，距离当前位置约8分钟。`,
        buildingId,
      };
    }
  }

  if (q.includes("自习") || q.includes("空教室")) {
    return {
      text: "推荐第四教学楼302，14:00 - 17:00 空闲，安静且有插座，距离约340米。",
      buildingId: "B004",
    };
  }

  return {
    text: "你的第一节高等数学在第四教学楼301，距离当前位置约8分钟。",
    buildingId: "B004",
  };
}
