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
import { JumpGate } from "src/universe/entities/JumpGate";
import { getDistance } from "src/universe/getDistance";
import { waypointTypes } from "src/universe/static-data/waypoint-types";

const SYSTEM_SIZE = 100;

export const generateSystem = (data: {
  x: number;
  y: number;
  universeSymbol: string;
  jumpGateSpecs?: {
    range: number;
  };
  waypoints?: (Omit<WaypointGenerationProperties, "systemSymbol"> & {
    orbitals?: Omit<WaypointGenerationProperties, "systemSymbol">[];
  })[];
}) => {
  const systemSymbol = `${data.universeSymbol}-${randomString()}`;

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
      systemData.minWaypoints,
      systemData.maxWaypoints
    );

    const waypoints: Waypoint[] = [];
    const existingOrbits: number[] = [];
    for (let i = 0; i < waypointCount; i++) {
      let potentialX = 0,
        potentialY = 0,
        attempts = 0,
        distance = 0;
      do {
        distance = SYSTEM_SIZE * (Math.random() * 0.8 + 0.2);
        const angle = Math.random() * Math.PI * 2;
        potentialX = Math.sin(angle) * distance;
        potentialY = Math.cos(angle) * distance;
      } while (
        existingOrbits.some((o) => Math.abs(o - distance) < 5) ||
        ((waypoints.some(
          (wp) => getDistance(wp, { x: potentialX, y: potentialY }) < 25
        ) ||
          getDistance({ x: 0, y: 0 }, { x: potentialX, y: potentialY }) < 25) &&
          attempts < 4)
      );

      const wp = generateWaypoint({
        x: Math.round(potentialX),
        y: Math.round(potentialY),
        systemSymbol,
      });
      waypoints.push(wp);
      system.addWaypoint(wp);

      // add optional orbitals for this waypoint
      const waypointTypeData = waypointTypes[wp.type];
      const orbitalOptions = waypointTypeData.orbitalOptions;
      if (orbitalOptions) {
        orbitalOptions.forEach((o) => {
          const count = randomWeightedKey(o.orbitalCount);
          if (count) {
            for (let i = 0; i < count; i++) {
              const newOrbital = generateWaypoint({
                x: data.x,
                y: data.y,
                inOrbitOf: wp.symbol,
                systemSymbol,
                type: o.type,
              });
              wp.orbitals.push(newOrbital);
              waypoints.push(newOrbital);
              system.addWaypoint(newOrbital);
            }
          }
        });
      }
    }

    if (data.jumpGateSpecs) {
      const radius = Math.sqrt(
        Math.pow(SYSTEM_SIZE, 2) + Math.pow(SYSTEM_SIZE, 2)
      );
      //console.log("hasjumpgate", radius);
      system.addJumpGate(radius, data.jumpGateSpecs.range);
    }
  }

  return system;
};
