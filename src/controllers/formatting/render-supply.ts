import {MarketTradeGoodSupplyEnum} from "src/controllers/schemas";

export const renderSupply = (current: number, desired: number): MarketTradeGoodSupplyEnum => {
  if (current > desired) {
    return MarketTradeGoodSupplyEnum.Abundant
  } else if (current > 0.66 * desired) {
    return MarketTradeGoodSupplyEnum.Moderate
  } else if (current > 0.33 * desired) {
    return MarketTradeGoodSupplyEnum.Limited
  } else {
    return MarketTradeGoodSupplyEnum.Scarce
  }
}