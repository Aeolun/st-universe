import {SupplyDemand, Waypoint} from "src/universe/entities/Waypoint";
import {TradeGood, tradeGoods} from "src/universe/static-data/trade-goods";
import {ShipConfiguration} from "src/universe/entities/ShipConfiguration";

export function marketPrice(supplyDemand: SupplyDemand) {
  const baseData = tradeGoods[supplyDemand.tradeGood]

  if (!baseData.basePrice) throw new Error(`No base price for ${supplyDemand.tradeGood}. Cannot determine market price.`)

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

export function shipPrice(configuration: ShipConfiguration, waypoint: Waypoint) {
  let total = 0;
  const allShipModules: TradeGood[] = [
    configuration.frame,
    configuration.reactor,
    configuration.engine,
    ...configuration.modules,
    ...configuration.mounts
  ]
  for (const module of allShipModules) {
    const supplyDemand = waypoint.supplyDemand[module]
    if (supplyDemand) {
      const price = marketPrice(supplyDemand)
      total += price.purchasePrice
    }
  }
  return total
}