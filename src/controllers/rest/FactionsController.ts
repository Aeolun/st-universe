import {Controller} from "@tsed/di";
import {Get} from "@tsed/schema";
import {PathParams, QueryParams} from "@tsed/platform-params";
import {GetFaction200Response, GetFactions200Response} from "src/controllers/schemas";
import {universe} from "src/universe/universe";
import {slicePage} from "src/controllers/formatting/slice-page";
import {renderFaction} from "src/controllers/formatting/render-faction";

@Controller("/factions")
export class FactionsController {
  @Get("/")
  list(@QueryParams('page') page: number = 1, @QueryParams('limit') limit: number = 10): GetFactions200Response {

    return {
      data: slicePage(universe.factions, page, limit).map((faction) => {
        return renderFaction(faction)
      }),
      meta: {
        total: universe.factions.length,
        page: page,
        limit: limit
      }
    };
  }

  @Get("/:factionId")
  get(@PathParams('factionId') factionId: string): GetFaction200Response {
    const faction = universe.factions.find(faction => faction.symbol === factionId)

    if (!faction) throw new Error(`Faction ${factionId} not found`)

    return {
      data: renderFaction(faction)
    };
  }
}
