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
    maintenanceCostMultiplier?: number;
    constructionCostMultiplier?: number;
    populationLevel?: number;
    industries?: number;
    shipHullCount?: number;
  }
> = {
  BARREN: {
    productivityMultiplier: 0.5,
  },
  BLACK_MARKET: {
    illegalExchangeGoodsCount: 3,
    populationLevel: 1,
    industries: 1,
  },
  BUREAUCRATIC: {
    serviceCostMultiplier: 1.5,
  },
  COMMON_METAL_DEPOSITS: {
    extractableResources: ["IRON_ORE", "ALUMINUM_ORE", "COPPER_ORE"],
  },
  CORROSIVE_ATMOSPHERE: {
    maintenanceCostMultiplier: 1.5,
  },
  CORRUPT: {
    illegalExchangeGoodsCount: 1,
    productivityMultiplier: 0.9
  },
  DIVERSE_LIVE: {
    extractableResources: ["BOTANICAL_SPECIMENS", "NOVEL_LIFEFORMS", "LIVESTOCK", "RESEARCH_DATA"],
  },
  DRY_SEABEDS: {
    extractableResources: ["QUARTZ_SAND", "POLYNUCLEOTIDES", "DIAMONDS"],
  },
  EXPLORATION_OUTPOST: {
    illegalExchangeGoodsCount: 1,
    imports: ["EQUIPMENT", "FUEL", "MEDICAL_SUPPLIES"],
    exports: ["RESEARCH_DATA", "NOVEL_LIFEFORMS", "BOTANICAL_SPECIMENS"],
    populationLevel: 1,
  },
  EXPLOSIVE_GASES: {
    maintenanceCostMultiplier: 2,
    extractableResources: ["HYDROCARBONS"],
  },
  EXTREME_PRESSURE: {
    imports: ["HEAVY_MACHINERY"],
    maintenanceCostMultiplier: 2,
    constructionCostMultiplier: 2,
  },
  EXTREME_TEMPERATURES: {
    imports: ["THERMAL_REGULATORS", "MACHINERY"],
    maintenanceCostMultiplier: 1.5,
    constructionCostMultiplier: 1.5,
  },
  FROZEN: {
    extractableResources: ["HYDROCARBONS", "ICE_WATER", "AMMONIA_ICE", "RESEARCH_DATA"],
  },
  HIGH_TECH: {
    imports: ["EQUIPMENT", "ELECTRONICS", "RESEARCH_DATA"],
    exports: ["ROBOTICS", "MEDICAL_SUPPLIES", "ADVANCED_CIRCUITRY"],
    populationLevel: 2,
    industries: 2,
  },
  INDUSTRIAL: {
    imports: ["EQUIPMENT", "FUEL", "HEAVY_MACHINERY"],
    exports: ["RADIOACTIVE_WASTE", "MILITARY_EQUIPMENT", "MACHINERY"],
    populationLevel: 2,
    industries: 2,
  },
  JUNGLE: {
    extractableResources: ["BOTANICAL_SPECIMENS", "NOVEL_LIFEFORMS", "LIVESTOCK", "RESEARCH_DATA"],
  },
  MARKETPLACE: {},
  MEGA_STRUCTURES: {
    imports: ["EQUIPMENT", "HEAVY_MACHINERY", "ADVANCED_CIRCUITRY"],
    maintenanceCostMultiplier: 0.5,
    populationLevel: 3,
    industries: 3,
  },
  MILITARY_BASE: {
    imports: ["MILITARY_EQUIPMENT", "FUEL", "FIREARMS"],
    populationLevel: 1,
  },
  MINERAL_DEPOSITS: {
    extractableResources: ["IRON_ORE", "ALUMINUM_ORE", "COPPER_ORE", "QUARTZ_SAND"],
  },
  OCEAN: {
    extractableResources: ["FOOD"],
    maintenanceCostMultiplier: 1.25
  },
  OUTPOST: {
    imports: ["EQUIPMENT", "FUEL", "MEDICAL_SUPPLIES"],
    populationLevel: 1,
    industries: 1,
  },
  OVERCROWDED: {
    populationLevel: 2,
    industries: 2,
  },
  PRECIOUS_METAL_DEPOSITS: {
    extractableResources: ["GOLD_ORE", "SILVER_ORE", "PLATINUM_ORE"],
  },
  RARE_METAL_DEPOSITS: {
    extractableResources: ["DIAMONDS", "URANITE_ORE", "MERITIUM_ORE"],
  },
  RESEARCH_FACILITY: {
    imports: ["LAB_INSTRUMENTS", "ADVANCED_CIRCUITRY", "NOVEL_LIFEFORMS"],
    exports: ["RESEARCH_DATA"],
  },
  ROCKY: {
    extractableResources: ["IRON_ORE", "ALUMINUM_ORE", "COPPER_ORE", "QUARTZ_SAND"],
  },
  SCATTERED_SETTLEMENTS: {
    populationLevel: 1,
    industries: 1,
  },
  SHIPYARD: {
    shipHullCount: 3
  },
  SPRAWLING_CITIES: {
    populationLevel: 3,
    industries: 3,
  },
  STRIPPED: {
    productivityMultiplier: 0.5
  },
  STRONG_GRAVITY: {
    imports: ["HEAVY_MACHINERY", "THERMAL_REGULATORS"],
    maintenanceCostMultiplier: 1.5,
  },
  STRONG_MAGNETOSPHERE: {
    imports: ["THERMAL_REGULATORS", "ELECTRONICS"],
  },
  SURVEILLANCE_OUTPOST: {
    imports: ["EQUIPMENT", "FUEL", "MEDICAL_SUPPLIES"],
    populationLevel: 1
  },
  SWAMP: {
    extractableResources: ["HYDROCARBONS", "NOVEL_LIFEFORMS"],
    maintenanceCostMultiplier: 1.5,
  },
  TEMPERATE: {
    maintenanceCostMultiplier: 0.75,
    constructionCostMultiplier: 0.75
  },
  TERRAFORMED: {
    productivityMultiplier: 1.25,
  },
  TOXIC_ATMOSPHERE: {
    maintenanceCostMultiplier: 1.5,
    imports: ["EQUIPMENT", "MEDICAL_SUPPLIES"]
  },
  TRADING_HUB: {
    exchangeGoodsCount: 5,
  },
  UNCHARTED: {},
  VIBRANT_AURORAS: {
    imports: ["TOURISTS"]
  },
  VOLCANIC: {
    maintenanceCostMultiplier: 1.5,
    constructionCostMultiplier: 1.5,
    extractableResources: ["HYDROCARBONS", "DIAMONDS", "URANITE_ORE", "MERITIUM_ORE"],
  },
  WEAK_GRAVITY: {
    imports: ["HEAVY_MACHINERY", "GRAVITON_EMITTERS"],
  }
};

export const waypointTraitNames = Object.keys(
  waypointTraits
) as WaypointTrait[];
