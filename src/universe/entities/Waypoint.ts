import { Industry } from "src/universe/static-data/industries";
import { ProductionLine } from "src/universe/static-data/waypoint-traits";
import { JumpGate } from "src/universe/entities/JumpGate";
import { TradeGood, tradeGoods } from "src/universe/static-data/trade-goods";
import { Faction } from "src/universe/static-data/faction";
import { Transaction } from "src/universe/entities/Transaction";
import { Storage } from "src/universe/entities/Storage";
import { ConstructionSite } from "./ConstructionSite";
import { WaypointModifierSymbol } from "src/controllers/schemas";
import { tickProduction } from "src/universe/helpers/tick-production";
import { tickProductionLine } from "src/universe/helpers/tick-production-line";
import { Configuration } from "src/universe/static-data/configuration-enum";
import { WaypointTrait } from "src/universe/static-data/waypoint-trait-enum";
import { WaypointType } from "src/universe/static-data/waypoint-type-enum";
import { SupplyDemand } from "src/universe/static-data/supply-demand";

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

  public population = 0;
  public extractionInstability = 0;

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
    for (const tradeGood of Object.keys(this.supplyDemand) as TradeGood[]) {
      const sd = this.supplyDemand[tradeGood];
      if (sd) {
        sd.current = {
          ...sd.current,
          idealSupply: sd.base.idealSupply * this.population,
          maxSupply: sd.base.maxSupply * this.population,
          productionRate: sd.base.productionRate * this.population,
          consumptionRate: sd.base.consumptionRate * this.population,
        };
      }
    }
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
    for (const supplyDemand of Object.values(this.supplyDemand)) {
      tickProduction(supplyDemand, this.inventory);
    }
    for (const productionLine of this.productionLines) {
      const tradeGood = tradeGoods[productionLine.produces];
      if (!("components" in tradeGood)) {
        continue;
      }
      const supplyDemandEffects = tickProductionLine(
        tradeGood.components,
        tradeGood.symbol,
        this.supplyDemand[tradeGood.symbol]?.current.tradeVolume ?? 1,
        this.inventory
      );
      if (supplyDemandEffects) {
        for (const [tradeGood, effect] of Object.entries(
          supplyDemandEffects
        ) as [
          TradeGood,
          { activity: number; consumption: number; production: number }
        ][]) {
          const supplyDemand = this.supplyDemand[tradeGood];
          if (supplyDemand) {
            supplyDemand.activity += effect.activity;
            supplyDemand.lastTickConsumption += effect.consumption;
            supplyDemand.lastTickProduction += effect.production;
          }
        }
      }
    }
    for (const supplyDemand of Object.values(this.supplyDemand)) {
      if (supplyDemand.activity >= 100) {
        // evolve
        supplyDemand.current.tradeVolume +=
          tradeGoods[supplyDemand.tradeGood].baseTradeVolume;
        supplyDemand.activity = 0;
      } else if (supplyDemand.activity <= -100) {
        // devolve
        if (
          supplyDemand.current.tradeVolume >
          tradeGoods[supplyDemand.tradeGood].baseTradeVolume
        ) {
          supplyDemand.current.tradeVolume -=
            tradeGoods[supplyDemand.tradeGood].baseTradeVolume;
        }
        supplyDemand.activity = 0;
      }
    }
  }
}
