import { CanvasRenderingContext2D, createCanvas } from "canvas";
import { System } from "src/universe/entities/System";
import * as fs from "fs";
import { percentageChance, pickRandom, shuffle } from "src/universe/utilities";
import { getDistance } from "src/universe/getDistance";
import { generateSystem } from "./generateSystem";
import { starTypes } from "./static-data/star-types";
import { Universe } from "src/universe/entities/Universe";
import { factionNames, factions } from "src/universe/static-data/faction";
import { Faction } from "src/universe/entities/Faction";
import { Faction as FactionEnum } from "src/universe/static-data/faction";
import { Waypoint } from "src/universe/entities/Waypoint";
import { TradeGood } from "src/universe/static-data/trade-goods";

const MAX_SYSTEMS = 12000;
const MAX_FACTIONS = 12;
const MAX_SYSTEM_DISTANCE = 40000;
const MAX_MAP_SIZE = MAX_SYSTEM_DISTANCE + 10000;
const STELLAR_ARMS = 5;
const STEPS_PER_ARM = 16;
const STEP_SIZE_DECREASE = 120;
const SPREAD_SIZE_DECREASE = 300;
const STEP_SYSTEM_DECREASE = 3;
const SPREAD_MULTIPLIER = 3.7;
const STEP_MULTIPLIER = 1.75;
const UNIVERSE_ROTATION_SPEED = Math.PI / 15;
const CANVAS_SIZE = 2500;
const MINIMUM_DISTANCE_APART = 250;
const MAXIMUM_DISTANCE_APART = 1500;
const DISTANCE_BETWEEN_FACTIONS = 8000;
const FACTION_INNER_INFLUENCE_RADIUS = 4000;
const FACTION_OUTER_INFLUENCE_RADIUS = 8000;
const FACTION_MIN_SYSTEMS = 20;
const UNIVERSE_SYMBOL = "X1";

const scale = CANVAS_SIZE / MAX_MAP_SIZE / 2;

