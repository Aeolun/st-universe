import { seedRandom } from "src/universe/utilities";
import { test, expect } from "vitest";
import { generateSystem } from "src/universe/generateSystem";

test("generate system assigns correct names to waypoints", () => {
  seedRandom("test");

  const system = generateSystem({
    x: 0,
    y: 0,
    universeSymbol: "TEST",
    starType: "RED_STAR",
  });

  expect(
    system.waypoints.slice(0, 2).map((wp) => {
      return {
        name: wp.symbol,
        x: wp.x,
        y: wp.y,
        orbits: wp.inOrbitOf,
        type: wp.type,
      };
    })
  ).toMatchObject([
    {
      name: "TEST-WKZH-A1",
      type: "GAS_GIANT",
      x: 16,
      y: 23,
      orbits: undefined,
    },
    {
      name: "TEST-WKZH-A2",
      orbits: "TEST-WKZH-A1",
      type: "ORBITAL_STATION",
      x: 16,
      y: 23,
    },
  ]);
});
