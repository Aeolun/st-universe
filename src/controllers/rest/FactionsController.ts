import {Controller} from "@tsed/di";
import {Get} from "@tsed/schema";
import {PathParams} from "@tsed/platform-params";

@Controller("/factions")
export class FactionsController {
  @Get("/")
  list() {
    return "hello";
  }

  @Get("/:factionId")
  get(@PathParams('factionId') factionId: string) {
    return "hello";
  }
}
