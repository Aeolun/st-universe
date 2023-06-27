import { Controller } from "@tsed/di";
import { Get, Post } from "@tsed/schema";
import {
  BodyParams,
  Context,
  PathParams,
  QueryParams,
} from "@tsed/platform-params";
import { AuthToken } from "src/models/auth-token";
import { CustomAuth } from "src/guards/custom-authenticator";
import { AgentParam } from "src/decorators/agent-param";
import { Agent } from "src/universe/entities/Agent";
import { renderContract } from "src/controllers/formatting/render-contract";
import {
  AcceptContract200Response,
  DeliverContract200Response,
  DeliverContractRequest,
  FulfillContract200Response,
  GetContract200Response,
  GetContracts200Response,
} from "src/controllers/schemas";
import { slicePage } from "src/controllers/formatting/slice-page";
import { Contract } from "src/universe/entities/Contract";
import { renderAgent } from "src/controllers/formatting/render-agent";
import { renderShipCargo } from "src/controllers/formatting/render-ship-cargo";
import { TradeGood } from "src/universe/static-data/trade-goods";

@Controller("/my/")
@CustomAuth()
export class ContractsController {
  @Get("/contracts")
  listShips(
    @AgentParam() agent: Agent,
    @QueryParams("page") page: number = 1,
    @QueryParams("limit") limit: number = 10
  ): GetContracts200Response {
    return {
      data: slicePage<Contract>(agent.contracts, page, limit).map(
        (contract) => {
          return renderContract(contract);
        }
      ),
      meta: {
        page: page,
        limit: limit,
        total: agent.contracts.length,
      },
    };
  }

  @Get("/contracts/:contractId")
  get(
    @AgentParam() agent: Agent,
    @PathParams("contractId") contractId: string
  ): GetContract200Response {
    const contract = agent.contracts.find(
      (contract) => contract.symbol === contractId
    );

    if (!contract) throw new Error(`Contract ${contractId} not found`);

    return {
      data: renderContract(contract),
    };
  }

  @Post("/contracts/:contractId/accept")
  accept(
    @AgentParam() agent: Agent,
    @PathParams("contractId") contractId: string
  ): AcceptContract200Response {
    const contract = agent.contracts.find(
      (contract) => contract.symbol === contractId
    );

    if (!contract) throw new Error(`Contract ${contractId} not found`);

    if (contract.status !== "AVAILABLE") {
      throw new Error(`Contract ${contractId} is not available`);
    }

    let reward = 0;
    for (const term of contract.terms) {
      if (term.onAccept) {
        reward += term.onAccept;
      }
    }

    contract.status = "ACCEPTED";
    agent.credits += reward;

    return {
      data: {
        agent: renderAgent(agent),
        contract: renderContract(contract),
      },
    };
  }

  @Post("/contracts/:contractId/deliver")
  deliver(
    @AgentParam() agent: Agent,
    @PathParams("contractId") contractId: string,
    @BodyParams() body: DeliverContractRequest
  ): DeliverContract200Response {
    const contract = agent.contracts.find(
      (contract) => contract.symbol === contractId
    );

    if (!contract) throw new Error(`Contract ${contractId} not found`);

    if (contract.status !== "ACCEPTED") {
      throw new Error(`Contract ${contractId} is not accepted`);
    }

    const ship = agent.ships.find((ship) => ship.symbol === body.shipSymbol);
    if (!ship) throw new Error(`Ship ${body.shipSymbol} not found`);

    if (!ship.cargo.get(body.tradeSymbol))
      throw new Error(
        `Ship ${body.shipSymbol} has no ${body.tradeSymbol} in cargo`
      );

    for (const term of contract.terms) {
      if (
        term.type === "PROCUREMENT" &&
        term.deliveryGoodSymbol === body.tradeSymbol
      ) {
        if (ship.navigation.current.symbol !== term.deliveryWaypointSymbol) {
          throw new Error(
            `Ship ${body.shipSymbol} is not at waypoint ${term.deliveryWaypointSymbol}`
          );
        }

        term.deliveredQuantity += Math.min(
          ship.cargo.get(body.tradeSymbol),
          body.units
        );
        ship.cargo.remove(
          body.tradeSymbol,
          Math.min(ship.cargo.get(body.tradeSymbol), body.units)
        );
      }
    }

    return {
      data: {
        cargo: renderShipCargo(ship),
        contract: renderContract(contract),
      },
    };
  }

  @Post("/contracts/:contractId/fulfill")
  fulfill(
    @AgentParam() agent: Agent,
    @PathParams("contractId") contractId: string
  ): FulfillContract200Response {
    const contract = agent.contracts.find(
      (contract) => contract.symbol === contractId
    );

    if (!contract) throw new Error(`Contract ${contractId} not found`);

    if (contract.status !== "ACCEPTED") {
      throw new Error(`Contract ${contractId} is not accepted`);
    }

    let allTermsCompleted = true,
      reward = 0;
    for (const term of contract.terms) {
      if (term.type === "PROCUREMENT") {
        reward += term.onFulfilled;
        if (term.deliveredQuantity < term.deliveryQuantity) {
          allTermsCompleted = false;
          break;
        }
      }
    }

    if (!allTermsCompleted) {
      throw new Error(`Contract ${contractId} is not fulfilled`);
    }

    contract.status = "FULFILLED";
    agent.credits += reward;

    return {
      data: {
        contract: renderContract(contract),
        agent: renderAgent(agent),
      },
    };
  }
}
