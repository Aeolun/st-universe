import * as fs from "fs";
import { ExportImportsMap } from "@src/universe/static-data/import-export";
import { format } from "@src/universe/helpers/format";

export enum TradeGood {
  ADVANCED_CIRCUITRY = "ADVANCED_CIRCUITRY",
  AI_MAINFRAMES = "AI_MAINFRAMES",
  ALUMINUM = "ALUMINUM",
  ALUMINUM_ORE = "ALUMINUM_ORE",
  AMMONIA_ICE = "AMMONIA_ICE",
  AMMUNITION = "AMMUNITION",
  ANTIMATTER = "ANTIMATTER",
  ASSAULT_RIFLES = "ASSAULT_RIFLES",
  BIOCOMPOSITES = "BIOCOMPOSITES",
  BOTANICAL_SPECIMENS = "BOTANICAL_SPECIMENS",
  CLOTHING = "CLOTHING",
  COPPER = "COPPER",
  COPPER_ORE = "COPPER_ORE",
  CULTURAL_ARTIFACTS = "CULTURAL_ARTIFACTS",
  CYBER_IMPLANTS = "CYBER_IMPLANTS",
  DIAMONDS = "DIAMONDS",
  DRUGS = "DRUGS",
  ELECTRONICS = "ELECTRONICS",
  EQUIPMENT = "EQUIPMENT",
  EXOTIC_MATTER = "EXOTIC_MATTER",
  EXPLOSIVES = "EXPLOSIVES",
  FAB_MATS = "FAB_MATS",
  FABRICS = "FABRICS",
  FERTILIZERS = "FERTILIZERS",
  FIREARMS = "FIREARMS",
  FOOD = "FOOD",
  FUEL = "FUEL",
  GENE_THERAPEUTICS = "GENE_THERAPEUTICS",
  GOLD = "GOLD",
  GOLD_ORE = "GOLD_ORE",
  GRAVITON_EMITTERS = "GRAVITON_EMITTERS",
  // HEAVY_MACHINERY = "HEAVY_MACHINERY",
  HOLOGRAPHICS = "HOLOGRAPHICS",
  HYDROCARBON = "HYDROCARBON",
  ICE_WATER = "ICE_WATER",
  IRON = "IRON",
  IRON_ORE = "IRON_ORE",
  JEWELRY = "JEWELRY",
  LAB_INSTRUMENTS = "LAB_INSTRUMENTS",
  LASER_RIFLES = "LASER_RIFLES",
  // LIVESTOCK = "LIVESTOCK",
  // LUXURY_GOODS = "LUXURY_GOODS",
  LIQUID_HYDROGEN = "LIQUID_HYDROGEN",
  LIQUID_NITROGEN = "LIQUID_NITROGEN",
  MACHINERY = "MACHINERY",
  MEDICINE = "MEDICINE",
  MICROPROCESSORS = "MICROPROCESSORS",
  MERITIUM = "MERITIUM",
  MERITIUM_ORE = "MERITIUM_ORE",
  MICRO_FUSION_GENERATORS = "MICRO_FUSION_GENERATORS",
  MILITARY_EQUIPMENT = "MILITARY_EQUIPMENT",
  MOOD_REGULATORS = "MOOD_REGULATORS",
  NANOBOTS = "NANOBOTS",
  NEURAL_CHIPS = "NEURAL_CHIPS",
  NOVEL_LIFEFORMS = "NOVEL_LIFEFORMS",
  PLASTICS = "PLASTICS",
  PLATINUM = "PLATINUM",
  PLATINUM_ORE = "PLATINUM_ORE",
  POLYNUCLEOTIDES = "POLYNUCLEOTIDES",
  PRECIOUS_STONES = "PRECIOUS_STONES",
  RELIC_TECH = "RELIC_TECH",
  QUANTUM_STABILIZERS = "QUANTUM_STABILIZERS",
  QUANTUM_DRIVES = "QUANTUM_DRIVES",
  QUARTZ_SAND = "QUARTZ_SAND",
  // RESEARCH_DATA = "RESEARCH_DATA",
  ROBOTIC_DRONES = "ROBOTIC_DRONES",
  SHIP_PARTS = "SHIP_PARTS",
  SHIP_PLATING = "SHIP_PLATING",
  SHIP_SALVAGE = "SHIP_SALVAGE",
  SILICON_CRYSTALS = "SILICON_CRYSTALS",
  SILVER = "SILVER",
  SILVER_ORE = "SILVER_ORE",
  SUPERGRAINS = "SUPERGRAINS",
  URANITE = "URANITE",
  URANITE_ORE = "URANITE_ORE",
  VIRAL_AGENTS = "VIRAL_AGENTS",
  // THERMAL_REGULATORS = "THERMAL_REGULATORS",
  // TOURISTS = "TOURISTS",
  MODULE_CARGO_HOLD_I = "MODULE_CARGO_HOLD_I",
  MODULE_CARGO_HOLD_II = "MODULE_CARGO_HOLD_II",
  MODULE_CARGO_HOLD_III = "MODULE_CARGO_HOLD_III",
  MODULE_CREW_QUARTERS_I = "MODULE_CREW_QUARTERS_I",
  MODULE_WARP_DRIVE_I = "MODULE_WARP_DRIVE_I",
  MODULE_WARP_DRIVE_II = "MODULE_WARP_DRIVE_II",
  MODULE_WARP_DRIVE_III = "MODULE_WARP_DRIVE_III",
  MODULE_JUMP_DRIVE_I = "MODULE_JUMP_DRIVE_I",
  MODULE_JUMP_DRIVE_II = "MODULE_JUMP_DRIVE_II",
  MODULE_JUMP_DRIVE_III = "MODULE_JUMP_DRIVE_III",
  MODULE_GAS_PROCESSOR_I = "MODULE_GAS_PROCESSOR_I",
  MODULE_MINERAL_PROCESSOR_I = "MODULE_MINERAL_PROCESSOR_I",
  MODULE_ENVOY_QUARTERS_I = "MODULE_ENVOY_QUARTERS_I",
  MODULE_SCIENCE_LAB_I = "MODULE_SCIENCE_LAB_I",
  MODULE_PASSENGER_CABIN_I = "MODULE_PASSENGER_CABIN_I",
  MODULE_ORE_REFINERY_I = "MODULE_ORE_REFINERY_I",
  MODULE_FUEL_REFINERY_I = "MODULE_FUEL_REFINERY_I",
  MODULE_MICRO_REFINERY_I = "MODULE_MICRO_REFINERY_I",
  MODULE_SHIELD_GENERATOR_I = "MODULE_SHIELD_GENERATOR_I",
  MODULE_SHIELD_GENERATOR_II = "MODULE_SHIELD_GENERATOR_II",
  MOUNT_GAS_SIPHON_I = "MOUNT_GAS_SIPHON_I",
  MOUNT_GAS_SIPHON_II = "MOUNT_GAS_SIPHON_II",
  MOUNT_GAS_SIPHON_III = "MOUNT_GAS_SIPHON_III",
  MOUNT_SURVEYOR_I = "MOUNT_SURVEYOR_I",
  MOUNT_SURVEYOR_II = "MOUNT_SURVEYOR_II",
  MOUNT_SURVEYOR_III = "MOUNT_SURVEYOR_III",
  MOUNT_SENSOR_ARRAY_I = "MOUNT_SENSOR_ARRAY_I",
  MOUNT_SENSOR_ARRAY_II = "MOUNT_SENSOR_ARRAY_II",
  MOUNT_SENSOR_ARRAY_III = "MOUNT_SENSOR_ARRAY_III",
  MOUNT_MINING_LASER_I = "MOUNT_MINING_LASER_I",
  MOUNT_MINING_LASER_II = "MOUNT_MINING_LASER_II",
  MOUNT_MINING_LASER_III = "MOUNT_MINING_LASER_III",
  MOUNT_LASER_CANNON_I = "MOUNT_LASER_CANNON_I",
  MOUNT_MISSILE_LAUNCHER_I = "MOUNT_MISSILE_LAUNCHER_I",
  MOUNT_TURRET_I = "MOUNT_TURRET_I",
  ENGINE_IMPULSE_DRIVE_I = "ENGINE_IMPULSE_DRIVE_I",
  ENGINE_ION_DRIVE_I = "ENGINE_ION_DRIVE_I",
  ENGINE_ION_DRIVE_II = "ENGINE_ION_DRIVE_II",
  ENGINE_HYPER_DRIVE_I = "ENGINE_HYPER_DRIVE_I",
  FRAME_PROBE = "FRAME_PROBE",
  FRAME_DRONE = "FRAME_DRONE",
  FRAME_INTERCEPTOR = "FRAME_INTERCEPTOR",
  FRAME_RACER = "FRAME_RACER",
  FRAME_FIGHTER = "FRAME_FIGHTER",
  FRAME_FRIGATE = "FRAME_FRIGATE",
  FRAME_SHUTTLE = "FRAME_SHUTTLE",
  FRAME_EXPLORER = "FRAME_EXPLORER",
  FRAME_MINER = "FRAME_MINER",
  FRAME_LIGHT_FREIGHTER = "FRAME_LIGHT_FREIGHTER",
  FRAME_HEAVY_FREIGHTER = "FRAME_HEAVY_FREIGHTER",
  FRAME_TRANSPORT = "FRAME_TRANSPORT",
  FRAME_DESTROYER = "FRAME_DESTROYER",
  FRAME_CRUISER = "FRAME_CRUISER",
  FRAME_CARRIER = "FRAME_CARRIER",
  REACTOR_ANTIMATTER_I = "REACTOR_ANTIMATTER_I",
  REACTOR_CHEMICAL_I = "REACTOR_CHEMICAL_I",
  REACTOR_FISSION_I = "REACTOR_FISSION_I",
  REACTOR_FUSION_I = "REACTOR_FUSION_I",
  REACTOR_SOLAR_I = "REACTOR_SOLAR_I",
  SHIP_PROBE = "SHIP_PROBE",
  SHIP_MINING_DRONE = "SHIP_MINING_DRONE",
  SHIP_SIPHON_DRONE = "SHIP_SIPHON_DRONE",
  SHIP_INTERCEPTOR = "SHIP_INTERCEPTOR",
  SHIP_LIGHT_HAULER = "SHIP_LIGHT_HAULER",
  SHIP_COMMAND_FRIGATE = "SHIP_COMMAND_FRIGATE",
  SHIP_EXPLORER = "SHIP_EXPLORER",
  SHIP_HEAVY_FREIGHTER = "SHIP_HEAVY_FREIGHTER",
  SHIP_LIGHT_SHUTTLE = "SHIP_LIGHT_SHUTTLE",
  SHIP_ORE_HOUND = "SHIP_ORE_HOUND",
  SHIP_REFINING_FREIGHTER = "SHIP_REFINING_FREIGHTER",
  SHIP_SURVEYOR = "SHIP_SURVEYOR",
}