export async function generateUniverse() {
  const universe = new Universe({
    symbol: UNIVERSE_SYMBOL,
  });

  const startPos = { x: 0, y: 0 };
  let failedPositionAttempts = 0;

  for (let i = 0; i < STELLAR_ARMS; i++) {
    console.log(`Arm ${i}/${STELLAR_ARMS}`);
    const systemsInArm = Math.round(MAX_SYSTEMS / STELLAR_ARMS);
    let spreadSize =
      Math.round(MAX_SYSTEM_DISTANCE / STEPS_PER_ARM) * SPREAD_MULTIPLIER;
    let rotation = ((Math.PI * 2) / STELLAR_ARMS) * i;
    let systemsInStep = Math.round(systemsInArm / STEPS_PER_ARM);
    let stepSize =
      Math.round(MAX_SYSTEM_DISTANCE / STEPS_PER_ARM) * STEP_MULTIPLIER;
    for (let step = 1; step < STEPS_PER_ARM; step++) {
      console.log(`Step ${step}/${STEPS_PER_ARM}`);
      rotation += UNIVERSE_ROTATION_SPEED;
      systemsInStep -= STEP_SYSTEM_DECREASE;
      spreadSize -= SPREAD_SIZE_DECREASE;
      stepSize -= STEP_SIZE_DECREASE;
      const rotationVectorX = Math.sin(rotation);
      const rotationVectorY = Math.cos(rotation);

      for (let j = 0; j < systemsInStep; j++) {
        console.log(`System ${j}/${systemsInStep}`);

        let potentialX: number,
          potentialY: number,
          attempts = 0;
        do {
          const rotation = Math.random() * Math.PI * 2;
          potentialX =
            startPos.x +
            step * stepSize * rotationVectorX +
            Math.round(
              Math.sin(rotation) * Math.random() * spreadSize - spreadSize / 2
            );
          potentialY =
            startPos.y +
            step * stepSize * rotationVectorY +
            Math.round(
              Math.cos(rotation) * Math.random() * spreadSize - spreadSize / 2
            );
          attempts++;
        } while (
          (Object.values(universe.systems).some(
            (system) =>
              getDistance(system, { x: potentialX, y: potentialY }) <
              MINIMUM_DISTANCE_APART
          ) ||
            Object.values(universe.systems).every(
              (system) =>
                getDistance(system, { x: potentialX, y: potentialY }) >
                MAXIMUM_DISTANCE_APART
            )) &&
          attempts < 30
        );
        if (attempts >= 30) {
          failedPositionAttempts++;
        }

        const system = generateSystem({
          x: potentialX,
          y: potentialY,
          universeSymbol: UNIVERSE_SYMBOL,
        });
        universe.addSystem(system);
      }
    }
  }

  const populationCenters = Object.values(universe.systems).filter((system) =>
    system.waypoints.some((waypoint) => waypoint.population >= 3)
  );
  const generatedFactions: {
    symbol: FactionEnum;
    homeSystem: System;
    homeWaypoint: Waypoint;
  }[] = [];
  for (const faction of factionNames) {
    let factionSystem: System;
    let attempts = 0,
      systemsInInfluence = 0;
    do {
      factionSystem = pickRandom(populationCenters);
      systemsInInfluence = 0;
      for (const system of Object.values(universe.systems)) {
        if (
          getDistance(system, factionSystem) < FACTION_INNER_INFLUENCE_RADIUS
        ) {
          systemsInInfluence++;
        }
      }
    } while (
      (generatedFactions.some(
        (faction) =>
          getDistance(faction.homeSystem, factionSystem) <
          DISTANCE_BETWEEN_FACTIONS
      ) ||
        systemsInInfluence < FACTION_MIN_SYSTEMS) &&
      attempts < 10
    );

    populationCenters.splice(populationCenters.indexOf(factionSystem), 1);
    let maxPopulationWaypoint;
    for (const waypoint of factionSystem.waypoints) {
      if (
        !maxPopulationWaypoint ||
        waypoint.population > maxPopulationWaypoint.population
      ) {
        maxPopulationWaypoint = waypoint;
      }
    }

    if (!maxPopulationWaypoint)
      throw new Error("No max population waypoint found");

    generatedFactions.push({
      symbol: faction as FactionEnum,
      homeSystem: factionSystem,
      homeWaypoint: maxPopulationWaypoint,
    });
  }
  for (const faction of factionNames) {
    const factionData = generatedFactions.find((f) => f.symbol === faction);
    for (const system of Object.values(universe.systems)) {
      if (factionData) {
        const distance = getDistance(system, factionData.homeSystem);
        if (distance < FACTION_INNER_INFLUENCE_RADIUS) {
          system.waypoints.forEach((wp) => {
            wp.ownedBy = faction as FactionEnum;
          });
          system.factions = [faction as FactionEnum];
        } else if (
          distance < FACTION_OUTER_INFLUENCE_RADIUS &&
          system.factions.length <= 0
        ) {
          if (
            percentageChance(
              30 +
                ((FACTION_OUTER_INFLUENCE_RADIUS - distance) /
                  FACTION_OUTER_INFLUENCE_RADIUS) *
                  40
            )
          ) {
            system.waypoints.forEach(
              (wp) => (wp.ownedBy = faction as FactionEnum)
            );
            system.factions = [faction as FactionEnum];
          }
        }
      }
    }
  }
  for (let i = 0; i < 3; i++) {
    const randomizedFactionOrder = shuffle(factionNames);
    for (const faction of randomizedFactionOrder) {
      const factionData = generatedFactions.find((f) => f.symbol === faction);
      if (!factionData) throw new Error("No faction data found");
      const spreadPoint = {
        x:
          factionData.homeSystem.x +
          Math.round(
            Math.sin(Math.random() * Math.PI * 2) *
              FACTION_OUTER_INFLUENCE_RADIUS *
              0.75
          ),
        y:
          factionData.homeSystem.y +
          Math.round(
            Math.cos(Math.random() * Math.PI * 2) *
              FACTION_OUTER_INFLUENCE_RADIUS *
              0.75
          ),
      };

      for (const system of Object.values(universe.systems)) {
        const distance = getDistance(system, spreadPoint);
        if (
          distance < FACTION_OUTER_INFLUENCE_RADIUS &&
          system.factions.length <= 0
        ) {
          if (
            percentageChance(
              30 +
                ((FACTION_OUTER_INFLUENCE_RADIUS - distance) /
                  FACTION_OUTER_INFLUENCE_RADIUS) *
                  40
            )
          ) {
            system.waypoints.forEach((wp) => (wp.ownedBy = faction));
            system.factions = [faction];
          }
        }
      }
    }
  }
  generatedFactions.forEach((faction) => {
    universe.factions.push(
      new Faction(
        faction.symbol,
        factions[faction.symbol].name,
        factions[faction.symbol].description,
        {
          headquarters: {
            systemSymbol: faction.homeWaypoint.systemSymbol,
            waypointSymbol: faction.homeWaypoint.symbol,
          },
          traits: factions[faction.symbol].traits,
          isRecruiting: factions[faction.symbol].isRecruiting,
        }
      )
    );
  });

  let shortestDistance = 1000;
  let longestDistance = 0;
  let totalMin = 0;
  let totalWaypoints = 0;
  Object.values(universe.systems).forEach((system) => {
    let minDist = 10000;
    Object.values(universe.systems).forEach((otherSystem) => {
      if (system === otherSystem) return;
      const dist = getDistance(system, otherSystem);
      if (dist < minDist) minDist = dist;
    });

    totalMin += minDist / Object.values(universe.systems).length;
    if (minDist > longestDistance) {
      longestDistance = minDist;
    }
    if (minDist < shortestDistance) {
      shortestDistance = minDist;
    }

    totalWaypoints += system.waypoints.length;
  });

  console.log(
    `Failed to position with gap after 10 attempts for ${failedPositionAttempts} systems`
  );
  console.log(
    `Furthest distance between systems: ${longestDistance}, shortest ${shortestDistance}, average ${totalMin}`
  );
  console.log(
    `Universe with ${universe.systems.length} systems, ${totalWaypoints} waypoints generated.`
  );
  const canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  const context = canvas.getContext("2d");

  const renderMethods: Record<
    string,
    (system: System, context: CanvasRenderingContext2D) => void
  > = {
    starType: renderStarType,
    marketAvailable: renderMarketAvailable,
    populationCenter: renderPopulationCenter,
    fuelAvailable: renderFuelAvailable,
    jumpGates: renderJumpGates,
    factionControl: renderFactionControl,
    shipyards: renderShipConfigurations,
  };

  fs.mkdirSync("./renders", { recursive: true });

  for (const renderMethod in renderMethods) {
    const renderFunction = renderMethods[renderMethod];
    context.fillStyle = "black";
    context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    for (const system of Object.values(universe.systems)) {
      renderFunction(system, context);
    }

    const imgBuffer = canvas.toBuffer("image/png");
    fs.writeFileSync(`./renders/${renderMethod}.png`, imgBuffer);
  }

  fs.writeFileSync(
    "./systems.json",
    JSON.stringify(Object.values(universe.systems).slice(0, 100), null, 2)
  );

  return universe;
}

