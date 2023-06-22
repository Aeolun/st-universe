import {Controller} from "@tsed/di";
import {Get} from "@tsed/schema";
import {Context, PathParams, QueryParams} from "@tsed/platform-params";
import {universe} from "src/universe/universe";
import {
  GetJumpGate200Response,
  GetMarket200Response, GetShipyard200Response,
  GetSystem200Response,
  GetSystems200Response, GetSystemWaypoints200Response, GetWaypoint200Response, ShipType, ShipyardShipTypesInner,
  SystemFaction,
  SystemType, TradeSymbol,
  WaypointType
} from "src/controllers/schemas";
import {Faction} from "src/universe/static-data/faction";
import {renderSystem} from "src/controllers/formatting/render-system";
import {renderWaypoint} from "src/controllers/formatting/render-waypoint";
import {slicePage} from "src/controllers/formatting/slice-page";
import {tradeGoods} from "src/universe/static-data/trade-goods";
import {renderSupply} from "src/controllers/formatting/render-supply";
import {marketPrice} from "src/universe/formulas/trade";
import {CustomAuth} from "src/guards/custom-authenticator";
import {AuthToken} from "src/models/auth-token";

@Controller("/systems/")
export class SystemsController {
  @Get("/")
  listSystems(@QueryParams('page') page: number, @QueryParams('limit') limit: number): GetSystems200Response {
    const systems = slicePage(universe.systems, page, limit).map(system => {
      return renderSystem(system)
    })

    return {
      data: systems,
      meta: {
        page: page,
        limit: limit,
        total: universe.systems.length
      }
    }
  }

  @Get("/:systemSymbol")
  get(@PathParams('systemSymbol') systemSymbol: string): GetSystem200Response {
    const system = universe.systems.find(system => system.symbol === systemSymbol)
    if (!system) throw new Error(`System ${systemSymbol} not found`)
    return {
      data: renderSystem(system),
    }
  }

  @Get("/:systemSymbol/waypoints")
  waypoints(@PathParams('systemSymbol') systemSymbol: string, @QueryParams('page') page: number = 1, @QueryParams('limit') limit: number = 10): GetSystemWaypoints200Response {
    const system = universe.systems.find(system => system.symbol === systemSymbol)
    if (!system) throw new Error(`System ${systemSymbol} not found`)
    const factions: SystemFaction[] = []
    const waypoints = slicePage(system.waypoints, page, limit).map(waypoint => {
      return renderWaypoint(waypoint)
    })
    return {
      data: waypoints,
      meta: {
        page: page,
        limit: limit,
        total: waypoints.length
      }
    }
  }

  @Get("/:systemSymbol/waypoints/:waypointSymbol")
  waypoint(@PathParams('systemSymbol') systemSymbol: string, @PathParams('waypointSymbol') waypointSymbol: string): GetWaypoint200Response {
    const system = universe.systems.find(system => system.symbol === systemSymbol)
    if (!system) throw new Error(`System ${systemSymbol} not found`)
    const waypoint = system.waypoints.find(waypoint => waypoint.symbol === waypointSymbol)
    if (!waypoint) throw new Error(`Waypoint ${waypointSymbol} not found`)

    return {
      data: renderWaypoint(waypoint)
    };
  }

  @Get("/:systemSymbol/waypoints/:waypointSymbol/market")
  @CustomAuth({optional: true})
  market(@PathParams('systemSymbol') systemSymbol: string, @PathParams('waypointSymbol') waypointSymbol: string): GetMarket200Response {
    const system = universe.systems.find(system => system.symbol === systemSymbol)
    if (!system) throw new Error(`System ${systemSymbol} not found`)
    const waypoint = system.waypoints.find(waypoint => waypoint.symbol === waypointSymbol)
    if (!waypoint) throw new Error(`Waypoint ${waypointSymbol} not found`)

    return {
      data: {
        symbol: waypointSymbol,
        exports: waypoint.exports.map(exportItem => {
          return {
            symbol: exportItem as TradeSymbol,
            name: exportItem,
            description: exportItem
          }
        }),
        imports: waypoint.imports.map(exportItem => {
          return {
            symbol: exportItem as TradeSymbol,
            name: exportItem,
            description: exportItem
          }
        }),
        exchange: waypoint.exchange.map(exportItem => {
          return {
            symbol: exportItem as TradeSymbol,
            name: exportItem,
            description: exportItem
          }
        }),
        transactions: waypoint.transactions.map(transaction => {
          return {
            ...transaction,
            timestamp: transaction.timestamp.toISOString()
          }
        }),
        tradeGoods: Object.values(waypoint.supplyDemand).map(supplyDemand => {
          const tradeGoodData = tradeGoods[supplyDemand.tradeGood]
          const price = marketPrice(supplyDemand)
          return {
            symbol: supplyDemand.tradeGood as TradeSymbol,
            tradeVolume: tradeGoodData.baseTradeVolume,
            supply: renderSupply(supplyDemand.currentSupply, supplyDemand.idealSupply),
            purchasePrice: price.purchasePrice,
            sellPrice: price.salePrice
          }
        })
      }
    };
  }

  @Get("/:systemSymbol/waypoints/:waypointSymbol/shipyard")
  @CustomAuth({optional: true})
  shipyard(@PathParams('systemSymbol') systemSymbol: string, @PathParams('waypointSymbol') waypointSymbol: string, @Context('auth') context: AuthToken): GetShipyard200Response {
    const system = universe.systems.find(system => system.symbol === systemSymbol)
    if (!system) throw new Error(`System ${systemSymbol} not found`)
    const waypoint = system.waypoints.find(waypoint => waypoint.symbol === waypointSymbol)
    if (!waypoint) throw new Error(`Waypoint ${waypointSymbol} not found`)

    let hasShip = false
    if (context) {
      hasShip = universe.ships.find(ship => ship.agentSymbol == context.identifier && ship.navigation.current.waypoint === waypointSymbol) !== undefined
    }

    return {
      data: {
        symbol: waypointSymbol,
        shipTypes: waypoint.availableShipConfigurations.map(c => {
          return {
            type: c as ShipType,
          }
        }),
        transactions: hasShip ? waypoint.shipTransactions.map(st => {
          return {
            waypointSymbol: st.waypointSymbol,
            shipSymbol: st.tradeSymbol,
            price: st.pricePerUnit,
            agentSymbol: st.agentSymbol,
            timestamp: st.timestamp.toISOString()
          }
        }) : undefined,
        ships: hasShip ? waypoint.availableShipConfigurations.map(c => {
          return {

          }
        }) : undefined
      }
    }
  }

  @Get("/:systemSymbol/waypoints/:waypointSymbol/jump-gate")
  @CustomAuth({optional: true})
  jumpGate(@PathParams('factionId') factionId: string): GetJumpGate200Response {
    return "hello";
  }
}
