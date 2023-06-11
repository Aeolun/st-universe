import {Controller} from "@tsed/di";
import {Get, Post} from "@tsed/schema";
import {BodyParams, PathParams} from "@tsed/platform-params";
import {GlobalRegisterPayload} from "src/controllers/schemas/global-register-payload";
import {GlobalGetResponse} from "src/controllers/schemas/global-get-response";
import {universe} from "src/universe/universe";
import {Agent} from "src/universe/entities/Agent";
import {renderShipOutput} from "src/controllers/formatting/render-ship-output";


@Controller("/")
export class GlobalController {
  @Post("/register")
  register(@BodyParams() body: GlobalRegisterPayload) {
    const newAgent = new Agent({
      symbol: body.symbol,
      faction: body.faction,
      credits: 175000
    })
    universe.agents.push(newAgent)
    universe.ships.push(newAgent.registerShip({
      configuration: 'COMMAND_SHIP'
    }))

    return {
      data: {
        token: newAgent.token,
        agent: {
          symbol: newAgent.symbol,
          accountId: newAgent.accountId,
          headquarters: '',
          credits: newAgent.credits,
          startingFaction: newAgent.faction,
        },
        contract: {},
        faction: {},
        ships: newAgent.ships.map(ship => renderShipOutput(ship))
      }
    }
  }

  @Get('/')
  get(): GlobalGetResponse {
    return {
      status: 'The st-universe server is currently online and accepting connections.',
      version: 'v2',
      resetDate: universe.createDate,
      description: 'A space trading game.',
      stats: {
        agents: universe.agents.length,
        ships: universe.ships.length,
        systems: universe.systems.length,
        waypoints: universe.waypointCount
      },
      serverResets: {
        next: new Date(new Date().getTime() + 1000 * 60 * 60).toISOString(),
        frequency: 'hourly'
      }
    }
  }

  @Get('/systems.json')
  systems() {
    return universe.systems.map(system => ({
      symbol: system.symbol,
      sectorSymbol: system.sectorSymbol,
      type: system.type,
      x: system.x,
      y: system.y,
      waypoints: system.waypoints.map(wp => ({
        symbol: wp.symbol,
        type: wp.type,
        x: wp.x,
        y: wp.y,
      })),
      factions: [],
    }))
  }
}
