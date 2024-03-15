import {
  type TradeGood,
  tradeGoods,
} from "src/universe/static-data/trade-goods";
import { randomBetweenInt } from "src/universe/utilities";
import type { ProductionRates } from "src/universe/helpers/calculate-production";
import { calculateSupplyTotal } from "src/universe/helpers/calculate-supply-total";
import { MAX_SUPPLY_MODIFIER } from "src/universe/constants";
import { SupplyDemand } from "src/universe/static-data/supply-demand";

export const calculateSupplyDemand = (
  goods: Partial<Record<TradeGood, ProductionRates>>,
  population: number
) => {
  const exports: TradeGood[] = [];
  const imports: TradeGood[] = [];
  const exchange: TradeGood[] = [];
  const supplyDemand: Partial<Record<TradeGood, SupplyDemand>> = {};

  for (const value of Object.entries(goods)) {
    const tg = value[0] as TradeGood;
    const rate = value[1] as ProductionRates;

    try {
      const tgProductionRate = rate.production ?? 0;
      const tgConsumptionRate = rate.consumption ?? 0;
      const tgProductionLineProductionRate = rate.productionLineProduction ?? 0;
      const tgProductionLineConsumptionRate =
        rate.productionLineConsumption ?? 0;
      const tgConsumedByConstruction = rate.consumedByConstruction ?? false;

      const tgProductionDiff = tgProductionRate - tgConsumptionRate;
      const productionLineCount =
        tgProductionLineProductionRate - tgProductionLineConsumptionRate;
      const tgTotalProductionDiff =
        tgProductionDiff +
        productionLineCount -
        (tgConsumedByConstruction ? 1 : 0);

      const tradeGoodData = tradeGoods[tg];

      if (tgProductionDiff !== undefined) {
        const idealSupply = calculateSupplyTotal(
          rate,
          tradeGoodData.baseTradeVolume
        );
        const adjustedPopulation = Math.max(population, 1);
        const supplyDemandVal: SupplyDemand = {
          tradeGood: tg,
          kind: "supply",

          lastTickConsumption: 0,
          lastTickProduction: 0,
          stopSaleAt: Math.max(Math.round(idealSupply * 0.2), 1),
          activity: 0,
          base: {
            idealSupply: idealSupply,
            maxSupply: idealSupply * MAX_SUPPLY_MODIFIER,
            productionRate: tgProductionRate,
            consumptionRate: tgConsumptionRate,
          },
          current: {
            tradeVolume: tradeGoodData.baseTradeVolume * adjustedPopulation,
            idealSupply: idealSupply * adjustedPopulation,
            maxSupply: idealSupply * MAX_SUPPLY_MODIFIER * adjustedPopulation,
            productionRate: tgProductionRate * adjustedPopulation,
            consumptionRate: tgConsumptionRate * adjustedPopulation,
          },
          localFluctuation: randomBetweenInt(-10, 10),
        };

        if (tgTotalProductionDiff > 0) {
          // produce
          supplyDemandVal.kind = "supply";
          exports.push(tg);
        } else if (tgTotalProductionDiff < 0) {
          // consumes
          supplyDemandVal.kind = "demand";
          imports.push(tg);
        } else {
          // exchange
          supplyDemandVal.kind = "exchange";

          exchange.push(tg);
        }
        supplyDemand[tg] = supplyDemandVal;
      }
    } catch (e) {
      console.log(`Issue setting consumption rate for ${tg}`);
      console.log(e);
    }
  }

  return {
    exports,
    imports,
    exchange,
    supplyDemand,
  };
};
