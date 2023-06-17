import {$log} from "@tsed/common";
import { PlatformKoa } from "@tsed/platform-koa";
import {Server} from "./Server";
import {generateUniverse} from "src/universe/generateUniverse";
import {setUniverse} from "src/universe/universe";

async function bootstrap() {
  try {
    const platform = await PlatformKoa.bootstrap(Server);
    await platform.listen();

    process.on("SIGINT", () => {
      platform.stop();
    });
  } catch (error) {
    $log.error({event: "SERVER_BOOTSTRAP_ERROR", message: error.message, stack: error.stack});
  }
}

generateUniverse().then((universe) => {
  setUniverse(universe)
  setInterval(() => {
    universe.tick()
  }, 2000);
}).then(bootstrap)


process.on('SIGINT', () => {
  console.log("SIGINT received")
  process.exit(0)
})
process.on('SIGTERM', () => {
  console.log("SIGTERM received")
  process.exit(0)
})
