import { seedRandom } from "src/universe/utilities";
import { generateWaypoint } from "src/universe/generateWaypoint";
import { expect, test } from "vitest";
import { calculateSupplyDemand } from "src/universe/helpers/calculate-supply-demand";

test("population levels modify the ideal supply for a waypoint", () => {
  seedRandom("test");

  const goods = {
    FUEL: {
      production: 1,
      consumption: 1,
      extraStorage: 2,
      productionLineConsumption: 0,
      productionLineProduction: 0,
      consumedByConstruction: false,
    },
  };
  const result = calculateSupplyDemand(goods, 2);

  expect(result.supplyDemand.FUEL?.current.idealSupply).toEqual(800);

  const result2 = calculateSupplyDemand(goods, 7);

  expect(result2.supplyDemand.FUEL?.current.idealSupply).toEqual(2800);
});
