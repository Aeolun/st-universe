import { TradeGood } from "./trade-goods";
import {WaypointType} from "src/universe/static-data/waypoint-types";

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

type TraitCategory = "HABITATION"
export interface TraitData {
  validFor: WaypointType[]
  category?: TraitCategory;
  requiresCategory?: TraitCategory[];
  imports?: TradeGood[];
  exports?: TradeGood[];
  exchange?: TradeGood[];
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
export const waypointTraits: Record<
  WaypointTrait,
  TraitData
> = {
  BARREN: {
    validFor: ["PLANET", "MOON", "ASTEROID_FIELD"],
    productivityMultiplier: 0.5,
  },
  BLACK_MARKET: {
    validFor: ["PLANET", "MOON", "ORBITAL_STATION"],
    category: "HABITATION",
    exchange: ["FUEL"],
    illegalExchangeGoodsCount: 3,
    populationLevel: 1,
    industries: 1,
  },
  BUREAUCRATIC: {
    validFor: ["PLANET", "MOON", "ORBITAL_STATION"],
    requiresCategory: ["HABITATION"],
    serviceCostMultiplier: 1.5,
  },
  COMMON_METAL_DEPOSITS: {
    validFor: ["PLANET", "MOON", "ASTEROID_FIELD"],
    extractableResources: ["IRON_ORE", "ALUMINUM_ORE", "COPPER_ORE"],
  },
  CORROSIVE_ATMOSPHERE: {
    validFor: ["PLANET"],
    maintenanceCostMultiplier: 1.5,
  },
  CORRUPT: {
    validFor: ["PLANET", "MOON", "ASTEROID_FIELD"],
    requiresCategory: ["HABITATION"],
    illegalExchangeGoodsCount: 1,
    productivityMultiplier: 0.9
  },
  DIVERSE_LIVE: {
    validFor: ["PLANET"],
    extractableResources: ["BOTANICAL_SPECIMENS", "NOVEL_LIFEFORMS", "LIVESTOCK", "RESEARCH_DATA"],
  },
  DRY_SEABEDS: {
    validFor: ["PLANET"],
    extractableResources: ["QUARTZ_SAND", "POLYNUCLEOTIDES", "DIAMONDS"],
  },
  EXPLORATION_OUTPOST: {
    validFor: ["PLANET", "MOON", "ORBITAL_STATION"],
    category: "HABITATION",
    illegalExchangeGoodsCount: 1,
    imports: ["EQUIPMENT", "FUEL", "MEDICAL_SUPPLIES"],
    exports: ["RESEARCH_DATA", "NOVEL_LIFEFORMS", "BOTANICAL_SPECIMENS"],
    populationLevel: 1,
  },
  EXPLOSIVE_GASES: {
    validFor: ["PLANET", "MOON"],
    maintenanceCostMultiplier: 2,
    extractableResources: ["HYDROCARBONS"],
  },
  EXTREME_PRESSURE: {
    validFor: ["PLANET"],
    imports: ["HEAVY_MACHINERY"],
    maintenanceCostMultiplier: 2,
    constructionCostMultiplier: 2,
  },
  EXTREME_TEMPERATURES: {
    validFor: ["PLANET"],
    imports: ["THERMAL_REGULATORS", "MACHINERY"],
    maintenanceCostMultiplier: 1.5,
    constructionCostMultiplier: 1.5,
  },
  FROZEN: {
    validFor: ["PLANET"],
    extractableResources: ["HYDROCARBONS", "ICE_WATER", "AMMONIA_ICE", "RESEARCH_DATA"],
  },
  HIGH_TECH: {
    validFor: ["PLANET", "MOON", "ORBITAL_STATION"],
    category: "HABITATION",
    imports: ["EQUIPMENT", "ELECTRONICS", "RESEARCH_DATA"],
    exports: ["ROBOTICS", "MEDICAL_SUPPLIES", "ADVANCED_CIRCUITRY"],
    exchange: ["FUEL"],
    populationLevel: 2,
    industries: 2,
  },
  INDUSTRIAL: {
    validFor: ["PLANET", "MOON", "ORBITAL_STATION"],
    category: "HABITATION",
    imports: ["EQUIPMENT", "FUEL", "HEAVY_MACHINERY"],
    exports: ["RADIOACTIVE_WASTE", "MILITARY_EQUIPMENT", "MACHINERY"],
    populationLevel: 2,
    industries: 2,
  },
  JUNGLE: {
    validFor: ["PLANET"],
    extractableResources: ["BOTANICAL_SPECIMENS", "NOVEL_LIFEFORMS", "LIVESTOCK", "RESEARCH_DATA"],
  },
  MARKETPLACE: {
    validFor: [],
  },
  MEGA_STRUCTURES: {
    validFor: ["PLANET"],
    category: "HABITATION",
    imports: ["EQUIPMENT", "HEAVY_MACHINERY", "ADVANCED_CIRCUITRY"],
    exchange: ["FUEL"],
    maintenanceCostMultiplier: 0.5,
    populationLevel: 3,
    industries: 3,
  },
  MILITARY_BASE: {
    validFor: ["PLANET", "ORBITAL_STATION"],
    category: "HABITATION",
    imports: ["MILITARY_EQUIPMENT", "FIREARMS"],
    exchange: ["FUEL"],
    populationLevel: 1,
  },
  MINERAL_DEPOSITS: {
    validFor: ["PLANET", "MOON", "ASTEROID_FIELD"],
    extractableResources: ["IRON_ORE", "ALUMINUM_ORE", "COPPER_ORE", "QUARTZ_SAND", "SILICON_CRYSTALS"],
  },
  OCEAN: {
    validFor: ["PLANET"],
    extractableResources: ["FOOD"],
    maintenanceCostMultiplier: 1.25
  },
  OUTPOST: {
    validFor: ["PLANET", "MOON"],
    category: "HABITATION",
    imports: ["EQUIPMENT", "MEDICAL_SUPPLIES"],
    exchange: ["FUEL"],
    populationLevel: 1,
    industries: 1,
  },
  OVERCROWDED: {
    validFor: ["PLANET"],
    requiresCategory: ["HABITATION"],
    populationLevel: 2,
    industries: 2,
  },
  PRECIOUS_METAL_DEPOSITS: {
    validFor: ["PLANET", "MOON", "ASTEROID_FIELD"],
    extractableResources: ["GOLD_ORE", "SILVER_ORE", "PLATINUM_ORE"],
  },
  RARE_METAL_DEPOSITS: {
    validFor: ["PLANET", "MOON", "ASTEROID_FIELD"],
    extractableResources: ["DIAMONDS", "URANITE_ORE", "MERITIUM_ORE"],
  },
  RESEARCH_FACILITY: {
    validFor: ["PLANET", "MOON", "ORBITAL_STATION"],
    category: "HABITATION",
    imports: ["LAB_INSTRUMENTS", "ADVANCED_CIRCUITRY", "NOVEL_LIFEFORMS"],
    exports: ["RESEARCH_DATA"],
    exchange: ["FUEL"],
    populationLevel: 1,
    industries: 1,
  },
  ROCKY: {
    validFor: ["PLANET"],
    extractableResources: ["IRON_ORE", "ALUMINUM_ORE", "COPPER_ORE", "QUARTZ_SAND"],
  },
  SCATTERED_SETTLEMENTS: {
    validFor: ["PLANET", "MOON"],
    category: "HABITATION",
    exchange: ["FUEL"],
    populationLevel: 1,
    industries: 1,
  },
  SHIPYARD: {
    validFor: ["PLANET", "MOON", "ORBITAL_STATION"],
    shipHullCount: 3
  },
  SPRAWLING_CITIES: {
    validFor: ["PLANET", "MOON"],
    category: "HABITATION",
    populationLevel: 3,
    industries: 3,
  },
  STRIPPED: {
    validFor: ["PLANET", "MOON", "ASTEROID_FIELD"],
    productivityMultiplier: 0.5
  },
  STRONG_GRAVITY: {
    validFor: ["PLANET"],
    imports: ["HEAVY_MACHINERY", "THERMAL_REGULATORS"],
    maintenanceCostMultiplier: 1.5,
  },
  STRONG_MAGNETOSPHERE: {
    validFor: ["PLANET"],
    imports: ["THERMAL_REGULATORS", "ELECTRONICS"],
  },
  SURVEILLANCE_OUTPOST: {
    validFor: ["PLANET", "MOON", "ORBITAL_STATION", "ASTEROID_FIELD"],
    category: "HABITATION",
    imports: ["EQUIPMENT", "MEDICAL_SUPPLIES"],
    exchange: ["FUEL"],
    populationLevel: 1
  },
  SWAMP: {
    validFor: ["PLANET"],
    extractableResources: ["HYDROCARBONS", "NOVEL_LIFEFORMS"],
    maintenanceCostMultiplier: 1.5,
  },
  TEMPERATE: {
    validFor: ["PLANET"],
    maintenanceCostMultiplier: 0.75,
    constructionCostMultiplier: 0.75
  },
  TERRAFORMED: {
    validFor: ["PLANET", "MOON"],
    productivityMultiplier: 1.25,
  },
  TOXIC_ATMOSPHERE: {
    validFor: ["PLANET", "MOON"],
    maintenanceCostMultiplier: 1.5,
    imports: ["EQUIPMENT", "MEDICAL_SUPPLIES"]
  },
  TRADING_HUB: {
    validFor: ["PLANET", "MOON", "ASTEROID_FIELD"],
    exchange: ["FUEL"],
    exchangeGoodsCount: 5,
  },
  UNCHARTED: {
    validFor: [],
  },
  VIBRANT_AURORAS: {
    validFor: ["PLANET"],
    imports: ["TOURISTS"],
  },
  VOLCANIC: {
    validFor: ["PLANET", "MOON"],
    maintenanceCostMultiplier: 1.5,
    constructionCostMultiplier: 1.5,
    extractableResources: ["HYDROCARBONS", "DIAMONDS", "URANITE_ORE", "MERITIUM_ORE"],
  },
  WEAK_GRAVITY: {
    validFor: ["PLANET"],
    imports: ["HEAVY_MACHINERY", "GRAVITON_EMITTERS"],
  }
};

export const waypointTraitNames = Object.keys(
  waypointTraits
) as WaypointTrait[];
