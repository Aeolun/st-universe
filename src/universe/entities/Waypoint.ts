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

export interface SupplyDemand {
  tradeGood: TradeGood;
  kind: "supply" | "demand" | "exchange";
  idealSupply: number;
  maxSupply: number;
  stopSaleAt: number;
  productionRate: number;
  consumptionRate: number;
  lastTickProduction: number;
  lastTickConsumption: number;
  productionLineProductionRate: number;
  productionLineConsumptionRate: number;
  localFluctuation: number;
  price?: MarketPrice;
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

  public industries: Industry[] = [];
  public traits: WaypointTrait[] = [];

  public jumpGate?: JumpGate;

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

  constructor(data: {
    x: number;
    y: number;
    inOrbitOf?: string;
    symbol: string;
    systemSymbol: string;
    type: WaypointType;
  }) {
    this.x = data.x;
    this.y = data.y;
    this.inOrbitOf = data.inOrbitOf;
    this.symbol = data.symbol;
    this.systemSymbol = data.systemSymbol;
    this.type = data.type;
  }

  public chartWaypoint(chart: WaypointChart) {
    this.traits.splice(this.traits.indexOf("UNCHARTED"), 1);
    this.chart = chart;

    return chart;
  }

  public tick() {
    // determine production/consumption at this waypoint
    Object.values(this.supplyDemand).forEach((supplyDemand) => {
      supplyDemand.lastTickProduction = 0;
      supplyDemand.lastTickConsumption = 0;
      this.inventory.add(
        supplyDemand.tradeGood,
        supplyDemand.productionRate - supplyDemand.consumptionRate
      );
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
            }
          });
          if (satisfied) {
            Object.keys(components).forEach((component: TradeGood) => {
              const requiredCount = components[component] ?? 0;
              const supplyDemand = this.supplyDemand[component];
              if (supplyDemand) {
                supplyDemand.lastTickConsumption += requiredCount;
                this.inventory.remove(supplyDemand.tradeGood, requiredCount);
              }
            });
            const produceDemand = this.supplyDemand[productionLine.produces];
            if (produceDemand) {
              produceDemand.lastTickProduction += productionLine.count ?? 1;
              this.inventory.add(
                produceDemand.tradeGood,
                productionLine.count ?? 1
              );
            }
          }
        });
      }
    });
  }
}
