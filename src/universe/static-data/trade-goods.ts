import {Module} from "src/universe/static-data/ship-modules";
import {Mount} from "src/universe/static-data/ship-mounts";
import {Engine} from "src/universe/static-data/ship-engines";
import {Frame} from "src/universe/static-data/ship-frames";
import {Reactor} from "src/universe/static-data/ship-reactors";

export type TradeGood =
  | "ADVANCED_CIRCUITRY"
  | "AI_MAINFRAMES"
  | "ALUMINUM"
  | "ALUMINUM_ORE"
  | "AMMONIA_ICE"
  | "AMMUNITION"
  | "ANTIMATTER"
  | "BIOCOMPOSITES"
  | "BOTANICAL_SPECIMENS"
  | "CLOTHING"
  | "COPPER"
  | "COPPER_ORE"
  | "CYBERNETIC_IMPLANTS"
  | "DIAMONDS"
  | "DRUGS"
  | "ELECTRONICS"
  | "EQUIPMENT"
  | "EXOTIC_MATTER"
  | "EXPLOSIVES"
  | "FABRICS"
  | "FERTILIZERS"
  | "FIREARMS"
  | "FOOD"
  | "FUEL"
  | "GENETHERAPEUTICS"
  | "GOLD"
  | "GOLD_ORE"
  | "GRAVITON_EMITTERS"
  | "HEAVY_MACHINERY"
  | "HOLOGRAPHICS"
  | "HYDROCARBONS"
  | "ICE_WATER"
  | "IRON"
  | "IRON_ORE"
  | "JEWELRY"
  | "LAB_INSTRUMENTS"
  | "LIVESTOCK"
  | "LUXURY_GOODS"
  | "LIQUID_NITROGEN"
  | "MACHINERY"
  | "MEDICAL_SUPPLIES"
  | "MICROPROCESSORS"
  | "MERITIUM"
  | "MERITIUM_ORE"
  | "FUSION_GENERATORS"
  | "MILITARY_EQUIPMENT"
  | "MOOD_REGULATORS"
  | "NANOBOTS"
  // | "NEURAL_CHIPS"
  | "NOVEL_LIFEFORMS"
  // | "NUCLEAR_DEVICES"
  | "PLASTICS"
  | "PLATINUM"
  | "PLATINUM_ORE"
  | "POLYNUCLEOTIDES"
  | "PRECIOUS_STONES"
  | "RELIC_TECH"
  | "QUANTUM_DRIVES"
  | "QUARTZ_SAND"
  // | "RADIOACTIVE_WASTE"
  | "RESEARCH_DATA"
  | "ROBOTIC_DRONES"
  | "SHIP_PLATING"
  | "SILICON_CRYSTALS"
  | "SILVER"
  | "SILVER_ORE"
  // | "SLAVES"
  // | "SPICES"
  // | "STIMULANTS"
  // | "SUPERCONDUCTORS"
  | "URANITE"
  | "URANITE_ORE"
  | "VIRAL_AGENTS"
  | "THERMAL_REGULATORS"
  | "TOURISTS"
  // | "WATER"
  | Module | Mount | Engine | Frame | Reactor;


type Components = Partial<Record<TradeGood, number>>
type PriceOrComponents = { basePrice: number } | { basePrice?: number; components: Components | Components[] }
export type TradeGoodData = { symbol: TradeGood; baseTradeVolume: number; illegal?: boolean; } & PriceOrComponents

export const tradeGoods: Record<
  TradeGood,
  TradeGoodData
