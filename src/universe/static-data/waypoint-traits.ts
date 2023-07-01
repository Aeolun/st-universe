import { TradeGood } from "./trade-goods";
import { WaypointType } from "src/universe/static-data/waypoint-types";

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
  | "LEGALIZED_SLAVERY"
  | "MARKETPLACE"
  | "MEGA_STRUCTURES"
  | "MILITARY_BASE"
  | "MINERAL_DEPOSITS"
  | "NATURAL_SPICES"
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

type TraitCategory = "HABITATION" | "PLANT_LIFE" | "DEPOSIT";
export type ProductionLine = {
  produces: TradeGood;
  count?: number;
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
  extractableResources?: TradeGood[];
  maintenanceCostMultiplier?: number;
  constructionCostMultiplier?: number;
  populationLevel?: number;
  industries?: number;
  shipHullCount?: number;
}

export type TraitData = TraitModifiers & {
  validFor: WaypointType[];
  category?: TraitCategory;
  requiresCategory?: TraitCategory[];
};
export const waypointTraits: Record<WaypointTrait, TraitData> = {
  BARREN: {
    validFor: ["PLANET", "MOON", "ASTEROID_FIELD"],
    productivityMultiplier: 0.5,
  },
  BLACK_MARKET: {
    validFor: ["PLANET", "MOON", "ORBITAL_STATION"],
    category: "HABITATION",
    exchange: [TradeGood.FUEL],
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
    extractableResources: [
      TradeGood.IRON_ORE,
      TradeGood.ALUMINUM_ORE,
      TradeGood.COPPER_ORE,
    ],
  },
  CORROSIVE_ATMOSPHERE: {
    validFor: ["PLANET"],
    maintenanceCostMultiplier: 1.5,
  },
  CORRUPT: {
    validFor: ["PLANET", "MOON", "ASTEROID_FIELD"],
    requiresCategory: ["HABITATION"],
    illegalExchangeGoodsCount: 1,
    productivityMultiplier: 0.9,
  },
  DIVERSE_LIVE: {
    validFor: ["PLANET"],
    category: "PLANT_LIFE",
    extractableResources: [
      TradeGood.BOTANICAL_SPECIMENS,
      TradeGood.NOVEL_LIFEFORMS,
      TradeGood.LIVESTOCK,
      TradeGood.RESEARCH_DATA,
    ],
  },
  DRY_SEABEDS: {
    validFor: ["PLANET"],
    extractableResources: [
      TradeGood.QUARTZ_SAND,
      TradeGood.POLYNUCLEOTIDES,
      TradeGood.DIAMONDS,
    ],
  },
  EXPLORATION_OUTPOST: {
    validFor: ["PLANET", "MOON", "ORBITAL_STATION"],
    category: "HABITATION",
    illegalExchangeGoodsCount: 1,
    imports: {
      EQUIPMENT: 1,
      FUEL: 1,
      MEDICAL_SUPPLIES: 1,
    },
    exports: {
      RESEARCH_DATA: 1,
      NOVEL_LIFEFORMS: 1,
      BOTANICAL_SPECIMENS: 1,
    },
    populationLevel: 1,
  },
  EXPLOSIVE_GASES: {
    validFor: ["PLANET", "MOON"],
    maintenanceCostMultiplier: 2,
    extractableResources: [TradeGood.HYDROCARBONS],
  },
  EXTREME_PRESSURE: {
    validFor: ["PLANET"],
    imports: {
      HEAVY_MACHINERY: 1,
    },
    maintenanceCostMultiplier: 2,
    constructionCostMultiplier: 2,
  },
  EXTREME_TEMPERATURES: {
    validFor: ["PLANET"],
    imports: {
      THERMAL_REGULATORS: 1,
      MACHINERY: 1,
    },
    maintenanceCostMultiplier: 1.5,
    constructionCostMultiplier: 1.5,
  },
  FROZEN: {
    validFor: ["PLANET"],
    extractableResources: [
      TradeGood.HYDROCARBONS,
      TradeGood.ICE_WATER,
      TradeGood.AMMONIA_ICE,
      TradeGood.RESEARCH_DATA,
    ],
  },
  HIGH_TECH: {
    validFor: ["PLANET", "MOON", "ORBITAL_STATION"],
    category: "HABITATION",
    exchange: [TradeGood.FUEL],
    populationLevel: 2,
    industries: 2,
  },
  INDUSTRIAL: {
    validFor: ["PLANET", "MOON", "ORBITAL_STATION"],
    category: "HABITATION",
    populationLevel: 2,
    industries: 2,
  },
  JUNGLE: {
    validFor: ["PLANET"],
    category: "PLANT_LIFE",
    extractableResources: [
      TradeGood.BOTANICAL_SPECIMENS,
      TradeGood.NOVEL_LIFEFORMS,
      TradeGood.LIVESTOCK,
      TradeGood.RESEARCH_DATA,
    ],
  },
  LEGALIZED_SLAVERY: {
    validFor: ["PLANET", "MOON", "ORBITAL_STATION"],
    requiresCategory: ["HABITATION"],
    // exports: {
    //   "SLAVES": 2
    // },
  },
  MARKETPLACE: {
    validFor: [],
  },
  MEGA_STRUCTURES: {
    validFor: ["PLANET"],
    category: "HABITATION",
    consumes: {
      HEAVY_MACHINERY: 2,
      ADVANCED_CIRCUITRY: 2,
    },
    exchange: [TradeGood.FUEL],
    maintenanceCostMultiplier: 0.5,
    populationLevel: 3,
    industries: 3,
  },
  MILITARY_BASE: {
    validFor: ["PLANET", "ORBITAL_STATION"],
    category: "HABITATION",
    imports: {
      MILITARY_EQUIPMENT: 1,
      FIREARMS: 1,
    },
    exchange: [TradeGood.FUEL],
    populationLevel: 1,
  },
  MINERAL_DEPOSITS: {
    category: "DEPOSIT",
    validFor: ["PLANET", "MOON", "ASTEROID_FIELD"],
    extractableResources: [
      TradeGood.IRON_ORE,
      TradeGood.ALUMINUM_ORE,
      TradeGood.COPPER_ORE,
      TradeGood.QUARTZ_SAND,
      TradeGood.SILICON_CRYSTALS,
    ],
  },
  NATURAL_SPICES: {
    category: "DEPOSIT",
    validFor: ["PLANET", "MOON"],
    // exports: {
    //   "SPICES": 2,
    // },
    requiresCategory: ["PLANT_LIFE"],
  },
  OCEAN: {
    validFor: ["PLANET"],
    category: "PLANT_LIFE",
    extractableResources: [TradeGood.FOOD],
    maintenanceCostMultiplier: 1.25,
  },
  OUTPOST: {
    validFor: ["PLANET", "MOON"],
    category: "HABITATION",
    consumes: {
      EQUIPMENT: 1,
      MEDICAL_SUPPLIES: 1,
    },
    exchange: [TradeGood.FUEL],
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
    category: "DEPOSIT",
    validFor: ["PLANET", "MOON", "ASTEROID_FIELD"],
    extractableResources: [
      TradeGood.GOLD_ORE,
      TradeGood.SILVER_ORE,
      TradeGood.PLATINUM_ORE,
    ],
  },
  RARE_METAL_DEPOSITS: {
    category: "DEPOSIT",
    validFor: ["PLANET", "MOON", "ASTEROID_FIELD"],
    extractableResources: [
      TradeGood.DIAMONDS,
      TradeGood.URANITE_ORE,
      TradeGood.MERITIUM_ORE,
    ],
  },
  RESEARCH_FACILITY: {
    validFor: ["PLANET", "MOON", "ORBITAL_STATION"],
    category: "HABITATION",
    consumes: {
      LAB_INSTRUMENTS: 1,
      ADVANCED_CIRCUITRY: 1,
      NOVEL_LIFEFORMS: 1,
    },
    exports: {
      RESEARCH_DATA: 1,
    },
    exchange: [TradeGood.FUEL],
    populationLevel: 1,
    industries: 1,
  },
  ROCKY: {
    category: "DEPOSIT",
    validFor: ["PLANET"],
    extractableResources: [
      TradeGood.IRON_ORE,
      TradeGood.ALUMINUM_ORE,
      TradeGood.COPPER_ORE,
      TradeGood.QUARTZ_SAND,
    ],
  },
  SCATTERED_SETTLEMENTS: {
    validFor: ["PLANET", "MOON"],
    category: "HABITATION",
    exchange: [TradeGood.FUEL],
    populationLevel: 1,
    industries: 1,
  },
  SHIPYARD: {
    validFor: ["PLANET", "MOON", "ORBITAL_STATION"],
    shipHullCount: 3,
  },
  SPRAWLING_CITIES: {
    validFor: ["PLANET", "MOON"],
    category: "HABITATION",
    exports: {
      TOURISTS: 2,
    },
    populationLevel: 3,
    industries: 3,
  },
  STRIPPED: {
    requiresCategory: ["DEPOSIT", "PLANT_LIFE"],
    validFor: ["PLANET", "MOON", "ASTEROID_FIELD"],
    productivityMultiplier: 0.5,
  },
  STRONG_GRAVITY: {
    validFor: ["PLANET"],
    consumes: {
      HEAVY_MACHINERY: 1,
      THERMAL_REGULATORS: 1,
    },
    maintenanceCostMultiplier: 1.5,
  },
  STRONG_MAGNETOSPHERE: {
    validFor: ["PLANET"],
    consumes: {
      ELECTRONICS: 1,
      THERMAL_REGULATORS: 1,
    },
  },
  SURVEILLANCE_OUTPOST: {
    validFor: ["PLANET", "MOON", "ORBITAL_STATION", "ASTEROID_FIELD"],
    category: "HABITATION",
    consumes: {
      EQUIPMENT: 1,
      MEDICAL_SUPPLIES: 1,
    },
    exchange: [TradeGood.FUEL],
    populationLevel: 1,
  },
  SWAMP: {
    validFor: ["PLANET"],
    category: "PLANT_LIFE",
    extractableResources: [TradeGood.HYDROCARBONS, TradeGood.NOVEL_LIFEFORMS],
    maintenanceCostMultiplier: 1.5,
  },
  TEMPERATE: {
    validFor: ["PLANET"],
    category: "PLANT_LIFE",
    maintenanceCostMultiplier: 0.75,
    constructionCostMultiplier: 0.75,
  },
  TERRAFORMED: {
    validFor: ["PLANET", "MOON"],
    category: "PLANT_LIFE",
    productivityMultiplier: 1.25,
  },
  TOXIC_ATMOSPHERE: {
    validFor: ["PLANET", "MOON"],
    maintenanceCostMultiplier: 1.5,
    consumes: {
      EQUIPMENT: 1,
      MEDICAL_SUPPLIES: 1,
    },
  },
  TRADING_HUB: {
    validFor: ["PLANET", "MOON", "ASTEROID_FIELD"],
    exchange: [TradeGood.FUEL],
    exchangeGoodsCount: 5,
  },
  UNCHARTED: {
    validFor: [],
  },
  VIBRANT_AURORAS: {
    validFor: ["PLANET"],
    consumes: {
      TOURISTS: 3,
    },
  },
  VOLCANIC: {
    validFor: ["PLANET", "MOON"],
    maintenanceCostMultiplier: 1.5,
    constructionCostMultiplier: 1.5,
    extractableResources: [
      TradeGood.HYDROCARBONS,
      TradeGood.DIAMONDS,
      TradeGood.URANITE_ORE,
      TradeGood.MERITIUM_ORE,
    ],
  },
  WEAK_GRAVITY: {
    validFor: ["PLANET"],
    consumes: {
      HEAVY_MACHINERY: 1,
      GRAVITON_EMITTERS: 1,
    },
  },
};

export const waypointTraitNames = Object.keys(
  waypointTraits
) as WaypointTrait[];
