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
  | "MACHINERY"
  | "MEDICAL_SUPPLIES"
  | "MERITIUM"
  | "MERITIUM_ORE"
  | "FUSION_GENERATORS"
  | "MILITARY_EQUIPMENT"
  | "MOOD_REGULATORS"
  | "NANOBOTS"
  | "NEURAL_CHIPS"
  | "NOVEL_LIFEFORMS"
  | "NUCLEAR_DEVICES"
  | "PLASTICS"
  | "PLATINUM"
  | "PLATINUM_ORE"
  | "POLYNUCLEOTIDES"
  | "PRECIOUS_STONES"
  | "QUANTUM_DRIVES"
  | "QUARTZ_SAND"
  | "RADIOACTIVE_WASTE"
  | "RESEARCH_DATA"
  | "ROBOTICS"
  | "SHIP_PLATING"
  | "SILICON_CRYSTALS"
  | "SILVER"
  | "SILVER_ORE"
  | "SLAVES"
  | "SPICES"
  | "STIMULANTS"
  | "SUPERCONDUCTORS"
  | "URANITE"
  | "URANITE_ORE"
  | "VIRAL_VECTORS"
  | "THERMAL_REGULATORS"
  | "TOURISTS";

export const tradeGoods: Record<
  TradeGood,
  { basePrice: number; baseTradeVolume: number; illegal?: boolean }
> = {
    ADVANCED_CIRCUITRY: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    AI_MAINFRAMES: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    ALUMINUM: {
        basePrice: 50,
        baseTradeVolume: 1000,
    },
    ALUMINUM_ORE: {
        basePrice: 10,
        baseTradeVolume: 1000,
    },
    AMMONIA_ICE: {
        basePrice: 100,
        baseTradeVolume: 100,
    },
    AMMUNITION: {
        basePrice: 100,
        baseTradeVolume: 10,
    },
    ANTIMATTER: {
        basePrice: 100000,
        baseTradeVolume: 1,
    },
    BIOCOMPOSITES: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    BOTANICAL_SPECIMENS: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    CLOTHING: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    COPPER: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    COPPER_ORE: {
        basePrice: 100,
        baseTradeVolume: 100,
    },
    CYBERNETIC_IMPLANTS: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    DIAMONDS: {
        basePrice: 4500,
        baseTradeVolume: 10,
    },
    DRUGS: {
        basePrice: 1100,
        baseTradeVolume: 10,
        illegal: true,
    },
    ELECTRONICS: {
        basePrice: 70,
        baseTradeVolume: 10,
    },
    EQUIPMENT: {
        basePrice: 850,
        baseTradeVolume: 10,
    },
    EXOTIC_MATTER: {
        basePrice: 100000,
        baseTradeVolume: 1,
    },
    EXPLOSIVES: {
        basePrice: 600,
        baseTradeVolume: 10,
    },
    FABRICS: {
        basePrice: 200,
        baseTradeVolume: 10,
    },
    FERTILIZERS: {
        basePrice: 3500,
        baseTradeVolume: 10,
    },
    FIREARMS: {
        basePrice: 5000,
        baseTradeVolume: 10,
    },
    FOOD: {
        basePrice: 100,
        baseTradeVolume: 1000,
    },
    FUEL: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    GENETHERAPEUTICS: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    GOLD: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    GOLD_ORE: {
        basePrice: 100,
        baseTradeVolume: 100,
    },
    GRAVITON_EMITTERS: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    HEAVY_MACHINERY: {
        basePrice: 2000,
        baseTradeVolume: 10,
    },
    HOLOGRAPHICS: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    HYDROCARBONS: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    ICE_WATER: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    IRON: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    IRON_ORE: {
        basePrice: 100,
        baseTradeVolume: 100,
    },
    JEWELRY: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    LAB_INSTRUMENTS: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    LIVESTOCK: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    LUXURY_GOODS: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    MACHINERY: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    MEDICAL_SUPPLIES: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    MERITIUM: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    MERITIUM_ORE: {
        basePrice: 100,
        baseTradeVolume: 100,
    },
    FUSION_GENERATORS: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    MILITARY_EQUIPMENT: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    MOOD_REGULATORS: {
        basePrice: 1000,
        baseTradeVolume: 10,
        illegal: true,
    },
    NANOBOTS: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    NEURAL_CHIPS: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    NOVEL_LIFEFORMS: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    NUCLEAR_DEVICES: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    PLASTICS: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    PLATINUM: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    PLATINUM_ORE: {
        basePrice: 100,
        baseTradeVolume: 100,
    },
    POLYNUCLEOTIDES: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    PRECIOUS_STONES: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    QUANTUM_DRIVES: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    QUARTZ_SAND: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    RADIOACTIVE_WASTE: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    RESEARCH_DATA: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    ROBOTICS: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    SHIP_PLATING: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    SILICON_CRYSTALS: {
        basePrice: 100,
        baseTradeVolume: 100,
    },
    SILVER: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    SILVER_ORE: {
        basePrice: 100,
        baseTradeVolume: 100,
    },
    SLAVES: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    SPICES: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    STIMULANTS: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    SUPERCONDUCTORS: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    URANITE: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    URANITE_ORE: {
        basePrice: 100,
        baseTradeVolume: 100,
    },
    VIRAL_VECTORS: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    THERMAL_REGULATORS: {
        basePrice: 1000,
        baseTradeVolume: 10,
    },
    TOURISTS: {
        basePrice: 1000,
        baseTradeVolume: 10,
    }
};

export const tradeGoodTypeNames = Object.keys(tradeGoods) as TradeGood[];
