import { Controller } from "@tsed/di";
import { Get, Patch, Post } from "@tsed/schema";
import { BodyParams, PathParams, QueryParams } from "@tsed/platform-params";
import { CustomAuth } from "src/guards/custom-authenticator";
import crypto from "crypto";
import {
  CreateChart201Response,
  CreateShipShipScan201Response,
  CreateShipSystemScan201Response,
  CreateShipWaypointScan201Response,
  CreateSurvey201Response,
  DockShip200Response,
  ExtractResources201Response,
  GetMounts200Response,
  GetMyShip200Response,
  GetMyShipCargo200Response,
  GetMyShips200Response,
  GetShipCooldown200Response,
  GetShipNav200Response,
  InstallMount201Response,
  InstallMountRequest,
  Jettison200Response,
  JettisonRequest,
  JumpShip200Response,
  JumpShipRequest,
  NavigateShip200Response,
  NavigateShipRequest,
  NegotiateContract200Response,
  OrbitShip200Response,
  PatchShipNavRequest,
  PurchaseCargo201Response,
  PurchaseCargoRequest,
  PurchaseShip201Response,
  PurchaseShipRequest,
  RefuelShip200Response,
  RefuelShipRequest,
  RemoveMount201Response,
  RemoveMountRequest,
  SellCargo201Response,
  SellCargoRequest,
  ShipRefineRequest,
  Survey,
  TradeSymbol,
  TransferCargo200Response,
  TransferCargoRequest,
} from "src/controllers/schemas";
import { AgentParam } from "src/decorators/agent-param";
import { Agent } from "src/universe/entities/Agent";
import { slicePage } from "src/controllers/formatting/slice-page";
import { renderShipOutput } from "src/controllers/formatting/render-ship-output";
import { universe } from "src/universe/universe";
import { getWaypoint } from "src/controllers/helpers/get-waypoint";
import { renderAgent } from "src/controllers/formatting/render-agent";
import { marketPrice, shipPrice } from "src/universe/formulas/trade";
import { shipConfigurationData } from "src/universe/static-data/ship-configurations";
import { Transaction } from "src/universe/entities/Transaction";
import { renderShipTransaction } from "src/controllers/formatting/render-ship-transaction";
import { getShip } from "src/controllers/helpers/get-ship";
import { renderShipCargo } from "src/controllers/formatting/render-ship-cargo";
import { BadRequest } from "@tsed/exceptions";
import { renderShipNav } from "src/controllers/formatting/render-ship-nav";
import { checkShipNotNavigating } from "src/controllers/helpers/check-ship-not-navigating";
import { ShipRefine200Response } from "src/controllers/schemas/ship-refine200-response";
import { renderCooldown } from "src/controllers/formatting/render-cooldown";
import { checkShipNotOnCooldown } from "src/controllers/helpers/check-ship-not-on-cooldown";
import { checkShipDocked } from "src/controllers/helpers/check-ship-docked";
import { checkShipInOrbit } from "src/controllers/helpers/check-ship-in-orbit";
import { renderWaypoint } from "src/controllers/formatting/render-waypoint";
import { renderChart } from "src/controllers/formatting/render-chart";
import { Refines } from "src/universe/entities/capabilities/Refines";
import { resourceGroups } from "src/universe/static-data/resource-groups";
import { TradeGood } from "src/universe/static-data/trade-goods";
import { refine } from "src/controllers/helpers/refine";
import { SurveysForResources } from "src/universe/entities/capabilities/SurveysForResources";
import {
  numberBetween,
  pickRandom,
  randomWeightedKey,
  trulyUniqId,
} from "src/universe/utilities";
import { ExtractsResources } from "src/universe/entities/capabilities/ExtractsResources";
import { ProvidesJumpRange } from "src/universe/entities/capabilities/ProvidesJumpRange";
import { getDistance } from "src/universe/getDistance";
import { getSystem } from "src/controllers/helpers/get-system";
import {
  navigateFuelUsed,
  navigateTravelTime,
  warpFuelUsed,
  warpTravelTime,
} from "src/universe/formulas/navigation";
import { ProvidesWarpRange } from "src/universe/entities/capabilities/ProvidesWarpRange";
import { renderMarketTransaction } from "src/controllers/formatting/render-market-transaction";
import { renderSystem } from "src/controllers/formatting/render-system";
import { ProvidesScanPower } from "src/universe/entities/capabilities/ProvidesScanPower";
import { Ship } from "src/universe/entities/Ship";
import { renderScannedShip } from "src/controllers/formatting/render-scanned-ship";
import { generateContract } from "src/universe/generateContract";
import { renderContract } from "src/controllers/formatting/render-contract";
import { renderShipMount } from "src/controllers/formatting/render-ship-mount";
import { renderServiceTransaction } from "src/controllers/formatting/render-service-transaction";
import { mountData } from "src/universe/static-data/ship-mounts";

