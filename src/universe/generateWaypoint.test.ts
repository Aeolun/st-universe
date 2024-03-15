import { test, expect } from "vitest";
import { generateWaypoint } from "src/universe/generateWaypoint";
import { seedRandom } from "src/universe/utilities";

test("generates waypoints with variable amount of resources extractable", () => {
  seedRandom("test");

  const result = generateWaypoint({
    name: "A1",
    x: 0,
    y: 0,
    systemSymbol: "TEST",
    type: "ASTEROID",
    traits: ["COMMON_METAL_DEPOSITS"],
  });

  expect(result.extractableResources).toMatchObject({
    ALUMINUM_ORE: 1.95,
    IRON_ORE: 1.1,
    COPPER_ORE: 0.96,
  });
});

test("generated waypoints always start out uncharted", () => {
  seedRandom("test");

  const result = generateWaypoint({
    name: "A1",
    x: 0,
    y: 0,
    systemSymbol: "TEST",
    type: "ENGINEERED_ASTEROID",
  });

  expect(result.traits).toContain("UNCHARTED");
});

test("waypoints start out with their ideal supply in storage", () => {
  seedRandom("test");

  const result = generateWaypoint({
    name: "A1",
    x: 0,
    y: 0,
    systemSymbol: "TEST",
    type: "ENGINEERED_ASTEROID",
  });

  expect(result.inventory.resources.FUEL).toEqual(
    result.supplyDemand.FUEL?.current.idealSupply
  );
});
