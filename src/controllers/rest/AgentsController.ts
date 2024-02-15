import { Controller } from "@tsed/di";
import { Get } from "@tsed/schema";
import { Context, PathParams, QueryParams } from "@tsed/platform-params";
import { GetMyAgent200Response } from "src/controllers/schemas";
import { CustomAuth } from "src/guards/custom-authenticator";
import { AuthToken } from "src/models/auth-token";
import { universe } from "src/universe/universe";
import { STError } from "src/error/STError";
import { GetAgents200Response } from "src/controllers/schemas/get-agents200-response";
import { slicePage } from "src/controllers/formatting/slice-page";
import { renderAgent } from "src/controllers/formatting/render-agent";
import { agentNotExistsError } from "src/universe/static-data/error-codes";

@Controller("/")
export class AgentsController {
  @Get("/my/agent")
  @CustomAuth()
  myAgent(@Context("auth") context: AuthToken): GetMyAgent200Response {
    const agent = universe.agents.find((a) => a.symbol === context.identifier);

    if (!agent)
      throw new STError(
        400,
        agentNotExistsError,
        `Agent ${context.identifier} not found`
      );

    return {
      data: {
        accountId: agent.accountId,
        symbol: agent.symbol,
        headquarters: agent.headquarters.waypointSymbol,
        credits: agent.credits,
        startingFaction: agent.faction,
        shipCount: agent.ships.length
      },
    };
  }

  @Get("/agents")
  agents(
    @QueryParams("page") page: number = 1,
    @QueryParams("limit") limit: number = 10
  ): GetAgents200Response {
    const agents = slicePage(universe.agents, page, limit);

    return {
      data: agents.map((agent) => renderAgent(agent)),
      meta: {
        total: universe.agents.length,
        page: page,
        limit: limit,
      },
    };
  }

  @Get("/agents/:agentId")
  agent(@PathParams("agentId") agentId: string): GetMyAgent200Response {
    const agent = universe.agents.find((agent) => agent.symbol === agentId);

    if (!agent) {
      throw new STError(400, agentNotExistsError, `Agent ${agentId} not found`);
    }

    return {
      data: renderAgent(agent),
    };
  }
}