@Controller("/my/")
@CustomAuth()
export class FleetController {
  @Get("/ships")
  listShips(
    @AgentParam() agent: Agent,
    @QueryParams("page") page: number = 1,
    @QueryParams("limit") limit: number = 10
  ): GetMyShips200Response {
    return {
      data: slicePage(agent.ships, page, limit).map((ship) => {
        return renderShipOutput(ship);
      }),
      meta: {
        page: page,
        limit: limit,
        total: agent.ships.length,
      },
    };
  }

  @Post("/ships")
  purchaseShip(
    @AgentParam() agent: Agent,
    @BodyParams() body: PurchaseShipRequest
  ): PurchaseShip201Response {
    const waypoint = getWaypoint(universe, body.waypointSymbol);

    const shipAtLocation = agent.ships.find(
      (ship) => ship.navigation.current.symbol === waypoint.symbol
    );
    if (!shipAtLocation) throw new Error(`No ship at ${waypoint.symbol}`);

    const price = shipPrice(shipConfigurationData[body.shipType], waypoint);
    if (agent.credits < price)
      throw new Error(`Insufficient funds. Ship costs ${price} credits.`);

    // TODO: Need to take components out of waypoint inventory

    agent.credits -= price;
    const transaction: Transaction = {
      agentSymbol: agent.symbol,
      waypointSymbol: waypoint.symbol,
      shipSymbol: shipAtLocation.symbol,
      type: "PURCHASE",
      units: 1,
      tradeSymbol: body.shipType,
      pricePerUnit: price,
      totalPrice: price,
      timestamp: new Date(),
    };

    waypoint.shipTransactions.push(transaction);

    const newShip = agent.registerShip({
      configuration: body.shipType,
      waypoint: waypoint,
    });
    universe.ships.push(newShip);
    return {
      data: {
        agent: renderAgent(agent),
        transaction: renderShipTransaction(transaction),
        ship: renderShipOutput(newShip),
      },
    };
  }

  @Get("/ships/:shipSymbol")
  ship(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string
  ): GetMyShip200Response {
    const ship = getShip(agent, shipSymbol);
    return {
      data: renderShipOutput(ship),
    };
  }

  @Get("/ships/:shipSymbol/cargo")
  cargo(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string
  ): GetMyShipCargo200Response {
    const ship = getShip(agent, shipSymbol);
    return {
      data: renderShipCargo(ship),
    };
  }

  @Post("/ships/:shipSymbol/orbit")
  orbit(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string
  ): OrbitShip200Response {
    const ship = getShip(agent, shipSymbol);
    checkShipNotNavigating(ship);

    ship.navigation.isDocked = false;

    return {
      data: {
        nav: renderShipNav(ship.navigation),
      },
    };
  }

  @Post("/ships/:shipSymbol/refine")
  refine(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string,
    @BodyParams() body: ShipRefineRequest
  ): ShipRefine200Response {
    const ship = getShip(agent, shipSymbol);
    checkShipNotOnCooldown(ship);

    const refineries = ship.modules.filter((m) =>
      m.capabilities.some((c) => c instanceof Refines)
    );
    if (refineries.length === 0)
      throw new BadRequest(`No refineries on ${shipSymbol}`);

    const powerUsage = refineries.reduce(
      (acc, refinery) => acc + refinery.stats.powerRequired,
      0
    );

    ship.setCooldown(powerUsage);

    const refineResult = refine(refineries, ship.cargo, body.produce);

    if (!refineResult.canRefine)
      throw new BadRequest(
        `Cannot refine ${body.produce}, no refinery that can refine it`
      );
    if (refineResult.totalRefined === 0)
      throw new BadRequest(
        `Cannot refine ${body.produce}, not enough materials`
      );

    return {
      data: {
        cargo: renderShipCargo(ship),
        consumed: refineResult.consumed,
        produced: refineResult.produced,
        cooldown: renderCooldown(ship),
      },
    };
  }

