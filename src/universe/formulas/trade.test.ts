import {expect, test} from "vitest";
import {SupplyDemand} from "src/universe/entities/Waypoint";
import {marketPrice} from "src/universe/formulas/trade";

test("when supply is ideal, price is equal to base", () => {
  const supplyDemand: SupplyDemand = {
    tradeGood: "FOOD",
    idealSupply: 100,
    currentSupply: 100,
    maxSupply: 200,
    stopSaleAt: 20,
    consumptionRate: 10,
    productionRate: 0,
  }

  expect(marketPrice(supplyDemand)).toBe(100);
})

test("when supply is empty, price is triple base", () => {
  const supplyDemand: SupplyDemand = {
    tradeGood: "FOOD",
    idealSupply: 100,
    currentSupply: 0,
    maxSupply: 200,
    stopSaleAt: 20,
    consumptionRate: 10,
    productionRate: 0,
  }

  expect(marketPrice(supplyDemand)).toBe(300);
})

test("when supply is saturated, price is quarter base", () => {
  const supplyDemand: SupplyDemand = {
    tradeGood: "FOOD",
    idealSupply: 100,
    currentSupply: 200,
    maxSupply: 200,
    stopSaleAt: 20,
    consumptionRate: 10,
    productionRate: 0,
  }

  expect(marketPrice(supplyDemand)).toBe(25);
})

test("when supply is half saturated, price is half base", () => {
  const supplyDemand: SupplyDemand = {
    tradeGood: "FOOD",
    idealSupply: 100,
    currentSupply: 150,
    maxSupply: 200,
    stopSaleAt: 20,
    consumptionRate: 10,
    productionRate: 0,
  }

  expect(marketPrice(supplyDemand)).toBeCloseTo(33.33, 2);
})