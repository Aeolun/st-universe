import {Controller} from "@tsed/di";
import {Get} from "@tsed/schema";
import {PathParams} from "@tsed/platform-params";

@Controller("/systems/")
export class SystemsController {
  @Get("/")
  listSystems() {
    return "hello";
  }

  @Get("/:systemSymbol")
  get(@PathParams('factionId') factionId: string) {
    return "hello";
  }

  @Get("/:systemSymbol/waypoints")
  waypoints(@PathParams('factionId') factionId: string) {
    return "hello";
  }

  @Get("/:systemSymbol/waypoints/:waypointSymbol")
  waypoint(@PathParams('factionId') factionId: string) {
    return "hello";
  }

  @Get("/:systemSymbol/waypoints/:waypointSymbol/market")
  market(@PathParams('factionId') factionId: string) {
    return "hello";
  }

  @Get("/:systemSymbol/waypoints/:waypointSymbol/shipyard")
  shipyard(@PathParams('factionId') factionId: string) {
    return "hello";
  }

  @Get("/:systemSymbol/waypoints/:waypointSymbol/jump-gate")
  jumpGate(@PathParams('factionId') factionId: string) {
    return "hello";
  }
}
