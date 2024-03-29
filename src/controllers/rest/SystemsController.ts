import { Controller } from "@tsed/di";
import { Get } from "@tsed/schema";
import { Context, PathParams, QueryParams } from "@tsed/platform-params";
import { universe } from "src/universe/universe";
import {
  GetJumpGate200Response,
  GetMarket200Response,
  GetShipyard200Response,
  GetSystem200Response,
  GetSystems200Response,
  GetSystemWaypoints200Response,
  GetWaypoint200Response,
  ShipType,
  ShipyardShipTypesInner,
  SystemFaction,
  SystemType,
  TradeSymbol,
  WaypointType,
} from "src/controllers/schemas";
import { Faction } from "src/universe/static-data/faction";
import { renderSystem } from "src/controllers/formatting/render-system";
import { renderWaypoint } from "src/controllers/formatting/render-waypoint";
import { slicePage } from "src/controllers/formatting/slice-page";
import { tradeGoods } from "src/universe/static-data/trade-goods";
import { renderSupply } from "src/controllers/formatting/render-supply";
import { marketPrice } from "src/universe/formulas/trade";
import { CustomAuth } from "src/guards/custom-authenticator";
import { AuthToken } from "src/models/auth-token";
import { renderShipConfiguration } from "src/controllers/formatting/render-ship-configuration";
import { getDistance } from "src/universe/getDistance";
import { getSystem } from "src/controllers/helpers/get-system";
import { getWaypoint } from "src/controllers/helpers/get-waypoint";
import { renderShipTransaction } from "src/controllers/formatting/render-ship-transaction";
import { renderActivity } from "../formatting/render-activity";
import { STError } from "@src/error/STError";
import { waypointNoAccessError } from "@src/universe/static-data/error-codes";

@Controller("/systems/")
export class SystemsController {
  @Get("/")
  listSystems(
    @QueryParams("page") page: number,
    @QueryParams("limit") limit: number
  ): GetSystems200Response {
    const systems = slicePage(Object.values(universe.systems), page, limit).map(
      (system) => {
        return renderSystem(system);
      }
    );

    return {
      data: systems,
      meta: {
        page: page,
        limit: limit,
        total: Object.values(universe.systems).length,
      },
    };
  }

  @Get("/:systemSymbol")
  get(@PathParams("systemSymbol") systemSymbol: string): GetSystem200Response {
    const system = getSystem(universe, systemSymbol);

    return {
      data: renderSystem(system),
    };
  }

  @Get("/:systemSymbol/waypoints")
  waypoints(
    @PathParams("systemSymbol") systemSymbol: string,
    @QueryParams("page") page: number = 1,
    @QueryParams("limit") limit: number = 10
  ): GetSystemWaypoints200Response {
    const system = getSystem(universe, systemSymbol);

    const waypoints = slicePage(system.waypoints, page, limit).map(
      (waypoint) => {
        return renderWaypoint(waypoint);
      }
    );
    return {
      data: waypoints,
      meta: {
        page: page,
        limit: limit,
        total: waypoints.length,
      },
    };
  }

  @Get("/:systemSymbol/waypoints/:waypointSymbol")
  waypoint(
    @PathParams("systemSymbol") systemSymbol: string,
    @PathParams("waypointSymbol") waypointSymbol: string
  ): GetWaypoint200Response {
    const waypoint = getWaypoint(universe, waypointSymbol);

    return {
      data: renderWaypoint(waypoint),
    };
  }

