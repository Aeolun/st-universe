import { $log } from "@tsed/common";
import { PlatformKoa } from "@tsed/platform-koa";
import { Server } from "./Server";
import { generateUniverse } from "src/universe/generateUniverse";
import { setUniverse, universe } from "src/universe/universe";
import { Universe } from "src/universe/entities/Universe";
import * as os from "os";

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
  }
}

let universeTicker: NodeJS.Timeout | undefined = undefined;

export const resetDuration = process.env.RESET_DURATION
  ? parseInt(process.env.RESET_DURATION)
  : 3600 * 1000 * 6;
export let nextReset = Date.now() + resetDuration;

const createNewUniverse = async () => {
  if (!platform) {
    await bootstrap();
  } else {
    platform.stop();
  }
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
  platform.listen();

  nextReset = Date.now() + resetDuration;

  let lastCpuUsage: NodeJS.CpuUsage | undefined;
  universeTicker = setInterval(() => {
    const memory = process.memoryUsage();
    const cpuDiff = process.cpuUsage(lastCpuUsage);
    lastCpuUsage = process.cpuUsage();
    universe.tick();
    console.log(
      `Time until reset ${nextReset - Date.now()}ms, memory in use ${Math.round(
        memory.heapUsed / 1024 / 1024
      )}/${Math.round(memory.heapTotal / 1024 / 1024)}MB, cpu ${
        cpuDiff.user / 1000
      }ms user, ${cpuDiff.system / 1000}ms system`
    );
  }, 2000);
  setTimeout(createNewUniverse, nextReset - Date.now());
};

createNewUniverse().then(() => {
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