  @Post("/ships/:shipSymbol/chart")
  chart(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string
  ): CreateChart201Response {
    const ship = getShip(agent, shipSymbol);
    checkShipNotNavigating(ship);

    const waypoint = getWaypoint(universe, ship.navigation.current.symbol);
    if (waypoint.chart)
      throw new BadRequest(`Chart already exists for ${waypoint.symbol}`);

    const chart = waypoint.chartWaypoint({
      waypointSymbol: waypoint.symbol,
      submittedBy: shipSymbol,
      submittedOn: new Date(),
    });

    agent.charts.push(chart);

    return {
      data: {
        waypoint: renderWaypoint(waypoint),
        chart: renderChart(waypoint.chart),
      },
    };
  }

  @Get("/ships/:shipSymbol/cooldown")
  cooldowns(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string
  ): GetShipCooldown200Response {
    const ship = getShip(agent, shipSymbol);
    checkShipNotNavigating(ship);

    return {
      data: renderCooldown(ship),
    };
  }

  @Post("/ships/:shipSymbol/dock")
  dock(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string
  ): DockShip200Response {
    const ship = getShip(agent, shipSymbol);
    checkShipNotNavigating(ship);

    ship.navigation.isDocked = true;

    return {
      data: {
        nav: renderShipNav(ship.navigation),
      },
    };
  }

  @Post("/ships/:shipSymbol/survey")
  survey(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string
  ): CreateSurvey201Response {
    const ship = getShip(agent, shipSymbol);
    checkShipNotOnCooldown(ship);

    const waypoint = getWaypoint(universe, ship.navigation.current.symbol);

    const surveyMounts = ship.mounts.filter((m) =>
      m.capabilities.some((c) => c instanceof SurveysForResources)
    );
    const powerUsage = surveyMounts.reduce(
      (acc, mount) => acc + mount.stats.powerRequired,
      0
    );

    const surveys: Survey[] = [];

    let maxPossibleResources = 0;
    surveyMounts.forEach((mount) => {
      const possibleResources: TradeGood[] = [];

      mount.stats.resourcesSurveyed.forEach((resource) => {
        resourceGroups[resource].forEach((good) => {
          if (
            Object.keys(waypoint.extractableResources).find((ex) => ex === good)
          ) {
            possibleResources.push(good);
          }
        });
      });

      if (maxPossibleResources < possibleResources.length) {
        maxPossibleResources = possibleResources.length;
      }
      if (maxPossibleResources === 0) {
        return;
      }

      for (let i = 0; i < mount.stats.surveysGenerated; i++) {
        const sizes = {
          LARGE: 10,
          MODERATE: 20,
          SMALL: 70,
        };
        const sizeCount = {
          LARGE: 5,
          MODERATE: 4,
          SMALL: 3,
        };
        const size = randomWeightedKey(sizes);
        const resources: TradeGood[] = [];
        for (let i = 0; i < sizeCount[size]; i++) {
          resources.push(pickRandom(possibleResources));
        }

        const survey = {
          symbol: `${ship.navigation.current.symbol}-${trulyUniqId()}`,
          size: size,
          deposits: resources.map((r) => ({
            symbol: r,
          })),
          expiration: new Date(
            Date.now() + 1000 * 60 * 60 * 24 * 7
          ).toISOString(),
        };
        const signature = crypto
          .createHash("sha256")
          .update(JSON.stringify(survey))
          .digest("hex")
          .substring(0, 10);

        surveys.push({
          ...survey,
          signature,
        });
      }
    });

    if (maxPossibleResources === 0) {
      throw new BadRequest(
        `There are no resources in this location that you can survey with your current mount/module configuration.`
      );
    }

    ship.setCooldown(powerUsage);

    return {
      data: {
        surveys: surveys,
        cooldown: renderCooldown(ship),
      },
    };
  }

