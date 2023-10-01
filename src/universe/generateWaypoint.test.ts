import { test, expect } from "vitest";
import { generateWaypoint } from "src/universe/generateWaypoint";
import { seedRandom } from "src/universe/utilities";

test("generates waypoints with variable amount of resources extractable", () => {
  seedRandom("test");

  const result = generateWaypoint({
    x: 0,
    y: 0,
    systemSymbol: "TEST",
    type: "ASTEROID_FIELD",
  });

  expect(result.extractableResources).toMatchObject({
    IRON_ORE: 0.96,
    COPPER_ORE: 0.91,
  });
});

test("generated waypoints always start out uncharted", () => {
  seedRandom("test");

  const result = generateWaypoint({
    x: 0,
    y: 0,
    systemSymbol: "TEST",
    type: "ASTEROID_FIELD",
  });

  expect(result.traits).toContain("UNCHARTED");
});

test("waypoints start out with their ideal supply in storage", () => {
  seedRandom("test");

  const result = generateWaypoint({
    x: 0,
    y: 0,
    systemSymbol: "TEST",
    type: "ASTEROID_FIELD",
  });

  expect(result.inventory.resources.FUEL).toEqual(
    result.supplyDemand.FUEL?.current.idealSupply
  );
});

test("population levels modify the ideal supply for a waypoint", () => {
  seedRandom("test");

  const result = generateWaypoint({
    x: 0,
    y: 0,
    systemSymbol: "TEST",
    type: "PLANET",
  });

  expect(result.supplyDemand.FUEL?.current.idealSupply).toEqual(125000);

  result.population = 7;
  result.updateSupplyDemand();

  expect(result.supplyDemand.FUEL?.current.idealSupply).toEqual(175000);
});
