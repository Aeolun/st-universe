import { TradeGood } from "./trade-goods";

export type WaypointTrait =
  | "BARREN"
  | "BLACK_MARKET"
  | "BUREAUCRATIC"
  | "COMMON_METAL_DEPOSITS"
  | "CORROSIVE_ATMOSPHERE"
  | "CORRUPT"
  | "DIVERSE_LIVE"
  | "DRY_SEABEDS"
  | "EXPLORATION_OUTPOST"
  | "EXPLOSIVE_GASES"
  | "EXTREME_PRESSURE"
  | "EXTREME_TEMPERATURES"
  | "FROZEN"
  | "HIGH_TECH"
  | "INDUSTRIAL"
  | "JUNGLE"
  | "MARKETPLACE"
  | "MEGA_STRUCTURES"
  | "MILITARY_BASE"
  | "MINERAL_DEPOSITS"
  | "OCEAN"
  | "OUTPOST"
  | "OVERCROWDED"
  | "PRECIOUS_METAL_DEPOSITS"
  | "RARE_METAL_DEPOSITS"
  | "RESEARCH_FACILITY"
  | "ROCKY"
  | "SCATTERED_SETTLEMENTS"
  | "SHIPYARD"
  | "SPRAWLING_CITIES"
  | "STRIPPED"
  | "STRONG_GRAVITY"
  | "STRONG_MAGNETOSPHERE"
  | "SURVEILLANCE_OUTPOST"
  | "SWAMP"
  | "TEMPERATE"
  | "TERRAFORMED"
  | "TOXIC_ATMOSPHERE"
  | "TRADING_HUB"
  | "UNCHARTED"
  | "VIBRANT_AURORAS"
  | "VOLCANIC"
  | "WEAK_GRAVITY";
export const waypointTraits: Record<
  WaypointTrait,
  {
    imports?: TradeGood[];
    exports?: TradeGood[];
    productivityMultiplier?: number;
    exchangeGoodsCount?: number;
    illegalExchangeGoodsCount?: number;
    serviceCostMultiplier?: number;
    extractableResources?: TradeGood[];
  }
> = {
  BARREN: {
    productivityMultiplier: 0.5,
  },
  BLACK_MARKET: {
    illegalExchangeGoodsCount: 3,
  },
  BUREAUCRATIC: {
    serviceCostMultiplier: 1.5,
  },
  COMMON_METAL_DEPOSITS: {
    extractableResources: [],
  },
};

export const waypointTraitNames = Object.keys(
  waypointTraits
) as WaypointTrait[];
