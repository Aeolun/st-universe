import { expect, test } from "vitest";
import { SupplyDemand } from "src/universe/entities/Waypoint";
import { marketPrice } from "src/universe/formulas/trade";
import { TradeGood } from "src/universe/static-data/trade-goods";

test("when supply is ideal, price is equal to base", () => {
  const supplyDemand: SupplyDemand = {
    tradeGood: TradeGood.FOOD,
    current: {
      idealSupply: 100,
      maxSupply: 200,
      consumptionRate: 10,
      productionRate: 0,
      productionLineConsumptionRate: 0,
      productionLineProductionRate: 0,
    },
    base: {
      idealSupply: 100,
      maxSupply: 200,
      consumptionRate: 10,
      productionRate: 0,
      productionLineConsumptionRate: 0,
      productionLineProductionRate: 0,
    },
    stopSaleAt: 20,
    localFluctuation: 0,
    kind: "supply",
    lastTickProduction: 0,
    lastTickConsumption: 0,
  };

  expect(marketPrice(100, supplyDemand)).toMatchObject({
    salePrice: 202,
    purchasePrice: 182,
  });
});

test("when supply is ideal, in large market, price is equal to base", () => {
  // slightly below ideal
  const supplyDemand: SupplyDemand = {
    tradeGood: TradeGood.ALUMINUM,
    current: {
      idealSupply: 6000,
      maxSupply: 12000,
      consumptionRate: 10,
      productionRate: 0,
      productionLineConsumptionRate: 0,
      productionLineProductionRate: 0,
    },
    base: {
      idealSupply: 6000,
      maxSupply: 12000,
      consumptionRate: 10,
      productionRate: 0,
      productionLineConsumptionRate: 0,
      productionLineProductionRate: 0,
    },
    stopSaleAt: 20,
    localFluctuation: 0,
    kind: "demand",
    lastTickProduction: 0,
    lastTickConsumption: 0,
  };

  expect(marketPrice(5953, supplyDemand)).toMatchObject({
    salePrice: 174,
    purchasePrice: 157,
  });

  // slightly over ideal
  const supplyDemand2: SupplyDemand = {
    tradeGood: TradeGood.ALUMINUM,
    current: {
      idealSupply: 6000,
      maxSupply: 12000,
      consumptionRate: 10,
      productionRate: 0,
      productionLineConsumptionRate: 0,
      productionLineProductionRate: 0,
    },
    base: {
      idealSupply: 6000,
      maxSupply: 12000,
      consumptionRate: 10,
      productionRate: 0,
      productionLineConsumptionRate: 0,
      productionLineProductionRate: 0,
    },
    stopSaleAt: 20,
    localFluctuation: 0,
    kind: "demand",
    lastTickProduction: 0,
    lastTickConsumption: 0,
  };

  expect(marketPrice(6047, supplyDemand2)).toMatchObject({
    salePrice: 172,
    purchasePrice: 152,
  });
});

test("when supply is over ideal, purchase price rapidly deteriorates", () => {
  const supplyDemand: SupplyDemand = {
    tradeGood: TradeGood.FOOD,
    current: {
      idealSupply: 100,
      maxSupply: 200,
      consumptionRate: 10,
      productionRate: 0,
      productionLineConsumptionRate: 0,
      productionLineProductionRate: 0,
    },
    base: {
      idealSupply: 100,
      maxSupply: 200,
      consumptionRate: 10,
      productionRate: 0,
      productionLineConsumptionRate: 0,
      productionLineProductionRate: 0,
    },
    stopSaleAt: 20,
    localFluctuation: 0,
    kind: "supply",
    lastTickProduction: 0,
    lastTickConsumption: 0,
  };

  expect(marketPrice(120, supplyDemand)).toMatchObject({
    salePrice: 168,
    purchasePrice: 105,
  });
});

test("localfluctuation adjust prices by a fixed amount", () => {
  const supplyDemand: SupplyDemand = {
    tradeGood: TradeGood.FOOD,
    current: {
      idealSupply: 100,
      maxSupply: 200,
      consumptionRate: 10,
      productionRate: 0,
      productionLineConsumptionRate: 0,
      productionLineProductionRate: 0,
    },
    base: {
      idealSupply: 100,
      maxSupply: 200,
      consumptionRate: 10,
      productionRate: 0,
      productionLineConsumptionRate: 0,
      productionLineProductionRate: 0,
    },
    stopSaleAt: 20,
    localFluctuation: 5,
    kind: "supply",
    lastTickProduction: 0,
    lastTickConsumption: 0,
  };

  expect(marketPrice(100, supplyDemand)).toMatchObject({
    salePrice: 212,
    purchasePrice: 191,
  });
});

