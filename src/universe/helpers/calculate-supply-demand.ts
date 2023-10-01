import { TradeGood, tradeGoods } from "src/universe/static-data/trade-goods";
import { numberBetween } from "src/universe/utilities";
import { SupplyDemand } from "src/universe/entities/Waypoint";
import { ProductionRates } from "src/universe/helpers/calculate-production";

export const calculateSupplyDemand = (
  goods: Partial<Record<TradeGood, ProductionRates>>,
  population: number
) => {
  const exports: TradeGood[] = [];
  const imports: TradeGood[] = [];
  const exchange: TradeGood[] = [];
  const supplyDemand: Partial<Record<TradeGood, SupplyDemand>> = {};

  Object.entries(goods).forEach((value) => {
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
      const supplyTotal =
        tgProductionRate +
        tgConsumptionRate +
        tgProductionLineProductionRate +
        tgProductionLineConsumptionRate +
        Math.max(rate.extraStorage ?? 0, 1);
      const tradeGoodData = tradeGoods[tg];
      if (tgProductionDiff !== undefined) {
        if (tgTotalProductionDiff > 0) {
          // produce
          const idealSupply = tradeGoodData.baseTradeVolume * 10 * supplyTotal;

          exports.push(tg);
          supplyDemand[tg] = {
            tradeGood: tg,
            kind: "supply",

            lastTickConsumption: 0,
            lastTickProduction: 0,
            stopSaleAt: Math.max(Math.round(idealSupply * 0.2), 1),
            base: {
              idealSupply: idealSupply,
              maxSupply: idealSupply * 2,
              productionRate: tgProductionRate,
              consumptionRate: tgConsumptionRate,
              productionLineProductionRate: tgProductionLineProductionRate,
              productionLineConsumptionRate: tgProductionLineConsumptionRate,
            },
            current: {
              idealSupply: idealSupply * population,
              maxSupply: idealSupply * 2 * population,
              productionRate: tgProductionRate * population,
              consumptionRate: tgConsumptionRate * population,
              productionLineProductionRate:
                tgProductionLineProductionRate * population,
              productionLineConsumptionRate:
                tgProductionLineConsumptionRate * population,
            },
            localFluctuation: numberBetween(-10, 10),
          };
        } else if (tgTotalProductionDiff < 0) {
          // consumes
          const idealSupply = tradeGoodData.baseTradeVolume * 10 * supplyTotal;

          imports.push(tg);
          supplyDemand[tg] = {
            tradeGood: tg,
            kind: "demand",
            lastTickConsumption: 0,
            lastTickProduction: 0,
            stopSaleAt: Math.max(Math.round(idealSupply * 0.2), 1),
            base: {
              idealSupply: idealSupply,
              maxSupply: idealSupply * 2,
              productionRate: tgProductionRate,
              consumptionRate: tgConsumptionRate,
              productionLineProductionRate: tgProductionLineProductionRate,
              productionLineConsumptionRate: tgProductionLineConsumptionRate,
            },
            current: {
              idealSupply: idealSupply * population,
              maxSupply: idealSupply * 2 * population,
              productionRate: tgProductionRate * population,
              consumptionRate: tgConsumptionRate * population,
              productionLineProductionRate:
                tgProductionLineProductionRate * population,
              productionLineConsumptionRate:
                tgProductionLineConsumptionRate * population,
            },
            localFluctuation: numberBetween(-10, 10),
          };
        } else {
          // exchange
          const idealSupply = tradeGoodData.baseTradeVolume * 10 * supplyTotal;

          exchange.push(tg);
          supplyDemand[tg] = {
            tradeGood: tg,
            kind: "exchange",
            lastTickConsumption: 0,
            lastTickProduction: 0,
            stopSaleAt: Math.max(Math.round(idealSupply * 0.2), 1),
            base: {
              idealSupply: idealSupply,
              maxSupply: idealSupply * 2,
              productionRate: tgProductionRate,
              consumptionRate: tgConsumptionRate,
              productionLineProductionRate: tgProductionLineProductionRate,
              productionLineConsumptionRate: tgProductionLineConsumptionRate,
            },
            current: {
              idealSupply: idealSupply * population,
              maxSupply: idealSupply * 2 * population,
              productionRate: tgProductionRate * population,
              consumptionRate: tgConsumptionRate * population,
              productionLineProductionRate:
                tgProductionLineProductionRate * population,
              productionLineConsumptionRate:
                tgProductionLineConsumptionRate * population,
            },
            localFluctuation: numberBetween(-10, 10),
          };
        }
      }
    } catch (e) {
      console.log(`Issue setting consumption rate for ${tg}`);
      console.log(e);
    }
  });

  return {
    exports,
    imports,
    exchange,
    supplyDemand,
  };
};