function renderStarType(system: System, context: CanvasRenderingContext2D) {
  context.beginPath();
  context.arc(
    CANVAS_SIZE / 2 + Math.round(system.x * scale),
    CANVAS_SIZE / 2 + Math.round(system.y * scale),
    2,
    0,
    2 * Math.PI,
    false
  );
  context.fillStyle = starTypes[system.type].color;
  context.closePath();
  context.fill();
}
function renderMarketAvailable(
  system: System,
  context: CanvasRenderingContext2D
) {
  context.beginPath();
  context.arc(
    CANVAS_SIZE / 2 + Math.round(system.x * scale),
    CANVAS_SIZE / 2 + Math.round(system.y * scale),
    2,
    0,
    2 * Math.PI,
    false
  );
  const marketCount = system.waypoints.filter((w) =>
    w.traits.includes("MARKETPLACE")
  ).length;
  context.fillStyle = marketCount > 0 ? "lime" : "red";
  context.closePath();
  context.fill();
}

function renderFuelAvailable(
  system: System,
  context: CanvasRenderingContext2D
) {
  context.beginPath();
  context.arc(
    CANVAS_SIZE / 2 + Math.round(system.x * scale),
    CANVAS_SIZE / 2 + Math.round(system.y * scale),
    2,
    0,
    2 * Math.PI,
    false
  );
  const marketCount = system.waypoints.filter(
    (w) =>
      w.imports.includes(TradeGood.FUEL) ||
      w.exports.includes(TradeGood.FUEL) ||
      w.exchange.includes(TradeGood.FUEL)
  ).length;
  context.fillStyle = marketCount > 0 ? "lime" : "red";
  context.closePath();
  context.fill();
}

