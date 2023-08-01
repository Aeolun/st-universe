import { Module } from "src/universe/static-data/ship-modules";
import { Mount } from "src/universe/static-data/ship-mounts";
import { Engine } from "src/universe/static-data/ship-engines";
import { Frame } from "src/universe/static-data/ship-frames";
import { Reactor } from "src/universe/static-data/ship-reactors";

export enum TradeGood {
  ADVANCED_CIRCUITRY = "ADVANCED_CIRCUITRY",
  AI_MAINFRAMES = "AI_MAINFRAMES",
  ALUMINUM = "ALUMINUM",
  ALUMINUM_ORE = "ALUMINUM_ORE",
  AMMONIA_ICE = "AMMONIA_ICE",
  AMMUNITION = "AMMUNITION",
  ANTIMATTER = "ANTIMATTER",
  BIOCOMPOSITES = "BIOCOMPOSITES",
  BOTANICAL_SPECIMENS = "BOTANICAL_SPECIMENS",
  CLOTHING = "CLOTHING",
  COPPER = "COPPER",
  COPPER_ORE = "COPPER_ORE",
  CYBERNETIC_IMPLANTS = "CYBERNETIC_IMPLANTS",
  DIAMONDS = "DIAMONDS",
  DRUGS = "DRUGS",
  ELECTRONICS = "ELECTRONICS",
  EQUIPMENT = "EQUIPMENT",
  EXOTIC_MATTER = "EXOTIC_MATTER",
  EXPLOSIVES = "EXPLOSIVES",
  FABRICS = "FABRICS",
  FERTILIZERS = "FERTILIZERS",
  FIREARMS = "FIREARMS",
  FOOD = "FOOD",
  FUEL = "FUEL",
  GENETHERAPEUTICS = "GENETHERAPEUTICS",
  GOLD = "GOLD",
  GOLD_ORE = "GOLD_ORE",
  GRAVITON_EMITTERS = "GRAVITON_EMITTERS",
  HEAVY_MACHINERY = "HEAVY_MACHINERY",
  HOLOGRAPHICS = "HOLOGRAPHICS",
  HYDROCARBONS = "HYDROCARBONS",
  ICE_WATER = "ICE_WATER",
  IRON = "IRON",
  IRON_ORE = "IRON_ORE",
  JEWELRY = "JEWELRY",
  LAB_INSTRUMENTS = "LAB_INSTRUMENTS",
  LIVESTOCK = "LIVESTOCK",
  LUXURY_GOODS = "LUXURY_GOODS",
  LIQUID_NITROGEN = "LIQUID_NITROGEN",
  MACHINERY = "MACHINERY",
  MEDICAL_SUPPLIES = "MEDICAL_SUPPLIES",
  MICROPROCESSORS = "MICROPROCESSORS",
  MERITIUM = "MERITIUM",
  MERITIUM_ORE = "MERITIUM_ORE",
  FUSION_GENERATORS = "FUSION_GENERATORS",
  MILITARY_EQUIPMENT = "MILITARY_EQUIPMENT",
  MOOD_REGULATORS = "MOOD_REGULATORS",
  NANOBOTS = "NANOBOTS",
  NOVEL_LIFEFORMS = "NOVEL_LIFEFORMS",
  PLASTICS = "PLASTICS",
  PLATINUM = "PLATINUM",
  PLATINUM_ORE = "PLATINUM_ORE",
  POLYNUCLEOTIDES = "POLYNUCLEOTIDES",
  PRECIOUS_STONES = "PRECIOUS_STONES",
  RELIC_TECH = "RELIC_TECH",
  QUANTUM_DRIVES = "QUANTUM_DRIVES",
  QUARTZ_SAND = "QUARTZ_SAND",
  RESEARCH_DATA = "RESEARCH_DATA",
  ROBOTIC_DRONES = "ROBOTIC_DRONES",
  SHIP_PLATING = "SHIP_PLATING",
  SILICON_CRYSTALS = "SILICON_CRYSTALS",
  SILVER = "SILVER",
  SILVER_ORE = "SILVER_ORE",
  URANITE = "URANITE",
  URANITE_ORE = "URANITE_ORE",
  VIRAL_AGENTS = "VIRAL_AGENTS",
  THERMAL_REGULATORS = "THERMAL_REGULATORS",
  TOURISTS = "TOURISTS",
  MODULE_CARGO_HOLD_I = "MODULE_CARGO_HOLD_I",
  MODULE_CREW_QUARTERS_I = "MODULE_CREW_QUARTERS_I",
  MODULE_WARP_DRIVE_I = "MODULE_WARP_DRIVE_I",
  MODULE_WARP_DRIVE_II = "MODULE_WARP_DRIVE_II",
  MODULE_WARP_DRIVE_III = "MODULE_WARP_DRIVE_III",
  MODULE_JUMP_DRIVE_I = "MODULE_JUMP_DRIVE_I",
  MODULE_JUMP_DRIVE_II = "MODULE_JUMP_DRIVE_II",
  MODULE_JUMP_DRIVE_III = "MODULE_JUMP_DRIVE_III",
  MODULE_MINERAL_PROCESSOR_I = "MODULE_MINERAL_PROCESSOR_I",
  MODULE_ENVOY_QUARTERS_I = "MODULE_ENVOY_QUARTERS_I",
  MODULE_SCIENCE_LAB_I = "MODULE_SCIENCE_LAB_I",
  MODULE_PASSENGER_CABIN_I = "MODULE_PASSENGER_CABIN_I",
  MODULE_ORE_REFINERY_I = "MODULE_ORE_REFINERY_I",
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
  REACTOR_CHEMICAL_I = "REACTOR_CHEMICAL_I",
  REACTOR_FISSION_I = "REACTOR_FISSION_I",
  REACTOR_FUSION_I = "REACTOR_FUSION_I",
  REACTOR_SOLAR_I = "REACTOR_SOLAR_I",
}

