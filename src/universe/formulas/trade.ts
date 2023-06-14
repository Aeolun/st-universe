import {SupplyDemand} from "src/universe/entities/Waypoint";
import {tradeGoods} from "src/universe/static-data/trade-goods";

export function marketPrice(supplyDemand: SupplyDemand) {
  const baseData = tradeGoods[supplyDemand.tradeGood]

  let salePrice = 0, purchasePrice = 0
  if (supplyDemand.currentSupply > supplyDemand.maxSupply) {
    // supply saturated
    salePrice = baseData.basePrice / Math.pow(supplyDemand.currentSupply / supplyDemand.idealSupply, 3)
    purchasePrice = baseData.basePrice / Math.pow(supplyDemand.currentSupply / supplyDemand.idealSupply, 3) * 0.8
  } else if (supplyDemand.currentSupply >= supplyDemand.idealSupply) {
    // demand satisfied
    salePrice = baseData.basePrice / (supplyDemand.currentSupply / supplyDemand.idealSupply)
    purchasePrice = baseData.basePrice / Math.pow(supplyDemand.currentSupply / supplyDemand.idealSupply, 3) * 0.9
  } else {
    // demand not satisfied
    salePrice = baseData.basePrice * Math.min(supplyDemand.idealSupply / supplyDemand.currentSupply, 3)
    purchasePrice = baseData.basePrice * (1+((supplyDemand.idealSupply - supplyDemand.currentSupply) / supplyDemand.idealSupply))
  }

  const fluct = (1+supplyDemand.localFluctuation/100)
  return {
    purchasePrice: Math.round(purchasePrice*fluct),
    salePrice: Math.round(salePrice*fluct),
  }
}