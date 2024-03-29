import { join } from "node:path";
import { Configuration, Inject } from "@tsed/di";
import { PlatformApplication } from "@tsed/common";
import "@tsed/platform-koa"; // /!\ keep this import
import "@tsed/ajv";
import "@tsed/swagger";
import { config } from "./config/index";
import * as rest from "./controllers/rest/index";
import { HttpExceptionFilter } from "src/guards/http-exception-filter";

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  disableComponentsScan: true,
  mount: {
    "/v2": [...Object.values(rest)],
  },
  swagger: [
    {
      path: "/v2/docs",
      specVersion: "3.0.1",
    },
  ],
  middlewares: [
    "@koa/cors",
    "koa-compress",
    "koa-override",
    "koa-bodyparser",
    new HttpExceptionFilter(),
  ],
  views: {
    root: join(process.cwd(), "../views"),
    extensions: {
      ejs: "ejs",
    },
  },
  exclude: ["**/*.spec.ts"],
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;
}