type Components = Partial<Record<TradeGood, number>>;
type PriceOrComponents =
  | { basePrice: number }
  | { basePrice?: number; components: Components; productionVolume?: number };
export type TradeGoodData = {
  symbol: TradeGood;
  baseTradeVolume: number;
  illegal?: boolean;
} & PriceOrComponents;

export const tradeGoods: Record<TradeGood, TradeGoodData> = {
  ADVANCED_CIRCUITRY: {
    symbol: TradeGood.ADVANCED_CIRCUITRY,
    components: {
      ELECTRONICS: 3,
      MICROPROCESSORS: 2,
    },
    baseTradeVolume: 10,
  },
  AI_MAINFRAMES: {
    symbol: TradeGood.AI_MAINFRAMES,
    components: {
      ADVANCED_CIRCUITRY: 10,
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
    symbol: TradeGood.ALUMINUM_ORE,
    basePrice: 48,
    baseTradeVolume: 1000,
  },
  AMMONIA_ICE: {
    symbol: TradeGood.AMMONIA_ICE,
    basePrice: 42,
    baseTradeVolume: 100,
  },
  AMMUNITION: {
    symbol: TradeGood.AMMUNITION,
    components: {
      COPPER: 1,
      IRON: 1,
      LIQUID_NITROGEN: 2,
    },
    productionVolume: 2,
    baseTradeVolume: 10,
  },
  ANTIMATTER: {
    symbol: TradeGood.ANTIMATTER,
    components: {
      LAB_INSTRUMENTS: 3,
    },
    productionVolume: 4,
    baseTradeVolume: 1,
  },
  BIOCOMPOSITES: {
    symbol: TradeGood.BIOCOMPOSITES,
    components: {
      LAB_INSTRUMENTS: 1,
      POLYNUCLEOTIDES: 2,
      FABRICS: 3,
    },
    productionVolume: 3,
    baseTradeVolume: 10,
  },
  BOTANICAL_SPECIMENS: {
    symbol: TradeGood.BOTANICAL_SPECIMENS,
    components: {
      LAB_INSTRUMENTS: 1,
      ICE_WATER: 10,
      FOOD: 1,
      MACHINERY: 1,
      ELECTRONICS: 1,
    },
    productionVolume: 4,
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
    symbol: TradeGood.COPPER_ORE,
    basePrice: 53,
    baseTradeVolume: 100,
  },
  CYBERNETIC_IMPLANTS: {
    symbol: TradeGood.CYBERNETIC_IMPLANTS,
    components: {
      POLYNUCLEOTIDES: 1,
      BIOCOMPOSITES: 1,
      MICROPROCESSORS: 1,
    },
    baseTradeVolume: 10,
  },
  DIAMONDS: {
    symbol: TradeGood.DIAMONDS,
    basePrice: 465,
    baseTradeVolume: 10,
  },
  DRUGS: {
    symbol: TradeGood.DRUGS,
    components: {
      AMMONIA_ICE: 1,
      FERTILIZERS: 2,
      ICE_WATER: 5,
    },
    baseTradeVolume: 10,
    illegal: true,
  },
  ELECTRONICS: {
    symbol: TradeGood.ELECTRONICS,
    components: {
      SILICON_CRYSTALS: 6,
      QUARTZ_SAND: 6,
      GOLD: 1,
    },
    productionVolume: 2,
    baseTradeVolume: 10,
  },
  EQUIPMENT: {
    symbol: TradeGood.EQUIPMENT,
    components: {
      MACHINERY: 2,
      ELECTRONICS: 1,
    },
    productionVolume: 4,
    baseTradeVolume: 10,
  },
  EXOTIC_MATTER: {
    symbol: TradeGood.EXOTIC_MATTER,
    components: {
      LAB_INSTRUMENTS: 2,
    },
    baseTradeVolume: 1,
  },
  EXPLOSIVES: {
    symbol: TradeGood.EXPLOSIVES,
    components: {
      LIQUID_NITROGEN: 4,
      AMMONIA_ICE: 4,
    },
    baseTradeVolume: 10,
  },
  FABRICS: {
    symbol: TradeGood.FABRICS,
    components: {
      FERTILIZERS: 10,
      MACHINERY: 1,
      ICE_WATER: 6,
    },
    productionVolume: 25,
    baseTradeVolume: 10,
  },
  FERTILIZERS: {
    symbol: TradeGood.FERTILIZERS,
    components: {
      AMMONIA_ICE: 1,
      LIQUID_NITROGEN: 1,
    },
    baseTradeVolume: 10,
  },
  FIREARMS: {
    symbol: TradeGood.FIREARMS,
    components: {
      PLATINUM: 1,
      ALUMINUM: 2,
      IRON: 2,
    },
    productionVolume: 4,
    baseTradeVolume: 10,
  },
  FOOD: {
    symbol: TradeGood.FOOD,
    components: {
      FERTILIZERS: 4,
      ICE_WATER: 8,
      MACHINERY: 1,
    },
    productionVolume: 6,
    baseTradeVolume: 1000,
  },
  FUEL: {
    symbol: TradeGood.FUEL,
    components: {
      HYDROCARBONS: 1,
    },
    baseTradeVolume: 10,
  },
  GENETHERAPEUTICS: {
    symbol: TradeGood.GENETHERAPEUTICS,
    components: {
      POLYNUCLEOTIDES: 1,
      LAB_INSTRUMENTS: 1,
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
    symbol: TradeGood.GOLD_ORE,
    basePrice: 63,
    baseTradeVolume: 100,
  },
  GRAVITON_EMITTERS: {
    symbol: TradeGood.GRAVITON_EMITTERS,
    components: {
      ADVANCED_CIRCUITRY: 3,
    },
    baseTradeVolume: 10,
  },
  HEAVY_MACHINERY: {
    symbol: TradeGood.HEAVY_MACHINERY,
    components: {
      MACHINERY: 2,
      IRON: 4,
      ELECTRONICS: 2,
    },
    baseTradeVolume: 10,
  },
  HOLOGRAPHICS: {
    symbol: TradeGood.HOLOGRAPHICS,
    components: {
      MICROPROCESSORS: 1,
      ELECTRONICS: 2,
    },
    baseTradeVolume: 10,
  },
  HYDROCARBONS: {
    symbol: TradeGood.HYDROCARBONS,
    basePrice: 34,
    baseTradeVolume: 10,
  },
  ICE_WATER: {
    symbol: TradeGood.ICE_WATER,
    basePrice: 16,
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
    symbol: TradeGood.IRON_ORE,
    basePrice: 43,
    baseTradeVolume: 100,
  },
  JEWELRY: {
    symbol: TradeGood.JEWELRY,
    components: {
      PRECIOUS_STONES: 1,
      GOLD: 1,
      SILVER: 1,
    },
    productionVolume: 2,
    baseTradeVolume: 10,
  },
  LAB_INSTRUMENTS: {
    symbol: TradeGood.LAB_INSTRUMENTS,
    components: {
      SILICON_CRYSTALS: 8,
      ELECTRONICS: 1,
      SILVER: 2,
    },
    productionVolume: 2,
    baseTradeVolume: 10,
  },
  LIVESTOCK: {
    symbol: TradeGood.LIVESTOCK,
    components: {
      FERTILIZERS: 1,
      ICE_WATER: 1,
    },
    baseTradeVolume: 10,
  },
  LIQUID_NITROGEN: {
    symbol: TradeGood.LIQUID_NITROGEN,
    components: {
      MACHINERY: 1,
    },
    productionVolume: 20,
    baseTradeVolume: 100,
  },
  LUXURY_GOODS: {
    symbol: TradeGood.LUXURY_GOODS,
    components: {
      JEWELRY: 1,
      HOLOGRAPHICS: 1,
    },
    baseTradeVolume: 10,
  },
  MACHINERY: {
    symbol: TradeGood.MACHINERY,
    components: {
      IRON: 3,
      ELECTRONICS: 1,
      ALUMINUM: 3,
    },
    productionVolume: 3,
    baseTradeVolume: 10,
  },
  MEDICAL_SUPPLIES: {
    symbol: TradeGood.MEDICAL_SUPPLIES,
    components: {
      BOTANICAL_SPECIMENS: 1,
      NOVEL_LIFEFORMS: 1,
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
    symbol: TradeGood.MERITIUM_ORE,
    basePrice: 747,
    baseTradeVolume: 100,
  },
  MICROPROCESSORS: {
    symbol: TradeGood.MICROPROCESSORS,
    components: {
      QUARTZ_SAND: 10,
      SILICON_CRYSTALS: 10,
    },
    baseTradeVolume: 100,
  },
  FUSION_GENERATORS: {
    symbol: TradeGood.FUSION_GENERATORS,
    components: {
      PLATINUM: 1,
      DIAMONDS: 1,
      MACHINERY: 1,
    },
    baseTradeVolume: 10,
  },
  MILITARY_EQUIPMENT: {
    symbol: TradeGood.MILITARY_EQUIPMENT,
    components: {
      IRON: 3,
      ELECTRONICS: 1,
      MICROPROCESSORS: 1,
    },
    productionVolume: 4,
    baseTradeVolume: 10,
  },
  MOOD_REGULATORS: {
    symbol: TradeGood.MOOD_REGULATORS,
    components: {
      BOTANICAL_SPECIMENS: 1,
      POLYNUCLEOTIDES: 4,
      LAB_INSTRUMENTS: 1,
    },
    productionVolume: 2,
    baseTradeVolume: 10,
    illegal: true,
  },
  NANOBOTS: {
    symbol: TradeGood.NANOBOTS,
    components: {
      LAB_INSTRUMENTS: 1,
      POLYNUCLEOTIDES: 1,
      DIAMONDS: 1,
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
      LAB_INSTRUMENTS: 1,
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
      LIQUID_NITROGEN: 3,
      AMMONIA_ICE: 3,
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
    symbol: TradeGood.PLATINUM_ORE,
    basePrice: 68,
    baseTradeVolume: 100,
  },
  POLYNUCLEOTIDES: {
    symbol: TradeGood.POLYNUCLEOTIDES,
    components: {
      AMMONIA_ICE: 3,
      LIQUID_NITROGEN: 4,
    },
    baseTradeVolume: 10,
  },
  PRECIOUS_STONES: {
    symbol: TradeGood.PRECIOUS_STONES,
    basePrice: 88,
    baseTradeVolume: 10,
  },
  RELIC_TECH: {
    symbol: TradeGood.RELIC_TECH,
    components: {
      LAB_INSTRUMENTS: 10,
      MACHINERY: 20,
      ELECTRONICS: 20,
      PLASTICS: 30,
      EQUIPMENT: 10,
    },
    baseTradeVolume: 10,
  },
  QUANTUM_DRIVES: {
    symbol: TradeGood.QUANTUM_DRIVES,
    components: {
      ADVANCED_CIRCUITRY: 10,
    },
    baseTradeVolume: 10,
  },
  QUARTZ_SAND: {
    symbol: TradeGood.QUARTZ_SAND,
    basePrice: 18,
    baseTradeVolume: 10,
  },
  // RADIOACTIVE_WASTE: {
  //     basePrice: 1000,
  //     baseTradeVolume: 10,
  // },
  RESEARCH_DATA: {
    symbol: TradeGood.RESEARCH_DATA,
    components: {
      LAB_INSTRUMENTS: 1,
      ADVANCED_CIRCUITRY: 1,
    },
    baseTradeVolume: 10,
  },
  ROBOTIC_DRONES: {
    symbol: TradeGood.ROBOTIC_DRONES,
    components: {
      ADVANCED_CIRCUITRY: 1,
      ALUMINUM: 5,
      ELECTRONICS: 2,
      PLASTICS: 5,
    },
    productionVolume: 4,
    baseTradeVolume: 10,
  },
  SHIP_PLATING: {
    symbol: TradeGood.SHIP_PLATING,
    components: {
      PLATINUM: 1,
      IRON: 4,
      ALUMINUM: 4,
    },
    productionVolume: 8,
    baseTradeVolume: 100,
  },
  SILICON_CRYSTALS: {
    symbol: TradeGood.SILICON_CRYSTALS,
    basePrice: 37,
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
    symbol: TradeGood.SILVER_ORE,
    basePrice: 61,
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
    symbol: TradeGood.URANITE_ORE,
    basePrice: 138,
    baseTradeVolume: 100,
  },
  VIRAL_AGENTS: {
    symbol: TradeGood.VIRAL_AGENTS,
    components: {
      POLYNUCLEOTIDES: 2,
      NOVEL_LIFEFORMS: 1,
      BOTANICAL_SPECIMENS: 1,
    },
    baseTradeVolume: 10,
  },
  THERMAL_REGULATORS: {
    symbol: TradeGood.THERMAL_REGULATORS,
    components: {
      MACHINERY: 1,
      ELECTRONICS: 1,
    },
    baseTradeVolume: 10,
  },
  TOURISTS: {
    symbol: TradeGood.TOURISTS,
    basePrice: 1200,
    baseTradeVolume: 10,
  },
  FRAME_PROBE: {
    symbol: TradeGood.FRAME_PROBE,
    components: {
      SHIP_PLATING: 200,
    },

    baseTradeVolume: 1,
  },
  FRAME_DRONE: {
    symbol: TradeGood.FRAME_DRONE,
    components: {
      SHIP_PLATING: 200,
    },

    baseTradeVolume: 1,
  },
  FRAME_INTERCEPTOR: {
    symbol: TradeGood.FRAME_INTERCEPTOR,
    components: {
      SHIP_PLATING: 500,
    },

    baseTradeVolume: 1,
  },
  FRAME_RACER: {
    symbol: TradeGood.FRAME_RACER,
    components: {
      SHIP_PLATING: 400,
    },

    baseTradeVolume: 1,
  },
  FRAME_FIGHTER: {
    symbol: TradeGood.FRAME_FIGHTER,
    components: {
      SHIP_PLATING: 300,
    },

    baseTradeVolume: 1,
  },
  FRAME_FRIGATE: {
    symbol: TradeGood.FRAME_FRIGATE,
    components: {
      SHIP_PLATING: 1500,
    },

    baseTradeVolume: 1,
  },
  FRAME_SHUTTLE: {
    symbol: TradeGood.FRAME_SHUTTLE,
    components: {
      SHIP_PLATING: 300,
    },

    baseTradeVolume: 1,
  },
  FRAME_EXPLORER: {
    symbol: TradeGood.FRAME_EXPLORER,
    components: {
      SHIP_PLATING: 1600,
    },
    baseTradeVolume: 1,
  },
  FRAME_MINER: {
    symbol: TradeGood.FRAME_MINER,
    components: {
      SHIP_PLATING: 500,
    },

    baseTradeVolume: 1,
  },
  FRAME_LIGHT_FREIGHTER: {
    symbol: TradeGood.FRAME_LIGHT_FREIGHTER,
    components: {
      SHIP_PLATING: 1200,
    },

    baseTradeVolume: 1,
  },
  FRAME_HEAVY_FREIGHTER: {
    symbol: TradeGood.FRAME_HEAVY_FREIGHTER,
    components: {
      SHIP_PLATING: 6500,
    },

    baseTradeVolume: 1,
  },
  // FRAME_TRANSPORT: {
  //     symbol: TradeGood.FRAME_TRANSPORT,
  //     components: {
  //         SHIP_PLATING: 7
  //     },
  //
  //     baseTradeVolume: 1
  // },
  // FRAME_DESTROYER: {
  //     symbol: TradeGood.FRAME_DESTROYER,
  //     components: {
  //         SHIP_PLATING: 20
  //     },
  //
  //     baseTradeVolume: 1
  // },
  // FRAME_CRUISER: {
  //     symbol: TradeGood.FRAME_CRUISER,
  //     components: {
  //         SHIP_PLATING: 40
  //     },
  //
  //     baseTradeVolume: 1
  // },
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
  // FRAME_CARRIER: {
  //     symbol: TradeGood.FRAME_CARRIER,
  //     components: {
  //         SHIP_PLATING: 160
  //     },
  //
  //     baseTradeVolume: 1
  // },
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
      MACHINERY: 30,
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
      MACHINERY: 1,
      ELECTRONICS: 1,
    },

    baseTradeVolume: 1,
  },
  MODULE_WARP_DRIVE_II: {
    symbol: TradeGood.MODULE_WARP_DRIVE_II,
    components: {
      MERITIUM: 1,
      ELECTRONICS: 1,
      ADVANCED_CIRCUITRY: 1,
    },

    baseTradeVolume: 1,
  },
  MODULE_WARP_DRIVE_III: {
    symbol: TradeGood.MODULE_WARP_DRIVE_III,
    components: {
      MERITIUM: 1,
      ELECTRONICS: 3,
      ADVANCED_CIRCUITRY: 5,
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
      DIAMONDS: 200,
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
      IRON: 20,
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
      PLATINUM: 30,
      MACHINERY: 20,
    },

    baseTradeVolume: 1,
  },
  MOUNT_GAS_SIPHON_III: {
    symbol: TradeGood.MOUNT_GAS_SIPHON_III,
    components: {
      PLATINUM: 60,
      MACHINERY: 120,
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
      IRON: 40,
      MACHINERY: 20,
      ELECTRONICS: 20,
    },

    baseTradeVolume: 1,
  },
  MOUNT_SURVEYOR_III: {
    symbol: TradeGood.MOUNT_SURVEYOR_III,
    components: {
      IRON: 160,
      MACHINERY: 80,
      ELECTRONICS: 80,
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
      PLATINUM: 25,
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
      ELECTRONICS: 80,
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
      PLATINUM: 20,
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
      DIAMONDS: 50,
    },

    baseTradeVolume: 1,
  },
  MOUNT_LASER_CANNON_I: {
    symbol: TradeGood.MOUNT_LASER_CANNON_I,
    components: {
      MACHINERY: 4,
      IRON: 16,
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
};

const markupForValueAdd = 1.2;

const getBasePrice = (good: TradeGoodData, parents: TradeGood[] = []) => {
  if (!good.basePrice && "components" in good) {
    const components = good.components;

    const iterate = Array.isArray(components) ? components : [components];
    const prices: number[] = [];

    iterate.forEach((components) => {
      Object.keys(components).forEach((component) => {
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
      });
      prices.push(
        Object.keys(components).reduce((currentTotal, tradeGood) => {
          const component = tradeGoods[tradeGood as TradeGood];
          const nr = components[tradeGood as TradeGood];
          if (component.basePrice && nr) {
            return currentTotal + component.basePrice * nr * markupForValueAdd;
          } else {
            return currentTotal;
          }
        }, 0)
      );
    });
    const productionVolume = good.productionVolume ?? 1;
    good.basePrice = Math.round(
      prices.reduce((total, price) => total + price, 0) /
        prices.length /
        productionVolume
    );
    if (good.basePrice < 10) {
      good.baseTradeVolume = 10000;
    } else if (good.basePrice < 100) {
      good.baseTradeVolume = 1000;
    } else if (good.basePrice < 1000) {
      good.baseTradeVolume = 100;
    } else if (good.basePrice < 10000) {
      good.baseTradeVolume = 10;
    } else {
      good.baseTradeVolume = 1;
    }

    if (prices.length > 1 && prices.some((p) => p != good.basePrice)) {
      console.log(`! Multiple different prices for ${good.symbol}: ${prices}`);
    }
  }
  return good;
};

Object.keys(tradeGoods).forEach((tg) => {
  const good = tradeGoods[tg as TradeGood];
  getBasePrice(good);
});

export const tradeGoodTypeNames = Object.keys(tradeGoods) as TradeGood[];
