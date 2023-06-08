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
  { basePrice: number; illegal?: boolean }
> = {
    ADVANCED_CIRCUITRY: {
        basePrice: 1000,
    },
    AI_MAINFRAMES: {
        basePrice: 1000,
    },
    ALUMINUM: {
        basePrice: 50,
    },
    ALUMINUM_ORE: {
        basePrice: 10,
    },
    AMMONIA_ICE: {
        basePrice: 100,
    },
    AMMUNITION: {
        basePrice: 100,
    },
    ANTIMATTER: {
        basePrice: 100000,
    },
    BIOCOMPOSITES: {
        basePrice: 1000,
    },
    BOTANICAL_SPECIMENS: {
        basePrice: 1000,
    },
    CLOTHING: {
        basePrice: 1000,
    },
    COPPER: {
        basePrice: 1000,
    },
    COPPER_ORE: {
        basePrice: 100,
    },
    CYBERNETIC_IMPLANTS: {
        basePrice: 1000,
    },
    DIAMONDS: {
        basePrice: 5000,
    },
    DRUGS: {
        basePrice: 1000,
        illegal: true,
    },
    ELECTRONICS: {
        basePrice: 1000,
    },
    EQUIPMENT: {
        basePrice: 1000,
    },
    EXOTIC_MATTER: {
        basePrice: 100000,
    },
    EXPLOSIVES: {
        basePrice: 1000,
    },
    FABRICS: {
        basePrice: 1000,
    },
    FERTILIZERS: {
        basePrice: 1000,
    },
    FIREARMS: {
        basePrice: 5000,
    },
    FOOD: {
        basePrice: 1000,
    },
    FUEL: {
        basePrice: 1000,
    },
    GENETHERAPEUTICS: {
        basePrice: 1000,
    },
    GOLD: {
        basePrice: 1000,
    },
    GOLD_ORE: {
        basePrice: 100,
    },
    GRAVITON_EMITTERS: {
        basePrice: 1000,
    },
    HEAVY_MACHINERY: {
        basePrice: 2000,
    },
    HOLOGRAPHICS: {
        basePrice: 1000,
    },
    HYDROCARBONS: {
        basePrice: 1000,
    },
    ICE_WATER: {
        basePrice: 1000,
    },
    IRON: {
        basePrice: 1000,
    },
    IRON_ORE: {
        basePrice: 100,
    },
    JEWELRY: {
        basePrice: 1000,
    },
    LAB_INSTRUMENTS: {
        basePrice: 1000,
    },
    LIVESTOCK: {
        basePrice: 1000,
    },
    LUXURY_GOODS: {
        basePrice: 1000,
    },
    MACHINERY: {
        basePrice: 1000,
    },
    MEDICAL_SUPPLIES: {
        basePrice: 1000,
    },
    MERITIUM: {
        basePrice: 1000,
    },
    MERITIUM_ORE: {
        basePrice: 100,
    },
    FUSION_GENERATORS: {
        basePrice: 1000,
    },
    MILITARY_EQUIPMENT: {
        basePrice: 1000,
    },
    MOOD_REGULATORS: {
        basePrice: 1000,
        illegal: true,
    },
    NANOBOTS: {
        basePrice: 1000,
    },
    NEURAL_CHIPS: {
        basePrice: 1000,
    },
    NOVEL_LIFEFORMS: {
        basePrice: 1000,
    },
    NUCLEAR_DEVICES: {
        basePrice: 1000,
    },
    PLASTICS: {
        basePrice: 1000,
    },
    PLATINUM: {
        basePrice: 1000,
    },
    PLATINUM_ORE: {
        basePrice: 100,
    },
    POLYNUCLEOTIDES: {
        basePrice: 1000,
    },
    PRECIOUS_STONES: {
        basePrice: 1000,
    },
    QUANTUM_DRIVES: {
        basePrice: 1000,
    },
    QUARTZ_SAND: {
        basePrice: 1000,
    },
    RADIOACTIVE_WASTE: {
        basePrice: 1000,
    },
    RESEARCH_DATA: {
        basePrice: 1000,
    },
    ROBOTICS: {
        basePrice: 1000,
    },
    SHIP_PLATING: {
        basePrice: 1000,
    },
    SILICON_CRYSTALS: {
        basePrice: 100,
    },
    SILVER: {
        basePrice: 1000,
    },
    SILVER_ORE: {
        basePrice: 100,
    },
    SLAVES: {
        basePrice: 1000,
    },
    SPICES: {
        basePrice: 1000,
    },
    STIMULANTS: {
        basePrice: 1000,
    },
    SUPERCONDUCTORS: {
        basePrice: 1000,
    },
    URANITE: {
        basePrice: 1000,
    },
    URANITE_ORE: {
        basePrice: 100,
    },
    VIRAL_VECTORS: {
        basePrice: 1000,
    },
    THERMAL_REGULATORS: {
        basePrice: 1000,
    },
    TOURISTS: {
        basePrice: 1000,
    }
};

export const tradeGoodTypeNames = Object.keys(tradeGoods) as TradeGood[];
