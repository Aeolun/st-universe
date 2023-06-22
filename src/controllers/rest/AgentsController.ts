import {Controller} from "@tsed/di";
import {Get} from "@tsed/schema";
import {Context, PathParams} from "@tsed/platform-params";
import {GetMyAgent200Response} from "src/controllers/schemas";
import {CustomAuth} from "src/guards/custom-authenticator";
import {AuthToken} from "src/models/auth-token";
import {universe} from "src/universe/universe";

@Controller("/my/")
export class AgentsController {
  @Get("/agent")
  @CustomAuth()
  get(@Context('auth') context: AuthToken): GetMyAgent200Response {
    const agent = universe.agents.find(a => a.symbol === context.identifier)

    if (!agent) throw new Error(`Agent ${context.identifier} not found`)

    return {
      data: {
        accountId: agent.accountId,
        symbol: agent.symbol,
        headquarters: agent.headquarters,
        credits: agent.credits,
        startingFaction: agent.faction
      }
    };
  }

}
