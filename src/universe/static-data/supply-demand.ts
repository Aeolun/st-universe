import { TradeGood } from "src/universe/static-data/trade-goods";

export interface MarketPrice {
  /**
   * The purchase price from the perspective of the waypoint
   */
  purchasePrice: number;
  /**
   * The sale price from the perspective of the waypoint
   */
  salePrice: number;
}

export interface SupplyDemand {
  tradeGood: TradeGood;
  /**
   * Determined by whether the market is a net consumer or producer of the trade good.
   */
  kind: "supply" | "demand" | "exchange";
  stopSaleAt: number;
  lastTickProduction: number;
  lastTickConsumption: number;
  /**
   * Number from -100 to 100 that indicates how close this market is to evolving/devolving (start at 0)
   */
  activity: number;
  localFluctuation: number;
  price?: MarketPrice;
  base: {
    idealSupply: number;
    maxSupply: number;
    productionRate: number;
    consumptionRate: number;
    productionLineConsumptionRate?: number;
    productionLineProductionRate?: number;
  };
  current: {
    tradeVolume: number;
    idealSupply: number;
    maxSupply: number;
    productionRate: number;
    consumptionRate: number;
    productionLineConsumptionRate?: number;
    productionLineProductionRate?: number;
  };
}
