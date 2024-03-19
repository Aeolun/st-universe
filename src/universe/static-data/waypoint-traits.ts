import { TradeGood } from "./trade-goods";

import { Configuration } from "src/universe/static-data/configuration-enum";
import { WaypointTrait } from "src/universe/static-data/waypoint-trait-enum";
import { WaypointType } from "src/universe/static-data/waypoint-type-enum";

type TraitCategory = "HABITATION" | "PLANT_LIFE" | "DEPOSIT";
export type ProductionLine = {
  produces: TradeGood;
};
export interface TraitModifiers {
  imports?: Partial<Record<TradeGood, number>>;
  exports?: Partial<Record<TradeGood, number>>;
  exchange?: TradeGood[];
  produces?: Partial<Record<TradeGood, number>>;
  consumes?: Partial<Record<TradeGood, number>>;
  productionLine?: ProductionLine[];
  productivityMultiplier?: number;
  exchangeGoodsCount?: number;
  illegalExchangeGoodsCount?: number;
  serviceCostMultiplier?: number;
  extractableResources?: {
    tradegood: TradeGood;
    richness: {
      min: number;
      max: number;
    };
  }[];
  maintenanceCostMultiplier?: number;
  constructionCostMultiplier?: number;
  populationLevel?: number;
  shipHullCount?: number;
  shipHullsAvailable?: Configuration[];
}

