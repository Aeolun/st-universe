import {Controller} from "@tsed/di";
import {Get, Patch, Post} from "@tsed/schema";
import {BodyParams, PathParams, QueryParams} from "@tsed/platform-params";
import {CustomAuth} from "src/guards/custom-authenticator";
import {
  GetMyShip200Response, GetMyShipCargo200Response,
  GetMyShips200Response,
  PurchaseShip201Response,
  PurchaseShipRequest
} from "src/controllers/schemas";
import {AgentParam} from "src/decorators/agent-param";
import {Agent} from "src/universe/entities/Agent";
import {slicePage} from "src/controllers/formatting/slice-page";
import {renderShipOutput} from "src/controllers/formatting/render-ship-output";
import {universe} from "src/universe/universe";
import {getWaypoint} from "src/controllers/helpers/get-waypoint";
import {renderAgent} from "src/controllers/formatting/render-agent";
import {shipPrice} from "src/universe/formulas/trade";
import {shipConfigurationData} from "src/universe/static-data/ship-configurations";
import {Transaction} from "src/universe/entities/Transaction";
import {renderShipTransaction} from "src/controllers/formatting/render-ship-transaction";
import {getShip} from "src/controllers/helpers/get-ship";
import {renderShipCargo} from "src/controllers/formatting/render-ship-cargo";

@Controller("/my/")
@CustomAuth()
export class FleetController {
  @Get("/ships")
  listShips(@AgentParam() agent: Agent, @QueryParams('page') page: number = 1, @QueryParams('limit') limit: number = 10): GetMyShips200Response {
    return {
      data: slicePage(agent.ships, page, limit).map(ship => {
        return renderShipOutput(ship);
      }),
      meta: {
        page: page,
        limit: limit,
        total: agent.ships.length
      }
    };
  }

  @Post("/ships")
  purchaseShip(@AgentParam() agent: Agent, @BodyParams() body: PurchaseShipRequest): PurchaseShip201Response {
    const waypoint = getWaypoint(universe, body.waypointSymbol)

    const shipAtLocation = agent.ships.find(ship => ship.navigation.current.symbol === waypoint.symbol)
    if (!shipAtLocation) throw new Error(`No ship at ${waypoint.symbol}`);

    const price = shipPrice(shipConfigurationData[body.shipType], waypoint)
    if (agent.credits < price) throw new Error(`Insufficient funds. Ship costs ${price} credits.`)

    agent.credits -= price
    const transaction: Transaction = {
      agentSymbol: agent.symbol,
      waypointSymbol: waypoint.symbol,
      shipSymbol: shipAtLocation.symbol,
      type: 'PURCHASE',
      units: 1,
      tradeSymbol: body.shipType,
      pricePerUnit: price,
      totalPrice: price,
      timestamp: new Date()
    }

    waypoint.shipTransactions.push(transaction)

    const newShip = agent.registerShip({
      configuration: body.shipType,
      waypoint: waypoint
    })
    return {
      data: {
        agent: renderAgent(agent),
        transaction: renderShipTransaction(transaction),
        ship: renderShipOutput(newShip)
      }
    };
  }

  @Get("/ships/:shipSymbol")
  ship(@AgentParam() agent: Agent, @PathParams('shipSymbol') shipSymbol: string): GetMyShip200Response {
    const ship = getShip(agent, shipSymbol)
    return {
      data: renderShipOutput(ship)
    };
  }

  @Get("/ships/:shipSymbol/cargo")
  cargo(@AgentParam() agent: Agent, @PathParams('shipSymbol') shipSymbol: string): GetMyShipCargo200Response {
    const ship = getShip(agent, shipSymbol)
    return {
      data: renderShipCargo(ship)
    }
  }

  @Post("/ships/:shipSymbol/orbit")
  orbit(@AgentParam() agent: Agent, @PathParams('shipSymbol') shipSymbol: string) {
    const ship = getShip(agent, shipSymbol)
    if (ship.navigation.status === 'IN_TRANSIT')
    return "hello";
  }

  @Post("/ships/:shipSymbol/refine")
  refine(@AgentParam() agent: Agent, @PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/chart")
  chart(@AgentParam() agent: Agent, @PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Get("/ships/:shipSymbol/cooldown")
  cooldowns(@AgentParam() agent: Agent, @PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/dock")
  dock(@AgentParam() agent: Agent, @PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/survey")
  survey(@AgentParam() agent: Agent, @PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/extract")
  extract(@AgentParam() agent: Agent, @PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/jettison")
  jettison(@AgentParam() agent: Agent, @PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/jump")
  jump(@AgentParam() agent: Agent, @PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/navigate")
  navigate(@AgentParam() agent: Agent, @PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Patch("/ships/:shipSymbol/nav")
  patchNav(@AgentParam() agent: Agent, @PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Get("/ships/:shipSymbol/nav")
  getNav(@AgentParam() agent: Agent, @PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/warp")
  warp(@AgentParam() agent: Agent, @PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/sell")
  sell(@AgentParam() agent: Agent, @PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/scan/systems")
  scanSystems(@AgentParam() agent: Agent, @PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/scan/waypoints")
  scanWaypoints(@AgentParam() agent: Agent, @PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/scan/ships")
  scanShips(@AgentParam() agent: Agent, @PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/refuel")
  refuel(@AgentParam() agent: Agent, @PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/purchase")
  purchase(@AgentParam() agent: Agent, @PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/transfer")
  transfer(@AgentParam() agent: Agent, @PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/negotiate/contract")
  negotiateContract(@AgentParam() agent: Agent, @PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }
}