  @Get("/:systemSymbol/waypoints/:waypointSymbol/market")
  @CustomAuth({ optional: true })
  market(
    @PathParams("systemSymbol") systemSymbol: string,
    @PathParams("waypointSymbol") waypointSymbol: string,
    @Context("auth") context: AuthToken
  ): GetMarket200Response {
    const waypoint = getWaypoint(universe, waypointSymbol);

    console.log(context);
    let hasShip = false;
    if (context) {
      hasShip =
        universe.ships.find(
          (ship) =>
            ship.agentSymbol == context.identifier &&
            ship.navigation.current.symbol === waypointSymbol
        ) !== undefined;
    }

    return {
      data: {
        symbol: waypointSymbol,
        exports: waypoint.exports.map((exportItem) => {
          return {
            symbol: exportItem as TradeSymbol,
            name: exportItem,
            description: exportItem,
          };
        }),
        imports: waypoint.imports.map((exportItem) => {
          return {
            symbol: exportItem as TradeSymbol,
            name: exportItem,
            description: exportItem,
          };
        }),
        exchange: waypoint.exchange.map((exportItem) => {
          return {
            symbol: exportItem as TradeSymbol,
            name: exportItem,
            description: exportItem,
          };
        }),
        transactions: hasShip
          ? waypoint.transactions.map((transaction) => {
              return {
                ...transaction,
                timestamp: transaction.timestamp.toISOString(),
              };
            })
          : undefined,
        tradeGoods: hasShip
          ? Object.values(waypoint.supplyDemand).map((supplyDemand) => {
              const tradeGoodData = tradeGoods[supplyDemand.tradeGood];
              const goodInventory = waypoint.inventory.get(
                supplyDemand.tradeGood
              );
              const price = marketPrice(
                tradeGoodData.basePrice ?? 0,
                goodInventory,
                supplyDemand.current.idealSupply,
                supplyDemand.current.maxSupply,
                supplyDemand.localFluctuation
              );
              return {
                symbol: supplyDemand.tradeGood as TradeSymbol,
                tradeVolume: supplyDemand.current.tradeVolume,
                type:
                  supplyDemand.kind === "supply"
                    ? "EXPORT"
                    : supplyDemand.kind === "exchange"
                    ? "EXCHANGE"
                    : "IMPORT",
                activity: renderActivity(
                  supplyDemand.activity,
                  supplyDemand.lastTickProduction -
                    supplyDemand.lastTickConsumption,
                  supplyDemand.current.maxSupply,
                  goodInventory
                ),
                supply: renderSupply(
                  waypoint.inventory.get(supplyDemand.tradeGood),
                  supplyDemand.current.idealSupply
                ),
                // purchase and sale price inverted since we are looking at the market from the perspective of the ship
                purchasePrice: price.salePrice,
                sellPrice: price.purchasePrice,
              };
            })
          : undefined,
      },
    };
  }

  @Get("/:systemSymbol/waypoints/:waypointSymbol/shipyard")
  @CustomAuth({ optional: true })
  shipyard(
    @PathParams("systemSymbol") systemSymbol: string,
    @PathParams("waypointSymbol") waypointSymbol: string,
    @Context("auth") context: AuthToken
  ): GetShipyard200Response {
    const system = getSystem(universe, systemSymbol);
    if (!system) throw new Error(`System ${systemSymbol} not found`);
    const waypoint = system.waypoints.find(
      (waypoint) => waypoint.symbol === waypointSymbol
    );
    if (!waypoint) throw new Error(`Waypoint ${waypointSymbol} not found`);

    let hasShip = false;
    if (context) {
      hasShip =
        universe.ships.find(
          (ship) =>
            ship.agentSymbol === context.identifier &&
            ship.navigation.current.symbol === waypointSymbol
        ) !== undefined;
    }

    return {
      data: {
        symbol: waypointSymbol,
        shipTypes: waypoint.availableShipConfigurations.map((c) => {
          return {
            type: c as ShipType,
          };
        }),
        transactions: hasShip
          ? waypoint.shipTransactions.map((st) => {
              return renderShipTransaction(st);
            })
          : undefined,
        ships: hasShip
          ? waypoint.availableShipConfigurations.map((item) => {
              return renderShipConfiguration(item, waypoint);
            })
          : undefined,
        modificationsFee: 5000,
      },
    };
  }

  @Get("/:systemSymbol/waypoints/:waypointSymbol/jump-gate")
  @CustomAuth({ optional: true })
  jumpGate(
    @PathParams("systemSymbol") systemSymbol: string,
    @PathParams("waypointSymbol") waypointSymbol: string,
    @Context("auth") context: AuthToken
  ): GetJumpGate200Response {
    const system = getSystem(universe, systemSymbol);
    const waypoint = getWaypoint(universe, waypointSymbol);

    let hasShip = false;
    if (context) {
      hasShip =
        universe.ships.find(
          (ship) =>
            ship.agentSymbol == context.identifier &&
            ship.navigation.current.symbol === waypointSymbol
        ) !== undefined;
    }

    if (waypoint.type === "JUMP_GATE" && !waypoint.jumpGate) {
      throw new Error(
        "Something is wrong on the server side and the jumpgate wayoint has no jump gate"
      );
    }
    if (!waypoint.jumpGate)
      throw new Error(`Waypoint ${waypointSymbol} does not have a jump gate`);

    if (!hasShip && !waypoint.chart) {
      throw new STError(
        403,
        waypointNoAccessError,
        `Agent ${context.identifier} does not have a ship at waypoint ${waypointSymbol}, and waypoint is not charted.`
      );
    }

    return {
      data: {
        symbol: waypoint.symbol,
        connections: waypoint.jumpGate.connections,
      },
    };
  }
}
