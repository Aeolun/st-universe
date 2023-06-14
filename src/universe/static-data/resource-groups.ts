import {TradeGood} from "src/universe/static-data/trade-goods";

export enum ResourceGroup {
  MINERALS = "RESOURCE_GROUP_MINERALS",
  METALS = "RESOURCE_GROUP_METALS",
  PRECIOUS_METALS = "RESOURCE_GROUP_PRECIOUS_METALS",
  GASES = "RESOURCE_GROUP_GASES",
  LIQUIDS = "RESOURCE_GROUP_LIQUIDS",
}

export const resourceGroups: Record<ResourceGroup, TradeGood[]> = {
  [ResourceGroup.MINERALS]: [
    "IRON_ORE",
    "COPPER_ORE",
    "ALUMINUM_ORE",
    "SILICON_CRYSTALS",
    "ICE_WATER",
  ],
  [ResourceGroup.METALS]: [
    "IRON_ORE",
    "COPPER_ORE",
    "ALUMINUM_ORE",
  ],
  [ResourceGroup.PRECIOUS_METALS]: [
    "SILVER_ORE",
    "GOLD_ORE",
    "PLATINUM_ORE",
    ],
  [ResourceGroup.GASES]: [
    "HYDROCARBONS"
  ],
  [ResourceGroup.LIQUIDS]: [
    "WATER",
  ],
}