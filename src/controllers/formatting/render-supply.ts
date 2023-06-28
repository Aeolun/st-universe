import { MarketTradeGoodSupplyEnum } from "src/controllers/schemas";

export const renderSupply = (
  current: number,
  desired: number
): MarketTradeGoodSupplyEnum => {
  if (current > desired * 1.5) {
    return MarketTradeGoodSupplyEnum.Abundant;
  } else if (current > 0.75 * desired) {
    return MarketTradeGoodSupplyEnum.Moderate;
  } else if (current > 0.25 * desired) {
    return MarketTradeGoodSupplyEnum.Limited;
  } else {
    return MarketTradeGoodSupplyEnum.Scarce;
  }
};