  @Post("/ships/:shipSymbol/extract")
  extract(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string
  ): ExtractResources201Response {
    const ship = getShip(agent, shipSymbol);
    checkShipNotOnCooldown(ship);

    const waypoint = getWaypoint(universe, ship.navigation.current.symbol);

    const extractMounts = ship.mounts.filter((m) =>
      m.capabilities.some((c) => c instanceof ExtractsResources)
    );
    const powerUsage = extractMounts.reduce(
      (acc, mount) => acc + mount.stats.powerRequired,
      0
    );

    let maxPossibleResources = 0;
    const allPossibleResources: TradeGood[] = [];
    let variation = 0;
    let totalPower = 0;
    extractMounts.forEach((mount) => {
      const possibleResources: TradeGood[] = [];
      mount.stats.resourcesExtracted.forEach((resource) => {
        resourceGroups[resource].forEach((good) => {
          if (
            Object.keys(waypoint.extractableResources).find((ex) => ex === good)
          ) {
            possibleResources.push(good);
          }
        });
      });

      if (maxPossibleResources < possibleResources.length) {
        maxPossibleResources = possibleResources.length;
      }

      if (maxPossibleResources === 0) {
        return;
      }

      allPossibleResources.push(...possibleResources);
      totalPower += mount.stats.extractionPower;
      variation += 5;
    });

    if (maxPossibleResources === 0) {
      throw new BadRequest(
        `There are no resources in this location that you can extract with your current mount/module configuration.`
      );
    }

    const resource = pickRandom(allPossibleResources);
    const extracted = totalPower + numberBetween(-variation, variation);

    ship.cargo.add(resource, extracted);
    ship.setCooldown(powerUsage);

    return {
      data: {
        cooldown: renderCooldown(ship),
        cargo: renderShipCargo(ship),
        extraction: {
          shipSymbol: ship.symbol,
          yield: {
            symbol: resource as TradeSymbol,
            units: extracted,
          },
        },
      },
    };
  }

  @Post("/ships/:shipSymbol/jettison")
  jettison(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string,
    @BodyParams() body: JettisonRequest
  ): Jettison200Response {
    const ship = getShip(agent, shipSymbol);

    if (ship.cargo.get(body.symbol) < body.units) {
      throw new BadRequest(
        `You do not have ${body.units} ${body.symbol} in your cargo.`
      );
    }

    ship.cargo.remove(body.symbol, body.units);

    return {
      data: {
        cargo: renderShipCargo(ship),
      },
    };
  }

  @Post("/ships/:shipSymbol/jump")
  jump(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string,
    @BodyParams() body: JumpShipRequest
  ): JumpShip200Response {
    const ship = getShip(agent, shipSymbol);
    checkShipNotOnCooldown(ship);
    checkShipInOrbit(ship);

    const waypoint = getWaypoint(universe, ship.navigation.current.symbol);
    const jumpMounts = ship.modules.filter((m) => {
      return m.capabilities.some((c) => c instanceof ProvidesJumpRange);
    });
    let powerUsage = jumpMounts.reduce(
      (acc, mount) => acc + mount.stats.powerRequired,
      0
    );
    if (!powerUsage) {
      powerUsage = 20;
    }

    if (jumpMounts.length === 0 && !waypoint.jumpGate) {
      throw new BadRequest(
        `You do not have any jump capability or jump gates at this waypoint.`
      );
    }

    const jumpMountsRange = jumpMounts.reduce(
      (acc, mount) => Math.max(acc, mount.stats.jumpRange),
      0
    );

    const sourceSystem = getSystem(
      universe,
      ship.navigation.current.systemSymbol
    );
    const targetSystem = getSystem(universe, body.systemSymbol);

    const jumpRange = waypoint.jumpGate?.range || jumpMountsRange;
    const distance = getDistance(sourceSystem, targetSystem);

    if (distance > jumpRange) {
      throw new BadRequest(
        `You do not have enough jump range to travel to ${body.systemSymbol}. Can go ${jumpRange}, but ${distance} units away.`
      );
    }

    const arrivalWp = targetSystem.waypoints.find(
      (wp) => wp.type === "JUMP_GATE"
    );
    if (!arrivalWp) {
      throw new BadRequest(
        `There is no jump gate in ${body.systemSymbol} to jump to.`
      );
    }

    ship.navigation.setCurrent(arrivalWp);
    ship.navigation.route = undefined;
    ship.navigation.isDocked = false;

    ship.setCooldown(powerUsage);

    return {
      data: {
        cooldown: renderCooldown(ship),
        nav: renderShipNav(ship.navigation),
      },
    };
  }

