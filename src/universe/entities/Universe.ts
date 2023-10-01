import { System } from "src/universe/entities/System";
import { Agent } from "src/universe/entities/Agent";
import { Ship } from "src/universe/entities/Ship";
import { Waypoint } from "src/universe/entities/Waypoint";
import { TradeGood, tradeGoods } from "src/universe/static-data/trade-goods";
import { Faction } from "src/universe/entities/Faction";

export class Universe {
  public name: string;
  public systems: Record<string, System> = {};
  public systemsArray: System[] = [];
  public waypoints: Record<string, Waypoint> = {};
  public agents: Agent[] = [];
  public ships: Ship[] = [];
  public factions: Faction[] = [];
  public waypointCount = 0;
  public createDate: string;

  constructor(data: { symbol: string }) {
    this.name = data.symbol;
    const createDate = new Date();
    this.createDate = createDate.toISOString();
  }

  public tick() {
    const start = Date.now();
    for (const system in this.systems) {
      this.systems[system].tick();
    }
    const end = Date.now();
    console.log(`Universe tick took ${end - start}ms`);
  }

  public addSystem(system: System) {
    this.waypointCount += system.waypoints.length;
    system.waypoints.forEach((w) => {
      if (this.waypoints[w.symbol]) {
        console.log({
          existingWaypoint: this.waypoints[w.symbol],
          newWaypoint: w,
        });
        throw new Error(`Waypoint ${w.symbol} already exists`);
      }
      this.waypoints[w.symbol] = w;
    });
    this.systems[system.symbol] = system;
    this.systemsArray.push(system);
  }

  public removeSystem(system: System) {
    delete this.systems[system.symbol];
    this.systemsArray = this.systemsArray.filter(
      (s) => s.symbol !== system.symbol
    );
    system.waypoints.forEach((w) => {
      delete this.waypoints[w.symbol];
    });
    this.waypointCount -= system.waypoints.length;
  }

  public allGoods() {
    const goods: Partial<
      Record<
        TradeGood,
        {
          symbol: TradeGood;
          productionRate: number;
          consumptionRate: number;
          productionLineProductionRate: number;
          productionLineConsumptionRate: number;
          lastTickProduction: number;
          lastTickConsumption: number;
          supplyOnConsumers: number;
          supplyOnProducers: number;
          supplyOnExchange: number;
          desiredSupply: number;
          maxSupply: number;
          marketPrice: number | undefined;
        }
      >
    > = {};
    Object.values(this.systems).forEach((s) => {
      s.waypoints.forEach((w) => {
        Object.values(w.supplyDemand).forEach((sd) => {
          if (!goods[sd.tradeGood]) {
            goods[sd.tradeGood] = {
              symbol: sd.tradeGood,
              supplyOnConsumers: 0,
              supplyOnProducers: 0,
              supplyOnExchange: 0,
              lastTickProduction: 0,
              lastTickConsumption: 0,
              productionRate: 0,
              consumptionRate: 0,
              productionLineProductionRate: 0,
              productionLineConsumptionRate: 0,
              desiredSupply: 0,
              maxSupply: 0,
              marketPrice: tradeGoods[sd.tradeGood].basePrice,
            };
          }
          const good = goods[sd.tradeGood];
          if (good) {
            good.supplyOnConsumers +=
              sd.kind === "demand" ? w.inventory.get(sd.tradeGood) : 0;
            good.supplyOnProducers +=
              sd.kind === "supply" ? w.inventory.get(sd.tradeGood) : 0;
            good.supplyOnExchange +=
              sd.kind === "exchange" ? w.inventory.get(sd.tradeGood) : 0;
            good.productionRate += sd.current.productionRate;
            good.consumptionRate += sd.current.consumptionRate;
            good.lastTickProduction += sd.lastTickProduction;
            good.lastTickConsumption += sd.lastTickConsumption;
            good.productionLineProductionRate +=
              sd.current.productionLineProductionRate;
            good.productionLineConsumptionRate +=
              sd.current.productionLineConsumptionRate;
            good.desiredSupply += sd.current.idealSupply;
            good.maxSupply += sd.current.maxSupply;
          }
        });
      });
    });
    return Object.values(goods);
  }
}
