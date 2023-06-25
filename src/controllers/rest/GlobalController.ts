import {Controller} from "@tsed/di";
import {Get, Post} from "@tsed/schema";
import {BodyParams} from "@tsed/platform-params";
import {GlobalRegisterPayload} from "src/controllers/schemas/global-register-payload";
import {GlobalGetResponse} from "src/controllers/schemas/global-get-response";
import {universe} from "src/universe/universe";
import {Agent} from "src/universe/entities/Agent";
import {renderShipOutput} from "src/controllers/formatting/render-ship-output";
import {Register201Response} from "src/controllers/schemas";
import {renderFaction} from "src/controllers/formatting/render-faction";
import {generateContract} from "src/universe/generateContract";
import {Configuration} from "src/universe/static-data/ship-configurations";
import {renderContract} from "src/controllers/formatting/render-contract";


@Controller("/")
export class GlobalController {
  @Post("/register")
  register(@BodyParams() body: GlobalRegisterPayload): Register201Response {
    const faction = universe.factions.find(faction => faction.symbol === body.faction)
    if (!faction) throw new Error(`Faction ${body.faction} not found`)
    const newAgent = new Agent({
      symbol: body.symbol,
      faction: body.faction,
      headquarters: faction.headquarters,
      credits: 175000
    })
    universe.agents.push(newAgent)
    universe.ships.push(newAgent.registerShip({
      configuration: Configuration.SHIP_COMMAND_FRIGATE,
      location: faction.headquarters
    }))

    const system = universe.systems.find(s => s.symbol === faction.headquarters.systemSymbol)
    if (!system) throw new Error(`System ${faction.headquarters.systemSymbol} not found`)
    const waypoint = system.waypoints.find(wp => wp.symbol === faction.headquarters.waypointSymbol)
    if (!waypoint) throw new Error(`Waypoint ${faction.headquarters.waypointSymbol} not found in system ${faction.headquarters.systemSymbol}, only have ${system.waypoints.map(wp => wp.symbol).join(', ')}`)
    const contract = generateContract(newAgent, waypoint)

    return {
      data: {
        token: newAgent.token,
        agent: {
          symbol: newAgent.symbol,
          accountId: newAgent.accountId,
          headquarters: newAgent.headquarters.waypointSymbol,
          credits: newAgent.credits,
          startingFaction: newAgent.faction,
        },
        contract: renderContract(contract),
        faction: renderFaction(faction),
        ship: renderShipOutput(newAgent.ships[0]),
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