  @Post("/ships/:shipSymbol/navigate")
  navigate(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string,
    @BodyParams() body: NavigateShipRequest
  ): NavigateShip200Response {
    const ship = getShip(agent, shipSymbol);
    checkShipNotNavigating(ship);
    checkShipInOrbit(ship);

    const waypoint = getWaypoint(universe, ship.navigation.current.symbol);
    const targetWaypoint = getWaypoint(universe, body.waypointSymbol);

    if (waypoint.systemSymbol !== targetWaypoint.systemSymbol) {
      throw new BadRequest(
        `You cannot navigate to a waypoint in a different system.`
      );
    }

    const distance = getDistance(waypoint, targetWaypoint);

    const fuel = navigateFuelUsed(distance, ship.navigation.flightMode);
    if (ship.derivedStats.fuel < fuel) {
      throw new BadRequest(
        `You do not have enough fuel to travel to ${body.waypointSymbol}.`
      );
    }

    const departureDate = new Date();
    const arrivalDate = new Date(
      departureDate.getTime() +
        navigateTravelTime(
          distance,
          ship.navigation.flightMode,
          ship.stats.thrust
        ) *
          1000
    );

    ship.derivedStats.fuel -= fuel;
    ship.navigation.setRoute(
      waypoint,
      targetWaypoint,
      departureDate,
      arrivalDate
    );
    ship.navigation.setCurrent(targetWaypoint);

    return {
      data: {
        nav: renderShipNav(ship.navigation),
        fuel: {
          current: ship.derivedStats.fuel,
          capacity: ship.stats.fuelCapacity,
          consumed: {
            timestamp: new Date().toISOString(),
            amount: fuel,
          },
        },
      },
    };
  }

  @Patch("/ships/:shipSymbol/nav")
  patchNav(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string,
    @BodyParams() body: PatchShipNavRequest
  ): GetShipNav200Response {
    const ship = getShip(agent, shipSymbol);

    ship.navigation.flightMode = body.flightMode;

    return {
      data: renderShipNav(ship.navigation),
    };
  }

  @Get("/ships/:shipSymbol/nav")
  getNav(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string
  ): GetShipNav200Response {
    const ship = getShip(agent, shipSymbol);

    return {
      data: renderShipNav(ship.navigation),
    };
  }

  @Post("/ships/:shipSymbol/warp")
  warp(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string,
    @BodyParams() body: NavigateShipRequest
  ): NavigateShip200Response {
    const ship = getShip(agent, shipSymbol);
    checkShipNotNavigating(ship);
    checkShipInOrbit(ship);

    const waypoint = getWaypoint(universe, ship.navigation.current.symbol);
    const system = getSystem(universe, ship.navigation.current.systemSymbol);

    const targetWaypoint = getWaypoint(universe, body.waypointSymbol);
    const targetSystem = getSystem(universe, targetWaypoint.systemSymbol);

    const warpMounts = ship.modules.filter((m) => {
      return m.capabilities.some((c) => c instanceof ProvidesWarpRange);
    });
    if (warpMounts.length === 0) {
      throw new BadRequest(`You do not have any warp capability.`);
    }

    const warpMountsRange = warpMounts.reduce(
      (acc, mount) => Math.max(acc, mount.stats.warpRange),
      0
    );

    if (system.symbol === targetSystem.symbol) {
      throw new BadRequest(
        `You cannot warp to a waypoint in the same system. Use the navigate endpoint.`
      );
    }

    const distance = getDistance(system, targetSystem);

    if (distance > warpMountsRange) {
      throw new BadRequest(
        `You do not have enough warp range to travel to ${targetSystem.symbol}. Can go ${warpMountsRange}, but ${distance} units away.`
      );
    }

    const fuel = warpFuelUsed(distance, ship.navigation.flightMode);
    if (ship.derivedStats.fuel < fuel) {
      throw new BadRequest(
        `You do not have enough fuel to warp to ${body.waypointSymbol}.`
      );
    }

    const departureDate = new Date();
    const arrivalDate = new Date(
      departureDate.getTime() +
        warpTravelTime(
          distance,
          ship.navigation.flightMode,
          ship.stats.thrust
        ) *
          1000
    );

    ship.derivedStats.fuel -= fuel;
    ship.navigation.setRoute(
      waypoint,
      targetWaypoint,
      departureDate,
      arrivalDate
    );
    ship.navigation.setCurrent(targetWaypoint);

    return {
      data: {
        nav: renderShipNav(ship.navigation),
        fuel: {
          current: ship.derivedStats.fuel,
          capacity: ship.stats.fuelCapacity,
          consumed: {
            timestamp: new Date().toISOString(),
            amount: fuel,
          },
        },
      },
    };
  }