test("when supply is empty, price is triple base", () => {
  const supplyDemand: SupplyDemand = {
    tradeGood: TradeGood.FOOD,
    current: {
      idealSupply: 100,
      maxSupply: 200,
      consumptionRate: 10,
      productionRate: 0,
      productionLineConsumptionRate: 0,
      productionLineProductionRate: 0,
    },
    base: {
      idealSupply: 100,
      maxSupply: 200,
      consumptionRate: 10,
      productionRate: 0,
      productionLineConsumptionRate: 0,
      productionLineProductionRate: 0,
    },
    stopSaleAt: 20,
    localFluctuation: 0,
    kind: "supply",
    lastTickProduction: 0,
    lastTickConsumption: 0,
  };

  expect(marketPrice(0, supplyDemand)).toMatchObject({
    salePrice: 606,
    purchasePrice: 364,
  });
});

test("when supply is oversaturated, price is extremely low", () => {
  const supplyDemand: SupplyDemand = {
    tradeGood: TradeGood.FOOD,
    current: {
      idealSupply: 100,
      maxSupply: 200,
      consumptionRate: 10,
      productionRate: 0,
      productionLineConsumptionRate: 0,
      productionLineProductionRate: 0,
    },
    base: {
      idealSupply: 100,
      maxSupply: 200,
      consumptionRate: 10,
      productionRate: 0,
      productionLineConsumptionRate: 0,
      productionLineProductionRate: 0,
    },
    stopSaleAt: 20,
    localFluctuation: 0,
    kind: "supply",
    lastTickProduction: 0,
    lastTickConsumption: 0,
  };

  expect(marketPrice(300, supplyDemand)).toMatchObject({
    salePrice: 7,
    purchasePrice: 6,
  });
});

test("when buying oversaturated market, you cannot make money", () => {
  const supplyDemand: SupplyDemand = {
    tradeGood: TradeGood.FOOD,
    current: {
      idealSupply: 100,
      maxSupply: 200,
      consumptionRate: 10,
      productionRate: 0,
      productionLineConsumptionRate: 0,
      productionLineProductionRate: 0,
    },
    base: {
      idealSupply: 100,
      maxSupply: 200,
      consumptionRate: 10,
      productionRate: 0,
      productionLineConsumptionRate: 0,
      productionLineProductionRate: 0,
    },
    stopSaleAt: 20,
    localFluctuation: 0,
    kind: "supply",
    lastTickProduction: 0,
    lastTickConsumption: 0,
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
    tradeGood: TradeGood.FOOD,
    current: {
      idealSupply: 100,
      maxSupply: 200,
      consumptionRate: 10,
      productionRate: 0,
      productionLineConsumptionRate: 0,
      productionLineProductionRate: 0,
    },
    base: {
      idealSupply: 100,
      maxSupply: 200,
      consumptionRate: 10,
      productionRate: 0,
      productionLineConsumptionRate: 0,
      productionLineProductionRate: 0,
    },
    stopSaleAt: 20,
    localFluctuation: 0,
    kind: "supply",
    lastTickProduction: 0,
    lastTickConsumption: 0,
  };

  expect(marketPrice(200, supplyDemand)).toMatchObject({
    salePrice: 101,
    purchasePrice: 23,
  });
});

test("when supply is half saturated, price is 66% base", () => {
  const supplyDemand: SupplyDemand = {
    tradeGood: TradeGood.FOOD,
    current: {
      idealSupply: 100,
      maxSupply: 200,
      consumptionRate: 10,
      productionRate: 0,
      productionLineConsumptionRate: 0,
      productionLineProductionRate: 0,
    },
    base: {
      idealSupply: 100,
      maxSupply: 200,
      consumptionRate: 10,
      productionRate: 0,
      productionLineConsumptionRate: 0,
      productionLineProductionRate: 0,
    },
    stopSaleAt: 20,
    localFluctuation: 0,
    kind: "supply",
    lastTickProduction: 0,
    lastTickConsumption: 0,
  };

  expect(marketPrice(150, supplyDemand)).toMatchObject({
    salePrice: 135,
    purchasePrice: 54,
  });
});
