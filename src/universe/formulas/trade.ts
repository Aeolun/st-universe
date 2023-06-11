import {SupplyDemand} from "src/universe/entities/Waypoint";
import {tradeGoods} from "src/universe/static-data/trade-goods";

export function marketPrice(supplyDemand: SupplyDemand) {
  const baseData = tradeGoods[supplyDemand.tradeGood]
  if (supplyDemand.currentSupply > supplyDemand.idealSupply) {
    return baseData.basePrice / (supplyDemand.currentSupply / supplyDemand.idealSupply * 2)
  } else {
    return baseData.basePrice * Math.min(supplyDemand.idealSupply / supplyDemand.currentSupply, 3)
  }
}

export function salePrice(marketPrice: number, supplyDemand: SupplyDemand) {
  if (supplyDemand.currentSupply < supplyDemand.stopSaleAt) {
    return marketPrice * 5
  } else {
    return marketPrice * 1.2
  }
}