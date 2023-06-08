import {Controller} from "@tsed/di";
import {Get, Post} from "@tsed/schema";
import {PathParams} from "@tsed/platform-params";

@Controller("/my/")
export class FleetController {
  @Get("/contracts")
  listShips() {
    return "hello";
  }

  @Get("/contracts/:contractId")
  get(@PathParams('factionId') factionId: string) {
    return "hello";
  }

  @Post("/contracts/:contractId/accept")
  accept(@PathParams('factionId') factionId: string) {
    return "hello";
  }

  @Post("/contracts/:contractId/deliver")
  deliver(@PathParams('factionId') factionId: string) {
    return "hello";
  }

  @Post("/contracts/:contractId/fulfill")
  fulfill(@PathParams('factionId') factionId: string) {
    return "hello";
  }
}
