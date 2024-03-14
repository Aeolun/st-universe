import { expect, test } from "vitest";
import { Waypoint } from "src/universe/entities/Waypoint";
import { TradeGood } from "src/universe/static-data/trade-goods";

test("waypoint tick works", () => {
  const waypoint = new Waypoint({
    x: 0,
    y: 0,
    systemSymbol: "BLA_BLA",
    type: "ORBITAL_STATION",
    symbol: "BLA",
  });
  waypoint.productionLines.push({
    produces: TradeGood.ADVANCED_CIRCUITRY,
    count: 1,
  });

  waypoint.supplyDemand["ADVANCED_CIRCUITRY"] = {
    current: {
      productionLineProductionRate: 1,
      productionRate: 0,
      productionLineConsumptionRate: 0,
      consumptionRate: 0,
      tradeVolume: 3,
      idealSupply: 100,
      maxSupply: 200,
    },
    base: {
      productionLineProductionRate: 1,
      productionRate: 0,
      productionLineConsumptionRate: 0,
      consumptionRate: 0,
      idealSupply: 100,
      maxSupply: 200,
    },
    stopSaleAt: 0,
    lastTickConsumption: 0,
    lastTickProduction: 0,
    kind: "supply",
    activity: 0,
    tradeGood: TradeGood.ADVANCED_CIRCUITRY,

    localFluctuation: 1,
  };

  waypoint.supplyDemand["ELECTRONICS"] = {
    current: {
      productionLineProductionRate: 0,
      productionRate: 0,
      productionLineConsumptionRate: 3,
      consumptionRate: 0,
      tradeVolume: 6,
      idealSupply: 100,
      maxSupply: 200,
    },
    base: {
      productionLineProductionRate: 0,
      productionRate: 0,
      productionLineConsumptionRate: 3,
      consumptionRate: 0,
      idealSupply: 100,
      maxSupply: 200,
    },
    stopSaleAt: 0,
    lastTickConsumption: 0,
    lastTickProduction: 0,
    kind: "demand",
    activity: 0,
    tradeGood: TradeGood.ELECTRONICS,
    localFluctuation: 1,
  };

  waypoint.supplyDemand["MICROPROCESSORS"] = {
    current: {
      productionLineProductionRate: 0,
      productionRate: 0,
      productionLineConsumptionRate: 2,
      consumptionRate: 0,
      tradeVolume: 6,
      idealSupply: 100,
      maxSupply: 200,
    },
    base: {
      productionLineProductionRate: 0,
      productionRate: 0,
      productionLineConsumptionRate: 2,
      consumptionRate: 0,
      idealSupply: 100,
      maxSupply: 200,
    },
    stopSaleAt: 0,
    lastTickConsumption: 0,
    lastTickProduction: 0,
    kind: "demand",
    activity: 0,
    tradeGood: TradeGood.MICROPROCESSORS,
    localFluctuation: 1,
  };

  waypoint.inventory.set("ADVANCED_CIRCUITRY", 0);
  waypoint.inventory.set("ELECTRONICS", 100);
  waypoint.inventory.set("MICROPROCESSORS", 100);

  waypoint.tick(3000);

  expect(waypoint.inventory.get("ADVANCED_CIRCUITRY")).toEqual(1);
  expect(waypoint.inventory.get("ELECTRONICS")).toEqual(97);
  expect(waypoint.inventory.get("MICROPROCESSORS")).toEqual(98);

  expect(waypoint.supplyDemand["ADVANCED_CIRCUITRY"].activity).toEqual(1);
  expect(waypoint.supplyDemand["ELECTRONICS"].activity).toEqual(1);
  expect(waypoint.supplyDemand["MICROPROCESSORS"].activity).toEqual(1);
});
