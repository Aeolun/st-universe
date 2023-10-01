import { expect, test } from "vitest";
import { extractResources } from "src/controllers/helpers/extract-resources";
import { seedRandom } from "src/universe/utilities";
import { mountData } from "src/universe/static-data/ship-mounts";
import { Waypoint } from "src/universe/entities/Waypoint";
import { Survey } from "src/controllers/schemas";

test("mining generates expected resources", () => {
  seedRandom("test");
  const wp = new Waypoint({
    x: 0,
    y: 0,
    symbol: "TEST",
    systemSymbol: "TEST",
    type: "ASTEROID_FIELD",
  });
  wp.extractableResources = {
    GOLD_ORE: 1,
    IRON_ORE: 1,
    COPPER_ORE: 1,
  };
  expect(
    extractResources([mountData["MOUNT_MINING_LASER_I"]], wp)
  ).toMatchObject({
    powerUsage: 1,
    resource: "COPPER_ORE",
    extracted: 9,
  });
});

test("mining always generates a whole number of resources", () => {
  seedRandom("test");
  const wp = new Waypoint({
    x: 0,
    y: 0,
    symbol: "TEST",
    systemSymbol: "TEST",
    type: "ASTEROID_FIELD",
  });
  wp.extractableResources = {
    GOLD_ORE: 0.43,
    IRON_ORE: 0.341,
    COPPER_ORE: 0.467,
  };
  expect(
    extractResources([mountData["MOUNT_MINING_LASER_I"]], wp)
  ).toMatchObject({
    powerUsage: 1,
    resource: "COPPER_ORE",
    extracted: 5,
  });
});

test("mining at location with extra resources generates more resources", () => {
  seedRandom("test");
  const wp = new Waypoint({
    x: 0,
    y: 0,
    symbol: "TEST",
    systemSymbol: "TEST",
    type: "ASTEROID_FIELD",
  });
  wp.extractableResources = {
    GOLD_ORE: 1,
    IRON_ORE: 1,
    COPPER_ORE: 2,
  };
  expect(
    extractResources([mountData["MOUNT_MINING_LASER_I"]], wp)
  ).toMatchObject({
    powerUsage: 1,
    resource: "COPPER_ORE",
    extracted: 18,
  });

  seedRandom("test3");
  expect(
    extractResources([mountData["MOUNT_MINING_LASER_I"]], wp)
  ).toMatchObject({
    powerUsage: 1,
    resource: "IRON_ORE",
    extracted: 6,
  });
});

test("mining with survey generates expected resources", () => {
  seedRandom("test");
  const wp = new Waypoint({
    x: 0,
    y: 0,
    symbol: "TEST",
    systemSymbol: "TEST",
    type: "ASTEROID_FIELD",
  });
  const survey: Survey = {
    symbol: "TEST",
    deposits: [
      {
        symbol: "COPPER_ORE",
      },
    ],
    signature: "",
    size: "SMALL",
    expiration: new Date().toISOString(),
  };
  wp.extractableResources = {
    GOLD_ORE: 1,
    IRON_ORE: 1,
    COPPER_ORE: 1,
  };
  expect(
    extractResources([mountData["MOUNT_MINING_LASER_I"]], wp, survey)
  ).toMatchObject({
    powerUsage: 1,
    resource: "COPPER_ORE",
    extracted: 18,
  });
});
