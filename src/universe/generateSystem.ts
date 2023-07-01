import {
  numberBetween,
  percentageChance,
  pickRandom,
  randomString,
  trulyUniqId,
  uniqueId,
} from "./utilities";
import { System } from "./entities/System";
import { starTypeNames, starTypes } from "./static-data/star-types";
import { generateWaypoint } from "./generateWaypoint";
import { Waypoint } from "./entities/Waypoint";
import { JumpGate } from "src/universe/entities/JumpGate";
import { getDistance } from "src/universe/getDistance";

const SYSTEM_SIZE = 100;

export const generateSystem = (data: {
  x: number;
  y: number;
  universeSymbol: string;
  jumpGateSpecs?: {
    range: number;
  };
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

  const waypointCount = numberBetween(
    systemData.minWaypoints,
    systemData.maxWaypoints
  );

  const waypoints: Waypoint[] = [];
  const existingOrbits = [];
  for (let i = 0; i < waypointCount; i++) {
    let potentialX = 0,
      potentialY = 0,
      attempts = 0;
    do {
      const distance = SYSTEM_SIZE * (Math.random() * 0.8 + 0.2);
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
  }

  if (data.jumpGateSpecs) {
    const radius = Math.sqrt(
      Math.pow(SYSTEM_SIZE, 2) + Math.pow(SYSTEM_SIZE, 2)
    );
    console.log("hasjumpgate", radius);
    system.addJumpGate(radius, data.jumpGateSpecs.range);
  }

  return system;
};
