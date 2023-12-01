import {
  numberBetween,
  percentageChance,
  pickRandom,
  randomString,
  randomWeightedKey,
  trulyUniqId,
  uniqueId,
} from "./utilities";
import { System } from "./entities/System";
import { starTypeNames, starTypes } from "./static-data/star-types";
import {
  generateWaypoint,
  WaypointGenerationProperties,
} from "./generateWaypoint";
import { Waypoint } from "./entities/Waypoint";
import { getDistance } from "src/universe/getDistance";
import { waypointTypes } from "src/universe/static-data/waypoint-types";

const INNER_SYSTEM_SIZE = 100;
const ASTEROID_BELT_START = 200;
const BELT_WIDTH = 50;
const ASTEROID_COUNT = 30;
const OUTER_SYSTEM_SIZE = 800;

export const generateSystem = (data: {
  name: string;
  x: number;
  y: number;
  universeSymbol: string;
  jumpGateSpecs?: {
    connections: number;
  };
  waypoints?: (Omit<WaypointGenerationProperties, "systemSymbol"> & {
    orbitals?: Omit<WaypointGenerationProperties, "systemSymbol">[];
  })[];
}) => {
  console.log("== system generation ==");
  let systemSymbol = `${data.universeSymbol}-${data.name}`;

  const systemType = pickRandom(starTypeNames);

  const system = new System({
    x: data.x,
    y: data.y,
    type: systemType,
    sectorSymbol: data.universeSymbol,
    symbol: systemSymbol,
  });

  const systemData = starTypes[systemType];

  if (data.waypoints) {
    data.waypoints.forEach((wp) => {
      const waypoint = generateWaypoint({
        ...wp,
        systemSymbol: system.symbol,
      });
      system.waypoints.push(waypoint);

      wp.orbitals?.forEach((o) => {
        const orbital = generateWaypoint({
          ...o,
          systemSymbol: system.symbol,
          inOrbitOf: waypoint.symbol,
        });
        waypoint.orbitals.push(orbital);
        system.waypoints.push(orbital);
      });
    });
  } else {
    const waypointCount = numberBetween(
      systemData.waypoints.min,
      systemData.waypoints.max
    );
    const beltCount = numberBetween(systemData.belts.min, systemData.belts.max);

    const waypoints: Waypoint[] = [];
    const distancePerWaypoint = (INNER_SYSTEM_SIZE - 30) / waypointCount;
    for (let wpIdx = 0; wpIdx < waypointCount; wpIdx++) {
      let potentialX = 0,
        potentialY = 0,
        attempts = 0,
        distance = 0;

      distance =
        30 +
        distancePerWaypoint * wpIdx -
        (Math.random() * distancePerWaypoint) / 2;
      do {
        const angle = Math.random() * Math.PI * 2;
        potentialX = Math.sin(angle) * distance;
        potentialY = Math.cos(angle) * distance;
        attempts++;
      } while (
        (waypoints.some(
          (wp) => getDistance(wp, { x: potentialX, y: potentialY }) < 25
        ) ||
          getDistance({ x: 0, y: 0 }, { x: potentialX, y: potentialY }) < 25) &&
        attempts < 4
      );

      const wp = generateWaypoint({
        // letter from A-Z based on index
        name: String.fromCharCode(65 + wpIdx) + "1",
        x: Math.round(potentialX),
        y: Math.round(potentialY),
        systemSymbol,
      });
      waypoints.push(wp);
      system.addWaypoint(wp);

      // add optional orbitals for this waypoint
      const waypointTypeData = waypointTypes[wp.type];
      const orbitalOptions = waypointTypeData.orbitalOptions;
      console.log("orbitals for waypoint", wpIdx);
      if (orbitalOptions) {
        let orbitalIndex = 2;
        for (const o of orbitalOptions) {
          const count = randomWeightedKey(o.orbitalCount);
          if (count) {
            for (let h = 0; h < count; h++) {
              const newOrbital = generateWaypoint({
                name: String.fromCharCode(65 + wpIdx) + orbitalIndex,
                x: data.x,
                y: data.y,
                inOrbitOf: wp.symbol,
                systemSymbol,
                type: o.type,
              });
              wp.orbitals.push(newOrbital);
              waypoints.push(newOrbital);
              system.addWaypoint(newOrbital);
              orbitalIndex++;
            }
          }
        }
      }
    }

    // add asteroid belts
    const existingBelts: number[] = [];

    for (let beltIndex = 0; beltIndex < beltCount; beltIndex++) {
      console.log("generating belt");
      let beltDistance =
        ASTEROID_BELT_START +
        (OUTER_SYSTEM_SIZE - ASTEROID_BELT_START) * (Math.random() * 0.8 + 0.2);

      // check if belt is not too close to another
      let attempts = 0;
      while (
        existingBelts.some(
          (o) => Math.abs(o - beltDistance) < BELT_WIDTH * 2
        ) &&
        attempts < 4
      ) {
        beltDistance =
          ASTEROID_BELT_START +
          (OUTER_SYSTEM_SIZE - ASTEROID_BELT_START) *
            (Math.random() * 0.8 + 0.2);
        attempts++;
      }

      existingBelts.push(beltDistance);

      // add an asteroid base in the belt
      const baseDistance = beltDistance + Math.random() * BELT_WIDTH;
      const baseAngle = Math.random() * Math.PI * 2;
      const potentialX = Math.sin(baseAngle) * baseDistance;
      const potentialY = Math.cos(baseAngle) * baseDistance;
      const asteroidBase = generateWaypoint({
        name: String.fromCharCode(65 + beltIndex + waypointCount) + "1",
        x: Math.round(potentialX),
        y: Math.round(potentialY),
        systemSymbol,
        type: "ASTEROID_BASE",
      });
      waypoints.push(asteroidBase);
      system.addWaypoint(asteroidBase);

      for (let j = 0; j < ASTEROID_COUNT; j++) {
        // find spot for asteroid
        let potentialX = 0,
          potentialY = 0,
          attempts = 0,
          distance = 0;

        do {
          distance = beltDistance + Math.random() * BELT_WIDTH;
          const angle = Math.random() * Math.PI * 2;
          potentialX = Math.sin(angle) * distance;
          potentialY = Math.cos(angle) * distance;
        } while (
          (waypoints.some(
            (wp) => getDistance(wp, { x: potentialX, y: potentialY }) < 25
          ) ||
            getDistance({ x: 0, y: 0 }, { x: potentialX, y: potentialY }) <
              25) &&
          attempts < 4
        );

        const wp = generateWaypoint({
          name: String.fromCharCode(65 + beltIndex + waypointCount) + (j + 2),
          x: Math.round(potentialX),
          y: Math.round(potentialY),
          systemSymbol,
          type: "ASTEROID",
        });
        waypoints.push(wp);
        system.addWaypoint(wp);
      }

      // add a fuel station at every 200 distance interval between the inner system and belt
      for (
        let i = 0;
        i < Math.floor((beltDistance - INNER_SYSTEM_SIZE) / 200);
        i++
      ) {
        const fuelStationDistance = INNER_SYSTEM_SIZE + 100 + 200 * i;
        const potentialX2 = Math.sin(baseAngle) * fuelStationDistance;
        const potentialY2 = Math.cos(baseAngle) * fuelStationDistance;

        // if other waypoints are too close, skip this one
        if (
          waypoints.some(
            (wp) =>
              wp.type !== "ASTEROID" &&
              getDistance(wp, { x: potentialX2, y: potentialY2 }) < 25
          )
        ) {
          continue;
        }
        console.log(
          "generate for fuel statuion",
          waypointCount,
          ASTEROID_COUNT + i + 2,
          String.fromCharCode(65 + beltIndex + waypointCount) +
            (ASTEROID_COUNT + i + 2)
        );
        const fuelDump = generateWaypoint({
          name:
            String.fromCharCode(65 + beltIndex + waypointCount) +
            (ASTEROID_COUNT + i + 2),
          x: Math.round(potentialX2),
          y: Math.round(potentialY2),
          systemSymbol,
          type: "FUEL_STATION",
        });
        waypoints.push(fuelDump);
        system.addWaypoint(fuelDump);
      }
    }

    if (data.jumpGateSpecs) {
      const radius = Math.sqrt(
        Math.pow(ASTEROID_BELT_START, 2) + Math.pow(ASTEROID_BELT_START, 2)
      );
      //console.log("hasjumpgate", radius);
      system.addJumpGate(
        String.fromCharCode(65 + waypointCount + beltCount) + "1",
        radius
      );
    }
  }

  return system;
};
