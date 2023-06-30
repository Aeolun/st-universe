import { test, expect } from "vitest";
import { Ship } from "src/universe/entities/Ship";
import { Configuration } from "src/universe/static-data/ship-configurations";

test("ship has expected stats", () => {
  const ship = new Ship({
    symbol: "test",
    configuration: Configuration.SHIP_COMMAND_FRIGATE,
    agentSymbol: "test",
    role: "COMMAND",
    waypoint: {
      x: 0,
      y: 0,
      symbol: "",
      systemSymbol: "",
      type: "ORBITAL_STATION",
    },
  });

  expect(ship.reactor.stats.powerGenerated).toBe(40);
  expect(ship.stats.powerGenerated).toBe(40);
  expect(ship.stats.crewCapacity).toBe(60);
  expect(ship.stats.warpRange).toBe(2000);
  expect(ship.stats.thrust).toBe(30);
  expect(ship.stats.scanPower).toBe(1);
  expect(ship.stats.cargoSpace).toBe(60);
  expect(ship.stats.moduleCapacity).toBe(8);
  expect(ship.stats.mountingPoints).toBe(5);
});
