import { expect, test } from "vitest";
import { SupplyDemand } from "src/universe/entities/Waypoint";
import { marketPrice } from "src/universe/formulas/trade";
import { TradeGood } from "src/universe/static-data/trade-goods";

test("when supply is ideal, price is equal to base", () => {
  const supplyDemand: SupplyDemand = {
    tradeGood: TradeGood.FOOD,
    idealSupply: 100,
    currentSupply: 100,
    maxSupply: 200,
    stopSaleAt: 20,
    consumptionRate: 10,
    productionRate: 0,
    localFluctuation: 0,
    kind: "supply",
    productionLineConsumptionRate: 0,
    productionLineProductionRate: 0,
    lastTickProduction: 0,
    lastTickConsumption: 0,
  };

  expect(marketPrice(supplyDemand)).toMatchObject({
    salePrice: 100,
    purchasePrice: 90,
  });
});

test("when supply is over ideal, purchase price rapidly deteriorates", () => {
  const supplyDemand: SupplyDemand = {
    tradeGood: TradeGood.FOOD,
    idealSupply: 100,
    currentSupply: 120,
    maxSupply: 200,
    stopSaleAt: 20,
    consumptionRate: 10,
    productionRate: 0,
    localFluctuation: 0,
    kind: "supply",
    productionLineConsumptionRate: 0,
    productionLineProductionRate: 0,
    lastTickProduction: 0,
    lastTickConsumption: 0,
  };

  expect(marketPrice(supplyDemand)).toMatchObject({
    salePrice: 83,
    purchasePrice: 52,
  });
});

test("localfluctuation adjust prices by a fixed amount", () => {
  const supplyDemand: SupplyDemand = {
    tradeGood: TradeGood.FOOD,
    idealSupply: 100,
    currentSupply: 100,
    maxSupply: 200,
    stopSaleAt: 20,
    consumptionRate: 10,
    productionRate: 0,
    localFluctuation: 5,
    kind: "supply",
    productionLineConsumptionRate: 0,
    productionLineProductionRate: 0,
    lastTickProduction: 0,
    lastTickConsumption: 0,
  };

  expect(marketPrice(supplyDemand)).toMatchObject({
    salePrice: 105,
    purchasePrice: 95,
  });
});

test("when supply is empty, price is triple base", () => {
  const supplyDemand: SupplyDemand = {
    tradeGood: TradeGood.FOOD,
    idealSupply: 100,
    currentSupply: 0,
    maxSupply: 200,
    stopSaleAt: 20,
    consumptionRate: 10,
    productionRate: 0,
    localFluctuation: 0,
    kind: "supply",
    productionLineConsumptionRate: 0,
    productionLineProductionRate: 0,
    lastTickProduction: 0,
    lastTickConsumption: 0,
  };

  expect(marketPrice(supplyDemand)).toMatchObject({
    salePrice: 300,
    purchasePrice: 200,
  });
});

test("when supply is oversaturated, price is extremely low", () => {
  const supplyDemand: SupplyDemand = {
    tradeGood: TradeGood.FOOD,
    idealSupply: 100,
    currentSupply: 300,
    maxSupply: 200,
    stopSaleAt: 20,
    consumptionRate: 10,
    productionRate: 0,
    localFluctuation: 0,
    kind: "supply",
    productionLineConsumptionRate: 0,
    productionLineProductionRate: 0,
    lastTickProduction: 0,
    lastTickConsumption: 0,
  };

  expect(marketPrice(supplyDemand)).toMatchObject({
    salePrice: 4,
    purchasePrice: 3,
  });
});

test("when buying oversaturated market, you cannot make money", () => {
  const supplyDemand: SupplyDemand = {
    tradeGood: TradeGood.FOOD,
    idealSupply: 100,
    currentSupply: 300,
    maxSupply: 200,
    stopSaleAt: 20,
    consumptionRate: 10,
    productionRate: 0,
    localFluctuation: 0,
    kind: "supply",
    productionLineConsumptionRate: 0,
    productionLineProductionRate: 0,
    lastTickProduction: 0,
    lastTickConsumption: 0,
  };

  let totalCost = 0,
    totalSold = 0;
  for (let i = 0; i < 10; i++) {
    const cost = marketPrice(supplyDemand);
    totalCost += cost.salePrice * 10;
    supplyDemand.currentSupply -= 10;
  }
  for (let i = 0; i < 10; i++) {
    const cost = marketPrice(supplyDemand);
    totalSold += cost.purchasePrice * 10;
    supplyDemand.currentSupply += 10;
  }
  expect(totalCost).toBeGreaterThan(totalSold);
});

test("when supply is saturated, price is half base", () => {
  const supplyDemand: SupplyDemand = {
    tradeGood: TradeGood.FOOD,
    idealSupply: 100,
    currentSupply: 200,
    maxSupply: 200,
    stopSaleAt: 20,
    consumptionRate: 10,
    productionRate: 0,
    localFluctuation: 0,
    kind: "supply",
    productionLineConsumptionRate: 0,
    productionLineProductionRate: 0,
    lastTickProduction: 0,
    lastTickConsumption: 0,
  };

  expect(marketPrice(supplyDemand)).toMatchObject({
    salePrice: 50,
    purchasePrice: 11,
  });
});

test("when supply is half saturated, price is 66% base", () => {
  const supplyDemand: SupplyDemand = {
    tradeGood: TradeGood.FOOD,
    idealSupply: 100,
    currentSupply: 150,
    maxSupply: 200,
    stopSaleAt: 20,
    consumptionRate: 10,
    productionRate: 0,
    localFluctuation: 0,
    kind: "supply",
    productionLineConsumptionRate: 0,
    productionLineProductionRate: 0,
    lastTickProduction: 0,
    lastTickConsumption: 0,
  };

  expect(marketPrice(supplyDemand)).toMatchObject({
    salePrice: 67,
    purchasePrice: 27,
  });
});