export type TraitData = TraitModifiers & {
  prevalence: number;
  validFor: WaypointType[];
  category?: TraitCategory;
  industries?: number;
  hidden?: boolean;
  requiresCategory?: TraitCategory[];
};
export const waypointTraits: Record<WaypointTrait, TraitData> = {
  DEBRIS_CLUSTER: {
    prevalence: 1,
    validFor: ["ASTEROID"],
  },
  DEEP_CRATERS: {
    prevalence: 1,
    validFor: ["ASTEROID"],
  },
  HOLLOWED_INTERIOR: {
    prevalence: 1,
    validFor: ["ASTEROID"],
  },
  RADIOACTIVE: {
    prevalence: 1,
    validFor: ["ASTEROID"],
  },
  SHALLOW_CRATERS: {
    prevalence: 1,
    validFor: ["ASTEROID"],
  },
  UNSTABLE_COMPOSITION: {
    prevalence: 1,
    validFor: ["ASTEROID"],
  },
  BARREN: {
    prevalence: 1,
    validFor: ["PLANET", "MOON"],
    productivityMultiplier: 0.5,
  },
  BLACK_MARKET: {
    prevalence: 1,
    validFor: ["PLANET", "MOON", "ORBITAL_STATION"],
    category: "HABITATION",
    exchange: [TradeGood.FUEL],
    illegalExchangeGoodsCount: 3,
    populationLevel: 1,
    industries: 1,
  },
  BUREAUCRATIC: {
    prevalence: 1,
    validFor: ["PLANET", "MOON", "ORBITAL_STATION"],
    requiresCategory: ["HABITATION"],
    serviceCostMultiplier: 1.5,
  },
  COMMON_METAL_DEPOSITS: {
    prevalence: 1,
    validFor: ["ASTEROID"],
    extractableResources: [
      {
        tradegood: TradeGood.IRON_ORE,
        richness: { min: 0.5, max: 2 },
      },
      {
        tradegood: TradeGood.ALUMINUM_ORE,
        richness: { min: 0.5, max: 2 },
      },
      {
        tradegood: TradeGood.COPPER_ORE,
        richness: { min: 0.5, max: 2 },
      },
    ],
  },
  CORROSIVE_ATMOSPHERE: {
    prevalence: 1,
    validFor: ["PLANET"],
    maintenanceCostMultiplier: 1.5,
  },
  CORRUPT: {
    prevalence: 1,
    validFor: ["PLANET", "MOON"],
    requiresCategory: ["HABITATION"],
    illegalExchangeGoodsCount: 1,
    productivityMultiplier: 0.9,
  },
  DIVERSE_LIVE: {
    prevalence: 1,
    validFor: ["PLANET"],
    category: "PLANT_LIFE",
    extractableResources: [
      {
        tradegood: TradeGood.BOTANICAL_SPECIMENS,
        richness: { min: 0.5, max: 2 },
      },
      { tradegood: TradeGood.NOVEL_LIFEFORMS, richness: { min: 0.5, max: 2 } },
      // { tradegood: TradeGood.LIVESTOCK, prevalence: 40 },
      // { tradegood: TradeGood.RESEARCH_DATA, prevalence: 5 },
    ],
  },
  DRY_SEABEDS: {
    prevalence: 1,
    validFor: ["PLANET"],
    extractableResources: [
      { tradegood: TradeGood.QUARTZ_SAND, richness: { min: 0.5, max: 2 } },
      { tradegood: TradeGood.POLYNUCLEOTIDES, richness: { min: 0.5, max: 2 } },
      { tradegood: TradeGood.DIAMONDS, richness: { min: 0.5, max: 2 } },
    ],
  },
  EXPLORATION_OUTPOST: {
    prevalence: 1,
    validFor: ["PLANET", "MOON", "ORBITAL_STATION"],
    category: "HABITATION",
    illegalExchangeGoodsCount: 1,
    imports: {
      EQUIPMENT: 1,
      FUEL: 1,
      MEDICINE: 1,
    },
    exports: {
      // RESEARCH_DATA: 1,
      NOVEL_LIFEFORMS: 1,
      BOTANICAL_SPECIMENS: 1,
    },
    populationLevel: 1,
  },
  EXPLOSIVE_GASES: {
    prevalence: 1,
    validFor: ["PLANET", "MOON"],
    maintenanceCostMultiplier: 2,
    extractableResources: [
      { tradegood: TradeGood.HYDROCARBON, richness: { min: 0.5, max: 2 } },
    ],
  },
  EXTREME_PRESSURE: {
    prevalence: 1,
    validFor: ["PLANET"],
    imports: {
      // HEAVY_MACHINERY: 1,
    },
    maintenanceCostMultiplier: 2,
    constructionCostMultiplier: 2,
  },
  EXTREME_TEMPERATURES: {
    prevalence: 1,
    validFor: ["PLANET"],
    imports: {
      // THERMAL_REGULATORS: 1,
      MACHINERY: 1,
    },
    maintenanceCostMultiplier: 1.5,
    constructionCostMultiplier: 1.5,
  },
  FROZEN: {
    prevalence: 1,
    validFor: ["PLANET"],
    extractableResources: [
      { tradegood: TradeGood.HYDROCARBON, richness: { min: 0.5, max: 2 } },
      { tradegood: TradeGood.ICE_WATER, richness: { min: 0.5, max: 2 } },
      { tradegood: TradeGood.AMMONIA_ICE, richness: { min: 0.5, max: 2 } },
      // { tradegood: TradeGood.RESEARCH_DATA, prevalence: 5 },
    ],
  },
  HIGH_TECH: {
    prevalence: 1,
    validFor: ["PLANET", "MOON", "ORBITAL_STATION"],
    category: "HABITATION",
    exchange: [TradeGood.FUEL],
    populationLevel: 2,
    industries: 2,
  },
  INDUSTRIAL: {
    prevalence: 1,
    validFor: ["PLANET", "MOON", "ORBITAL_STATION"],
    category: "HABITATION",
    populationLevel: 2,
    industries: 2,
  },
  JUNGLE: {
    prevalence: 1,
    validFor: ["PLANET"],
    category: "PLANT_LIFE",
    extractableResources: [
      {
        tradegood: TradeGood.BOTANICAL_SPECIMENS,
        richness: { min: 0.5, max: 2 },
      },
      { tradegood: TradeGood.NOVEL_LIFEFORMS, richness: { min: 0.5, max: 2 } },
      // { tradegood: TradeGood.LIVESTOCK, prevalence: 20 },
      // { tradegood: TradeGood.RESEARCH_DATA, prevalence: 5 },
    ],
  },
  LEGALIZED_SLAVERY: {
    prevalence: 1,
    validFor: ["PLANET", "MOON", "ORBITAL_STATION"],
    requiresCategory: ["HABITATION"],
    // exports: {
    //   "SLAVES": 2
    // },
  },
  MARKETPLACE: {
    prevalence: 0,
    validFor: [],
  },
  MEGA_STRUCTURES: {
    prevalence: 1,
    validFor: ["PLANET"],
    category: "HABITATION",
    consumes: {
      // HEAVY_MACHINERY: 2,
      ADVANCED_CIRCUITRY: 2,
    },
    exchange: [TradeGood.FUEL],
    maintenanceCostMultiplier: 0.5,
    populationLevel: 3,
    industries: 3,
  },
  MILITARY_BASE: {
    prevalence: 1,
    validFor: ["PLANET", "ORBITAL_STATION"],
    category: "HABITATION",
    imports: {
      MILITARY_EQUIPMENT: 1,
      FIREARMS: 1,
    },
    exchange: [TradeGood.FUEL],
  },
  MINERAL_DEPOSITS: {
    prevalence: 1,
    category: "DEPOSIT",
    validFor: ["ASTEROID"],
    extractableResources: [
      { tradegood: TradeGood.IRON_ORE, richness: { min: 0.5, max: 2 } },
      { tradegood: TradeGood.ALUMINUM_ORE, richness: { min: 0.5, max: 2 } },
      { tradegood: TradeGood.COPPER_ORE, richness: { min: 0.5, max: 2 } },
      { tradegood: TradeGood.QUARTZ_SAND, richness: { min: 0.5, max: 2 } },
      { tradegood: TradeGood.SILICON_CRYSTALS, richness: { min: 0.5, max: 2 } },
    ],
  },
  CANT_PRODUCE_EVERYTHING_PLANETSIDE: {
    prevalence: 0,
    hidden: true,
    validFor: ["PLANET", "MOON", "ORBITAL_STATION"],
    requiresCategory: ["HABITATION"],
    consumes: {
      CLOTHING: 0.5,
      ELECTRONICS: 0.25,
      EQUIPMENT: 0.25,
      FABRICS: 0.5,
      FOOD: 1,
      FUEL: 0.5,
      ICE_WATER: 2,
      MACHINERY: 0.25,
      MEDICINE: 0.25,
      PLASTICS: 0.25,
    },
  },
  GAS_GIANT: {
    hidden: true,
    prevalence: 0,
    validFor: ["GAS_GIANT"],
    extractableResources: [
      { tradegood: TradeGood.HYDROCARBON, richness: { min: 0.5, max: 2 } },
    ],
  },
  NATURAL_SPICES: {
    prevalence: 1,
    category: "DEPOSIT",
    validFor: ["PLANET", "MOON"],
    // exports: {
    //   "SPICES": 2,
    // },
    requiresCategory: ["PLANT_LIFE"],
  },
  OCEAN: {
    prevalence: 1,
    validFor: ["PLANET"],
    category: "PLANT_LIFE",
    extractableResources: [
      { tradegood: TradeGood.FOOD, richness: { min: 0.5, max: 2 } },
    ],
    maintenanceCostMultiplier: 1.25,
  },
  OUTPOST: {
    prevalence: 1,
    validFor: ["PLANET", "MOON"],
    category: "HABITATION",
    consumes: {
      EQUIPMENT: 1,
      MEDICINE: 1,
    },
    exchange: [TradeGood.FUEL],
    populationLevel: 1,
    industries: 1,
  },
  OVERCROWDED: {
    prevalence: 1,
    validFor: ["PLANET"],
    requiresCategory: ["HABITATION"],
    populationLevel: 2,
    industries: 2,
  },
  PRECIOUS_METAL_DEPOSITS: {
    prevalence: 2,
    category: "DEPOSIT",
    validFor: ["ASTEROID"],
    extractableResources: [
      { tradegood: TradeGood.GOLD_ORE, richness: { min: 0.5, max: 2 } },
      { tradegood: TradeGood.SILVER_ORE, richness: { min: 0.5, max: 2 } },
      { tradegood: TradeGood.PLATINUM_ORE, richness: { min: 0.5, max: 2 } },
    ],
  },
  RARE_METAL_DEPOSITS: {
    prevalence: 1,
    category: "DEPOSIT",
    validFor: ["ASTEROID"],
    extractableResources: [
      { tradegood: TradeGood.DIAMONDS, richness: { min: 0.5, max: 2 } },
      { tradegood: TradeGood.URANITE_ORE, richness: { min: 0.5, max: 2 } },
      { tradegood: TradeGood.MERITIUM_ORE, richness: { min: 0.5, max: 2 } },
    ],
  },
  RESEARCH_FACILITY: {
    prevalence: 1,
    validFor: ["PLANET", "MOON", "ORBITAL_STATION"],
    category: "HABITATION",
    consumes: {
      LAB_INSTRUMENTS: 1,
      ADVANCED_CIRCUITRY: 1,
      NOVEL_LIFEFORMS: 1,
    },
    exports: {
      // RESEARCH_DATA: 1,
    },
    exchange: [TradeGood.FUEL],
    populationLevel: 1,
    industries: 1,
  },
  ROCKY: {
    prevalence: 1,
    category: "DEPOSIT",
    validFor: ["PLANET"],
    extractableResources: [
      { tradegood: TradeGood.IRON_ORE, richness: { min: 0.5, max: 2 } },
      { tradegood: TradeGood.ALUMINUM_ORE, richness: { min: 0.5, max: 2 } },
      { tradegood: TradeGood.COPPER_ORE, richness: { min: 0.5, max: 2 } },
      { tradegood: TradeGood.QUARTZ_SAND, richness: { min: 0.5, max: 2 } },
    ],
  },
  SCATTERED_SETTLEMENTS: {
    prevalence: 1,
    validFor: ["PLANET", "MOON"],
    category: "HABITATION",
    exchange: [TradeGood.FUEL],
    populationLevel: 1,
  },
  SHIPYARD: {
    prevalence: 1,
    validFor: ["PLANET", "MOON", "ORBITAL_STATION"],
  },
  SPRAWLING_CITIES: {
    prevalence: 1,
    validFor: ["PLANET", "MOON"],
    category: "HABITATION",
    exports: {
      // TOURISTS: 2,
    },
    populationLevel: 3,
    industries: 3,
  },
  STRIPPED: {
    prevalence: 1,
    requiresCategory: ["DEPOSIT", "PLANT_LIFE"],
    validFor: ["PLANET", "MOON", "ASTEROID"],
    productivityMultiplier: 0.5,
  },
  STRONG_GRAVITY: {
    prevalence: 1,
    validFor: ["PLANET"],
    consumes: {
      // HEAVY_MACHINERY: 1,
      // THERMAL_REGULATORS: 1,
    },
    maintenanceCostMultiplier: 1.5,
  },
  STRONG_MAGNETOSPHERE: {
    prevalence: 1,
    validFor: ["PLANET"],
    consumes: {
      ELECTRONICS: 1,
      // THERMAL_REGULATORS: 1,
    },
  },
  SURVEILLANCE_OUTPOST: {
    prevalence: 1,
    validFor: ["PLANET", "MOON", "ORBITAL_STATION"],
    category: "HABITATION",
    consumes: {
      EQUIPMENT: 1,
      MEDICINE: 1,
    },
    exchange: [TradeGood.FUEL],
    populationLevel: 1,
  },
  SWAMP: {
    prevalence: 1,
    validFor: ["PLANET"],
    category: "PLANT_LIFE",
    extractableResources: [
      { tradegood: TradeGood.HYDROCARBON, richness: { min: 0.5, max: 2 } },
      { tradegood: TradeGood.NOVEL_LIFEFORMS, richness: { min: 0.5, max: 2 } },
    ],
    maintenanceCostMultiplier: 1.5,
  },
  TEMPERATE: {
    prevalence: 1,
    validFor: ["PLANET"],
    category: "PLANT_LIFE",
    maintenanceCostMultiplier: 0.75,
    constructionCostMultiplier: 0.75,
  },
  TERRAFORMED: {
    prevalence: 1,
    validFor: ["PLANET", "MOON"],
    category: "PLANT_LIFE",
    productivityMultiplier: 1.25,
  },
  TOXIC_ATMOSPHERE: {
    prevalence: 1,
    validFor: ["PLANET", "MOON"],
    maintenanceCostMultiplier: 1.5,
    consumes: {
      EQUIPMENT: 1,
      MEDICINE: 1,
    },
  },
  TRADING_HUB: {
    prevalence: 1,
    validFor: ["PLANET", "MOON"],
    exchange: [TradeGood.FUEL],
    exchangeGoodsCount: 5,
    populationLevel: 1,
  },
  UNCHARTED: {
    prevalence: 0,
    validFor: [],
  },
  VIBRANT_AURORAS: {
    prevalence: 1,
    validFor: ["PLANET"],
    consumes: {
      // TOURISTS: 3,
    },
  },
  VOLCANIC: {
    prevalence: 1,
    validFor: ["PLANET", "MOON"],
    maintenanceCostMultiplier: 1.5,
    constructionCostMultiplier: 1.5,
    extractableResources: [
      { tradegood: TradeGood.HYDROCARBON, richness: { min: 0.5, max: 2 } },
      { tradegood: TradeGood.DIAMONDS, richness: { min: 0.5, max: 2 } },
      { tradegood: TradeGood.URANITE_ORE, richness: { min: 0.5, max: 2 } },
      { tradegood: TradeGood.MERITIUM_ORE, richness: { min: 0.5, max: 2 } },
    ],
  },
  WEAK_GRAVITY: {
    prevalence: 1,
    validFor: ["PLANET"],
    consumes: {
      // HEAVY_MACHINERY: 1,
      GRAVITON_EMITTERS: 1,
    },
  },
};

export const waypointTraitNames = Object.keys(
  waypointTraits
) as WaypointTrait[];
