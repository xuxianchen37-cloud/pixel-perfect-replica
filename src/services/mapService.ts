import { buildings, getBuilding, type Building } from "@/data/campus";

export interface RoutePoint {
  x: number;
  y: number;
}

export interface RouteResult {
  from: Building;
  to: Building;
  points: RoutePoint[];
  distanceMeters: number;
  walkMinutes: number;
}

export function searchBuildings(keyword: string): Building[] {
  const k = keyword.trim();
  if (!k) return buildings;
  return buildings.filter((b) => b.name.includes(k) || b.id.toLowerCase().includes(k.toLowerCase()));
}

/**
 * 计算路线。
 * 第一版：使用模拟折线 + 估算距离。
 * 后续：替换为基于 Campus Graph 的 A* 算法，保持相同的输入输出接口。
 */
export function calculateRoute(fromId: string, toId: string): RouteResult | null {
  const from = getBuilding(fromId);
  const to = getBuilding(toId);
  if (!from || !to || from.id === to.id) return null;

  // 模拟折线：先水平后垂直，形成类似道路的路径
  const mid: RoutePoint = { x: to.x, y: from.y };
  const points = [{ x: from.x, y: from.y }, mid, { x: to.x, y: to.y }];

  const gridDistance = Math.abs(to.x - from.x) + Math.abs(to.y - from.y);
  const distanceMeters = Math.round((gridDistance * 11) / 10) * 10;
  const walkMinutes = Math.max(1, Math.round(distanceMeters / 78));

  return { from, to, points, distanceMeters, walkMinutes };
}
