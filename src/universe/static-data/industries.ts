import { TradeGood } from "./trade-goods";

export type Industry =
  | "AGRICULTURE"
  | "BIOCHEMICALS"
  | "CHEMICALS"
  | "CONSTRUCTION_MATERIALS"
  | "CONSUMER_GOODS"
  | "ELECTRONICS"
  | "ENERGY"
  | "FUEL_REFINING"
  | "HEAVY_MANUFACTURING"
  | "LIGHT_MANUFACTURING"
  | "LUXURY_GOODS"
  | "MINING"
  | "PHARMACEUTICALS"
  | "REFINING"
  | "SOFTWARE"
  | "STOCK_EXCHANGE"
  | "TECHNOLOGY"
  | "TOURISM"
  | "WAREHOUSING";

export const industries: Record<
  Industry,
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
  AGRICULTURE: {
    imports: ["LIVESTOCK", "FERTILIZERS"],
    exports: ["FOOD", "FABRICS"],
  },
  BIOCHEMICALS: {
    imports: ["BOTANICAL_SPECIMENS", "POLYNUCLEOTIDES"],
    exports: ["BIOCOMPOSITES"],
  },
  CHEMICALS: {
    imports: ["HYDROCARBONS", "POLYNUCLEOTIDES"],
    exports: ["PLASTICS"],
  },
  CONSTRUCTION_MATERIALS: {
    imports: ["IRON", "ALUMINUM", "COPPER"],
    exports: ["SHIP_PLATING", "ELECTRONICS"],
  },
  CONSUMER_GOODS: {
    imports: ["FABRICS", "PLASTICS", "ELECTRONICS"],
    exports: ["LUXURY_GOODS", "CLOTHING"],
  },
  ELECTRONICS: {
    imports: ["PLASTICS", "COPPER_ORE"],
    exports: ["ELECTRONICS"],
  },
  ENERGY: {
    imports: ["HYDROCARBONS", "ADVANCED_CIRCUITRY", "ELECTRONICS"],
    exports: ["FUSION_GENERATORS", "NUCLEAR_DEVICES"],
  },
  FUEL_REFINING: {
    imports: ["HYDROCARBONS"],
    exports: ["FUEL"],
  },
  HEAVY_MANUFACTURING: {
    imports: ["IRON", "ALUMINUM", "COPPER", "ELECTRONICS"],
    exports: ["HEAVY_MACHINERY"],
  },
  LIGHT_MANUFACTURING: {
    imports: ["IRON", "ALUMINUM", "COPPER", "ELECTRONICS"],
    exports: ["MACHINERY"],
  },
  LUXURY_GOODS: {
    imports: ["FOOD", "PLASTICS", "ELECTRONICS"],
    exports: ["LUXURY_GOODS"],
  },
  MINING: {
    imports: ["HEAVY_MACHINERY"],
    exports: ["IRON_ORE", "ALUMINUM_ORE", "COPPER_ORE"],
  },
  PHARMACEUTICALS: {
    imports: ["BOTANICAL_SPECIMENS", "POLYNUCLEOTIDES"],
    exports: ["MEDICAL_SUPPLIES"],
  },
  REFINING: {
    imports: ["IRON_ORE", "ALUMINUM_ORE", "COPPER_ORE"],
    exports: ["IRON", "ALUMINUM", "COPPER"],
  },
  SOFTWARE: {
    imports: ["ADVANCED_CIRCUITRY", "ELECTRONICS"],
    exports: ["QUANTUM_DRIVES", "AI_MAINFRAMES"],
  },
  STOCK_EXCHANGE: {
    imports: ["ELECTRONICS"],
    exports: ["RADIOACTIVE_WASTE"],
  },
  TECHNOLOGY: {
    imports: ["ADVANCED_CIRCUITRY", "ELECTRONICS"],
    exports: ["AI_MAINFRAMES", "QUANTUM_DRIVES"],
  },
  TOURISM: {
    imports: ["TOURISTS"],
  },
  WAREHOUSING: {
    imports: ["FOOD", "CLOTHING", "ELECTRONICS"],
  }
};

export const industryNames = Object.keys(
  industries
) as Industry[];
