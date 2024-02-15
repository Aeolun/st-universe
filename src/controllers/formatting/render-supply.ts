import { SupplyLevel } from "../schemas";

export const renderSupply = (
  current: number,
  desired: number
): SupplyLevel => {
  if (current > desired * 1.5) {
    return SupplyLevel.Abundant;
  } else if (current > 0.75 * desired) {
    return SupplyLevel.Moderate;
  } else if (current > 0.25 * desired) {
    return SupplyLevel.Limited;
  } else {
    return SupplyLevel.Scarce;
  }
};
