import { TradeGood } from "./trade-goods";
import { TraitModifiers } from "src/universe/static-data/waypoint-traits";

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
  // | "NEURALWARE"
  | "NANOWARE"
  | "MILITARY_INDUSTRIAL_COMPLEX"
  | "PHARMACEUTICALS"
  | "REFINING"
  | "PRECIOUS_METAL_REFINING"
  | "SPECIAL_REFINING"
  | "SOFTWARE"
  | "STOCK_EXCHANGE"
  | "TECHNOLOGY"
  | "TOURISM"
  | "WAREHOUSING";

export const industries: Record<Industry, TraitModifiers> = {
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
        produces: TradeGood.LUXURY_GOODS,
      },
      {
        produces: TradeGood.CLOTHING,
      },
    ],
  },
  CYBERNETICS: {
    productionLine: [
      {
        produces: TradeGood.CYBERNETIC_IMPLANTS,
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
        produces: TradeGood.FUSION_GENERATORS,
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
        produces: TradeGood.HEAVY_MACHINERY,
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
        produces: TradeGood.LUXURY_GOODS,
      },
    ],
  },
  MINING: {
    consumes: {
      HEAVY_MACHINERY: 1,
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
        produces: TradeGood.MEDICAL_SUPPLIES,
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
  TOURISM: {
    consumes: {
      TOURISTS: 3,
    },
  },
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