export type TradeGoodKey = keyof typeof TradeGood;

export type Components = Partial<Record<TradeGood, number>>;
type PriceOrComponents =
  | { basePrice: number; level: 1 }
  | {
      components: Components;
      notRecipe: true;
      level: number;
      basePrice: number;
    }
  | {
      basePrice?: number;
      components: Components;
      notRecipe?: undefined | false;
      level?: number;
    };
export type TradeGoodData = {
  symbol: TradeGood;
  baseTradeVolume: number;
  illegal?: boolean;
} & PriceOrComponents;

export const tradeGoods: Record<TradeGood, TradeGoodData> = {
  ASSAULT_RIFLES: {
    symbol: TradeGood.ASSAULT_RIFLES,
    components: {
      ALUMINUM: 3,
      AMMUNITION: 3,
    },
    baseTradeVolume: 10,
  },
  CULTURAL_ARTIFACTS: {
    symbol: TradeGood.CULTURAL_ARTIFACTS,
    components: {
      LAB_INSTRUMENTS: 3,
    },
    baseTradeVolume: 10,
  },
  LASER_RIFLES: {
    symbol: TradeGood.LASER_RIFLES,
    components: {
      DIAMONDS: 3,
      PLATINUM: 3,
      ADVANCED_CIRCUITRY: 3,
    },
    baseTradeVolume: 10,
  },
  NEURAL_CHIPS: {
    symbol: TradeGood.NEURAL_CHIPS,
    components: {
      POLYNUCLEOTIDES: 3,
      ADVANCED_CIRCUITRY: 3,
    },
    baseTradeVolume: 10,
  },
  QUANTUM_STABILIZERS: {
    symbol: TradeGood.QUANTUM_STABILIZERS,
    components: {
      ADVANCED_CIRCUITRY: 3,
      PLATINUM: 3,
      URANITE: 3,
    },
    baseTradeVolume: 10,
  },
  ADVANCED_CIRCUITRY: {
    symbol: TradeGood.ADVANCED_CIRCUITRY,
    components: {
      ELECTRONICS: 3,
      MICROPROCESSORS: 3,
    },
    baseTradeVolume: 10,
  },
  SHIP_PARTS: {
    symbol: TradeGood.SHIP_PARTS,
    components: {
      EQUIPMENT: 3,
      ELECTRONICS: 3,
    },
    baseTradeVolume: 10,
  },
  SHIP_SALVAGE: {
    symbol: TradeGood.SHIP_SALVAGE,
    components: {
      MACHINERY: 3,
    },
    baseTradeVolume: 10,
  },
  SUPERGRAINS: {
    symbol: TradeGood.SUPERGRAINS,
    components: {
      FERTILIZERS: 3,
      POLYNUCLEOTIDES: 3,
      LAB_INSTRUMENTS: 3,
    },
    baseTradeVolume: 10,
  },
  AI_MAINFRAMES: {
    symbol: TradeGood.AI_MAINFRAMES,
    components: {
      ADVANCED_CIRCUITRY: 3,
      MICROPROCESSORS: 3,
    },
    baseTradeVolume: 10,
  },
  ALUMINUM: {
    symbol: TradeGood.ALUMINUM,
    components: {
      ALUMINUM_ORE: 3,
    },
    baseTradeVolume: 1000,
  },
  ALUMINUM_ORE: {
    level: 1,
    symbol: TradeGood.ALUMINUM_ORE,
    basePrice: 53,
    baseTradeVolume: 1000,
  },
  AMMONIA_ICE: {
    level: 1,
    symbol: TradeGood.AMMONIA_ICE,
    basePrice: 42,
    baseTradeVolume: 100,
  },
  AMMUNITION: {
    symbol: TradeGood.AMMUNITION,
    components: {
      IRON: 3,
      LIQUID_NITROGEN: 3,
    },
    baseTradeVolume: 10,
  },
  ANTIMATTER: {
    symbol: TradeGood.ANTIMATTER,
    components: {
      LAB_INSTRUMENTS: 3,
      ADVANCED_CIRCUITRY: 3,
    },
    baseTradeVolume: 1,
  },
  BIOCOMPOSITES: {
    symbol: TradeGood.BIOCOMPOSITES,
    components: {
      POLYNUCLEOTIDES: 3,
      FABRICS: 3,
    },
    baseTradeVolume: 10,
  },
  BOTANICAL_SPECIMENS: {
    symbol: TradeGood.BOTANICAL_SPECIMENS,
    components: {
      LAB_INSTRUMENTS: 3,
      EQUIPMENT: 3,
    },
    baseTradeVolume: 10,
  },
  CLOTHING: {
    symbol: TradeGood.CLOTHING,
    components: {
      FABRICS: 3,
    },
    baseTradeVolume: 10,
  },
  COPPER: {
    symbol: TradeGood.COPPER,
    components: {
      COPPER_ORE: 3,
    },
    baseTradeVolume: 10,
  },
  COPPER_ORE: {
    level: 1,
    symbol: TradeGood.COPPER_ORE,
    basePrice: 69,
    baseTradeVolume: 100,
  },
  CYBER_IMPLANTS: {
    symbol: TradeGood.CYBER_IMPLANTS,
    components: {
      ADVANCED_CIRCUITRY: 3,
      BIOCOMPOSITES: 3,
    },
    baseTradeVolume: 10,
  },
  DIAMONDS: {
    level: 1,
    symbol: TradeGood.DIAMONDS,
    basePrice: 168,
    baseTradeVolume: 10,
  },
  DRUGS: {
    symbol: TradeGood.DRUGS,
    components: {
      AMMONIA_ICE: 3,
      POLYNUCLEOTIDES: 3,
    },
    baseTradeVolume: 10,
    illegal: true,
  },
  ELECTRONICS: {
    symbol: TradeGood.ELECTRONICS,
    components: {
      SILICON_CRYSTALS: 3,
      COPPER: 3,
    },
    baseTradeVolume: 10,
  },
  EQUIPMENT: {
    symbol: TradeGood.EQUIPMENT,
    components: {
      ALUMINUM: 3,
      PLASTICS: 3,
    },
    baseTradeVolume: 10,
  },
  EXOTIC_MATTER: {
    symbol: TradeGood.EXOTIC_MATTER,
    components: {
      LAB_INSTRUMENTS: 3,
      ADVANCED_CIRCUITRY: 3,
    },
    baseTradeVolume: 1,
  },
  EXPLOSIVES: {
    symbol: TradeGood.EXPLOSIVES,
    components: {
      LIQUID_NITROGEN: 3,
      LIQUID_HYDROGEN: 3,
    },
    baseTradeVolume: 10,
  },
  FAB_MATS: {
    symbol: TradeGood.FAB_MATS,
    components: {
      IRON: 3,
      QUARTZ_SAND: 3,
    },
    baseTradeVolume: 10,
  },
  FABRICS: {
    symbol: TradeGood.FABRICS,
    components: {
      FERTILIZERS: 3,
      MACHINERY: 3,
      ICE_WATER: 3,
    },
    baseTradeVolume: 10,
  },
  FERTILIZERS: {
    symbol: TradeGood.FERTILIZERS,
    components: {
      AMMONIA_ICE: 3,
      LIQUID_NITROGEN: 3,
    },
    baseTradeVolume: 10,
  },
  FIREARMS: {
    symbol: TradeGood.FIREARMS,
    components: {
      AMMUNITION: 3,
      IRON: 3,
    },
    baseTradeVolume: 10,
  },
  FOOD: {
    symbol: TradeGood.FOOD,
    components: {
      FERTILIZERS: 3,
      ICE_WATER: 3,
      MACHINERY: 3,
    },
    baseTradeVolume: 1000,
  },
  FUEL: {
    symbol: TradeGood.FUEL,
    components: {
      HYDROCARBON: 3,
    },
    baseTradeVolume: 10,
  },
  GENE_THERAPEUTICS: {
    symbol: TradeGood.GENE_THERAPEUTICS,
    components: {
      POLYNUCLEOTIDES: 3,
      LAB_INSTRUMENTS: 3,
    },
    baseTradeVolume: 10,
  },
  GOLD: {
    symbol: TradeGood.GOLD,
    components: {
      GOLD_ORE: 3,
    },
    baseTradeVolume: 10,
  },
  GOLD_ORE: {
    level: 1,
    symbol: TradeGood.GOLD_ORE,
    basePrice: 220,
    baseTradeVolume: 100,
  },
  GRAVITON_EMITTERS: {
    symbol: TradeGood.GRAVITON_EMITTERS,
    components: {
      ADVANCED_CIRCUITRY: 3,
      MERITIUM: 3,
    },
    baseTradeVolume: 10,
  },
  // HEAVY_MACHINERY: {
  //   symbol: TradeGood.HEAVY_MACHINERY,
  //   components: {
  //     MACHINERY: 2,
  //     IRON: 4,
  //     ELECTRONICS: 2,
  //   },
  //   baseTradeVolume: 10,
  // },
  HOLOGRAPHICS: {
    symbol: TradeGood.HOLOGRAPHICS,
    components: {
      GOLD: 3,
      SILVER: 3,
      ADVANCED_CIRCUITRY: 2,
    },
    baseTradeVolume: 10,
  },
  HYDROCARBON: {
    level: 1,
    symbol: TradeGood.HYDROCARBON,
    basePrice: 22,
    baseTradeVolume: 10,
  },
  ICE_WATER: {
    level: 1,
    symbol: TradeGood.ICE_WATER,
    basePrice: 7,
    baseTradeVolume: 10,
  },
  IRON: {
    symbol: TradeGood.IRON,
    components: {
      IRON_ORE: 3,
    },
    baseTradeVolume: 10,
  },
  IRON_ORE: {
    level: 1,
    symbol: TradeGood.IRON_ORE,
    basePrice: 61,
    baseTradeVolume: 100,
  },
  JEWELRY: {
    symbol: TradeGood.JEWELRY,
    components: {
      PRECIOUS_STONES: 3,
      GOLD: 3,
      SILVER: 3,
      DIAMONDS: 3,
    },
    baseTradeVolume: 10,
  },
  LAB_INSTRUMENTS: {
    symbol: TradeGood.LAB_INSTRUMENTS,
    components: {
      EQUIPMENT: 3,
      ELECTRONICS: 3,
    },
    baseTradeVolume: 10,
  },
  // LIVESTOCK: {
  //   symbol: TradeGood.LIVESTOCK,
  //   components: {
  //     FERTILIZERS: 1,
  //     ICE_WATER: 1,
  //   },
  //   baseTradeVolume: 10,
  // },
  LIQUID_HYDROGEN: {
    symbol: TradeGood.LIQUID_HYDROGEN,
    components: {
      MACHINERY: 1,
    },
    basePrice: 65,
    notRecipe: true,
    level: 1,
    baseTradeVolume: 100,
  },
  LIQUID_NITROGEN: {
    symbol: TradeGood.LIQUID_NITROGEN,
    components: {
      MACHINERY: 1,
    },
    basePrice: 65,
    notRecipe: true,
    level: 1,
    baseTradeVolume: 100,
  },
  // LUXURY_GOODS: {
  //   symbol: TradeGood.LUXURY_GOODS,
  //   components: {
  //     JEWELRY: 1,
  //     HOLOGRAPHICS: 1,
  //   },
  //   baseTradeVolume: 10,
  // },
  MACHINERY: {
    symbol: TradeGood.MACHINERY,
    components: {
      IRON: 3,
      ELECTRONICS: 3,
      ALUMINUM: 3,
    },
    baseTradeVolume: 10,
  },
  MEDICINE: {
    symbol: TradeGood.MEDICINE,
    components: {
      FABRICS: 3,
      POLYNUCLEOTIDES: 3,
    },
    baseTradeVolume: 10,
  },
  MERITIUM: {
    symbol: TradeGood.MERITIUM,
    components: {
      MERITIUM_ORE: 3,
    },
    baseTradeVolume: 10,
  },
  MERITIUM_ORE: {
    level: 1,
    symbol: TradeGood.MERITIUM_ORE,
    basePrice: 1100,
    baseTradeVolume: 100,
  },
  MICROPROCESSORS: {
    symbol: TradeGood.MICROPROCESSORS,
    components: {
      COPPER: 3,
      SILICON_CRYSTALS: 3,
    },
    baseTradeVolume: 100,
  },
  MICRO_FUSION_GENERATORS: {
    symbol: TradeGood.MICRO_FUSION_GENERATORS,
    components: {
      PLATINUM: 3,
      DIAMONDS: 3,
      ADVANCED_CIRCUITRY: 3,
    },
    baseTradeVolume: 10,
  },
  MILITARY_EQUIPMENT: {
    symbol: TradeGood.MILITARY_EQUIPMENT,
    components: {
      ALUMINUM: 3,
      ELECTRONICS: 3,
    },
    baseTradeVolume: 10,
  },
  MOOD_REGULATORS: {
    symbol: TradeGood.MOOD_REGULATORS,
    components: {
      BOTANICAL_SPECIMENS: 3,
      POLYNUCLEOTIDES: 3,
      LAB_INSTRUMENTS: 3,
    },
    baseTradeVolume: 10,
    illegal: true,
  },
  NANOBOTS: {
    symbol: TradeGood.NANOBOTS,
    components: {
      LAB_INSTRUMENTS: 3,
      POLYNUCLEOTIDES: 3,
      DIAMONDS: 3,
    },
    baseTradeVolume: 10,
  },
  // NEURAL_CHIPS: {
  //     basePrice: 1000,
  //     baseTradeVolume: 10,
  // },
  NOVEL_LIFEFORMS: {
    symbol: TradeGood.NOVEL_LIFEFORMS,
    components: {
      LAB_INSTRUMENTS: 3,
      EQUIPMENT: 3,
    },
    baseTradeVolume: 10,
  },
  // NUCLEAR_DEVICES: {
  //     basePrice: 1000,
  //     baseTradeVolume: 10,
  // },
  PLASTICS: {
    symbol: TradeGood.PLASTICS,
    components: {
      LIQUID_HYDROGEN: 3,
    },
    baseTradeVolume: 10,
  },
  PLATINUM: {
    symbol: TradeGood.PLATINUM,
    components: {
      PLATINUM_ORE: 3,
    },
    baseTradeVolume: 10,
  },
  PLATINUM_ORE: {
    level: 1,
    symbol: TradeGood.PLATINUM_ORE,
    basePrice: 220,
    baseTradeVolume: 100,
  },
  POLYNUCLEOTIDES: {
    symbol: TradeGood.POLYNUCLEOTIDES,
    components: {
      LIQUID_HYDROGEN: 3,
      LIQUID_NITROGEN: 3,
    },
    baseTradeVolume: 10,
  },
  PRECIOUS_STONES: {
    level: 1,
    symbol: TradeGood.PRECIOUS_STONES,
    basePrice: 77,
    baseTradeVolume: 10,
  },
  RELIC_TECH: {
    symbol: TradeGood.RELIC_TECH,
    components: {
      LAB_INSTRUMENTS: 3,
      MACHINERY: 3,
      ELECTRONICS: 3,
      PLASTICS: 3,
      EQUIPMENT: 3,
    },
    baseTradeVolume: 10,
  },
  QUANTUM_DRIVES: {
    symbol: TradeGood.QUANTUM_DRIVES,
    components: {
      ADVANCED_CIRCUITRY: 3,
      URANITE: 3,
    },
    baseTradeVolume: 10,
  },
  QUARTZ_SAND: {
    level: 1,
    symbol: TradeGood.QUARTZ_SAND,
    basePrice: 13,
    baseTradeVolume: 10,
  },
  // RADIOACTIVE_WASTE: {
  //     basePrice: 1000,
  //     baseTradeVolume: 10,
  // },
  // RESEARCH_DATA: {
  //   symbol: TradeGood.RESEARCH_DATA,
  //   components: {
  //     LAB_INSTRUMENTS: 1,
  //     ADVANCED_CIRCUITRY: 1,
  //   },
  //   baseTradeVolume: 10,
  // },
  ROBOTIC_DRONES: {
    symbol: TradeGood.ROBOTIC_DRONES,
    components: {
      ADVANCED_CIRCUITRY: 3,
      ALUMINUM: 3,
      ELECTRONICS: 3,
      PLASTICS: 3,
    },
    baseTradeVolume: 10,
  },
  SHIP_PLATING: {
    symbol: TradeGood.SHIP_PLATING,
    components: {
      ALUMINUM: 3,
      MACHINERY: 3,
    },
    baseTradeVolume: 100,
  },
  SILICON_CRYSTALS: {
    level: 1,
    symbol: TradeGood.SILICON_CRYSTALS,
    basePrice: 49,
    baseTradeVolume: 100,
  },
  SILVER: {
    symbol: TradeGood.SILVER,
    components: {
      SILVER_ORE: 3,
    },
    baseTradeVolume: 10,
  },
  SILVER_ORE: {
    level: 1,
    symbol: TradeGood.SILVER_ORE,
    basePrice: 158,
    baseTradeVolume: 100,
  },
  // SLAVES: {
  //     basePrice: 1000,
  //     baseTradeVolume: 10,
  // },
  // SPICES: {
  //     basePrice: 1000,
  //     baseTradeVolume: 10,
  // },
  // STIMULANTS: {
  //     basePrice: 1000,
  //     illegal: true,
  //     baseTradeVolume: 10,
  // },
  // SUPERCONDUCTORS: {
  //     basePrice: 1000,
  //     baseTradeVolume: 10,
  // },
  URANITE: {
    symbol: TradeGood.URANITE,
    components: {
      URANITE_ORE: 3,
    },
    baseTradeVolume: 10,
  },
  URANITE_ORE: {
    level: 1,
    symbol: TradeGood.URANITE_ORE,
    basePrice: 300,
    baseTradeVolume: 100,
  },
  VIRAL_AGENTS: {
    symbol: TradeGood.VIRAL_AGENTS,
    components: {
      POLYNUCLEOTIDES: 3,
      LAB_INSTRUMENTS: 3,
    },
    baseTradeVolume: 10,
  },
  // THERMAL_REGULATORS: {
  //   symbol: TradeGood.THERMAL_REGULATORS,
  //   components: {
  //     MACHINERY: 1,
  //     ELECTRONICS: 1,
  //   },
  //   baseTradeVolume: 10,
  // },
  // TOURISTS: {
  //   symbol: TradeGood.TOURISTS,
  //   basePrice: 1200,
  //   baseTradeVolume: 10,
  // },
  FRAME_PROBE: {
    symbol: TradeGood.FRAME_PROBE,
    components: {
      SHIP_PLATING: 2,
      SHIP_PARTS: 3,
    },

    baseTradeVolume: 1,
  },
  FRAME_DRONE: {
    symbol: TradeGood.FRAME_DRONE,
    components: {
      SHIP_PLATING: 2,
      SHIP_PARTS: 2,
    },

    baseTradeVolume: 1,
  },
  FRAME_INTERCEPTOR: {
    symbol: TradeGood.FRAME_INTERCEPTOR,
    components: {
      SHIP_PLATING: 5,
      SHIP_PARTS: 10,
    },

    baseTradeVolume: 1,
  },
  FRAME_RACER: {
    symbol: TradeGood.FRAME_RACER,
    components: {
      SHIP_PLATING: 4,
      SHIP_PARTS: 10,
    },

    baseTradeVolume: 1,
  },
  FRAME_FIGHTER: {
    symbol: TradeGood.FRAME_FIGHTER,
    components: {
      SHIP_PLATING: 3,
      SHIP_PARTS: 10,
    },

    baseTradeVolume: 1,
  },
  FRAME_FRIGATE: {
    symbol: TradeGood.FRAME_FRIGATE,
    components: {
      SHIP_PLATING: 15,
      SHIP_PARTS: 10,
    },

    baseTradeVolume: 1,
  },
  FRAME_SHUTTLE: {
    symbol: TradeGood.FRAME_SHUTTLE,
    components: {
      SHIP_PLATING: 3,
      SHIP_PARTS: 10,
    },

    baseTradeVolume: 1,
  },
  FRAME_EXPLORER: {
    symbol: TradeGood.FRAME_EXPLORER,
    components: {
      SHIP_PLATING: 16,
      SHIP_PARTS: 10,
    },
    baseTradeVolume: 1,
  },
  FRAME_MINER: {
    symbol: TradeGood.FRAME_MINER,
    components: {
      SHIP_PLATING: 5,
      SHIP_PARTS: 10,
    },

    baseTradeVolume: 1,
  },
  FRAME_LIGHT_FREIGHTER: {
    symbol: TradeGood.FRAME_LIGHT_FREIGHTER,
    components: {
      SHIP_PLATING: 12,
      SHIP_PARTS: 10,
    },

    baseTradeVolume: 1,
  },
  FRAME_HEAVY_FREIGHTER: {
    symbol: TradeGood.FRAME_HEAVY_FREIGHTER,
    components: {
      SHIP_PLATING: 65,
      SHIP_PARTS: 10,
    },

    baseTradeVolume: 1,
  },
  FRAME_TRANSPORT: {
    symbol: TradeGood.FRAME_TRANSPORT,
    components: {
      SHIP_PLATING: 7,
      SHIP_PARTS: 10,
    },

    baseTradeVolume: 1,
  },
  FRAME_DESTROYER: {
    symbol: TradeGood.FRAME_DESTROYER,
    components: {
      SHIP_PLATING: 20,
      SHIP_PARTS: 10,
    },

    baseTradeVolume: 1,
  },
  FRAME_CRUISER: {
    symbol: TradeGood.FRAME_CRUISER,
    components: {
      SHIP_PLATING: 40,
      SHIP_PARTS: 10,
    },

    baseTradeVolume: 1,
  },
  // FRAME_BATTLESHIP: {
  //     symbol: TradeGood.FRAME_BATTLESHIP,
  //     components: {
  //         SHIP_PLATING: 80
  //     },
  //
  //     baseTradeVolume: 1
  // },
  // FRAME_DREADNOUGHT: {
  //     symbol: TradeGood.FRAME_DREADNOUGHT,
  //     components: {
  //         SHIP_PLATING: 160
  //     },
  //
  //     baseTradeVolume: 1
  // },
  // FRAME_TITAN: {
  //     symbol: TradeGood.FRAME_TITAN,
  //     components: {
  //         SHIP_PLATING: 500
  //     },
  //
  //     baseTradeVolume: 1
  // },
  // FRAME_LEVIATHAN: {
  //     symbol: TradeGood.FRAME_LEVIATHAN,
  //     components: {
  //         SHIP_PLATING: 1250
  //     },
  //
  //     baseTradeVolume: 1
  // },
  FRAME_CARRIER: {
    symbol: TradeGood.FRAME_CARRIER,
    components: {
      SHIP_PLATING: 160,
      SHIP_PARTS: 10,
    },

    baseTradeVolume: 1,
  },
  // FRAME_FLEET_CARRIER: {
  //     symbol: TradeGood.FRAME_FLEET_CARRIER,
  //     components: {
  //         SHIP_PLATING: 320
  //     },
  //
  //     baseTradeVolume: 1
  // },
  // FRAME_MOTHERSHIP: {
  //     symbol: TradeGood.FRAME_MOTHERSHIP,
  //     components: {
  //         SHIP_PLATING: 800
  //     },
  //
  //     baseTradeVolume: 1
  // },
  // FRAME_STARBASE: {
  //     symbol: TradeGood.FRAME_STARBASE,
  //     components: {
  //         SHIP_PLATING: 3000
  //     },
  //
  //     baseTradeVolume: 1
  // },
  // FRAME_STATION: {
  //     symbol: TradeGood.FRAME_STATION,
  //     components: {
  //         SHIP_PLATING: 1000
  //     },
  //
  //     baseTradeVolume: 1
  // },
  ENGINE_IMPULSE_DRIVE_I: {
    symbol: TradeGood.ENGINE_IMPULSE_DRIVE_I,
    components: {
      IRON: 12,
      MACHINERY: 4,
    },

    baseTradeVolume: 1,
  },
  ENGINE_ION_DRIVE_I: {
    symbol: TradeGood.ENGINE_ION_DRIVE_I,
    components: {
      MACHINERY: 6,
      IRON: 12,
    },

    baseTradeVolume: 1,
  },
  ENGINE_ION_DRIVE_II: {
    symbol: TradeGood.ENGINE_ION_DRIVE_II,
    components: {
      ADVANCED_CIRCUITRY: 10,
      PLATINUM: 40,
    },
    baseTradeVolume: 1,
  },
  MODULE_CARGO_HOLD_I: {
    symbol: TradeGood.MODULE_CARGO_HOLD_I,
    components: {
      IRON: 10,
      MACHINERY: 4,
      FABRICS: 4,
    },
    baseTradeVolume: 1,
  },
  MODULE_CREW_QUARTERS_I: {
    symbol: TradeGood.MODULE_CREW_QUARTERS_I,
    components: {
      IRON: 20,
      MACHINERY: 4,
      FABRICS: 30,
    },
    baseTradeVolume: 1,
  },
  MODULE_WARP_DRIVE_I: {
    symbol: TradeGood.MODULE_WARP_DRIVE_I,
    components: {
      IRON: 1,
      ADVANCED_CIRCUITRY: 1,
    },

    baseTradeVolume: 1,
  },
  MODULE_WARP_DRIVE_II: {
    symbol: TradeGood.MODULE_WARP_DRIVE_II,
    components: {
      PLATINUM: 3,
      URANITE: 3,
      ADVANCED_CIRCUITRY: 1,
    },

    baseTradeVolume: 1,
  },
  MODULE_WARP_DRIVE_III: {
    symbol: TradeGood.MODULE_WARP_DRIVE_III,
    components: {
      MERITIUM: 6,
      PLATINUM: 3,
      ADVANCED_CIRCUITRY: 3,
    },
    baseTradeVolume: 1,
  },
  MODULE_JUMP_DRIVE_I: {
    symbol: TradeGood.MODULE_JUMP_DRIVE_I,
    components: {
      ADVANCED_CIRCUITRY: 10,
      IRON: 30,
    },
    baseTradeVolume: 1,
  },
  MODULE_JUMP_DRIVE_II: {
    symbol: TradeGood.MODULE_JUMP_DRIVE_II,
    components: {
      GOLD: 10,
      ADVANCED_CIRCUITRY: 50,
      PLATINUM: 10,
    },
    baseTradeVolume: 1,
  },
  MODULE_JUMP_DRIVE_III: {
    symbol: TradeGood.MODULE_JUMP_DRIVE_III,
    components: {
      GOLD: 200,
      ADVANCED_CIRCUITRY: 200,
      PLATINUM: 200,
      MERITIUM: 200,
    },
    baseTradeVolume: 1,
  },
  MODULE_MINERAL_PROCESSOR_I: {
    symbol: TradeGood.MODULE_MINERAL_PROCESSOR_I,
    components: {
      MACHINERY: 4,
      IRON: 10,
    },
    baseTradeVolume: 1,
  },
  MODULE_ENVOY_QUARTERS_I: {
    symbol: TradeGood.MODULE_ENVOY_QUARTERS_I,
    components: {
      IRON: 40,
      MACHINERY: 2,
      FABRICS: 40,
    },
    baseTradeVolume: 1,
  },
  MODULE_SCIENCE_LAB_I: {
    symbol: TradeGood.MODULE_SCIENCE_LAB_I,
    components: {
      PLATINUM: 10,
      ADVANCED_CIRCUITRY: 3,
      MACHINERY: 10,
    },
    baseTradeVolume: 1,
  },
  MODULE_PASSENGER_CABIN_I: {
    symbol: TradeGood.MODULE_PASSENGER_CABIN_I,
    components: {
      IRON: 20,
      MACHINERY: 2,
      FABRICS: 40,
    },

    baseTradeVolume: 1,
  },
  MODULE_ORE_REFINERY_I: {
    symbol: TradeGood.MODULE_ORE_REFINERY_I,
    components: {
      PLATINUM: 3,
      MACHINERY: 16,
    },

    baseTradeVolume: 1,
  },
  MODULE_SHIELD_GENERATOR_I: {
    symbol: TradeGood.MODULE_SHIELD_GENERATOR_I,
    components: {
      IRON: 40,
      URANITE: 4,
      MACHINERY: 10,
    },

    baseTradeVolume: 1,
  },
  MODULE_SHIELD_GENERATOR_II: {
    symbol: TradeGood.MODULE_SHIELD_GENERATOR_II,
    components: {
      ALUMINUM: 80,
      URANITE: 8,
      MACHINERY: 10,
    },

    baseTradeVolume: 1,
  },
  MOUNT_GAS_SIPHON_I: {
    symbol: TradeGood.MOUNT_GAS_SIPHON_I,
    components: {
      MACHINERY: 1,
      DIAMONDS: 1,
      ELECTRONICS: 1,
      IRON: 4,
    },

    baseTradeVolume: 1,
  },
  MOUNT_GAS_SIPHON_II: {
    symbol: TradeGood.MOUNT_GAS_SIPHON_II,
    components: {
      ALUMINUM: 30,
      MACHINERY: 20,
    },

    baseTradeVolume: 1,
  },
  MOUNT_GAS_SIPHON_III: {
    symbol: TradeGood.MOUNT_GAS_SIPHON_III,
    components: {
      PLATINUM: 60,
      MACHINERY: 60,
      ADVANCED_CIRCUITRY: 10,
    },

    baseTradeVolume: 1,
  },
  MOUNT_SURVEYOR_I: {
    symbol: TradeGood.MOUNT_SURVEYOR_I,
    components: {
      IRON: 10,
      MACHINERY: 1,
      ELECTRONICS: 2,
      DIAMONDS: 1,
    },

    baseTradeVolume: 1,
  },
  MOUNT_SURVEYOR_II: {
    symbol: TradeGood.MOUNT_SURVEYOR_II,
    components: {
      ALUMINUM: 40,
      MACHINERY: 20,
      ELECTRONICS: 20,
    },

    baseTradeVolume: 1,
  },
  MOUNT_SURVEYOR_III: {
    symbol: TradeGood.MOUNT_SURVEYOR_III,
    components: {
      PLATINUM: 160,
      MACHINERY: 80,
      ADVANCED_CIRCUITRY: 30,
    },

    baseTradeVolume: 1,
  },
  MOUNT_SENSOR_ARRAY_I: {
    symbol: TradeGood.MOUNT_SENSOR_ARRAY_I,
    components: {
      IRON: 6,
      MACHINERY: 1,
      ELECTRONICS: 1,
    },

    baseTradeVolume: 1,
  },
  MOUNT_SENSOR_ARRAY_II: {
    symbol: TradeGood.MOUNT_SENSOR_ARRAY_II,
    components: {
      ALUMINUM: 25,
      MACHINERY: 10,
      ELECTRONICS: 20,
    },

    baseTradeVolume: 1,
  },
  MOUNT_SENSOR_ARRAY_III: {
    symbol: TradeGood.MOUNT_SENSOR_ARRAY_III,
    components: {
      PLATINUM: 100,
      MACHINERY: 40,
      ADVANCED_CIRCUITRY: 80,
      URANITE: 20,
    },

    baseTradeVolume: 1,
  },
  MOUNT_MINING_LASER_I: {
    symbol: TradeGood.MOUNT_MINING_LASER_I,
    components: {
      IRON: 6,
      MACHINERY: 1,
      DIAMONDS: 1,
    },

    baseTradeVolume: 1,
  },
  MOUNT_MINING_LASER_II: {
    symbol: TradeGood.MOUNT_MINING_LASER_II,
    components: {
      ALUMINUM: 20,
      MACHINERY: 10,
      DIAMONDS: 10,
    },

    baseTradeVolume: 1,
  },
  MOUNT_MINING_LASER_III: {
    symbol: TradeGood.MOUNT_MINING_LASER_III,
    components: {
      PLATINUM: 100,
      MACHINERY: 50,
      ADVANCED_CIRCUITRY: 10,
      URANITE: 10,
    },

    baseTradeVolume: 1,
  },
  MOUNT_LASER_CANNON_I: {
    symbol: TradeGood.MOUNT_LASER_CANNON_I,
    components: {
      MACHINERY: 4,
      IRON: 16,
      DIAMONDS: 1,
    },

    baseTradeVolume: 1,
  },
  MOUNT_MISSILE_LAUNCHER_I: {
    symbol: TradeGood.MOUNT_MISSILE_LAUNCHER_I,
    components: {
      MACHINERY: 4,
      IRON: 16,
    },

    baseTradeVolume: 1,
  },
  MOUNT_TURRET_I: {
    symbol: TradeGood.MOUNT_TURRET_I,
    components: {
      MACHINERY: 4,
      IRON: 10,
    },

    baseTradeVolume: 1,
  },
  REACTOR_CHEMICAL_I: {
    symbol: TradeGood.REACTOR_CHEMICAL_I,
    components: {
      IRON: 10,
      MACHINERY: 6,
    },

    baseTradeVolume: 1,
  },
  REACTOR_FISSION_I: {
    symbol: TradeGood.REACTOR_FISSION_I,
    components: {
      IRON: 20,
      MACHINERY: 20,
    },

    baseTradeVolume: 1,
  },
  REACTOR_FUSION_I: {
    symbol: TradeGood.REACTOR_FUSION_I,
    components: {
      IRON: 20,
      MACHINERY: 16,
    },

    baseTradeVolume: 1,
  },
  REACTOR_SOLAR_I: {
    symbol: TradeGood.REACTOR_SOLAR_I,
    components: {
      IRON: 20,
      MACHINERY: 2,
    },
    baseTradeVolume: 1,
  },
  REACTOR_ANTIMATTER_I: {
    symbol: TradeGood.REACTOR_ANTIMATTER_I,
    components: {
      IRON: 30,
      MACHINERY: 10,
    },
    baseTradeVolume: 1,
  },
  MODULE_CARGO_HOLD_II: {
    symbol: TradeGood.MODULE_CARGO_HOLD_II,
    components: {
      ALUMINUM: 10,
      MACHINERY: 4,
    },
    baseTradeVolume: 1,
  },
  MODULE_CARGO_HOLD_III: {
    symbol: TradeGood.MODULE_CARGO_HOLD_III,
    components: {
      PLATINUM: 40,
      MACHINERY: 16,
      ADVANCED_CIRCUITRY: 1,
    },
    baseTradeVolume: 1,
  },
  ENGINE_HYPER_DRIVE_I: {
    symbol: TradeGood.ENGINE_HYPER_DRIVE_I,
    components: {
      PLATINUM: 1,
      ADVANCED_CIRCUITRY: 1,
    },
    baseTradeVolume: 1,
  },
  MODULE_FUEL_REFINERY_I: {
    symbol: TradeGood.MODULE_FUEL_REFINERY_I,
    components: {
      PLATINUM: 10,
      MACHINERY: 16,
    },
    baseTradeVolume: 1,
  },
  MODULE_GAS_PROCESSOR_I: {
    symbol: TradeGood.MODULE_GAS_PROCESSOR_I,
    components: {
      IRON: 1,
      MACHINERY: 1,
    },
    baseTradeVolume: 1,
  },
  MODULE_MICRO_REFINERY_I: {
    symbol: TradeGood.MODULE_MICRO_REFINERY_I,
    components: {
      PLATINUM: 1,
      MACHINERY: 1,
    },
    baseTradeVolume: 1,
  },
  SHIP_COMMAND_FRIGATE: {
    symbol: TradeGood.SHIP_COMMAND_FRIGATE,
    components: {
      SHIP_PARTS: 1,
      SHIP_PLATING: 1,
    },
    baseTradeVolume: 1,
  },
  SHIP_EXPLORER: {
    symbol: TradeGood.SHIP_EXPLORER,
    components: {
      SHIP_PARTS: 1,
      SHIP_PLATING: 1,
    },
    baseTradeVolume: 1,
  },
  SHIP_HEAVY_FREIGHTER: {
    symbol: TradeGood.SHIP_HEAVY_FREIGHTER,
    components: {
      SHIP_PARTS: 1,
      SHIP_PLATING: 1,
    },
    baseTradeVolume: 1,
  },
  SHIP_INTERCEPTOR: {
    symbol: TradeGood.SHIP_INTERCEPTOR,
    components: {
      SHIP_PARTS: 1,
      SHIP_PLATING: 1,
    },
    baseTradeVolume: 1,
  },
  SHIP_LIGHT_HAULER: {
    symbol: TradeGood.SHIP_LIGHT_HAULER,
    components: {
      SHIP_PARTS: 1,
      SHIP_PLATING: 1,
    },
    baseTradeVolume: 1,
  },
  SHIP_LIGHT_SHUTTLE: {
    symbol: TradeGood.SHIP_LIGHT_SHUTTLE,
    components: {
      SHIP_PARTS: 1,
      SHIP_PLATING: 1,
    },
    baseTradeVolume: 1,
  },
  SHIP_MINING_DRONE: {
    symbol: TradeGood.SHIP_MINING_DRONE,
    components: {
      SHIP_PARTS: 1,
      SHIP_PLATING: 1,
    },
    baseTradeVolume: 1,
  },
  SHIP_ORE_HOUND: {
    symbol: TradeGood.SHIP_ORE_HOUND,
    components: {
      SHIP_PARTS: 1,
      SHIP_PLATING: 1,
    },
    baseTradeVolume: 1,
  },
  SHIP_PROBE: {
    symbol: TradeGood.SHIP_PROBE,
    components: {
      SHIP_PARTS: 1,
      SHIP_PLATING: 1,
    },
    baseTradeVolume: 1,
  },
  SHIP_SURVEYOR: {
    symbol: TradeGood.SHIP_SURVEYOR,
    components: {
      SHIP_PARTS: 1,
      SHIP_PLATING: 1,
    },
    baseTradeVolume: 1,
  },
  SHIP_REFINING_FREIGHTER: {
    symbol: TradeGood.SHIP_REFINING_FREIGHTER,
    components: {
      SHIP_PARTS: 1,
      SHIP_PLATING: 1,
    },
    baseTradeVolume: 1,
  },
  SHIP_SIPHON_DRONE: {
    symbol: TradeGood.SHIP_SIPHON_DRONE,
    components: {
      SHIP_PARTS: 1,
      SHIP_PLATING: 1,
    },
    baseTradeVolume: 1,
  },
};

