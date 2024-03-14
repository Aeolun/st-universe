import { Industry } from "src/universe/static-data/industries";
import {
  ProductionLine,
  WaypointTrait,
} from "src/universe/static-data/waypoint-traits";
import { JumpGate } from "src/universe/entities/JumpGate";
import { TradeGood, tradeGoods } from "src/universe/static-data/trade-goods";
import { WaypointType } from "src/universe/static-data/waypoint-types";
import { Faction } from "src/universe/static-data/faction";
import { Transaction } from "src/universe/entities/Transaction";
import { Configuration } from "src/universe/static-data/ship-configurations";
import { MarketPrice } from "src/universe/formulas/trade";
import { Storage } from "src/universe/entities/Storage";
import { ConstructionSite } from "./ConstructionSite";
import { WaypointModifierSymbol } from "src/controllers/schemas";

export interface SupplyDemand {
  tradeGood: TradeGood;
  /**
   * Determined by whether the market is a net consumer or producer of the trade good.
   */
  kind: "supply" | "demand" | "exchange";
  stopSaleAt: number;
  lastTickProduction: number;
  lastTickConsumption: number;
  /**
   * Number from -100 to 100 that indicates how close this market is to evolving/devolving (start at 0)
   */
  activity: number;
  localFluctuation: number;
  price?: MarketPrice;
  base: {
    idealSupply: number;
    maxSupply: number;
    productionRate: number;
    consumptionRate: number;
    productionLineProductionRate: number;
    productionLineConsumptionRate: number;
  };
  current: {
    tradeVolume: number;
    idealSupply: number;
    maxSupply: number;
    productionRate: number;
    consumptionRate: number;
    productionLineProductionRate: number;
    productionLineConsumptionRate: number;
  };
}

export interface WaypointChart {
  waypointSymbol: string;
  submittedBy: string;
  submittedOn: Date;
}

export class Waypoint {
  public symbol: string;
  public systemSymbol: string;
  public x: number;
  public y: number;

  public type: WaypointType;
  public ownedBy?: Faction;

  public orbitals: Waypoint[] = [];
  public inOrbitOf?: string;

  public industries: Partial<Record<Industry, number>> = {};
  public traits: WaypointTrait[] = [];
  public modifiers: WaypointModifierSymbol[] = [];

  public jumpGate?: JumpGate;
  public constructionSite?: ConstructionSite;

  public extractableResources: Partial<Record<TradeGood, number>> = {};

  public imports: TradeGood[] = [];
  public exports: TradeGood[] = [];
  public exchange: TradeGood[] = [];

  public supplyDemand: Partial<Record<TradeGood, SupplyDemand>> = {};
  public inventory: Storage = new Storage();
  public productionLines: ProductionLine[] = [];

  public availableShipConfigurations: Configuration[] = [];

  public transactions: Transaction[] = [];
  public shipTransactions: Transaction[] = [];

  public chart?: WaypointChart;

  public population: number = 0;
  public extractionInstability: number = 0;

  constructor(data: {
    x: number;
    y: number;
    inOrbitOf?: string;
    symbol: string;
    systemSymbol: string;
    type: WaypointType;
    constructionSite?: ConstructionSite;
  }) {
    this.x = data.x;
    this.y = data.y;
    this.inOrbitOf = data.inOrbitOf;
    this.symbol = data.symbol;
    this.systemSymbol = data.systemSymbol;
    this.type = data.type;
    this.constructionSite = data.constructionSite;
  }

  public chartWaypoint(chart: WaypointChart) {
    this.traits.splice(this.traits.indexOf("UNCHARTED"), 1);
    this.chart = chart;

    return chart;
  }

