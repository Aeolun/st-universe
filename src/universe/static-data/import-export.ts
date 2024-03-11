import { TradeSymbol } from "src/controllers/schemas";

export const SHIP_IMPORTS = ["SHIP_PLATING", "SHIP_PARTS"];

/**
 * A map of each export and the imports associated with that export.
 */
export const ExportImportsMap: Record<TradeSymbol, TradeSymbol[]> = {
  ["LIQUID_HYDROGEN"]: ["MACHINERY"],
  ["LIQUID_NITROGEN"]: ["MACHINERY"],
  ["HYDROCARBON"]: ["MACHINERY"],
  ["AMMONIA_ICE"]: ["MACHINERY"],
  ["ICE_WATER"]: ["MACHINERY"],

  ["PRECIOUS_STONES"]: ["EXPLOSIVES"],
  ["QUARTZ_SAND"]: ["EXPLOSIVES"],
  ["SILICON_CRYSTALS"]: ["EXPLOSIVES"],
  ["IRON_ORE"]: ["EXPLOSIVES"],
  ["ALUMINUM_ORE"]: ["EXPLOSIVES"],
  ["SILVER_ORE"]: ["EXPLOSIVES"],
  ["COPPER_ORE"]: ["EXPLOSIVES"],
  ["PLATINUM_ORE"]: ["EXPLOSIVES"],
  ["GOLD_ORE"]: ["EXPLOSIVES"],
  ["URANITE_ORE"]: ["EXPLOSIVES"],
  ["MERITIUM_ORE"]: ["EXPLOSIVES"],
  ["DIAMONDS"]: ["EXPLOSIVES"],

  ["SHIP_SALVAGE"]: ["MACHINERY"],
  ["CULTURAL_ARTIFACTS"]: ["LAB_INSTRUMENTS"],

  ["PLASTICS"]: ["LIQUID_HYDROGEN"],
  ["FERTILIZERS"]: ["LIQUID_NITROGEN"],
  ["FUEL"]: ["HYDROCARBON"],
  ["IRON"]: ["IRON_ORE"],
  ["ALUMINUM"]: ["ALUMINUM_ORE"],
  ["POLYNUCLEOTIDES"]: ["LIQUID_HYDROGEN", "LIQUID_NITROGEN"],
  ["EXPLOSIVES"]: ["LIQUID_HYDROGEN", "LIQUID_NITROGEN"],
  ["COPPER"]: ["COPPER_ORE"],
  ["SILVER"]: ["SILVER_ORE"],
  ["PLATINUM"]: ["PLATINUM_ORE"],
  ["GOLD"]: ["GOLD_ORE"],
  ["URANITE"]: ["URANITE_ORE"],
  ["MERITIUM"]: ["MERITIUM_ORE"],

  ["AMMUNITION"]: ["IRON", "LIQUID_NITROGEN"],
  ["FAB_MATS"]: ["IRON", "QUARTZ_SAND"],
  ["FOOD"]: ["FERTILIZERS"],
  ["FABRICS"]: ["FERTILIZERS"],
  ["ELECTRONICS"]: ["SILICON_CRYSTALS", "COPPER"],
  ["MACHINERY"]: ["IRON"],
  ["EQUIPMENT"]: ["ALUMINUM", "PLASTICS"],
  ["JEWELRY"]: ["GOLD", "SILVER", "PRECIOUS_STONES", "DIAMONDS"],
  ["MICROPROCESSORS"]: ["SILICON_CRYSTALS", "COPPER"],
  ["FIREARMS"]: ["IRON", "AMMUNITION"],
  ["ASSAULT_RIFLES"]: ["ALUMINUM", "AMMUNITION"],

  ["CLOTHING"]: ["FABRICS"],
  ["SHIP_PLATING"]: ["ALUMINUM", "MACHINERY"],
  ["SHIP_PARTS"]: ["EQUIPMENT", "ELECTRONICS"],
  ["MEDICINE"]: ["FABRICS", "POLYNUCLEOTIDES"],
  ["DRUGS"]: ["AMMONIA_ICE", "POLYNUCLEOTIDES"],
  ["MILITARY_EQUIPMENT"]: ["ALUMINUM", "ELECTRONICS"],
  ["LAB_INSTRUMENTS"]: ["ELECTRONICS", "EQUIPMENT"],
  ["BIOCOMPOSITES"]: ["FABRICS", "POLYNUCLEOTIDES"],
  ["ADVANCED_CIRCUITRY"]: ["ELECTRONICS", "MICROPROCESSORS"],
  ["REACTOR_SOLAR_I"]: ["IRON", "MACHINERY"],
  ["REACTOR_FUSION_I"]: ["IRON", "MACHINERY"],
  ["REACTOR_FISSION_I"]: ["IRON", "MACHINERY"],
  ["REACTOR_CHEMICAL_I"]: ["IRON", "MACHINERY"],
  ["REACTOR_ANTIMATTER_I"]: ["IRON", "MACHINERY"],
  ["ENGINE_IMPULSE_DRIVE_I"]: ["IRON", "MACHINERY"],
  ["ENGINE_ION_DRIVE_I"]: ["IRON", "MACHINERY"],
  ["MODULE_CARGO_HOLD_I"]: ["IRON", "MACHINERY"],
  ["MODULE_CARGO_HOLD_II"]: ["ALUMINUM", "MACHINERY"],
  ["MODULE_MINERAL_PROCESSOR_I"]: ["IRON", "MACHINERY"],
  ["MODULE_GAS_PROCESSOR_I"]: ["IRON", "MACHINERY"],
  ["MODULE_CREW_QUARTERS_I"]: ["IRON", "MACHINERY", "FABRICS"],
  ["MODULE_ENVOY_QUARTERS_I"]: ["IRON", "MACHINERY", "FABRICS"],
  ["MODULE_PASSENGER_CABIN_I"]: ["IRON", "MACHINERY", "FABRICS"],
  ["MODULE_SCIENCE_LAB_I"]: ["PLATINUM", "MACHINERY", "ADVANCED_CIRCUITRY"],
  ["MODULE_ORE_REFINERY_I"]: ["PLATINUM", "MACHINERY"],
  ["MODULE_FUEL_REFINERY_I"]: ["PLATINUM", "MACHINERY"],
  ["MODULE_MICRO_REFINERY_I"]: ["PLATINUM", "MACHINERY"],
  ["MOUNT_GAS_SIPHON_I"]: ["IRON", "MACHINERY"],
  ["MOUNT_GAS_SIPHON_II"]: ["ALUMINUM", "MACHINERY"],
  ["MOUNT_SURVEYOR_I"]: ["IRON", "MACHINERY", "ELECTRONICS"],
  ["MOUNT_SURVEYOR_II"]: ["ALUMINUM", "MACHINERY", "ELECTRONICS"],
  ["MOUNT_SENSOR_ARRAY_I"]: ["IRON", "MACHINERY", "ELECTRONICS"],
  ["MOUNT_SENSOR_ARRAY_II"]: ["ALUMINUM", "MACHINERY", "ELECTRONICS"],
  ["MOUNT_MINING_LASER_I"]: ["IRON", "MACHINERY", "DIAMONDS"],
  ["MOUNT_MINING_LASER_II"]: ["ALUMINUM", "MACHINERY", "DIAMONDS"],
  ["MOUNT_TURRET_I"]: ["IRON", "MACHINERY"],
  ["MOUNT_LASER_CANNON_I"]: ["IRON", "MACHINERY", "DIAMONDS"],
  ["MOUNT_MISSILE_LAUNCHER_I"]: ["IRON", "MACHINERY"],

  ["QUANTUM_STABILIZERS"]: ["PLATINUM", "ADVANCED_CIRCUITRY", "URANITE"],
  ["ANTIMATTER"]: ["LAB_INSTRUMENTS", "ADVANCED_CIRCUITRY"],
  ["EXOTIC_MATTER"]: ["LAB_INSTRUMENTS", "ADVANCED_CIRCUITRY"],
  ["RELIC_TECH"]: ["LAB_INSTRUMENTS", "EQUIPMENT"],
  ["NOVEL_LIFEFORMS"]: ["LAB_INSTRUMENTS", "EQUIPMENT"],
  ["BOTANICAL_SPECIMENS"]: ["LAB_INSTRUMENTS", "EQUIPMENT"],
  ["AI_MAINFRAMES"]: ["ADVANCED_CIRCUITRY", "MICROPROCESSORS"],
  ["QUANTUM_DRIVES"]: ["ADVANCED_CIRCUITRY", "URANITE"],
  ["GRAVITON_EMITTERS"]: ["ADVANCED_CIRCUITRY", "MERITIUM"],
  ["ROBOTIC_DRONES"]: ["ADVANCED_CIRCUITRY", "ALUMINUM"],
  ["CYBER_IMPLANTS"]: ["ADVANCED_CIRCUITRY", "BIOCOMPOSITES"],
  ["NANOBOTS"]: ["POLYNUCLEOTIDES", "LAB_INSTRUMENTS"],
  ["GENE_THERAPEUTICS"]: ["POLYNUCLEOTIDES", "LAB_INSTRUMENTS"],
  ["NEURAL_CHIPS"]: ["POLYNUCLEOTIDES", "ADVANCED_CIRCUITRY"],
  ["MOOD_REGULATORS"]: ["POLYNUCLEOTIDES", "LAB_INSTRUMENTS"],
  ["VIRAL_AGENTS"]: ["POLYNUCLEOTIDES", "LAB_INSTRUMENTS"],
  ["MICRO_FUSION_GENERATORS"]: ["ADVANCED_CIRCUITRY", "PLATINUM", "DIAMONDS"],
  ["SUPERGRAINS"]: ["FERTILIZERS", "POLYNUCLEOTIDES", "LAB_INSTRUMENTS"],
  ["LASER_RIFLES"]: ["DIAMONDS", "PLATINUM", "ADVANCED_CIRCUITRY"],
  ["HOLOGRAPHICS"]: ["GOLD", "SILVER", "ADVANCED_CIRCUITRY"],
  ["ENGINE_ION_DRIVE_II"]: ["PLATINUM", "ADVANCED_CIRCUITRY"],
  ["ENGINE_HYPER_DRIVE_I"]: ["PLATINUM", "ADVANCED_CIRCUITRY"],
  ["MODULE_CARGO_HOLD_III"]: ["PLATINUM", "MACHINERY", "ADVANCED_CIRCUITRY"],
  ["MODULE_JUMP_DRIVE_I"]: ["IRON", "ADVANCED_CIRCUITRY"],
  ["MODULE_JUMP_DRIVE_II"]: ["PLATINUM", "ADVANCED_CIRCUITRY", "GOLD"],
  ["MODULE_JUMP_DRIVE_III"]: [
    "PLATINUM",
    "ADVANCED_CIRCUITRY",
    "GOLD",
    "MERITIUM",
  ],
  ["MODULE_WARP_DRIVE_I"]: ["IRON", "ADVANCED_CIRCUITRY"],
  ["MODULE_WARP_DRIVE_II"]: ["PLATINUM", "ADVANCED_CIRCUITRY", "URANITE"],
  ["MODULE_WARP_DRIVE_III"]: [
    "PLATINUM",
    "ADVANCED_CIRCUITRY",
    "MERITIUM",
    "MERITIUM",
  ],
  ["MOUNT_GAS_SIPHON_III"]: ["PLATINUM", "MACHINERY", "ADVANCED_CIRCUITRY"],
  ["MODULE_SHIELD_GENERATOR_I"]: ["IRON", "MACHINERY", "URANITE"],
  ["MODULE_SHIELD_GENERATOR_II"]: ["ALUMINUM", "MACHINERY", "URANITE"],
  ["MOUNT_SURVEYOR_III"]: ["PLATINUM", "MACHINERY", "ADVANCED_CIRCUITRY"],
  ["MOUNT_SENSOR_ARRAY_III"]: [
    "PLATINUM",
    "MACHINERY",
    "ADVANCED_CIRCUITRY",
    "URANITE",
  ],
  ["MOUNT_MINING_LASER_III"]: [
    "PLATINUM",
    "MACHINERY",
    "ADVANCED_CIRCUITRY",
    "URANITE",
  ],
};
