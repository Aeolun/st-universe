import {Controller} from "@tsed/di";
import {Get, Post} from "@tsed/schema";
import {Context, PathParams, QueryParams} from "@tsed/platform-params";
import {AuthToken} from "src/models/auth-token";
import {CustomAuth} from "src/guards/custom-authenticator";
import {AgentParam, getAgent} from "src/decorators/agent-param";
import {Agent} from "src/universe/entities/Agent";
import {renderContract} from "src/controllers/formatting/render-contract";
import {GetContract200Response, GetContracts200Response} from "src/controllers/schemas";
import {slicePage} from "src/controllers/formatting/slice-page";

@Controller("/my/")
@CustomAuth()
export class ContractsController {
  @Get("/contracts")
  listShips(@Context('auth') auth: AuthToken, @QueryParams('page') page: number = 1, @QueryParams('limit') limit: number = 10): GetContracts200Response {
    const agent = getAgent(auth);

    return {
      data: slicePage(agent.contracts, page, limit).map(contract => {
        return renderContract(contract)
      }),
      meta: {
        page: page,
        limit: limit,
        total: agent.contracts.length
      }
    }
  }

  @Get("/contracts/:contractId")
  get(@AgentParam() agent: Agent, @PathParams('contractId') contractId: string): GetContract200Response {


    return {}
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