  public updateSupplyDemand() {
    Object.keys(this.supplyDemand).forEach((tradeGood) => {
      const sd = this.supplyDemand[tradeGood as TradeGood];
      if (sd) {
        sd.current = {
          ...sd.current,
          idealSupply: sd.base.idealSupply * this.population,
          maxSupply: sd.base.maxSupply * this.population,
          productionRate: sd.base.productionRate * this.population,
          consumptionRate: sd.base.consumptionRate * this.population,
          productionLineProductionRate:
            sd.base.productionLineProductionRate * this.population,
          productionLineConsumptionRate:
            sd.base.productionLineConsumptionRate * this.population,
        };
      }
    });
  }

  public tick(msElapsed: number) {
    if (this.extractionInstability > 0) {
      this.extractionInstability -= 2000 / (msElapsed * 3);

      if (this.extractionInstability > 10) {
        this.modifiers.push("UNSTABLE");
      } else if (this.extractionInstability > 6) {
        this.modifiers.push("CRITICAL_LIMIT");
      }
    } else if (this.modifiers.length > 0) {
      this.modifiers = this.modifiers.filter((m) => {
        return m !== "UNSTABLE" && m !== "CRITICAL_LIMIT";
      });
    }

    // determine production/consumption at this waypoint
    Object.values(this.supplyDemand).forEach((supplyDemand) => {
      supplyDemand.lastTickProduction = 0;
      supplyDemand.lastTickConsumption = 0;

      if (
        supplyDemand.current.productionRate > 0 &&
        this.inventory.get(supplyDemand.tradeGood) <
          supplyDemand.current.maxSupply
      ) {
        this.inventory.add(
          supplyDemand.tradeGood,
          supplyDemand.current.productionRate
        );
        supplyDemand.activity++;
      } else {
        supplyDemand.activity--;
      }
      if (
        supplyDemand.current.consumptionRate > 0 &&
        this.inventory.get(supplyDemand.tradeGood) > 0
      ) {
        this.inventory.remove(
          supplyDemand.tradeGood,
          supplyDemand.current.consumptionRate
        );
        supplyDemand.activity++;
      } else {
        supplyDemand.activity--;
      }
    });
    this.productionLines.forEach((productionLine) => {
      const marketGood = tradeGoods[productionLine.produces];
      if (marketGood && "components" in marketGood) {
        const componentsOptions = Array.isArray(marketGood.components)
          ? marketGood.components
          : [marketGood.components];

        componentsOptions.forEach((components) => {
          let satisfied = true;
          Object.keys(components).forEach((component: TradeGood) => {
            const requiredCount = components[component] ?? 0;
            const supplyDemand = this.supplyDemand[component];
            if (
              !supplyDemand ||
              this.inventory.get(supplyDemand.tradeGood) < requiredCount
            ) {
              satisfied = false;
              if (supplyDemand) {
                supplyDemand.activity--;
              }
            }
          });
          if (satisfied) {
            Object.keys(components).forEach((component: TradeGood) => {
              const requiredCount = components[component] ?? 0;
              const supplyDemand = this.supplyDemand[component];
              if (supplyDemand) {
                supplyDemand.lastTickConsumption += requiredCount;
                supplyDemand.activity++;
                this.inventory.remove(supplyDemand.tradeGood, requiredCount);
              }
            });
            const produceDemand = this.supplyDemand[productionLine.produces];
            if (produceDemand) {
              produceDemand.lastTickProduction += productionLine.count ?? 1;
              produceDemand.activity++;
              this.inventory.add(
                produceDemand.tradeGood,
                productionLine.count ?? 1
              );
            }
          } else {
            // if we cannot produce a good, activity on that good goes down
            const produceDemand = this.supplyDemand[productionLine.produces];
            if (produceDemand) {
              produceDemand.activity--;
            }
          }
        });
      }
    });
    Object.values(this.supplyDemand).forEach((supplyDemand) => {
      if (supplyDemand.activity >= 100) {
        // evolve
        supplyDemand.current.tradeVolume +=
          tradeGoods[supplyDemand.tradeGood].baseTradeVolume;
      } else if (supplyDemand.activity <= -100) {
        // devolve
        supplyDemand.current.tradeVolume -=
          tradeGoods[supplyDemand.tradeGood].baseTradeVolume;
      }
    });
  }
}
