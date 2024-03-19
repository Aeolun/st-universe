import { expect, test } from "vitest";
import { marketPrice } from "src/universe/formulas/trade";
import { TradeGood } from "src/universe/static-data/trade-goods";
import { isObservable } from "@tsed/core";
import { SupplyDemand } from "src/universe/static-data/supply-demand";

test("when supply is ideal, price is equal to base", () => {
  expect(marketPrice(100, 200, 200, 400)).toMatchObject({
    salePrice: 100,
    purchasePrice: 90,
  });
});

test("price does never become zero", () => {
  expect(marketPrice(248, 2160, 200, 400)).toMatchObject({
    salePrice: 1,
    purchasePrice: 1,
  });
});

test("when supply is ideal, in large market, price is equal to base", () => {
  expect(marketPrice(173, 6000, 6000, 12000)).toMatchObject({
    salePrice: 173,
    purchasePrice: 156,
  });

  expect(marketPrice(173, 6100, 6000, 12000)).toMatchObject({
    salePrice: 170,
    purchasePrice: 148,
  });
});

test("when supply is over ideal, purchase price rapidly deteriorates", () => {
  expect(marketPrice(100, 240, 200, 400)).toMatchObject({
    salePrice: 83,
    purchasePrice: 52,
  });
});

test("localfluctuation adjust prices by a fixed percentage", () => {
  expect(marketPrice(100, 200, 200, 400, 5)).toMatchObject({
    salePrice: 105,
    purchasePrice: 95,
  });
});

test("when supply is empty, price is triple base", () => {
  expect(marketPrice(100, 0, 200, 400)).toMatchObject({
    salePrice: 300,
    purchasePrice: 180,
  });
});

test("when supply is oversaturated, price is extremely low", () => {
  expect(marketPrice(100, 600, 200, 400)).toMatchObject({
    salePrice: 4,
    purchasePrice: 3,
  });
});

test("when buying oversaturated market, you cannot make money", () => {
  let totalCost = 0;
  let totalSold = 0;
  let currentSupply = 300;
  for (let i = 0; i < 10; i++) {
    const cost = marketPrice(100, currentSupply, 200, 400);
    totalCost += cost.salePrice * 10;
    currentSupply -= 10;
  }
  for (let i = 0; i < 10; i++) {
    const cost = marketPrice(100, currentSupply, 200, 400);
    totalSold += cost.purchasePrice * 10;
    currentSupply += 10;
  }
  expect(totalCost).toBeGreaterThan(totalSold);
});

test("when selling to deprived market, you cannot make money", () => {
  let totalCost = 0;
  let totalSold = 0;
  let currentSupply = 50;
  for (let i = 0; i < 10; i++) {
    const cost = marketPrice(100, currentSupply, 200, 400);
    totalSold += cost.purchasePrice * 10;
    currentSupply += 10;
  }
  for (let i = 0; i < 10; i++) {
    const cost = marketPrice(100, currentSupply, 200, 400);
    totalCost += cost.salePrice * 10;
    currentSupply -= 10;
  }

  expect(totalCost).toBeGreaterThan(totalSold);
});

test("when supply is saturated, price is half base", () => {
  expect(marketPrice(100, 400, 200, 400)).toMatchObject({
    salePrice: 50,
    purchasePrice: 11,
  });
});

test("when supply is half saturated, price is 66% base", () => {
  expect(marketPrice(150, 300, 200, 400)).toMatchObject({
    salePrice: 100,
    purchasePrice: 40,
  });
});
