import { System } from "src/universe/entities/System";
import * as fs from "fs";
import {
  randomPercentageTrue,
  pickRandom,
  shuffle,
  random,
} from "src/universe/utilities";
import { getDistance } from "src/universe/getDistance";
import { generateSystem } from "./generateSystem";
import { starTypes } from "./static-data/star-types";
import { Universe } from "src/universe/entities/Universe";
import { factionNames, factions } from "src/universe/static-data/faction";
import { Faction } from "src/universe/entities/Faction";
import { Faction as FactionEnum } from "src/universe/static-data/faction";
import { Waypoint } from "src/universe/entities/Waypoint";
import { TradeGood } from "src/universe/static-data/trade-goods";
import { generateHomeSystem } from "src/universe/preset/generate-home-system";
import { createCanvas } from "canvas";

const MAX_SYSTEMS = process.env.MAX_SYSTEMS
  ? parseInt(process.env.MAX_SYSTEMS)
  : 12000;
const SIZE_MULTIPLIER = MAX_SYSTEMS / 12000;
const MAX_FACTIONS = 12;
const MAX_SYSTEM_DISTANCE = Math.max(80000 * SIZE_MULTIPLIER, 5000);
const MAX_MAP_SIZE = MAX_SYSTEM_DISTANCE + 10000;
const STELLAR_ARMS = 5;
const STEPS_PER_ARM = 16;
const SYSTEMS_PER_STEP = Math.round(MAX_SYSTEMS / STELLAR_ARMS / STEPS_PER_ARM);
const SPREAD_MULTIPLIER = 1.0;
const STEP_MULTIPLIER = 1;
const UNIVERSE_ROTATION_SPEED = Math.PI / 15;
const CANVAS_SIZE = 2500;
const MINIMUM_DISTANCE_APART = 200;
const MAXIMUM_DISTANCE_APART = 400;
const DISTANCE_BETWEEN_FACTIONS = 8000 * SIZE_MULTIPLIER;
const FACTION_INNER_INFLUENCE_RADIUS = 4000 * SIZE_MULTIPLIER;
const FACTION_OUTER_INFLUENCE_RADIUS = 8000 * SIZE_MULTIPLIER;
const FACTION_MIN_SYSTEMS = 20;
const UNIVERSE_SYMBOL = "X1";
const JUMP_GATE_CHANCE = 30;
const JUMP_GATE_DROPOFF = 7.5;
const SUPERDUTY_JUMP_GATE_CHANCE = 10;
const SUPERDUTY_JUMP_GATE_DROPOFF = -30;
const JUMP_GATE_RANGE = MINIMUM_DISTANCE_APART * 3;
const SUPERDUTY_JUMP_GATE_RANGE = MINIMUM_DISTANCE_APART * 6;

const scale = CANVAS_SIZE / MAX_MAP_SIZE / 2;

