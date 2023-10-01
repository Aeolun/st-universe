import { test, expect } from "vitest";
import { calculateProduction } from "src/universe/helpers/calculate-production";

test("industries produce resources", () => {
  const production = calculateProduction(
    [],
    {
      MINING: 1,
    },
    []
  );

  expect(production.IRON_ORE?.production).toEqual(1);
  expect(production.MACHINERY?.consumption).toEqual(1);
});

test("industries with higher value require/generate more resources", () => {
  const production = calculateProduction(
    [],
    {
      MINING: 2,
    },
    []
  );

  expect(production.IRON_ORE?.production).toEqual(2);
  expect(production.MACHINERY?.consumption).toEqual(2);
});
