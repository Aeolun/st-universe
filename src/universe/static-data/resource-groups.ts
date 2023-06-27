import { TradeGood } from "src/universe/static-data/trade-goods";

export enum ResourceGroup {
  MINERALS = "RESOURCE_GROUP_MINERALS",
  METAL_ORE = "RESOURCE_GROUP_METAL_ORE",
  METALS = "RESOURCE_GROUP_METALS",
  PRECIOUS_METAL_ORE = "RESOURCE_GROUP_PRECIOUS_METAL_ORE",
  PRECIOUS_METALS = "RESOURCE_GROUP_PRECIOUS_METALS",
  RARE_METAL_ORE = "RESOURCE_GROUP_RARE_METAL_ORE",
  RARE_METALS = "RESOURCE_GROUP_RARE_METALS",
  GASES = "RESOURCE_GROUP_GASES",
  LIQUIDS = "RESOURCE_GROUP_LIQUIDS",
}

export const resourceGroups: Record<ResourceGroup, TradeGood[]> = {
  [ResourceGroup.MINERALS]: [
    TradeGood.SILICON_CRYSTALS,
    TradeGood.ICE_WATER,
    TradeGood.QUARTZ_SAND,
    TradeGood.DIAMONDS,
    TradeGood.PRECIOUS_STONES,
    TradeGood.AMMONIA_ICE,
  ],
  [ResourceGroup.METAL_ORE]: [
    TradeGood.IRON_ORE,
    TradeGood.COPPER_ORE,
    TradeGood.ALUMINUM_ORE,
  ],
  [ResourceGroup.METALS]: [
    TradeGood.IRON,
    TradeGood.COPPER,
    TradeGood.ALUMINUM,
  ],
  [ResourceGroup.PRECIOUS_METAL_ORE]: [
    TradeGood.SILVER_ORE,
    TradeGood.GOLD_ORE,
    TradeGood.PLATINUM_ORE,
  ],
  [ResourceGroup.PRECIOUS_METALS]: [
    TradeGood.SILVER,
    TradeGood.GOLD,
    TradeGood.PLATINUM,
  ],
  [ResourceGroup.RARE_METAL_ORE]: [
    TradeGood.URANITE_ORE,
    TradeGood.MERITIUM_ORE,
  ],
  [ResourceGroup.RARE_METALS]: [TradeGood.URANITE, TradeGood.MERITIUM],
  [ResourceGroup.GASES]: [TradeGood.HYDROCARBONS],
  [ResourceGroup.LIQUIDS]: [TradeGood.ICE_WATER],
};