> = {
    ADVANCED_CIRCUITRY: {
        symbol: "ADVANCED_CIRCUITRY",
        components: {
            ELECTRONICS: 1,
            MICROPROCESSORS: 1
        },
        baseTradeVolume: 10,
    },
    AI_MAINFRAMES: {
        symbol: "AI_MAINFRAMES",
        components: {
            ADVANCED_CIRCUITRY: 3,
        },
        baseTradeVolume: 10,
    },
    ALUMINUM: {
        symbol: "ALUMINUM",
        components: {
            ALUMINUM_ORE: 1,
        },
        baseTradeVolume: 1000,
    },
    ALUMINUM_ORE: {
        symbol: "ALUMINUM_ORE",
        basePrice: 45,
        baseTradeVolume: 1000,
    },
    AMMONIA_ICE: {
        symbol: "AMMONIA_ICE",
        basePrice: 100,
        baseTradeVolume: 100,
    },
    AMMUNITION: {
        symbol: "AMMUNITION",
        components: {
            COPPER: 1,
            IRON: 1,
            LIQUID_NITROGEN: 1,
        },
        baseTradeVolume: 10,
    },
    ANTIMATTER: {
        symbol: "ANTIMATTER",
        components: {
            "MERITIUM": 1,
            "EXOTIC_MATTER": 1,
        },
        baseTradeVolume: 1,
    },
    BIOCOMPOSITES: {
        symbol: "BIOCOMPOSITES",
        components: {
            LAB_INSTRUMENTS: 1,
            POLYNUCLEOTIDES: 1,
            FABRICS: 1,
        },
        baseTradeVolume: 10,
    },
    BOTANICAL_SPECIMENS: {
        symbol: "BOTANICAL_SPECIMENS",
        components: {
            LAB_INSTRUMENTS: 1,
        },
        baseTradeVolume: 10,
    },
    CLOTHING: {
        symbol: "CLOTHING",
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    COPPER: {
        symbol: "COPPER",
        components: {
            COPPER_ORE: 1,
        },
        baseTradeVolume: 10,
    },
    COPPER_ORE: {
        symbol: "COPPER_ORE",
        basePrice: 50,
        baseTradeVolume: 100,
    },
    CYBERNETIC_IMPLANTS: {
        symbol: "CYBERNETIC_IMPLANTS",
        components: {
            POLYNUCLEOTIDES: 1,
            BIOCOMPOSITES: 1,
            MICROPROCESSORS: 1,
        },
        baseTradeVolume: 10,
    },
    DIAMONDS: {
        symbol: "DIAMONDS",
        basePrice: 4500,
        baseTradeVolume: 10,
    },
    DRUGS: {
        symbol: "DRUGS",
        components: {
            AMMONIA_ICE: 1,
            FERTILIZERS: 1,
            ICE_WATER: 1,
        },
        baseTradeVolume: 10,
        illegal: true,
    },
    ELECTRONICS: {
        symbol: "ELECTRONICS",
        components: {
            SILICON_CRYSTALS: 1,
            QUARTZ_SAND: 1,
            GOLD: 1,
        },
        baseTradeVolume: 10,
    },
    EQUIPMENT: {
        symbol: "EQUIPMENT",
        components: {
            MACHINERY: 1,
            ELECTRONICS: 1,
        },
        baseTradeVolume: 10,
    },
    EXOTIC_MATTER: {
        symbol: "EXOTIC_MATTER",
        components: {
           LAB_INSTRUMENTS: 10,
        },
        baseTradeVolume: 1,
    },
    EXPLOSIVES: {
        symbol: "EXPLOSIVES",
        components: {
            LIQUID_NITROGEN: 1,
            HYDROCARBONS: 1,
            AMMONIA_ICE: 1,
        },
        baseTradeVolume: 10,
    },
    FABRICS: {
        symbol: "FABRICS",
        components: {
            FERTILIZERS: 1,
            MACHINERY: 1,
            AMMONIA_ICE: 1,
        },
        baseTradeVolume: 10,
    },
    FERTILIZERS: {
        symbol: "FERTILIZERS",
        components: {
            AMMONIA_ICE: 1,
            HYDROCARBONS: 1,
            LIQUID_NITROGEN: 1
        },
        baseTradeVolume: 10,
    },
    FIREARMS: {
        symbol: "FIREARMS",
        components: {
            PLATINUM: 1,
            ALUMINUM: 1,
            IRON: 1
        },
        baseTradeVolume: 10,
    },
    FOOD: {
        symbol: "FOOD",
        components: {
            FERTILIZERS: 1,
            ICE_WATER: 1,
        },
        baseTradeVolume: 1000,
    },
    FUEL: {
        symbol: "FUEL",
        components: {
            HYDROCARBONS: 1
        },
        baseTradeVolume: 10,
    },
    GENETHERAPEUTICS: {
        symbol: "GENETHERAPEUTICS",
        components: {
            POLYNUCLEOTIDES: 1,
            LAB_INSTRUMENTS: 1,
        },
        baseTradeVolume: 10,
    },
    GOLD: {
        symbol: "GOLD",
        components: {
            GOLD_ORE: 1,
        },
        baseTradeVolume: 10,
    },
    GOLD_ORE: {
        symbol: "GOLD_ORE",
        basePrice: 100,
        baseTradeVolume: 100,
    },
    GRAVITON_EMITTERS: {
        symbol: "GRAVITON_EMITTERS",
        components: {
            ADVANCED_CIRCUITRY: 3
        },
        baseTradeVolume: 10,
    },
    HEAVY_MACHINERY: {
        symbol: "HEAVY_MACHINERY",
        components: {
            MACHINERY: 1,
            IRON: 1,
            ELECTRONICS: 1,
        },
        baseTradeVolume: 10,
    },
    HOLOGRAPHICS: {
        symbol: "HOLOGRAPHICS",
        components: {
            MICROPROCESSORS: 1,
            GOLD: 1
        },
        baseTradeVolume: 10,
    },
    HYDROCARBONS: {
        symbol: "HYDROCARBONS",
        components: {
            MACHINERY: 1
        },
        baseTradeVolume: 10,
    },
    ICE_WATER: {
        symbol: "ICE_WATER",
        basePrice: 15,
        baseTradeVolume: 10,
    },
    IRON: {
        symbol: "IRON",
        components: {
            IRON_ORE: 1,
        },
        baseTradeVolume: 10,
    },
    IRON_ORE: {
        symbol: "IRON_ORE",
        basePrice: 40,
        baseTradeVolume: 100,
    },
    JEWELRY: {
        symbol: "JEWELRY",
        components: {
            PRECIOUS_STONES: 1,
            GOLD: 1,
            SILVER: 1,
        },
        baseTradeVolume: 10,
    },
    LAB_INSTRUMENTS: {
        symbol: "LAB_INSTRUMENTS",
        components: {
            SILICON_CRYSTALS: 1,
            ELECTRONICS: 1,
            SILVER: 1
        },
        baseTradeVolume: 10,
    },
    LIVESTOCK: {
        symbol: "LIVESTOCK",
        components: {
            FERTILIZERS: 1,
            ICE_WATER: 1
        },
        baseTradeVolume: 10,
    },
    LIQUID_NITROGEN: {
        symbol: "LIQUID_NITROGEN",
        components: {
            MACHINERY: 1,
        },
        baseTradeVolume: 100,
    },
    LUXURY_GOODS: {
        symbol: "LUXURY_GOODS",
        components: {
            JEWELRY: 1,
            HOLOGRAPHICS: 1,
        },
        baseTradeVolume: 10,
    },
    MACHINERY: {
        symbol: "MACHINERY",
        components: {
            IRON: 1,
            ELECTRONICS: 1,
            ALUMINUM: 1,
        },
        baseTradeVolume: 10,
    },
    MEDICAL_SUPPLIES: {
        symbol: "MEDICAL_SUPPLIES",
        components: {
            BOTANICAL_SPECIMENS: 1,
            NOVEL_LIFEFORMS: 1
        },
        baseTradeVolume: 10,
    },
    MERITIUM: {
        symbol: "MERITIUM",
        components: {
            MERITIUM_ORE: 1,
        },
        baseTradeVolume: 10,
    },
    MERITIUM_ORE: {
        symbol: "MERITIUM_ORE",
        basePrice: 100,
        baseTradeVolume: 100,
    },
    MICROPROCESSORS: {
        symbol: "MICROPROCESSORS",
        components: {
            QUARTZ_SAND: 1,
            SILICON_CRYSTALS: 1
        },
        baseTradeVolume: 100,
    },
    FUSION_GENERATORS: {
        symbol: "FUSION_GENERATORS",
        components: {
            PLATINUM: 1,
            DIAMONDS: 1,
            MACHINERY: 1,
        },
        baseTradeVolume: 10,
    },
    MILITARY_EQUIPMENT: {
        symbol: "MILITARY_EQUIPMENT",
        components: {
            IRON: 1,
            ELECTRONICS: 1,
            MICROPROCESSORS: 1,
        },
        baseTradeVolume: 10,
    },
    MOOD_REGULATORS: {
        symbol: "MOOD_REGULATORS",
        components: {
            BOTANICAL_SPECIMENS: 1,
            POLYNUCLEOTIDES: 1,
            LAB_INSTRUMENTS: 1,
        },
        baseTradeVolume: 10,
        illegal: true,
    },
    NANOBOTS: {
        symbol: "NANOBOTS",
        components: {
            LAB_INSTRUMENTS: 1,
            POLYNUCLEOTIDES: 1,
            DIAMONDS: 1
        },
        baseTradeVolume: 10,
    },
    // NEURAL_CHIPS: {
    //     basePrice: 1000,
    //     baseTradeVolume: 10,
    // },
    NOVEL_LIFEFORMS: {
symbol: "NOVEL_LIFEFORMS",
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
        symbol: "PLASTICS",
        components: {
            HYDROCARBONS: 1,
            MACHINERY: 1,
        },
        baseTradeVolume: 10,
    },
    PLATINUM: {
        symbol: "PLATINUM",
        components: {
            PLATINUM_ORE: 3,
        },
        baseTradeVolume: 10,
    },
    PLATINUM_ORE: {
        symbol: "PLATINUM_ORE",
        basePrice: 65,
        baseTradeVolume: 100,
    },
    POLYNUCLEOTIDES: {
        symbol: "POLYNUCLEOTIDES",
        components: {
            LAB_INSTRUMENTS: 1,
        },
        baseTradeVolume: 10,
    },
    PRECIOUS_STONES: {
        symbol: "PRECIOUS_STONES",
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    RELIC_TECH: {
        symbol: "RELIC_TECH",
        components: {
            LAB_INSTRUMENTS: 1,
            RESEARCH_DATA: 1,
        },
        baseTradeVolume: 10,
    },
    QUANTUM_DRIVES: {
        symbol: "QUANTUM_DRIVES",
        components: {
            ADVANCED_CIRCUITRY: 3,
        },
        baseTradeVolume: 10,
    },
    QUARTZ_SAND: {
        symbol: "QUARTZ_SAND",
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    // RADIOACTIVE_WASTE: {
    //     basePrice: 1000,
    //     baseTradeVolume: 10,
    // },
    RESEARCH_DATA: {
        symbol: "RESEARCH_DATA",
        components: [{
            "LAB_INSTRUMENTS": 1,
            "ADVANCED_CIRCUITRY": 1,
        }, {
            "NOVEL_LIFEFORMS": 2,
        }],
        baseTradeVolume: 10,
    },
    ROBOTIC_DRONES: {
        symbol: "ROBOTIC_DRONES",
        components: {
            MACHINERY: 1,
        },
        baseTradeVolume: 10,
    },
    SHIP_PLATING: {
        symbol: "SHIP_PLATING",
        components: {
            MACHINERY: 1,
            IRON: 1,
            FABRICS: 1
        },
        baseTradeVolume: 10,
    },
    SILICON_CRYSTALS: {
        symbol: "SILICON_CRYSTALS",
        basePrice: 100,
        baseTradeVolume: 100,
    },
    SILVER: {
        symbol: "SILVER",
        components: {
            SILVER_ORE: 3,
        },
        baseTradeVolume: 10,
    },
    SILVER_ORE: {
        symbol: "SILVER_ORE",
        basePrice: 55,
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
        symbol: "URANITE",
        components: {
            URANITE_ORE: 3,
        },
        baseTradeVolume: 10,
    },
    URANITE_ORE: {
        symbol: "URANITE_ORE",
        basePrice: 100,
        baseTradeVolume: 100,
    },
    VIRAL_AGENTS: {
        symbol: "VIRAL_AGENTS",
        components: {
            POLYNUCLEOTIDES: 1,
            NOVEL_LIFEFORMS: 1,
        },
        baseTradeVolume: 10,
    },
    THERMAL_REGULATORS: {
        symbol: "THERMAL_REGULATORS",
        components: {
            MACHINERY: 1,
            ELECTRONICS: 1,
        },
        baseTradeVolume: 10,
    },
    TOURISTS: {
        symbol: "TOURISTS",
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    FRAME_PROBE: {
        symbol: Frame.FRAME_PROBE,
        components: {
            SHIP_PLATING: 3
        },
        
        baseTradeVolume: 1
    },
    FRAME_DRONE: {
        symbol: Frame.FRAME_DRONE,
        components: {
            SHIP_PLATING: 5
        },
        
        baseTradeVolume: 1
    },
    FRAME_INTERCEPTOR: {
        symbol: Frame.FRAME_INTERCEPTOR,
        components: {
            SHIP_PLATING: 7
        },
        
        baseTradeVolume: 1
    },
    FRAME_RACER: {
        symbol: Frame.FRAME_RACER,
        components: {
            SHIP_PLATING: 5
        },
        
        baseTradeVolume: 1
    },
    FRAME_FIGHTER: {
        symbol: Frame.FRAME_FIGHTER,
        components: {
            SHIP_PLATING: 3
        },
        
        baseTradeVolume: 1
    },
    FRAME_FRIGATE: {
        symbol: Frame.FRAME_FRIGATE,
        components: {
            SHIP_PLATING: 10
        },
        
        baseTradeVolume: 1
    },
    FRAME_SHUTTLE: {
        symbol: Frame.FRAME_SHUTTLE,
        components: {
            SHIP_PLATING: 7
        },
        
        baseTradeVolume: 1
    },
    FRAME_EXPLORER: {
        symbol: Frame.FRAME_EXPLORER,
        components: {
            SHIP_PLATING: 10
        },
        
        baseTradeVolume: 1
    },
    FRAME_MINER: {
        symbol: Frame.FRAME_MINER,
        components: {
            SHIP_PLATING: 7
        },
        
        baseTradeVolume: 1
    },
    FRAME_LIGHT_FREIGHTER: {
        symbol: Frame.FRAME_LIGHT_FREIGHTER,
        components: {
            SHIP_PLATING: 7
        },
        
        baseTradeVolume: 1
    },
    FRAME_HEAVY_FREIGHTER: {
        symbol: Frame.FRAME_HEAVY_FREIGHTER,
        components: {
            SHIP_PLATING: 30
        },
        
        baseTradeVolume: 1
    },
    // FRAME_TRANSPORT: {
    //     symbol: Frame.FRAME_TRANSPORT,
    //     components: {
    //         SHIP_PLATING: 7
    //     },
    //
    //     baseTradeVolume: 1
    // },
    // FRAME_DESTROYER: {
    //     symbol: Frame.FRAME_DESTROYER,
    //     components: {
    //         SHIP_PLATING: 20
    //     },
    //
    //     baseTradeVolume: 1
    // },
    // FRAME_CRUISER: {
    //     symbol: Frame.FRAME_CRUISER,
    //     components: {
    //         SHIP_PLATING: 40
    //     },
    //
    //     baseTradeVolume: 1
    // },
    // FRAME_BATTLESHIP: {
    //     symbol: Frame.FRAME_BATTLESHIP,
    //     components: {
    //         SHIP_PLATING: 80
    //     },
    //
    //     baseTradeVolume: 1
    // },
    // FRAME_DREADNOUGHT: {
    //     symbol: Frame.FRAME_DREADNOUGHT,
    //     components: {
    //         SHIP_PLATING: 160
    //     },
    //
    //     baseTradeVolume: 1
    // },
    // FRAME_TITAN: {
    //     symbol: Frame.FRAME_TITAN,
    //     components: {
    //         SHIP_PLATING: 500
    //     },
    //
    //     baseTradeVolume: 1
    // },
    // FRAME_LEVIATHAN: {
    //     symbol: Frame.FRAME_LEVIATHAN,
    //     components: {
    //         SHIP_PLATING: 1250
    //     },
    //
    //     baseTradeVolume: 1
    // },
    // FRAME_CARRIER: {
    //     symbol: Frame.FRAME_CARRIER,
    //     components: {
    //         SHIP_PLATING: 160
    //     },
    //
    //     baseTradeVolume: 1
    // },
    // FRAME_FLEET_CARRIER: {
    //     symbol: Frame.FRAME_FLEET_CARRIER,
    //     components: {
    //         SHIP_PLATING: 320
    //     },
    //
    //     baseTradeVolume: 1
    // },
    // FRAME_MOTHERSHIP: {
    //     symbol: Frame.FRAME_MOTHERSHIP,
    //     components: {
    //         SHIP_PLATING: 800
    //     },
    //
    //     baseTradeVolume: 1
    // },
    // FRAME_STARBASE: {
    //     symbol: Frame.FRAME_STARBASE,
    //     components: {
    //         SHIP_PLATING: 3000
    //     },
    //
    //     baseTradeVolume: 1
    // },
    // FRAME_STATION: {
    //     symbol: Frame.FRAME_STATION,
    //     components: {
    //         SHIP_PLATING: 1000
    //     },
    //
    //     baseTradeVolume: 1
    // },
    ENGINE_IMPULSE_DRIVE_I: {
        symbol: Engine.ENGINE_IMPULSE_DRIVE_I,
        components: {
            IRON: 1,
            MACHINERY: 1
        },
        
        baseTradeVolume: 1
    },
    ENGINE_ION_DRIVE_I: {
        symbol: Engine.ENGINE_ION_DRIVE_I,
        components: {
            MACHINERY: 1,
            IRON: 1,
        },
        
        baseTradeVolume: 1
    },
    ENGINE_ION_DRIVE_II: {
        symbol: Engine.ENGINE_ION_DRIVE_II,
        components: {
            MACHINERY: 2,
            PLATINUM: 1,
        },
        
        baseTradeVolume: 1
    },
    MODULE_CARGO_HOLD_I: {
        symbol: Module.MODULE_CARGO_HOLD_I,
        components: {
            MACHINERY: 1,
            IRON: 1,
        },
        
        baseTradeVolume: 1
    },
    MODULE_CREW_QUARTERS_I: {
        symbol: Module.MODULE_CREW_QUARTERS_I,
        components: {
            IRON: 1,
            MACHINERY: 1,
            FABRICS: 1
        },
        
        baseTradeVolume: 1
    },
    MODULE_WARP_DRIVE_I: {
        symbol: Module.MODULE_WARP_DRIVE_I,
        components: {
            IRON: 1,
            MACHINERY: 1,
            ELECTRONICS: 1,
        },
        
        baseTradeVolume: 1
    },
    MODULE_WARP_DRIVE_II: {
        symbol: Module.MODULE_WARP_DRIVE_II,
        components: {
            MERITIUM: 1,
            ELECTRONICS: 1,
            ADVANCED_CIRCUITRY: 1
        },
        
        baseTradeVolume: 1
    },
    MODULE_WARP_DRIVE_III: {
        symbol: Module.MODULE_WARP_DRIVE_III,
        components: {
            MERITIUM: 1,
            ELECTRONICS: 3,
            ADVANCED_CIRCUITRY: 5
        },
        
        baseTradeVolume: 1
    },
    MODULE_JUMP_DRIVE_I: {
        symbol: Module.MODULE_JUMP_DRIVE_I,
        components: {
            ADVANCED_CIRCUITRY: 1,
            IRON: 1,
        },
        
        baseTradeVolume: 1
    },
    MODULE_JUMP_DRIVE_II: {
        symbol: Module.MODULE_JUMP_DRIVE_II,
        components: {
            GOLD: 1,
            ADVANCED_CIRCUITRY: 3,
            PLATINUM: 3,
        },
        
        baseTradeVolume: 1
    },
    MODULE_JUMP_DRIVE_III: {
        symbol: Module.MODULE_JUMP_DRIVE_III,
        components: {
            MERITIUM: 2,
            ADVANCED_CIRCUITRY: 5,
            PLATINUM: 3,
        },
        
        baseTradeVolume: 1
    },
    MODULE_MINERAL_PROCESSOR_I: {
        symbol: Module.MODULE_MINERAL_PROCESSOR_I,
        components: {
            MACHINERY: 1,
            IRON: 1,
        },
        
        baseTradeVolume: 1
    },
    MODULE_ENVOY_QUARTERS_I: {
        symbol: Module.MODULE_ENVOY_QUARTERS_I,
        components: {
            IRON: 1,
            MACHINERY: 1,
            FABRICS: 1
        },
        
        baseTradeVolume: 1
    },
    MODULE_SCIENCE_LAB_I: {
        symbol: Module.MODULE_SCIENCE_LAB_I,
        components: {
            SHIP_PLATING: 6
        },
        
        baseTradeVolume: 1
    },
    MODULE_PASSENGER_CABIN_I: {
        symbol: Module.MODULE_PASSENGER_CABIN_I,
        components: {
            SHIP_PLATING: 3
        },
        
        baseTradeVolume: 1
    },
    MODULE_ORE_REFINERY_I: {
        symbol: Module.MODULE_ORE_REFINERY_I,
        components: {
            SHIP_PLATING: 10
        },
        
        baseTradeVolume: 1
    },
    MODULE_SHIELD_GENERATOR_I: {
        symbol: Module.MODULE_SHIELD_GENERATOR_I,
        components: {
            IRON: 1,
            URANITE: 1,
            MACHINERY: 1
        },
        
        baseTradeVolume: 1
    },
    MODULE_SHIELD_GENERATOR_II: {
        symbol: Module.MODULE_SHIELD_GENERATOR_II,
        components: {
            ALUMINUM: 1,
            URANITE: 1,
            MACHINERY: 1,
        },
        
        baseTradeVolume: 1
    },
    MOUNT_GAS_SIPHON_I: {
        symbol: Mount.MOUNT_GAS_SIPHON_I,
        components: {
            MACHINERY: 1,
            IRON: 1
        },
        
        baseTradeVolume: 1
    },
    MOUNT_GAS_SIPHON_II: {
        symbol: Mount.MOUNT_GAS_SIPHON_II,
        components: {
            PLATINUM: 1,
            MACHINERY: 1,
        },
        
        baseTradeVolume: 1
    },
    MOUNT_GAS_SIPHON_III: {
        symbol: Mount.MOUNT_GAS_SIPHON_III,
        components: {
            PLATINUM: 1,
            MACHINERY: 3,
        },
        
        baseTradeVolume: 1
    },
    MOUNT_SURVEYOR_I: {
        symbol: Mount.MOUNT_SURVEYOR_I,
        components: {
            IRON: 1,
            MACHINERY: 1,
            ELECTRONICS: 1,
        },
        
        baseTradeVolume: 1
    },
    MOUNT_SURVEYOR_II: {
        symbol: Mount.MOUNT_SURVEYOR_II,
        components: {
            IRON: 1,
            MACHINERY: 1,
            ELECTRONICS: 1,
        },
        
        baseTradeVolume: 1
    },
    MOUNT_SURVEYOR_III: {
        symbol: Mount.MOUNT_SURVEYOR_III,
        components: {
            IRON: 1,
            MACHINERY: 1,
            ELECTRONICS: 1,
        },
        
        baseTradeVolume: 1
    },
    MOUNT_SENSOR_ARRAY_I: {
        symbol: Mount.MOUNT_SENSOR_ARRAY_I,
        components: {
            IRON: 1,
            MACHINERY: 1,
            ELECTRONICS: 1,
        },
        
        baseTradeVolume: 1
    },
    MOUNT_SENSOR_ARRAY_II: {
        symbol: Mount.MOUNT_SENSOR_ARRAY_II,
        components: {
            PLATINUM: 1,
            MACHINERY: 1,
            ELECTRONICS: 1,
        },
        
        baseTradeVolume: 1
    },
    MOUNT_SENSOR_ARRAY_III: {
        symbol: Mount.MOUNT_SENSOR_ARRAY_III,
        components: {
            PLATINUM: 1,
            MACHINERY: 1,
            DIAMONDS: 1,
        },
        
        baseTradeVolume: 1
    },
    MOUNT_MINING_LASER_I: {
        symbol: Mount.MOUNT_MINING_LASER_I,
        components: {
            IRON: 1,
            MACHINERY: 1,
            DIAMONDS: 1,
        },
        
        baseTradeVolume: 1
    },
    MOUNT_MINING_LASER_II: {
        symbol: Mount.MOUNT_MINING_LASER_II,
        components: {
            PLATINUM: 1,
            MACHINERY: 1,
            DIAMONDS: 1,
        },
        
        baseTradeVolume: 1
    },
    MOUNT_MINING_LASER_III: {
        symbol: Mount.MOUNT_MINING_LASER_III,
        components: {
            PLATINUM: 1,
            MACHINERY: 1,
            DIAMONDS: 1,
        },
        
        baseTradeVolume: 1
    },
    MOUNT_LASER_CANNON_I: {
        symbol: Mount.MOUNT_LASER_CANNON_I,
        components: {
            MACHINERY: 1,
            IRON: 1,
        },
        
        baseTradeVolume: 1
    },
    MOUNT_MISSILE_LAUNCHER_I: {
        symbol: Mount.MOUNT_MISSILE_LAUNCHER_I,
        components: {
            MACHINERY: 1,
            IRON: 1,
        },
        
        baseTradeVolume: 1
    },
    MOUNT_TURRET_I: {
        symbol: Mount.MOUNT_TURRET_I,
        components: {
            MACHINERY: 1,
            IRON: 1,
        },
        
        baseTradeVolume: 1
    },
    REACTOR_CHEMICAL_I: {
        symbol: Reactor.REACTOR_CHEMICAL_I,
        components: {
            IRON: 1,
            MACHINERY: 1,
        },
        
        baseTradeVolume: 1
    },
    REACTOR_FISSION_I: {
        symbol: Reactor.REACTOR_FISSION_I,
        components: {
            IRON: 1,
            MACHINERY: 1,
        },
        
        baseTradeVolume: 1
    },
    REACTOR_FUSION_I: {
        symbol: Reactor.REACTOR_FUSION_I,
        components: {
            IRON: 1,
            MACHINERY: 1,
        },
        
        baseTradeVolume: 1
    },
    REACTOR_SOLAR_I: {
        symbol: Reactor.REACTOR_SOLAR_I,
        components: {
            IRON: 1,
            MACHINERY: 1
        },
        baseTradeVolume: 1
    }
};

const markupForValueAdd = 1.2

const getBasePrice = (good: TradeGoodData, parents: TradeGood[] = []) => {
    if (!good.basePrice && 'components' in good) {
        const components = good.components

        const iterate = Array.isArray(components) ? components : [components]
        const prices: number[] = []

        iterate.forEach(components => {
            Object.keys(components).forEach(component => {
                if (parents.includes(component as TradeGood)) {
                    throw new Error(`Circular dependency detected: ${parents.join(' -> ')} -> ${component}`);
                }
                getBasePrice(tradeGoods[component as TradeGood], [...parents, good.symbol])
            })
            prices.push(Object.keys(components).reduce((currentTotal, tradeGood) => {
                const component = tradeGoods[tradeGood as TradeGood];
                const nr = components[tradeGood as TradeGood]
                if (component.basePrice && nr) {
                    return currentTotal + component.basePrice * nr * markupForValueAdd;
                } else {
                    return currentTotal
                }
            }, 0));
        })
        good.basePrice = prices.reduce((total, price) => total + price, 0) / prices.length;

        if (prices.length > 1 && prices.some(p => p != good.basePrice)) {
            console.log(`! Multiple different prices for ${good.symbol}: ${prices}`)
        }
    }
    return good
}

Object.keys(tradeGoods).forEach(tg => {
    const good = tradeGoods[tg as TradeGood]
    getBasePrice(good)
})

export const tradeGoodTypeNames = Object.keys(tradeGoods) as TradeGood[];
