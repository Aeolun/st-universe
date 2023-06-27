import { expect, test } from "vitest";
import { refine } from "src/controllers/helpers/refine";
import { moduleData } from "src/universe/static-data/ship-modules";
import { Storage } from "src/universe/entities/Storage";
import { TradeGood } from "src/universe/static-data/trade-goods";

test("can refine iron ore in cargo", () => {
  const cargo = new Storage({
    IRON_ORE: 100,
  });

  expect(
    refine([moduleData["MODULE_ORE_REFINERY_I"]], cargo, TradeGood.IRON)
  ).toMatchObject({
    totalRefined: 10,
    consumed: [
      {
        tradeSymbol: "IRON_ORE",
        units: 30,
      },
    ],
    produced: [
      {
        tradeSymbol: "IRON",
        units: 10,
      },
    ],
    canRefine: true,
  });
  expect(cargo.get(TradeGood.IRON)).toBe(10);
  expect(cargo.get(TradeGood.IRON_ORE)).toBe(70);
});

test("can refine more iron ore with two refineries", () => {
  const cargo = new Storage({
    IRON_ORE: 100,
  });

  expect(
    refine(
      [
        moduleData["MODULE_ORE_REFINERY_I"],
        moduleData["MODULE_ORE_REFINERY_I"],
      ],
      cargo,
      TradeGood.IRON
    )
  ).toMatchObject({
    totalRefined: 20,
    consumed: [
      {
        tradeSymbol: "IRON_ORE",
        units: 60,
      },
    ],
    produced: [
      {
        tradeSymbol: "IRON",
        units: 20,
      },
    ],
    canRefine: true,
  });
  expect(cargo.get(TradeGood.IRON)).toBe(20);
  expect(cargo.get(TradeGood.IRON_ORE)).toBe(40);
});

test("can not refine resources not supported by refinery", () => {
  const cargo = new Storage({
    IRON_ORE: 100,
  });

  expect(
    refine([moduleData["MODULE_ORE_REFINERY_I"]], cargo, TradeGood.SHIP_PLATING)
  ).toMatchObject({
    totalRefined: 0,
    consumed: [],
    produced: [],
    canRefine: false,
  });
});

test("can not refine resources with no refinery", () => {
  const cargo = new Storage({
    IRON_ORE: 100,
  });

  expect(
    refine([moduleData["MODULE_CARGO_HOLD_I"]], cargo, TradeGood.SHIP_PLATING)
  ).toMatchObject({
    totalRefined: 0,
    consumed: [],
    produced: [],
    canRefine: false,
  });
});