  @Post("/ships/:shipSymbol/sell")
  sell(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string,
    @BodyParams() body: SellCargoRequest
  ): SellCargo201Response {
    const ship = getShip(agent, shipSymbol);
    checkShipDocked(ship);

    const waypoint = getWaypoint(universe, ship.navigation.current.symbol);

    const supplyDemand = waypoint.supplyDemand[body.symbol];
    if (!supplyDemand) {
      throw new BadRequest(`You cannot sell ${body.symbol} here.`);
    }

    if (ship.cargo.get(body.symbol) < body.units) {
      throw new BadRequest(
        `You do not have ${body.units} ${body.symbol} to sell.`
      );
    }
    const price = marketPrice(supplyDemand);
    const total = price.purchasePrice * body.units;
    agent.credits += total;
    ship.cargo.remove(body.symbol, body.units);
    const transaction: Transaction = {
      waypointSymbol: waypoint.symbol,
      tradeSymbol: body.symbol,
      timestamp: new Date(),
      shipSymbol: ship.symbol,
      agentSymbol: agent.symbol,
      type: "SELL",
      totalPrice: total,
      pricePerUnit: price.purchasePrice,
      units: body.units,
    };
    waypoint.transactions.push(transaction);
    supplyDemand.currentSupply += body.units;

    return {
      data: {
        cargo: renderShipCargo(ship),
        agent: renderAgent(agent),
        transaction: renderMarketTransaction(transaction),
      },
    };
  }

  @Post("/ships/:shipSymbol/scan/systems")
  scanSystems(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string
  ): CreateShipSystemScan201Response {
    const ship = getShip(agent, shipSymbol);
    checkShipNotOnCooldown(ship);

    const scanMounts = [...ship.modules, ...ship.mounts].filter((m) => {
      return m.capabilities.some((c) => c instanceof ProvidesScanPower);
    });

    if (scanMounts.length === 0) {
      throw new BadRequest(`You do not have any scan capability.`);
    }
    const scanPower = scanMounts.reduce(
      (acc, mount) => acc + mount.stats.scanPower,
      0
    );
    const powerUsed = scanMounts.reduce(
      (acc, mount) => acc + mount.stats.powerRequired,
      0
    );

    ship.setCooldown(powerUsed);

    const system = getSystem(universe, ship.navigation.current.systemSymbol);

    return {
      data: {
        systems: Object.values(universe.systems)
          .filter((s) => getDistance(s, system) < scanPower * 1000)
          .map((s) => {
            const render = renderSystem(s);
            return {
              x: render.x,
              y: render.y,
              type: render.type,
              sectorSymbol: render.sectorSymbol,
              symbol: render.symbol,
              distance: getDistance(s, system),
            };
          }),
        cooldown: renderCooldown(ship),
      },
    };
  }

  @Post("/ships/:shipSymbol/scan/waypoints")
  scanWaypoints(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string
  ): CreateShipWaypointScan201Response {
    const ship = getShip(agent, shipSymbol);
    checkShipNotOnCooldown(ship);

    const scanMounts = [...ship.modules, ...ship.mounts].filter((m) => {
      return m.capabilities.some((c) => c instanceof ProvidesScanPower);
    });
    if (scanMounts.length === 0) {
      throw new BadRequest(`You do not have any scan capability.`);
    }
    const scanPower = scanMounts.reduce(
      (acc, mount) => acc + mount.stats.scanPower,
      0
    );
    const powerUsed = scanMounts.reduce(
      (acc, mount) => acc + mount.stats.powerRequired,
      0
    );

    ship.setCooldown(powerUsed);

    const system = getSystem(universe, ship.navigation.current.systemSymbol);

    return {
      data: {
        waypoints: system.waypoints.map((s) => {
          return renderWaypoint(s);
        }),
        cooldown: renderCooldown(ship),
      },
    };
  }

  @Post("/ships/:shipSymbol/scan/ships")
  scanShips(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string
  ): CreateShipShipScan201Response {
    const ship = getShip(agent, shipSymbol);
    checkShipNotOnCooldown(ship);

    const scanMounts = [...ship.modules, ...ship.mounts].filter((m) => {
      return m.capabilities.some((c) => c instanceof ProvidesScanPower);
    });
    if (scanMounts.length === 0) {
      throw new BadRequest(`You do not have any scan capability.`);
    }
    const scanPower = scanMounts.reduce(
      (acc, mount) => acc + mount.stats.scanPower,
      0
    );
    const powerUsed = scanMounts.reduce(
      (acc, mount) => acc + mount.stats.powerRequired,
      0
    );

    ship.setCooldown(powerUsed);

    const system = getSystem(universe, ship.navigation.current.systemSymbol);

    const shipList: Ship[] = [];
    universe.agents.forEach((agent) => {
      agent.ships.forEach((ship) => {
        if (ship.navigation.current.systemSymbol == system.symbol) {
          shipList.push(ship);
        }
      });
    });

    return {
      data: {
        ships: shipList.map((s) => {
          return renderScannedShip(s);
        }),
        cooldown: renderCooldown(ship),
      },
    };
  }