export async function generateUniverse() {
  const universe = new Universe({
    symbol: UNIVERSE_SYMBOL,
  });

  const startPos = { x: 0, y: 0 };
  let failedPositionAttempts = 0;

  for (let i = 0; i < STELLAR_ARMS; i++) {
    console.log(`Arm ${i}/${STELLAR_ARMS}`);

    let rotation = ((Math.PI * 2) / STELLAR_ARMS) * i;

    for (let step = 1; step < STEPS_PER_ARM; step++) {
      const systemsInStep = SYSTEMS_PER_STEP * 2 * (step / STEPS_PER_ARM);
      const stepSize = MAX_SYSTEM_DISTANCE / STEPS_PER_ARM;
      const spreadSize = (MAX_SYSTEM_DISTANCE / STEPS_PER_ARM) * 2;
      console.log(`Step ${step}/${STEPS_PER_ARM}`);
      rotation += UNIVERSE_ROTATION_SPEED;

      const rotationVectorX = Math.sin(rotation);
      const rotationVectorY = Math.cos(rotation);

      for (let j = 0; j < systemsInStep; j++) {
        console.log(`System ${j}/${systemsInStep}`);

        let potentialX: number,
          potentialY: number,
          attempts = 0;
        do {
          const rotation = random() * Math.PI * 2;
          potentialX = Math.round(
            startPos.x +
              step * stepSize * rotationVectorX +
              Math.round(
                Math.sin(rotation) * random() * spreadSize - spreadSize / 2
              )
          );
          potentialY = Math.round(
            startPos.y +
              step * stepSize * rotationVectorY +
              Math.round(
                Math.cos(rotation) * random() * spreadSize - spreadSize / 2
              )
          );
          attempts++;
        } while (
          (universe.systemsArray.some(
            (system) =>
              getDistance(system, { x: potentialX, y: potentialY }) <
              MINIMUM_DISTANCE_APART
          ) ||
            universe.systemsArray.every(
              (system) =>
                getDistance(system, { x: potentialX, y: potentialY }) >
                MAXIMUM_DISTANCE_APART
            )) &&
          attempts < 30
        );
        if (attempts >= 30) {
          failedPositionAttempts++;
        }

        const jumpDecreaseChance = JUMP_GATE_DROPOFF * (step / STEPS_PER_ARM);
        const hasJumpgate = randomPercentageTrue(
          JUMP_GATE_CHANCE - jumpDecreaseChance
        );

        const superdutyJumpDecreaseChance =
          SUPERDUTY_JUMP_GATE_DROPOFF * (step / STEPS_PER_ARM);
        const wormholeRange = randomPercentageTrue(
          SUPERDUTY_JUMP_GATE_CHANCE - superdutyJumpDecreaseChance
        )
          ? SUPERDUTY_JUMP_GATE_RANGE
          : JUMP_GATE_RANGE;
        const system = generateSystem({
          x: potentialX,
          y: potentialY,
          universeSymbol: UNIVERSE_SYMBOL,
          jumpGateSpecs: hasJumpgate
            ? {
                connections: 8,
                range: wormholeRange,
              }
            : undefined,
        });
        universe.addSystem(system);
      }
    }
  }

  universe.systemsArray
    .filter((s) => s.hasJumpGate)
    .forEach((system) => {
      const gate = system.waypoints.find((w) => w.jumpGate);
      const jumpGate = gate?.jumpGate;
      if (gate && jumpGate) {
        const nearbySystems = universe.systemsArray.filter(
          (ns) => ns.hasJumpGate && getDistance(system, ns) < jumpGate.range
        );
        for (let i = 0; i < jumpGate.connectionCount; i++) {
          const newSystem = pickRandom(nearbySystems);
          const wp = newSystem.waypoints.find((wp) => wp.jumpGate)?.symbol;
          if (wp && !jumpGate.connections.includes(wp)) {
            jumpGate.connections.push(wp);
          }
        }
      }
    });

  const populationCenters = universe.systemsArray.filter((system) =>
    system.waypoints.some(
      (waypoint) => waypoint.population >= 3 && waypoint.type === "PLANET"
    )
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
      for (const system of universe.systemsArray) {
        if (
          getDistance(system, factionSystem) < FACTION_INNER_INFLUENCE_RADIUS
        ) {
          systemsInInfluence++;
        }
      }
      attempts++;
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
    // remove the original faction system from the universe
    universe.removeSystem(factionSystem);

    // replace original faction system with a new one
    factionSystem = generateHomeSystem({
      x: factionSystem.x,
      y: factionSystem.y,
      universeSymbol: UNIVERSE_SYMBOL,
    });
    universe.addSystem(factionSystem);

    let maxPopulationWaypoint;
    for (const waypoint of factionSystem.waypoints) {
      if (
        !maxPopulationWaypoint ||
        (waypoint.population > maxPopulationWaypoint.population &&
          waypoint.type === "PLANET")
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
    for (const system of universe.systemsArray) {
      if (factionData) {
        const distance = getDistance(system, factionData.homeSystem);
        if (distance < FACTION_INNER_INFLUENCE_RADIUS) {
          system.waypoints.forEach((wp) => {
            wp.ownedBy = faction as FactionEnum;
            wp.chartWaypoint({
              waypointSymbol: wp.symbol,
              submittedBy: faction,
              submittedOn: new Date(),
            });
          });
          system.factions = [faction as FactionEnum];
        } else if (
          distance < FACTION_OUTER_INFLUENCE_RADIUS &&
          system.factions.length <= 0
        ) {
          if (
            randomPercentageTrue(
              30 +
                ((FACTION_OUTER_INFLUENCE_RADIUS - distance) /
                  FACTION_OUTER_INFLUENCE_RADIUS) *
                  40
            )
          ) {
            system.waypoints.forEach((wp) => {
              wp.ownedBy = faction as FactionEnum;
              wp.chartWaypoint({
                waypointSymbol: wp.symbol,
                submittedBy: faction,
                submittedOn: new Date(),
              });
            });
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

      for (const system of universe.systemsArray) {
        const distance = getDistance(system, spreadPoint);
        if (
          distance < FACTION_OUTER_INFLUENCE_RADIUS &&
          system.factions.length <= 0
        ) {
          if (
            randomPercentageTrue(
              30 +
                ((FACTION_OUTER_INFLUENCE_RADIUS - distance) /
                  FACTION_OUTER_INFLUENCE_RADIUS) *
                  40
            )
          ) {
            system.waypoints.forEach((wp) => {
              wp.ownedBy = faction;
              wp.chartWaypoint({
                waypointSymbol: wp.symbol,
                submittedBy: faction,
                submittedOn: new Date(),
              });
            });
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
  universe.systemsArray.forEach((system) => {
    let minDist = 10000;
    universe.systemsArray.forEach((otherSystem) => {
      if (system === otherSystem) return;
      const dist = getDistance(system, otherSystem);
      if (dist < minDist) minDist = dist;
    });

    totalMin += minDist / universe.systemsArray.length;
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
    for (const system of universe.systemsArray) {
      renderFunction(system, context);
    }

    const imgBuffer = canvas.toBuffer("image/png");
    fs.writeFileSync(`./renders/${renderMethod}.png`, imgBuffer);
  }

  fs.writeFileSync(
    "./systems.json",
    JSON.stringify(universe.systemsArray.slice(0, 100), null, 2)
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
