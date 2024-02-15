import { ActivityLevel } from "../schemas";

export const renderActivity = (
  activity: number,
  changePerTick: number,
  maxSupply: number,
  currentSupply: number
): ActivityLevel => {
  if (changePerTick > 0 && currentSupply >= maxSupply) {
    return ActivityLevel.Restricted;
  }
  if (changePerTick < 0 && currentSupply <= 0) {
    return ActivityLevel.Restricted;
  }

  if (activity >= 50) {
    return ActivityLevel.Strong;
  } else if (activity >= 0) {
    return ActivityLevel.Growing;
  } else {
    return ActivityLevel.Weak;
  }
};
