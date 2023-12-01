export const SHIP_IMPORTS = [TradeSymbol.SHIP_PLATING, TradeSymbol.SHIP_PARTS];

/**
 * A map of each export and the imports associated with that export.
 */
export const ExportImportsMap: Record<ExportSymbol, TradeSymbol[]> = {
  [TradeSymbol.LIQUID_HYDROGEN]: [TradeSymbol.MACHINERY],
  [TradeSymbol.LIQUID_NITROGEN]: [TradeSymbol.MACHINERY],
  [TradeSymbol.HYDROCARBON]: [TradeSymbol.MACHINERY],
  [TradeSymbol.AMMONIA_ICE]: [TradeSymbol.MACHINERY],
  [TradeSymbol.ICE_WATER]: [TradeSymbol.MACHINERY],

  [TradeSymbol.PRECIOUS_STONES]: [TradeSymbol.EXPLOSIVES],
  [TradeSymbol.QUARTZ_SAND]: [TradeSymbol.EXPLOSIVES],
  [TradeSymbol.SILICON_CRYSTALS]: [TradeSymbol.EXPLOSIVES],
  [TradeSymbol.IRON_ORE]: [TradeSymbol.EXPLOSIVES],
  [TradeSymbol.ALUMINUM_ORE]: [TradeSymbol.EXPLOSIVES],
  [TradeSymbol.SILVER_ORE]: [TradeSymbol.EXPLOSIVES],
  [TradeSymbol.COPPER_ORE]: [TradeSymbol.EXPLOSIVES],
  [TradeSymbol.PLATINUM_ORE]: [TradeSymbol.EXPLOSIVES],
  [TradeSymbol.GOLD_ORE]: [TradeSymbol.EXPLOSIVES],
  [TradeSymbol.URANITE_ORE]: [TradeSymbol.EXPLOSIVES],
  [TradeSymbol.MERITIUM_ORE]: [TradeSymbol.EXPLOSIVES],
  [TradeSymbol.DIAMONDS]: [TradeSymbol.EXPLOSIVES],

  [TradeSymbol.SHIP_SALVAGE]: [TradeSymbol.MACHINERY],
  [TradeSymbol.CULTURAL_ARTIFACTS]: [TradeSymbol.LAB_INSTRUMENTS],

  [TradeSymbol.PLASTICS]: [TradeSymbol.LIQUID_HYDROGEN],
  [TradeSymbol.FERTILIZERS]: [TradeSymbol.LIQUID_NITROGEN],
  [TradeSymbol.FUEL]: [TradeSymbol.HYDROCARBON],
  [TradeSymbol.IRON]: [TradeSymbol.IRON_ORE],
  [TradeSymbol.ALUMINUM]: [TradeSymbol.ALUMINUM_ORE],
  [TradeSymbol.POLYNUCLEOTIDES]: [
    TradeSymbol.LIQUID_HYDROGEN,
    TradeSymbol.LIQUID_NITROGEN,
  ],
  [TradeSymbol.EXPLOSIVES]: [
    TradeSymbol.LIQUID_HYDROGEN,
    TradeSymbol.LIQUID_NITROGEN,
  ],
  [TradeSymbol.COPPER]: [TradeSymbol.COPPER_ORE],
  [TradeSymbol.SILVER]: [TradeSymbol.SILVER_ORE],
  [TradeSymbol.PLATINUM]: [TradeSymbol.PLATINUM_ORE],
  [TradeSymbol.GOLD]: [TradeSymbol.GOLD_ORE],
  [TradeSymbol.URANITE]: [TradeSymbol.URANITE_ORE],
  [TradeSymbol.MERITIUM]: [TradeSymbol.MERITIUM_ORE],

  [TradeSymbol.AMMUNITION]: [TradeSymbol.IRON, TradeSymbol.LIQUID_NITROGEN],
  [TradeSymbol.FAB_MATS]: [TradeSymbol.IRON, TradeSymbol.QUARTZ_SAND],
  [TradeSymbol.FOOD]: [TradeSymbol.FERTILIZERS],
  [TradeSymbol.FABRICS]: [TradeSymbol.FERTILIZERS],
  [TradeSymbol.ELECTRONICS]: [TradeSymbol.SILICON_CRYSTALS, TradeSymbol.COPPER],
  [TradeSymbol.MACHINERY]: [TradeSymbol.IRON],
  [TradeSymbol.EQUIPMENT]: [TradeSymbol.ALUMINUM, TradeSymbol.PLASTICS],
  [TradeSymbol.JEWELRY]: [
    TradeSymbol.GOLD,
    TradeSymbol.SILVER,
    TradeSymbol.PRECIOUS_STONES,
    TradeSymbol.DIAMONDS,
  ],
  [TradeSymbol.MICROPROCESSORS]: [
    TradeSymbol.SILICON_CRYSTALS,
    TradeSymbol.COPPER,
  ],
  [TradeSymbol.FIREARMS]: [TradeSymbol.IRON, TradeSymbol.AMMUNITION],
  [TradeSymbol.ASSAULT_RIFLES]: [TradeSymbol.ALUMINUM, TradeSymbol.AMMUNITION],

  [TradeSymbol.CLOTHING]: [TradeSymbol.FABRICS],
  [TradeSymbol.SHIP_PLATING]: [TradeSymbol.ALUMINUM, TradeSymbol.MACHINERY],
  [TradeSymbol.SHIP_PARTS]: [TradeSymbol.EQUIPMENT, TradeSymbol.ELECTRONICS],
  [TradeSymbol.MEDICINE]: [TradeSymbol.FABRICS, TradeSymbol.POLYNUCLEOTIDES],
  [TradeSymbol.DRUGS]: [TradeSymbol.AMMONIA_ICE, TradeSymbol.POLYNUCLEOTIDES],
  [TradeSymbol.MILITARY_EQUIPMENT]: [
    TradeSymbol.ALUMINUM,
    TradeSymbol.ELECTRONICS,
  ],
  [TradeSymbol.LAB_INSTRUMENTS]: [
    TradeSymbol.ELECTRONICS,
    TradeSymbol.EQUIPMENT,
  ],
  [TradeSymbol.BIOCOMPOSITES]: [
    TradeSymbol.FABRICS,
    TradeSymbol.POLYNUCLEOTIDES,
  ],
  [TradeSymbol.ADVANCED_CIRCUITRY]: [
    TradeSymbol.ELECTRONICS,
    TradeSymbol.MICROPROCESSORS,
  ],
  [TradeSymbol.REACTOR_SOLAR_I]: [TradeSymbol.IRON, TradeSymbol.MACHINERY],
  [TradeSymbol.REACTOR_FUSION_I]: [TradeSymbol.IRON, TradeSymbol.MACHINERY],
  [TradeSymbol.REACTOR_FISSION_I]: [TradeSymbol.IRON, TradeSymbol.MACHINERY],
  [TradeSymbol.REACTOR_CHEMICAL_I]: [TradeSymbol.IRON, TradeSymbol.MACHINERY],
  [TradeSymbol.REACTOR_ANTIMATTER_I]: [TradeSymbol.IRON, TradeSymbol.MACHINERY],
  [TradeSymbol.ENGINE_IMPULSE_DRIVE_I]: [
    TradeSymbol.IRON,
    TradeSymbol.MACHINERY,
  ],
  [TradeSymbol.ENGINE_ION_DRIVE_I]: [TradeSymbol.IRON, TradeSymbol.MACHINERY],
  [TradeSymbol.MODULE_CARGO_HOLD_I]: [TradeSymbol.IRON, TradeSymbol.MACHINERY],
  [TradeSymbol.MODULE_CARGO_HOLD_II]: [
    TradeSymbol.ALUMINUM,
    TradeSymbol.MACHINERY,
  ],
  [TradeSymbol.MODULE_MINERAL_PROCESSOR_I]: [
    TradeSymbol.IRON,
    TradeSymbol.MACHINERY,
  ],
  [TradeSymbol.MODULE_GAS_PROCESSOR_I]: [
    TradeSymbol.IRON,
    TradeSymbol.MACHINERY,
  ],
  [TradeSymbol.MODULE_CREW_QUARTERS_I]: [
    TradeSymbol.IRON,
    TradeSymbol.MACHINERY,
    TradeSymbol.FABRICS,
  ],
  [TradeSymbol.MODULE_ENVOY_QUARTERS_I]: [
    TradeSymbol.IRON,
    TradeSymbol.MACHINERY,
    TradeSymbol.FABRICS,
  ],
  [TradeSymbol.MODULE_PASSENGER_CABIN_I]: [
    TradeSymbol.IRON,
    TradeSymbol.MACHINERY,
    TradeSymbol.FABRICS,
  ],
  [TradeSymbol.MODULE_SCIENCE_LAB_I]: [
    TradeSymbol.PLATINUM,
    TradeSymbol.MACHINERY,
    TradeSymbol.ADVANCED_CIRCUITRY,
  ],
  [TradeSymbol.MODULE_ORE_REFINERY_I]: [
    TradeSymbol.PLATINUM,
    TradeSymbol.MACHINERY,
  ],
  [TradeSymbol.MODULE_FUEL_REFINERY_I]: [
    TradeSymbol.PLATINUM,
    TradeSymbol.MACHINERY,
  ],
  [TradeSymbol.MODULE_MICRO_REFINERY_I]: [
    TradeSymbol.PLATINUM,
    TradeSymbol.MACHINERY,
  ],
  [TradeSymbol.MOUNT_GAS_SIPHON_I]: [TradeSymbol.IRON, TradeSymbol.MACHINERY],
  [TradeSymbol.MOUNT_GAS_SIPHON_II]: [
    TradeSymbol.ALUMINUM,
    TradeSymbol.MACHINERY,
  ],
  [TradeSymbol.MOUNT_SURVEYOR_I]: [
    TradeSymbol.IRON,
    TradeSymbol.MACHINERY,
    TradeSymbol.ELECTRONICS,
  ],
  [TradeSymbol.MOUNT_SURVEYOR_II]: [
    TradeSymbol.ALUMINUM,
    TradeSymbol.MACHINERY,
    TradeSymbol.ELECTRONICS,
  ],
  [TradeSymbol.MOUNT_SENSOR_ARRAY_I]: [
    TradeSymbol.IRON,
    TradeSymbol.MACHINERY,
    TradeSymbol.ELECTRONICS,
  ],
  [TradeSymbol.MOUNT_SENSOR_ARRAY_II]: [
    TradeSymbol.ALUMINUM,
    TradeSymbol.MACHINERY,
    TradeSymbol.ELECTRONICS,
  ],
  [TradeSymbol.MOUNT_MINING_LASER_I]: [
    TradeSymbol.IRON,
    TradeSymbol.MACHINERY,
    TradeSymbol.DIAMONDS,
  ],
  [TradeSymbol.MOUNT_MINING_LASER_II]: [
    TradeSymbol.ALUMINUM,
    TradeSymbol.MACHINERY,
    TradeSymbol.DIAMONDS,
  ],
  [TradeSymbol.MOUNT_TURRET_I]: [TradeSymbol.IRON, TradeSymbol.MACHINERY],
  [TradeSymbol.MOUNT_LASER_CANNON_I]: [
    TradeSymbol.IRON,
    TradeSymbol.MACHINERY,
    TradeSymbol.DIAMONDS,
  ],
  [TradeSymbol.MOUNT_MISSILE_LAUNCHER_I]: [
    TradeSymbol.IRON,
    TradeSymbol.MACHINERY,
  ],

  [TradeSymbol.QUANTUM_STABILIZERS]: [
    TradeSymbol.PLATINUM,
    TradeSymbol.ADVANCED_CIRCUITRY,
    TradeSymbol.URANITE,
  ],
  [TradeSymbol.ANTIMATTER]: [
    TradeSymbol.LAB_INSTRUMENTS,
    TradeSymbol.ADVANCED_CIRCUITRY,
  ],
  [TradeSymbol.EXOTIC_MATTER]: [
    TradeSymbol.LAB_INSTRUMENTS,
    TradeSymbol.ADVANCED_CIRCUITRY,
  ],
  [TradeSymbol.RELIC_TECH]: [
    TradeSymbol.LAB_INSTRUMENTS,
    TradeSymbol.EQUIPMENT,
  ],
  [TradeSymbol.NOVEL_LIFEFORMS]: [
    TradeSymbol.LAB_INSTRUMENTS,
    TradeSymbol.EQUIPMENT,
  ],
  [TradeSymbol.BOTANICAL_SPECIMENS]: [
    TradeSymbol.LAB_INSTRUMENTS,
    TradeSymbol.EQUIPMENT,
  ],
  [TradeSymbol.AI_MAINFRAMES]: [
    TradeSymbol.ADVANCED_CIRCUITRY,
    TradeSymbol.MICROPROCESSORS,
  ],
  [TradeSymbol.QUANTUM_DRIVES]: [
    TradeSymbol.ADVANCED_CIRCUITRY,
    TradeSymbol.URANITE,
  ],
  [TradeSymbol.GRAVITON_EMITTERS]: [
    TradeSymbol.ADVANCED_CIRCUITRY,
    TradeSymbol.MERITIUM,
  ],
  [TradeSymbol.ROBOTIC_DRONES]: [
    TradeSymbol.ADVANCED_CIRCUITRY,
    TradeSymbol.ALUMINUM,
  ],
  [TradeSymbol.CYBER_IMPLANTS]: [
    TradeSymbol.ADVANCED_CIRCUITRY,
    TradeSymbol.BIOCOMPOSITES,
  ],
  [TradeSymbol.NANOBOTS]: [
    TradeSymbol.POLYNUCLEOTIDES,
    TradeSymbol.LAB_INSTRUMENTS,
  ],
  [TradeSymbol.GENE_THERAPEUTICS]: [
    TradeSymbol.POLYNUCLEOTIDES,
    TradeSymbol.LAB_INSTRUMENTS,
  ],
  [TradeSymbol.NEURAL_CHIPS]: [
    TradeSymbol.POLYNUCLEOTIDES,
    TradeSymbol.ADVANCED_CIRCUITRY,
  ],
  [TradeSymbol.MOOD_REGULATORS]: [
    TradeSymbol.POLYNUCLEOTIDES,
    TradeSymbol.LAB_INSTRUMENTS,
  ],
  [TradeSymbol.VIRAL_AGENTS]: [
    TradeSymbol.POLYNUCLEOTIDES,
    TradeSymbol.LAB_INSTRUMENTS,
  ],
  [TradeSymbol.MICRO_FUSION_GENERATORS]: [
    TradeSymbol.ADVANCED_CIRCUITRY,
    TradeSymbol.PLATINUM,
    TradeSymbol.DIAMONDS,
  ],
  [TradeSymbol.SUPERGRAINS]: [
    TradeSymbol.FERTILIZERS,
    TradeSymbol.POLYNUCLEOTIDES,
    TradeSymbol.LAB_INSTRUMENTS,
  ],
  [TradeSymbol.LASER_RIFLES]: [
    TradeSymbol.DIAMONDS,
    TradeSymbol.PLATINUM,
    TradeSymbol.ADVANCED_CIRCUITRY,
  ],
  [TradeSymbol.HOLOGRAPHICS]: [
    TradeSymbol.GOLD,
    TradeSymbol.SILVER,
    TradeSymbol.ADVANCED_CIRCUITRY,
  ],
  [TradeSymbol.ENGINE_ION_DRIVE_II]: [
    TradeSymbol.PLATINUM,
    TradeSymbol.ADVANCED_CIRCUITRY,
  ],
  [TradeSymbol.ENGINE_HYPER_DRIVE_I]: [
    TradeSymbol.PLATINUM,
    TradeSymbol.ADVANCED_CIRCUITRY,
  ],
  [TradeSymbol.MODULE_CARGO_HOLD_III]: [
    TradeSymbol.PLATINUM,
    TradeSymbol.MACHINERY,
    TradeSymbol.ADVANCED_CIRCUITRY,
  ],
  [TradeSymbol.MODULE_JUMP_DRIVE_I]: [
    TradeSymbol.IRON,
    TradeSymbol.ADVANCED_CIRCUITRY,
  ],
  [TradeSymbol.MODULE_JUMP_DRIVE_II]: [
    TradeSymbol.PLATINUM,
    TradeSymbol.ADVANCED_CIRCUITRY,
    TradeSymbol.GOLD,
  ],
  [TradeSymbol.MODULE_JUMP_DRIVE_III]: [
    TradeSymbol.PLATINUM,
    TradeSymbol.ADVANCED_CIRCUITRY,
    TradeSymbol.GOLD,
    TradeSymbol.MERITIUM,
  ],
  [TradeSymbol.MODULE_WARP_DRIVE_I]: [
    TradeSymbol.IRON,
    TradeSymbol.ADVANCED_CIRCUITRY,
  ],
  [TradeSymbol.MODULE_WARP_DRIVE_II]: [
    TradeSymbol.PLATINUM,
    TradeSymbol.ADVANCED_CIRCUITRY,
    TradeSymbol.URANITE,
  ],
  [TradeSymbol.MODULE_WARP_DRIVE_III]: [
    TradeSymbol.PLATINUM,
    TradeSymbol.ADVANCED_CIRCUITRY,
    TradeSymbol.MERITIUM,
    TradeSymbol.MERITIUM,
  ],
  [TradeSymbol.MOUNT_GAS_SIPHON_III]: [
    TradeSymbol.PLATINUM,
    TradeSymbol.MACHINERY,
    TradeSymbol.ADVANCED_CIRCUITRY,
  ],
  [TradeSymbol.MODULE_SHIELD_GENERATOR_I]: [
    TradeSymbol.IRON,
    TradeSymbol.MACHINERY,
    TradeSymbol.URANITE,
  ],
  [TradeSymbol.MODULE_SHIELD_GENERATOR_II]: [
    TradeSymbol.ALUMINUM,
    TradeSymbol.MACHINERY,
    TradeSymbol.URANITE,
  ],
  [TradeSymbol.MOUNT_SURVEYOR_III]: [
    TradeSymbol.PLATINUM,
    TradeSymbol.MACHINERY,
    TradeSymbol.ADVANCED_CIRCUITRY,
  ],
  [TradeSymbol.MOUNT_SENSOR_ARRAY_III]: [
    TradeSymbol.PLATINUM,
    TradeSymbol.MACHINERY,
    TradeSymbol.ADVANCED_CIRCUITRY,
    TradeSymbol.URANITE,
  ],
  [TradeSymbol.MOUNT_MINING_LASER_III]: [
    TradeSymbol.PLATINUM,
    TradeSymbol.MACHINERY,
    TradeSymbol.ADVANCED_CIRCUITRY,
    TradeSymbol.URANITE,
  ],

  [TradeSymbol.SHIP_PROBE]: SHIP_IMPORTS,
  [TradeSymbol.SHIP_MINING_DRONE]: SHIP_IMPORTS,
  [TradeSymbol.SHIP_SIPHON_DRONE]: SHIP_IMPORTS,
  [TradeSymbol.SHIP_LIGHT_HAULER]: SHIP_IMPORTS,
  [TradeSymbol.SHIP_COMMAND_FRIGATE]: SHIP_IMPORTS,
  [TradeSymbol.SHIP_INTERCEPTOR]: SHIP_IMPORTS,
  [TradeSymbol.SHIP_EXPLORER]: SHIP_IMPORTS,
  [TradeSymbol.SHIP_LIGHT_SHUTTLE]: SHIP_IMPORTS,
  [TradeSymbol.SHIP_HEAVY_FREIGHTER]: SHIP_IMPORTS,
  [TradeSymbol.SHIP_ORE_HOUND]: SHIP_IMPORTS,
  [TradeSymbol.SHIP_REFINING_FREIGHTER]: SHIP_IMPORTS,
  [TradeSymbol.SHIP_SURVEYOR]: SHIP_IMPORTS,
};
