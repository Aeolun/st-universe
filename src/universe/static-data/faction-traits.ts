import {TradeGood} from "./trade-goods";
import {WaypointType} from "src/universe/static-data/waypoint-types";
import {string} from "@tsed/schema";

export type FactionTrait =
  | "BUREAUCRATIC"
  | "SECRETIVE"
  | "CAPITALISTIC"
  | "INDUSTRIOUS"
  | "PEACEFUL"
  | "DISTRUSTFUL"
  | "WELCOMING"
  | "SMUGGLERS"
  | "SCAVENGERS"
  | "REBELLIOUS"
  | "EXILES"
  | "PIRATES"
  | "RAIDERS"
  | "CLAN"
  | "GUILD"
  | "DOMINION"
  | "FRINGE"
  | "FORSAKEN"
  | "ISOLATED"
  | "LOCALIZED"
  | "ESTABLISHED"
  | "NOTABLE"
  | "DOMINANT"
  | "INESCAPABLE"
  | "INNOVATIVE"
  | "BOLD"
  | "VISIONARY"
  | "CURIOUS"
  | "DARING"
  | "EXPLORATORY"
  | "RESOURCEFUL"
  | "FLEXIBLE"
  | "COOPERATIVE"
  | "UNITED"
  | "STRATEGIC"
  | "INTELLIGENT"
  | "RESEARCH_FOCUSED"
  | "COLLABORATIVE"
  | "PROGRESSIVE"
  | "MILITARISTIC"
  | "TECHNOLOGICALLY_ADVANCED"
  | "AGGRESSIVE"
  | "IMPERIALISTIC"
  | "TREASURE_HUNTERS"
  | "DEXTEROUS"
  | "UNPREDICTABLE"
  | "BRUTAL"
  | "FLEETING"
  | "ADAPTABLE"
  | "SELF_SUFFICIENT"
  | "DEFENSIVE"
  | "PROUD"
  | "DIVERSE"
  | "INDEPENDENT"
  | "SELF_INTERESTED"
  | "FRAGMENTED"
  | "COMMERCIAL"
  | "FREE_MARKETS"
  | "ENTREPRENEURIAL";

export interface TraitModifiers {
  productivityMultiplier?: number;
  exchangeGoodsCount?: number;
  illegalExchangeGoodsCount?: number;
  serviceCostMultiplier?: number;
  maintenanceCostMultiplier?: number;
  shipDegradeRateMultiplier?: number;
  constructionCostMultiplier?: number;
  reputationGainMultiplier?: number;
  reputationLossMultiplier?: number;
  salvageGainMultiplier?: number;
  weaponDamageMultiplier?: number;
  otherFactionsStartingRelationAdjustment?: number
  otherFactionsRelationGainMultiplier?: number
  otherFactionsRelationLossMultiplier?: number
  memberSellPriceModifier?: number
  tradeGoodConsumptionMultiplier?: number
  researchProductionMultiplier?: number
}

export type FactionTraitData = {
  name: string
  description: string
} & TraitModifiers

export const factionTraits: Record<
  FactionTrait,
  FactionTraitData
