import { constantToMap, constantToKeyMap } from "utils/constant";
const sourceMap = {
  CABIN: {
    label: "机舱温度",
    key: "cabin",
  },
  EV: {
    label: "环境温度",
    key: "ev",
  },
  GEAR_CASE: {
    label: "齿轮箱温度",
    key: "gearCase",
  },
} as const;

export type EQUIPMENT_KEY_TYPE = "cabin" | "ev" | "gearCase"

export const EQUIPMENTS_KEY_MAP =
  constantToKeyMap<typeof sourceMap>(sourceMap);
export const EQUIPMENTS_STATUS_MAP =
  constantToMap<typeof sourceMap>(sourceMap);
