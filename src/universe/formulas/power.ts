import { BASE_COOLDOWN, POWER_USE_COOLDOWN } from "src/universe/constants";

export const powerUsageCooldown = (
  powerUsed: number,
  powerGenerated: number
) => {
  return Math.max(BASE_COOLDOWN + powerUsed * POWER_USE_COOLDOWN, 1000);
};
