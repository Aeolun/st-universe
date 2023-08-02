import { TradeGood } from "./trade-goods";
import { TraitModifiers } from "src/universe/static-data/waypoint-traits";
import { Configuration } from "src/universe/static-data/ship-configurations";

export type Industry =
  | "AMMUNITION_FACTORY"
  | "ANTIMATTER_REFINING"
  | "AGRICULTURE"
  | "BIOCHEMICALS"
  | "CHEMICALS"
  | "CONSTRUCTION_MATERIALS"
  | "CONSUMER_GOODS"
  | "CYBERNETICS"
  | "ELECTRONICS"
  | "ENERGY"
  | "FUEL_REFINING"
  | "HEAVY_MANUFACTURING"
  | "LIGHT_MANUFACTURING"
  | "LUXURY_GOODS"
  | "MINING"
  | "EXPLOSIVES"
  | "FERTILIZERS"
  | "MINING_EXCHANGE"
  // | "NEURALWARE"
  | "NANOWARE"
  | "BOTANICALS"
  | "SPACESHIPS"
  | "MILITARY_INDUSTRIAL_COMPLEX"
  | "PHARMACEUTICALS"
  | "REFINING"
  | "PRECIOUS_METAL_REFINING"
  | "SPECIAL_REFINING"
  | "SOFTWARE"
  | "STOCK_EXCHANGE"
  | "TECHNOLOGY"
  // | "TOURISM"
  | "WAREHOUSING";

type IndustryProperties = TraitModifiers & {
  hidden?: boolean;
};

export const industries: Record<Industry, IndustryProperties> = {
  AGRICULTURE: {
    productionLine: [
      {
        produces: TradeGood.FOOD,
      },
      {
        produces: TradeGood.FABRICS,
      },
    ],
  },
  ANTIMATTER_REFINING: {
    productionLine: [
      {
        produces: TradeGood.ANTIMATTER,
      },
    ],
  },
  BOTANICALS: {
    productionLine: [
      {
        produces: TradeGood.BOTANICAL_SPECIMENS,
      },
    ],
  },
  BIOCHEMICALS: {
    productionLine: [
      {
        produces: TradeGood.BIOCOMPOSITES,
      },
    ],
  },
  CHEMICALS: {
    productionLine: [
      {
        produces: TradeGood.PLASTICS,
      },
    ],
  },
  CONSTRUCTION_MATERIALS: {
    productionLine: [
      {
        produces: TradeGood.SHIP_PLATING,
      },
      {
        produces: TradeGood.ELECTRONICS,
      },
    ],
  },
  CONSUMER_GOODS: {
    productionLine: [
      {
        produces: TradeGood.JEWELRY,
      },
      {
        produces: TradeGood.CLOTHING,
      },
    ],
  },
  CYBERNETICS: {
    productionLine: [
      {
        produces: TradeGood.CYBER_IMPLANTS,
      },
    ],
  },
  ELECTRONICS: {
    productionLine: [
      {
        produces: TradeGood.ELECTRONICS,
      },
    ],
  },
  ENERGY: {
    productionLine: [
      {
        produces: TradeGood.MICRO_FUSION_GENERATORS,
      },
    ],
  },
  FUEL_REFINING: {
    productionLine: [
      {
        produces: TradeGood.FUEL,
      },
    ],
  },
  HEAVY_MANUFACTURING: {
    productionLine: [
      {
        produces: TradeGood.MACHINERY,
      },
    ],
  },
  LIGHT_MANUFACTURING: {
    productionLine: [
      {
        produces: TradeGood.MACHINERY,
      },
    ],
  },
  LUXURY_GOODS: {
    productionLine: [
      {
        produces: TradeGood.JEWELRY,
      },
    ],
  },
  MINING: {
    consumes: {
      MACHINERY: 1,
    },
    produces: {
      IRON_ORE: 1,
      ALUMINUM_ORE: 1,
      COPPER_ORE: 1,
    },
  },
  // NEURALWARE: {
  //   productionLine: [
  //     {
  //       produces: "NEURAL_CHIPS"
  //     }
  //   ]
  // },
  NANOWARE: {
    productionLine: [
      {
        produces: TradeGood.NANOBOTS,
      },
    ],
  },
  PHARMACEUTICALS: {
    productionLine: [
      {
        produces: TradeGood.MEDICINE,
      },
    ],
  },
  REFINING: {
    productionLine: [
      {
        produces: TradeGood.IRON,
      },
      {
        produces: TradeGood.ALUMINUM,
      },
      {
        produces: TradeGood.COPPER,
      },
    ],
  },
  SPACESHIPS: {
    shipHullCount: 3,
  },
  EXPLOSIVES: {
    productionLine: [
      {
        produces: TradeGood.EXPLOSIVES,
      },
    ],
  },
  FERTILIZERS: {
    productionLine: [
      {
        produces: TradeGood.FERTILIZERS,
      },
    ],
  },
  PRECIOUS_METAL_REFINING: {
    productionLine: [
      {
        produces: TradeGood.GOLD,
      },
      {
        produces: TradeGood.SILVER,
      },
      {
        produces: TradeGood.PLATINUM,
      },
    ],
  },
  MINING_EXCHANGE: {
    exchange: [
      TradeGood.ALUMINUM_ORE,
      TradeGood.COPPER_ORE,
      TradeGood.IRON_ORE,
      TradeGood.AMMONIA_ICE,
      TradeGood.DIAMONDS,
      TradeGood.FUEL,
      TradeGood.ICE_WATER,
      TradeGood.PRECIOUS_STONES,
      TradeGood.QUARTZ_SAND,
      TradeGood.SILICON_CRYSTALS,
    ],
  },
  SPECIAL_REFINING: {
    productionLine: [
      {
        produces: TradeGood.URANITE,
      },
      {
        produces: TradeGood.MERITIUM,
      },
    ],
  },
  SOFTWARE: {
    productionLine: [
      {
        produces: TradeGood.QUANTUM_DRIVES,
      },
      {
        produces: TradeGood.AI_MAINFRAMES,
      },
    ],
  },
  STOCK_EXCHANGE: {
    consumes: {
      ELECTRONICS: 2,
    },
  },
  TECHNOLOGY: {
    productionLine: [
      {
        produces: TradeGood.AI_MAINFRAMES,
      },
      {
        produces: TradeGood.QUANTUM_DRIVES,
      },
    ],
  },
  // TOURISM: {
  //   consumes: {
  //     TOURISTS: 3,
  //   },
  // },
  AMMUNITION_FACTORY: {
    productionLine: [
      {
        produces: TradeGood.AMMUNITION,
      },
    ],
  },
  MILITARY_INDUSTRIAL_COMPLEX: {
    productionLine: [
      {
        produces: TradeGood.FIREARMS,
      },
      {
        produces: TradeGood.MILITARY_EQUIPMENT,
      },
    ],
  },
  WAREHOUSING: {
    consumes: {
      FOOD: 1,
      CLOTHING: 1,
      ELECTRONICS: 1,
    },
  },
};

export const industryNames = Object.keys(industries) as Industry[];