  @Post("/ships/:shipSymbol/refuel")
  refuel(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string,
    @BodyParams() body: RefuelShipRequest
  ): RefuelShip200Response {
    const ship = getShip(agent, shipSymbol);
    checkShipDocked(ship);

    const waypoint = getWaypoint(universe, ship.navigation.current.symbol);

    const supplyDemand = waypoint.supplyDemand["FUEL"];
    if (!supplyDemand) {
      throw new BadRequest(`You cannot buy FUEL here.`);
    }

    const missingFuel = ship.stats.fuelCapacity - ship.derivedStats.fuel;
    const refuelUnits = Math.ceil((body.units ?? missingFuel) / 100);

    const price = marketPrice(supplyDemand);
    const total = price.salePrice * refuelUnits;
    agent.credits -= total;
    ship.derivedStats.fuel += Math.min(refuelUnits * 100, missingFuel);
    const transaction: Transaction = {
      waypointSymbol: waypoint.symbol,
      tradeSymbol: "FUEL",
      timestamp: new Date(),
      shipSymbol: ship.symbol,
      agentSymbol: agent.symbol,
      type: "PURCHASE",
      totalPrice: total,
      pricePerUnit: price.salePrice,
      units: refuelUnits,
    };
    waypoint.transactions.push(transaction);
    supplyDemand.currentSupply -= refuelUnits;

    return {
      data: {
        transaction: renderMarketTransaction(transaction),
        fuel: {
          current: ship.derivedStats.fuel,
          capacity: ship.stats.fuelCapacity,
          consumed: {
            timestamp: new Date().toISOString(),
            amount: -Math.min(refuelUnits * 100, missingFuel),
          },
        },
        agent: renderAgent(agent),
      },
    };
  }

  @Post("/ships/:shipSymbol/purchase")
  purchase(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string,
    @BodyParams() body: PurchaseCargoRequest
  ): PurchaseCargo201Response {
    const ship = getShip(agent, shipSymbol);
    checkShipDocked(ship);

    const waypoint = getWaypoint(universe, ship.navigation.current.symbol);

    const supplyDemand = waypoint.supplyDemand[body.symbol];
    if (!supplyDemand) {
      throw new BadRequest(`You cannot buy ${body.symbol} here.`);
    }

    if (ship.cargo.total() + body.units > ship.stats.cargoSpace) {
      throw new BadRequest(`You do not have enough cargo space.`);
    }

    const price = marketPrice(supplyDemand);
    const total = price.salePrice * body.units;

    if (agent.credits < total) {
      throw new BadRequest(`You do not have enough credits.`);
    }

    agent.credits -= total;
    ship.cargo.add(body.symbol, body.units);
    const transaction: Transaction = {
      waypointSymbol: waypoint.symbol,
      tradeSymbol: body.symbol,
      timestamp: new Date(),
      shipSymbol: ship.symbol,
      agentSymbol: agent.symbol,
      type: "PURCHASE",
      totalPrice: total,
      pricePerUnit: price.salePrice,
      units: body.units,
    };
    waypoint.transactions.push(transaction);
    supplyDemand.currentSupply -= body.units;

    return {
      data: {
        cargo: renderShipCargo(ship),
        agent: renderAgent(agent),
        transaction: renderMarketTransaction(transaction),
      },
    };
  }

  @Post("/ships/:shipSymbol/transfer")
  transfer(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string,
    @BodyParams() body: TransferCargoRequest
  ): TransferCargo200Response {
    const ship = getShip(agent, shipSymbol);
    const targetShip = getShip(agent, body.shipSymbol);
    if (
      !(
        (ship.navigation.status === "DOCKED" &&
          targetShip.navigation.status === "DOCKED") ||
        (ship.navigation.status === "IN_ORBIT" &&
          targetShip.navigation.status === "IN_ORBIT")
      )
    ) {
      throw new BadRequest(
        `You cannot transfer cargo to a ship that has a navigation status (DOCKED, IN_ORBIT) different from your own.`
      );
    }

    if (
      ship.navigation.current.symbol !== targetShip.navigation.current.symbol
    ) {
      throw new BadRequest(
        `You cannot transfer cargo to a ship that is not at the same waypoint.`
      );
    }

    if (ship === targetShip) {
      throw new BadRequest(`You cannot transfer cargo to yourself.`);
    }

    if (body.units > ship.cargo.get(body.tradeSymbol)) {
      throw new BadRequest(`You do not have enough ${body.tradeSymbol}.`);
    }

    if (targetShip.cargo.total() + body.units > targetShip.stats.cargoSpace) {
      throw new BadRequest(
        `You do not have enough cargo space in the targeted ship.`
      );
    }

    ship.cargo.remove(body.tradeSymbol, body.units);
    targetShip.cargo.add(body.tradeSymbol, body.units);

    return {
      data: {
        cargo: renderShipCargo(ship),
      },
    };
  }