const markupForValueAdd = 1.2;

const goodList = [];
Object.keys(tradeGoods).forEach((tg) => {
  const good = tradeGoods[tg as TradeGood];
  if (good.level === 1) {
    goodList.push(good);
  }
});

const getBasePrice = (good: TradeGoodData, parents: TradeGood[] = []) => {
  if (!good.basePrice && "components" in good) {
    const components = good.components;

    const iterate = Array.isArray(components) ? components : [components];
    const prices: number[] = [];
    let maxLevel: number = 1;

    for (const components of iterate) {
      for (const component of Object.keys(components)) {
        if (parents.includes(component as TradeGood)) {
          throw new Error(
            `Circular dependency detected: ${parents.join(
              " -> "
            )} -> ${component}`
          );
        }
        getBasePrice(tradeGoods[component as TradeGood], [
          ...parents,
          good.symbol,
        ]);
      }
      prices.push(
        Object.keys(components).reduce((currentTotal, tradeGood) => {
          const component = tradeGoods[tradeGood as TradeGood];
          if (component.level && component.level > maxLevel) {
            maxLevel = component.level;
          }
          const nr = components[tradeGood as TradeGood];
          if (component.basePrice && nr) {
            return currentTotal + component.basePrice * nr * markupForValueAdd;
          }
          return currentTotal;
        }, 0)
      );
    }

    const productionVolume = 1;
    if (!good.notRecipe) {
      good.basePrice = Math.round(
        prices.reduce((total, price) => total + price, 0) /
          prices.length /
          productionVolume
      );
      good.level = maxLevel + 1;

      goodList.push(good);
    }

    if (prices.length > 1 && prices.some((p) => p !== good.basePrice)) {
      console.log(`! Multiple different prices for ${good.symbol}: ${prices}`);
    }
  }
  return good;
};

Object.keys(tradeGoods).forEach((tg) => {
  const good = tradeGoods[tg as TradeGood];
  getBasePrice(good);
  if (
    "components" in good &&
    !ExportImportsMap[tg as TradeGood].every((e) =>
      Object.keys(good.components).includes(e)
    )
  ) {
    console.log("======= Missing import/export for", tg);
  }
});

goodList.sort((a, b) => {
  if (a.level !== b.level) {
    return a.level - b.level;
  }
  return a.basePrice - b.basePrice;
});
goodList.forEach((good) => {
  console.log(
    `LEVEL ${good.level}: ${good.symbol} ${
      "components" in good
        ? `| ${Object.keys(good.components).join(", ")}`
        : "| No components"
    } | ${format.format(good.basePrice)}`
  );
});

fs.writeFileSync("tradeGoods.json", JSON.stringify(tradeGoods, null, 2));

export const tradeGoodTypeNames = Object.keys(tradeGoods) as TradeGood[];