function renderPopulationCenter(
  system: System,
  context: CanvasRenderingContext2D
) {
  context.beginPath();
  context.arc(
    CANVAS_SIZE / 2 + Math.round(system.x * scale),
    CANVAS_SIZE / 2 + Math.round(system.y * scale),
    2,
    0,
    2 * Math.PI,
    false
  );
  const populationCenters = system.waypoints.filter(
    (w) => w.population >= 3
  ).length;
  context.fillStyle = populationCenters > 0 ? "lime" : "red";
  context.closePath();
  context.fill();
}

function renderFactionControl(
  system: System,
  context: CanvasRenderingContext2D
) {
  context.beginPath();
  context.arc(
    CANVAS_SIZE / 2 + Math.round(system.x * scale),
    CANVAS_SIZE / 2 + Math.round(system.y * scale),
    2,
    0,
    2 * Math.PI,
    false
  );
  context.fillStyle =
    system.factions.length > 0 ? factions[system.factions[0]].color : "white";
  context.closePath();
  context.fill();
}

function renderShipConfigurations(
  system: System,
  context: CanvasRenderingContext2D
) {
  context.beginPath();
  context.arc(
    CANVAS_SIZE / 2 + Math.round(system.x * scale),
    CANVAS_SIZE / 2 + Math.round(system.y * scale),
    2,
    0,
    2 * Math.PI,
    false
  );
  context.fillStyle = system.waypoints.some(
    (wp) => wp.availableShipConfigurations.length > 0
  )
    ? "lime"
    : "red";
  context.closePath();
  context.fill();
}

function renderJumpGates(system: System, context: CanvasRenderingContext2D) {
  context.beginPath();
  context.arc(
    CANVAS_SIZE / 2 + Math.round(system.x * scale),
    CANVAS_SIZE / 2 + Math.round(system.y * scale),
    2,
    0,
    2 * Math.PI,
    false
  );
  context.fillStyle = system.waypoints.some((w) => w.type === "JUMP_GATE")
    ? "lime"
    : "red";
  context.closePath();
  context.fill();

  const jg = system.waypoints.find((w) => w.jumpGate)?.jumpGate;
  if (jg) {
    context.beginPath();
    context.arc(
      CANVAS_SIZE / 2 + Math.round(system.x * scale),
      CANVAS_SIZE / 2 + Math.round(system.y * scale),
      jg.range * scale,
      0,
      2 * Math.PI,
      false
    );
    context.strokeStyle = "blue";
    context.stroke();
    context.closePath();
  }
}
