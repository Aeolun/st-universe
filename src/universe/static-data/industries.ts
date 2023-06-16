import { TradeGood } from "./trade-goods";
import {TraitModifiers} from "src/universe/static-data/waypoint-traits";

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

export const industries: Record<
  Industry,
  TraitModifiers
> = {
  AGRICULTURE: {
    productionLine: [
      {
        produces: "FOOD"
      },
      {
        produces: "FABRICS"
      }
    ],
  },
  ANTIMATTER_REFINING: {
    productionLine: [
      {
        produces: "ANTIMATTER"
      }
    ]
  },
  BIOCHEMICALS: {
    productionLine: [{
      produces: "BIOCOMPOSITES"
    }]
  },
  CHEMICALS: {
    productionLine: [{
      produces: "PLASTICS"
    }]
  },
  CONSTRUCTION_MATERIALS: {
    productionLine: [
      {
        produces: "SHIP_PLATING"
      }, {
        produces: "ELECTRONICS"
      }
    ]
  },
  CONSUMER_GOODS: {
    productionLine: [
      {
        produces: "LUXURY_GOODS"
      }, {
        produces: "CLOTHING"
      }
    ]
  },
  CYBERNETICS: {
    productionLine: [
      {
        produces: "CYBERNETIC_IMPLANTS"
      }
    ]
  },
  ELECTRONICS: {
    productionLine: [
      {
        produces: "ELECTRONICS"
      }
    ]
  },
  ENERGY: {
    productionLine: [
      {
        produces: "FUSION_GENERATORS"
      }
    ]
  },
  FUEL_REFINING: {
    productionLine: [
      {
        produces: "FUEL"
      }
    ]
  },
  HEAVY_MANUFACTURING: {
    productionLine: [
      {
        produces: "HEAVY_MACHINERY"
      }
    ]
  },
  LIGHT_MANUFACTURING: {
    productionLine: [
      {
        produces: "MACHINERY"
      }
    ]
  },
  LUXURY_GOODS: {
    productionLine: [
      {
        produces: "LUXURY_GOODS"
      }
    ]
  },
  MINING: {
    consumes: {
      "HEAVY_MACHINERY": 1,
    },
    produces: {
      "IRON_ORE": 1,
      "ALUMINUM_ORE": 1,
      "COPPER_ORE": 1,
    }
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
        produces: "NANOBOTS"
      }
    ]
  },
  PHARMACEUTICALS: {
    productionLine: [
      {
        produces: "MEDICAL_SUPPLIES"
      }
    ]
  },
  REFINING: {
    productionLine: [
      {
        produces: "IRON"
      }, {
        produces: "ALUMINUM"
      }, {
        produces: "COPPER"
      }
    ]
  },
  PRECIOUS_METAL_REFINING: {
    productionLine: [
      {
        produces: "GOLD"
      }, {
        produces: "SILVER"
      }, {
        produces: "PLATINUM"
      }
    ]
  },
  SPECIAL_REFINING: {
    productionLine: [
      {
        produces: "URANITE"
      }, {
        produces: "MERITIUM"
      }
    ]
  },
  SOFTWARE: {
    productionLine: [
      {
        produces: "QUANTUM_DRIVES"
      }, {
        produces: "AI_MAINFRAMES"
      }
    ]
  },
  STOCK_EXCHANGE: {
    consumes: {
      "ELECTRONICS": 2,
    },
  },
  TECHNOLOGY: {
    productionLine: [
      {
        produces: "AI_MAINFRAMES"
      }, {
        produces: "QUANTUM_DRIVES"
      }
    ]
  },
  TOURISM: {
    consumes: {
      "TOURISTS": 3
    },
  },
  AMMUNITION_FACTORY: {
    productionLine: [
      {
        produces: "AMMUNITION"
      }
    ]
  },
  MILITARY_INDUSTRIAL_COMPLEX: {
    productionLine: [
      {
        produces: "FIREARMS"
      }, {
        produces: "MILITARY_EQUIPMENT"
      }
    ]
  },
  WAREHOUSING: {
    consumes: {
      "FOOD": 1,
      "CLOTHING": 1,
      "ELECTRONICS": 1,
    },
  }
};

export const industryNames = Object.keys(
  industries
) as Industry[];