  @Post("/ships/:shipSymbol/negotiate/contract")
  negotiateContract(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string
  ): NegotiateContract200Response {
    const ship = getShip(agent, shipSymbol);
    checkShipDocked(ship);

    const waypoint = getWaypoint(universe, ship.navigation.current.symbol);
    if (!waypoint.ownedBy) {
      throw new BadRequest(
        `You cannot negotiate a contract here. No faction owns this station.`
      );
    }

    const contract = generateContract(agent, waypoint);

    return {
      data: {
        contract: renderContract(contract),
      },
    };
  }

  @Get("/ships/:shipSymbol/mounts")
  getMounts(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string
  ): GetMounts200Response {
    const ship = getShip(agent, shipSymbol);

    return {
      data: ship.mounts.map((m) => {
        return renderShipMount(m.symbol);
      }),
    };
  }

  @Post("/ships/:shipSymbol/mounts/install")
  installMount(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string,
    @BodyParams() body: InstallMountRequest
  ): InstallMount201Response {
    const ship = getShip(agent, shipSymbol);

    const waypoint = getWaypoint(universe, ship.navigation.current.symbol);
    if (!waypoint.traits.some((t) => t === "SHIPYARD")) {
      throw new BadRequest(`You need to install mounts at a shipyard.`);
    }

    checkShipDocked(ship);

    if (ship.cargo.get(body.symbol as unknown as TradeGood) === 0) {
      throw new BadRequest(`You cannot install a mount you do not own.`);
    }

    ship.mounts.push(mountData[body.symbol]);
    agent.credits -= 5000;
    const trans: Transaction = {
      waypointSymbol: waypoint.symbol,
      tradeSymbol: "INSTALL_MOUNT",
      timestamp: new Date(),
      shipSymbol: ship.symbol,
      agentSymbol: agent.symbol,
      type: "PURCHASE",
      totalPrice: 5000,
      pricePerUnit: 5000,
      units: 1,
    };
    waypoint.transactions.push(trans);

    return {
      data: {
        agent: renderAgent(agent),
        cargo: renderShipCargo(ship),
        mounts: ship.mounts.map((m) => {
          return renderShipMount(m.symbol);
        }),
        transaction: renderServiceTransaction(trans),
      },
    };
  }

  @Post("/ships/:shipSymbol/mounts/remove")
  removeMount(
    @AgentParam() agent: Agent,
    @PathParams("shipSymbol") shipSymbol: string,
    @BodyParams() body: RemoveMountRequest
  ): RemoveMount201Response {
    const ship = getShip(agent, shipSymbol);

    const waypoint = getWaypoint(universe, ship.navigation.current.symbol);
    if (!waypoint.traits.some((t) => t === "SHIPYARD")) {
      throw new BadRequest(`You can only remove mounts at a shipyard.`);
    }

    checkShipDocked(ship);

    if (ship.cargo.total() >= ship.stats.cargoSpace) {
      throw new BadRequest(`You cannot remove a mount if your cargo is full.`);
    }

    ship.mounts.splice(
      ship.mounts.findIndex((m) => m.symbol === body.symbol),
      1
    );
    ship.cargo.add(body.symbol as unknown as TradeGood, 1);
    agent.credits -= 5000;
    const trans: Transaction = {
      waypointSymbol: waypoint.symbol,
      tradeSymbol: "REMOVE_MOUNT",
      timestamp: new Date(),
      shipSymbol: ship.symbol,
      agentSymbol: agent.symbol,
      type: "PURCHASE",
      totalPrice: 5000,
      pricePerUnit: 5000,
      units: 1,
    };
    waypoint.transactions.push(trans);

    return {
      data: {
        agent: renderAgent(agent),
        cargo: renderShipCargo(ship),
        mounts: ship.mounts.map((m) => {
          return renderShipMount(m.symbol);
        }),
        transaction: renderServiceTransaction(trans),
      },
    };
  }
}
