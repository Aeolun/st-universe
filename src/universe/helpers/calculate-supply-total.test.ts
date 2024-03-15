import { expect, test } from "vitest";
import { calculateSupplyTotal } from "src/universe/helpers/calculate-supply-total";

test("test supply total calculation", () => {
  expect(
    calculateSupplyTotal(
      {
        production: 1,
        consumption: 1,
        extraStorage: 2,
        productionLineConsumption: 0,
        productionLineProduction: 0,
        consumedByConstruction: false,
      },
      3
    )
  ).toBe(120);
});

test("test supply total calculation", () => {
  expect(
    calculateSupplyTotal(
      {
        production: 1,
        consumption: 1,
        extraStorage: 2,
        productionLineConsumption: 0,
        productionLineProduction: 0,
        consumedByConstruction: false,
      },
      10
    )
  ).toBe(400);
});
