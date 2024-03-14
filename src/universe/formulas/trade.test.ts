import { expect, test } from "vitest";
import { SupplyDemand } from "src/universe/entities/Waypoint";
import { marketPrice } from "src/universe/formulas/trade";
import { TradeGood } from "src/universe/static-data/trade-goods";
import { isObservable } from "@tsed/core";

const baseSupplyDemand: SupplyDemand = {
  tradeGood: TradeGood.FOOD,
  current: {
    tradeVolume: 3,
    idealSupply: 100,
    maxSupply: 200,
    productionLineConsumptionRate: 0,
    productionLineProductionRate: 0,
    consumptionRate: 10,
    productionRate: 0,
  },
  base: {
    idealSupply: 100,
    maxSupply: 200,
    productionLineConsumptionRate: 0,
    productionLineProductionRate: 0,
    consumptionRate: 10,
    productionRate: 0,
  },
  stopSaleAt: 20,
  localFluctuation: 0,
  kind: "supply",
  activity: 0,
  lastTickProduction: 0,
  lastTickConsumption: 0,
};

test("when supply is ideal, price is equal to base", () => {
  const supplyDemand = {
    ...baseSupplyDemand,
  };

  expect(marketPrice(100, supplyDemand)).toMatchObject({
    salePrice: 100,
    purchasePrice: 90,
  });
});

test("when supply is ideal, in large market, price is equal to base", () => {
  // slightly below ideal
  const supplyDemand: SupplyDemand = {
    ...baseSupplyDemand,
    tradeGood: TradeGood.ALUMINUM,
    current: {
      ...baseSupplyDemand.current,
      idealSupply: 6000,
      maxSupply: 12000,
    },
  };

  expect(marketPrice(5953, supplyDemand)).toMatchObject({
    salePrice: 163,
    purchasePrice: 147,
  });

  expect(marketPrice(6047, supplyDemand)).toMatchObject({
    salePrice: 161,
    purchasePrice: 142,
  });
});

test("when supply is over ideal, purchase price rapidly deteriorates", () => {
  const supplyDemand: SupplyDemand = {
    ...baseSupplyDemand,
  };

  expect(marketPrice(120, supplyDemand)).toMatchObject({
    salePrice: 83,
    purchasePrice: 52,
  });
});

test("localfluctuation adjust prices by a fixed amount", () => {
  const supplyDemand: SupplyDemand = {
    ...baseSupplyDemand,
  };

  expect(marketPrice(100, supplyDemand)).toMatchObject({
    salePrice: 105,
    purchasePrice: 95,
  });
});

test("when supply is empty, price is triple base", () => {
  const supplyDemand: SupplyDemand = {
    ...baseSupplyDemand,
  };

  expect(marketPrice(0, supplyDemand)).toMatchObject({
    salePrice: 300,
    purchasePrice: 200,
  });
});

test("when supply is oversaturated, price is extremely low", () => {
  const supplyDemand: SupplyDemand = {
    ...baseSupplyDemand,
  };

  expect(marketPrice(300, supplyDemand)).toMatchObject({
    salePrice: 4,
    purchasePrice: 3,
  });
});

test("when buying oversaturated market, you cannot make money", () => {
  const supplyDemand: SupplyDemand = {
    ...baseSupplyDemand,
  };

  let totalCost = 0,
    totalSold = 0;
  let currentSupply = 300;
  for (let i = 0; i < 10; i++) {
    const cost = marketPrice(currentSupply, supplyDemand);
    totalCost += cost.salePrice * 10;
    currentSupply -= 10;
  }
  for (let i = 0; i < 10; i++) {
    const cost = marketPrice(currentSupply, supplyDemand);
    totalSold += cost.purchasePrice * 10;
    currentSupply += 10;
  }
  expect(totalCost).toBeGreaterThan(totalSold);
});

test("when supply is saturated, price is half base", () => {
  const supplyDemand: SupplyDemand = {
    ...baseSupplyDemand,
  };

  expect(marketPrice(200, supplyDemand)).toMatchObject({
    salePrice: 50,
    purchasePrice: 11,
  });
});

test("when supply is half saturated, price is 66% base", () => {
  const supplyDemand: SupplyDemand = {
    ...baseSupplyDemand,
  };

  expect(marketPrice(150, supplyDemand)).toMatchObject({
    salePrice: 67,
    purchasePrice: 27,
  });
});
