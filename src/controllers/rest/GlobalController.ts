import { Controller } from "@tsed/di";
import { Get, Post } from "@tsed/schema";
import { BodyParams } from "@tsed/platform-params";
import { GlobalRegisterPayload } from "src/controllers/schemas/global-register-payload";
import { GlobalGetResponse } from "src/controllers/schemas/global-get-response";
import { universe } from "src/universe/universe";
import { Agent } from "src/universe/entities/Agent";
import { renderShipOutput } from "src/controllers/formatting/render-ship-output";
import {
  GetStatus200Response,
  Register201Response,
} from "src/controllers/schemas";
import { renderFaction } from "src/controllers/formatting/render-faction";
import { generateContract } from "src/universe/generateContract";
import { Configuration } from "src/universe/static-data/ship-configurations";
import { renderContract } from "src/controllers/formatting/render-contract";
import { renderAgent } from "src/controllers/formatting/render-agent";
import { getSystem } from "src/controllers/helpers/get-system";
import { getWaypoint } from "src/controllers/helpers/get-waypoint";
import { STARTING_MONEY } from "src/universe/constants";

@Controller("/")
export class GlobalController {
  @Post("/register")
  register(@BodyParams() body: GlobalRegisterPayload): Register201Response {
    if (universe.agents.find((agent) => agent.symbol === body.symbol)) {
      throw new Error(`Agent ${body.symbol} already exists`);
    }

    const faction = universe.factions.find(
      (faction) => faction.symbol === body.faction
    );
    if (!faction) throw new Error(`Faction ${body.faction} not found`);
    const newAgent = new Agent({
      symbol: body.symbol,
      faction: body.faction,
      headquarters: faction.headquarters,
      credits: STARTING_MONEY,
    });
    universe.agents.push(newAgent);
    const wp = getWaypoint(universe, faction.headquarters.waypointSymbol);
    universe.ships.push(
      newAgent.registerShip({
        configuration: Configuration.SHIP_COMMAND_FRIGATE,
        waypoint: wp,
      })
    );

    const waypoint = getWaypoint(universe, faction.headquarters.waypointSymbol);
    const contract = generateContract(newAgent, waypoint);

    return {
      data: {
        token: newAgent.token,
        agent: renderAgent(newAgent),
        contract: renderContract(contract),
        faction: renderFaction(faction),
        ship: renderShipOutput(newAgent.ships[0]),
      },
    };
  }

  @Get("/")
  get(): GetStatus200Response {
    const agentsCredits = universe.agents
      .sort((a, b) => b.credits - a.credits)
      .slice(0, 10);

    return {
      status:
        "The st-universe server is currently online and accepting connections.",
      version: "v2",
      resetDate: universe.createDate,
      description: "A space trading game.",
      stats: {
        agents: universe.agents.length,
        ships: universe.ships.length,
        systems: Object.values(universe.systems).length,
        waypoints: Object.values(universe.waypoints).length,
      },
      serverResets: {
        next: new Date(new Date().getTime() + 1000 * 60 * 60).toISOString(),
        frequency: "hourly",
      },
      leaderboards: {
        mostSubmittedCharts: [],
        mostCredits: agentsCredits.map((c) => {
          return {
            agentSymbol: c.symbol,
            credits: c.credits,
          };
        }),
      },
      announcements: [],
      links: [],
    };
  }

  @Get("/systems.json")
  systems() {
    return Object.values(universe.systems).map((system) => ({
      symbol: system.symbol,
      sectorSymbol: system.sectorSymbol,
      type: system.type,
      x: system.x,
      y: system.y,
      waypoints: system.waypoints.map((wp) => ({
        symbol: wp.symbol,
        type: wp.type,
        x: wp.x,
        y: wp.y,
      })),
      factions: [],
    }));
  }
}