> = {
BUREAUCRATIC: {
    name: "Bureaucratic",
    description: "Bureaucratic factions are known for their slow and inefficient processes.",
    productivityMultiplier: 0.8,
},
SECRETIVE: {
    name: "Secretive",
    description: "Secretive factions are known for their secrecy and lack of transparency.",
},
CAPITALISTIC: {
    name: "Capitalistic",
    description: "Capitalistic factions are known for their focus on profit and wealth.",
    exchangeGoodsCount: 2,
},
INDUSTRIOUS: {
    name: "Industrious",
    description: "Industrious factions are known for their focus on industry and production.",
},
PEACEFUL: {
    name: "Peaceful",
    description: "Peaceful factions are known for their focus on peace and diplomacy.",
    productivityMultiplier: 1.2,
},
DISTRUSTFUL: {
    name: "Distrustful",
    description: "Distrustful factions are known for their lack of trust in others.",
    reputationGainMultiplier: 0.8,
},
WELCOMING: {
    name: "Welcoming",
    description: "Welcoming factions are known for their welcoming nature.",
    reputationGainMultiplier: 1.2,
},
SMUGGLERS: {
    name: "Smugglers",
    description: "Smugglers are known for their illegal activities.",
    illegalExchangeGoodsCount: 2,
},
SCAVENGERS: {
    name: "Scavengers",
    description: "Scavengers are known for their scavenging activities.",
  salvageGainMultiplier: 1.2,
},
REBELLIOUS: {
    name: "Rebellious",
    description: "Rebellious factions are known for their rebellious nature.",
    otherFactionsStartingRelationAdjustment: -10,
},
EXILES: {
    name: "Exiles",
    description: "Exiles are known for their exile status.",
    otherFactionsStartingRelationAdjustment: -20,
},
PIRATES: {
    name: "Pirates",
    description: "Pirates are known for their pirate activities.",
    otherFactionsStartingRelationAdjustment: -30,
},
RAIDERS: {
    name: "Raiders",
    description: "Raiders are known for their raiding activities.",
    otherFactionsStartingRelationAdjustment: -10,
},
CLAN: {
    name: "Clan",
    description: "Clans are known for their clan status.",
  serviceCostMultiplier: 0.8
},
GUILD: {
    name: "Guild",
    description: "Guilds are known for their guild status.",
  memberSellPriceModifier: 50
},
DOMINION: {
    name: "Dominion",
    description: "Dominions are known for their dominion status.",
    otherFactionsStartingRelationAdjustment: -10,
},
FRINGE: {
    name: "Fringe",
    description: "Fringe factions are known for their fringe status.",
    otherFactionsStartingRelationAdjustment: -20,
},
FORSAKEN: {
    name: "Forsaken",
    description: "Forsaken factions are known for their forsaken status.",
    otherFactionsStartingRelationAdjustment: -50,
},
ISOLATED: {
    name: "Isolated",
    description: "Isolated factions are known for their isolated status.",
  tradeGoodConsumptionMultiplier: 0.9
},
LOCALIZED: {
    name: "Localized",
    description: "Localized factions are known for their localized status.",

},
ESTABLISHED: {
    name: "Established",
    description: "Established factions are known for their established status.",
    otherFactionsStartingRelationAdjustment: 10,
},
NOTABLE: {
    name: "Notable",
    description: "Notable factions are known for their notable status.",
    otherFactionsStartingRelationAdjustment: 20,
},
DOMINANT: {
    name: "Dominant",
    description: "Dominant factions are known for their dominant status.",
    otherFactionsStartingRelationAdjustment: 50,
},
INESCAPABLE: {
    name: "Inescapable",
    description: "Inescapable factions are known for their inescapable status.",
    otherFactionsStartingRelationAdjustment: 10,
},
INNOVATIVE: {
    name: "Innovative",
    description: "Innovative factions are known for their innovative nature.",
  researchProductionMultiplier: 1.2
},
  BOLD: {
    name: "Bold",
    description: "Bold factions are known for their bold nature.",
  constructionCostMultiplier: 0.8
},
  AGGRESSIVE: {
    name: "Aggressive",
    description: "Aggressive factions are known for their aggressive nature.",
  maintenanceCostMultiplier: 1.2
  },
  PROGRESSIVE: {
    name: "Progressive",
    description: "Progressive factions are known for their progressive nature.",
  productivityMultiplier: 1.2
  },
  MILITARISTIC: {
    name: "Militaristic",
    description: "Militaristic factions are known for their militaristic nature.",
  weaponDamageMultiplier: 1.2
  },
  DEFENSIVE: {
    name: "Defensive",
    description: "Defensive factions are known for their defensive nature.",
  shipDegradeRateMultiplier: 0.8
  },
  FRAGMENTED: {
    name: "Fragmented",
    description: "Fragmented factions are known for their fragmented nature.",
  exchangeGoodsCount: 1,
  },
  TECHNOLOGICALLY_ADVANCED: {
    name: "Technologically Advanced",
    description: "Technologically Advanced factions are known for their technological advancement.",
  researchProductionMultiplier: 1.2
  },
  VISIONARY: {
    name: "Visionary",
    description: "Visionary factions are known for their visionary nature.",
  constructionCostMultiplier: 0.8
  },
  COLLABORATIVE: {
    name: "Collaborative",
    description: "Collaborative factions are known for their collaborative nature.",
    otherFactionsRelationGainMultiplier: 1.2,
  },
  DARING: {
    name: "Daring",
    description: "Daring factions are known for their daring nature.",
  maintenanceCostMultiplier: 1.2
  },
  DEXTEROUS: {
    name: "Dexterous",
    description: "Dexterous factions are known for their dexterous nature.",
  productivityMultiplier: 1.2
  },
  DIVERSE: {
    name: "Diverse",
    description: "Diverse factions are known for their diverse nature.",
  weaponDamageMultiplier: 1.2
  },
  PROUD: {
    name: "Proud",
    description: "Proud factions are known for their proud nature.",
  shipDegradeRateMultiplier: 0.8
  },
  RESEARCH_FOCUSED: {
    name: "Research Focused",
    description: "Research Focused factions are known for their research focus.",
  researchProductionMultiplier: 1.2
  },
  SELF_INTERESTED: {
    name: "Self Interested",
    description: "Self Interested factions are known for their self interested nature.",
  constructionCostMultiplier: 0.8
  },
  UNITED: {
    name: "United",
    description: "United factions are known for their united nature.",
    otherFactionsRelationGainMultiplier: 1.2,
  },
  SELF_SUFFICIENT: {
    name: "Self Sufficient",
    description: "Self Sufficient factions are known for their self sufficient nature.",
  maintenanceCostMultiplier: 1.2
  },
  ADAPTABLE: {
    name: "Adaptable",
    description: "Quick to adapt to changing circumstances, with the ability to adjust their plans or strategies in response to new information or challenges. Sometimes able to thrive in a wide range of environments or situations, but may also be vulnerable to sudden or unexpected changes.",
  productivityMultiplier: 1.2
  },
  STRATEGIC: {
    name: "Strategic",
    description: "Strategic factions are known for their strategic nature.",
  weaponDamageMultiplier: 1.2
  },
  INDEPENDENT: {
    name: "Independent",
    description: "Independent factions are known for their independent nature.",
  shipDegradeRateMultiplier: 0.8
  },
  CURIOUS: {
    name: "Curious",
    description: "Curious factions are known for their curious nature.",
  researchProductionMultiplier: 1.2
  },
  FREE_MARKETS: {
    name: "Free Markets",
    description: "Free Markets factions are known for their free market nature.",
  exchangeGoodsCount: 1,
  },
  COMMERCIAL: {
    name: "Commercial",
    description: "Commercial factions are known for their commercial nature.",
  constructionCostMultiplier: 0.8
  },
  BRUTAL: {
    name: "Brutal",
    description: "Brutal factions are known for their brutal nature.",
  maintenanceCostMultiplier: 1.2
  },
  ENTREPRENEURIAL: {
    name: "Entrepreneurial",
    description: "Entrepreneurial factions are known for their entrepreneurial nature.",
    productivityMultiplier: 1.2
  },
RESOURCEFUL: {
    name: "Resourceful",
    description: "Resourceful factions are known for their resourceful nature.",
  weaponDamageMultiplier: 1.2
  },
  EXPLORATORY: {
    name: "Exploratory",
    description: "Exploratory factions are known for their exploratory nature.",
  shipDegradeRateMultiplier: 0.8
  },
  FLEETING: {
    name: "Fleeting",
    description: "Fleeting factions are known for their fleeting nature.",
  researchProductionMultiplier: 1.2
  },
  FLEXIBLE: {
    name: "Flexible",
    description: "Flexible factions are known for their flexible nature.",
  constructionCostMultiplier: 0.8
  },
  IMPERIALISTIC: {
    name: "Imperialistic",
    description: "Imperialistic factions are known for their imperialistic nature.",
  maintenanceCostMultiplier: 1.2
  },
  INTELLIGENT: {
    name: "Intelligent",
    description: "Intelligent factions are known for their intelligent nature.",
  productivityMultiplier: 1.2
  },
  UNPREDICTABLE: {
    name: "Unpredictable",
    description: "Unpredictable factions are known for their unpredictable nature.",
  weaponDamageMultiplier: 1.2
  },
  COOPERATIVE: {
    name: "Cooperative",
    description: "Cooperative factions are known for their cooperative nature.",
  shipDegradeRateMultiplier: 0.8
  },
  TREASURE_HUNTERS: {
    name: "Treasure Hunters",
    description: "Treasure Hunters factions are known for their treasure hunting nature.",
  researchProductionMultiplier: 1.2
  }
};

export const factionTraitNames = Object.keys(
  factionTraits
) as FactionTrait[];
