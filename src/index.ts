import { $log } from "@tsed/common";
import { PlatformKoa } from "@tsed/platform-koa";
import { Server } from "./Server";
import { generateUniverse } from "src/universe/generateUniverse";
import { setUniverse, universe } from "src/universe/universe";
import { Universe } from "src/universe/entities/Universe";
import { Ship } from "src/universe/entities/Ship";
import { shipConfigurationData } from "src/universe/static-data/ship-configurations";
import {
  nextReset,
  resetDuration,
  setNextReset,
  speedFactor,
} from "src/consts";
import { Configuration } from "src/universe/static-data/configuration-enum";

let platform: Awaited<ReturnType<(typeof PlatformKoa)["bootstrap"]>>;
async function bootstrap() {
  try {
    platform = await PlatformKoa.bootstrap(Server);

    process.on("SIGINT", () => {
      platform.stop();
    });
  } catch (error) {
    $log.error({
      event: "SERVER_BOOTSTRAP_ERROR",
      message: error.message,
      stack: error.stack,
    });
    process.exit(1);
  }
}

let universeTicker: NodeJS.Timeout | undefined = undefined;

const createNewUniverse = async () => {
  if (universeTicker) {
    clearTimeout(universeTicker);
  }
  let newUniverse: Universe | undefined;
  let attempts = 0;
  while (!newUniverse && attempts < 10) {
    attempts++;
    try {
      newUniverse = await generateUniverse();
    } catch (error) {
      console.error(error);
    }
  }

  if (!newUniverse) {
    throw new Error("Failed to generate universe");
  }

  setUniverse(newUniverse);

  if (!platform) {
    await bootstrap();
  } else {
    platform.stop();
  }

  if (!platform) {
    throw new Error("Platform not initialized");
  }
  platform.listen();

  setNextReset(Date.now() + resetDuration);

  let lastCpuUsage: NodeJS.CpuUsage | undefined;
  let lastTime = Date.now();
  const normalTickDuration = 15 * 60 * 1000;
  const tickInterval = Math.round(normalTickDuration / speedFactor);
  console.log(`Ticking every ${tickInterval}ms for a market update step`);

  universeTicker = setInterval(() => {
    const memory = process.memoryUsage();
    const cpuDiff = process.cpuUsage(lastCpuUsage);
    lastCpuUsage = process.cpuUsage();
    const timeDiff = Date.now() - lastTime;
    lastTime = Date.now();
    universe.tick(timeDiff);
    console.log(
      `Time until reset ${nextReset - Date.now()}ms, memory in use ${Math.round(
        memory.heapUsed / 1024 / 1024
      )}/${Math.round(memory.heapTotal / 1024 / 1024)}MB, cpu ${
        cpuDiff.user / 1000
      }ms user, ${cpuDiff.system / 1000}ms system`
    );
  }, tickInterval);
  setTimeout(createNewUniverse, nextReset - Date.now());
};

createNewUniverse().then(() => {
  Object.keys(shipConfigurationData).forEach((key) => {
    const config = shipConfigurationData[key as Configuration];
    // create a ship with this configuration to get the crew requirements
    const ship = new Ship({
      symbol: "",
      agentSymbol: "",
      role: "EXCAVATOR",
      waypoint: {
        symbol: "",
        systemSymbol: "",
        x: 0,
        y: 0,
        type: "GRAVITY_WELL",
      },
      configuration: key as Configuration,
    });

    // TODO: Make ShipConfigurations capable of calculating stats
    config.crew = {
      required: ship.stats.crewRequired,
      capacity: ship.stats.crewCapacity,
    };
  });
  console.log("First universe started");
});

process.on("SIGINT", () => {
  console.log("SIGINT received");
  process.exit(0);
});
process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  process.exit(0);
});
