import { ShipConfiguration } from "src/universe/entities/ShipConfiguration";
import { Frame } from "src/universe/static-data/ship-frames";
import { Reactor } from "src/universe/static-data/ship-reactors";
import { Engine } from "src/universe/static-data/ship-engines";
import { Module } from "src/universe/static-data/ship-modules";
import { Mount } from "src/universe/static-data/ship-mounts";
import { ShipRole } from "src/controllers/schemas/ship-role";
import { Ship } from "src/universe/entities/Ship";

export enum Configuration {
  SHIP_COMMAND_FRIGATE = "SHIP_COMMAND_FRIGATE",
  SHIP_EXPLORER = "SHIP_EXPLORER",
  SHIP_HEAVY_FREIGHTER = "SHIP_HEAVY_FREIGHTER",
  SHIP_INTERCEPTOR = "SHIP_INTERCEPTOR",
  SHIP_LIGHT_HAULER = "SHIP_LIGHT_HAULER",
  SHIP_LIGHT_SHUTTLE = "SHIP_LIGHT_SHUTTLE",
  SHIP_MINING_DRONE = "SHIP_MINING_DRONE",
  SHIP_ORE_HOUND = "SHIP_ORE_HOUND",
  SHIP_PROBE = "SHIP_PROBE",
  SHIP_SIPHON_DRONE = "SHIP_SIPHON_DRONE",
  SHIP_SURVEYOR = "SHIP_SURVEYOR",
  SHIP_REFINING_FREIGHTER = "SHIP_REFINING_FREIGHTER",
}

export type ConfigurationKeys = keyof typeof Configuration;

export const shipConfigurationData: Record<Configuration, ShipConfiguration> = {
  [Configuration.SHIP_SIPHON_DRONE]: new ShipConfiguration(
    Configuration.SHIP_SIPHON_DRONE,
    "Siphon Drone",
    "",
    ShipRole.Excavator,
    Frame.FRAME_DRONE,
    Reactor.REACTOR_FUSION_I,
    Engine.ENGINE_IMPULSE_DRIVE_I,
    [Module.MODULE_CARGO_HOLD_I, Module.MODULE_GAS_PROCESSOR_I],
    [Mount.MOUNT_GAS_SIPHON_I]
  ),
  [Configuration.SHIP_SURVEYOR]: new ShipConfiguration(
    Configuration.SHIP_SIPHON_DRONE,
    "Surveyor Craft",
    "A specialized spacecraft equipped with surveying mounts, designed for detailed surveying of celestial bodies, resource identification, and scientific research.",
    ShipRole.Surveyor,
    Frame.FRAME_DRONE,
    Reactor.REACTOR_CHEMICAL_I,
    Engine.ENGINE_IMPULSE_DRIVE_I,
    [],
    [Mount.MOUNT_SURVEYOR_I]
  ),
  [Configuration.SHIP_COMMAND_FRIGATE]: new ShipConfiguration(
    Configuration.SHIP_COMMAND_FRIGATE,
    "Command Frigate",
    "",
    ShipRole.Command,
    Frame.FRAME_FRIGATE,
    Reactor.REACTOR_FUSION_I,
    Engine.ENGINE_ION_DRIVE_II,
    [
      Module.MODULE_CARGO_HOLD_I,
      Module.MODULE_CARGO_HOLD_I,
      Module.MODULE_CREW_QUARTERS_I,
      Module.MODULE_CREW_QUARTERS_I,
      Module.MODULE_MINERAL_PROCESSOR_I,
      Module.MODULE_JUMP_DRIVE_I,
      Module.MODULE_WARP_DRIVE_I,
    ],
    [
      Mount.MOUNT_MINING_LASER_I,
      Mount.MOUNT_SURVEYOR_I,
      Mount.MOUNT_SENSOR_ARRAY_I,
    ]
  ),
  [Configuration.SHIP_EXPLORER]: new ShipConfiguration(
    Configuration.SHIP_EXPLORER,
    "Explorer",
    "",
    ShipRole.Explorer,
    Frame.FRAME_EXPLORER,
    Reactor.REACTOR_FUSION_I,
    Engine.ENGINE_ION_DRIVE_II,
    [
      Module.MODULE_CARGO_HOLD_I,
      Module.MODULE_CREW_QUARTERS_I,
      Module.MODULE_CREW_QUARTERS_I,
      Module.MODULE_SCIENCE_LAB_I,
      Module.MODULE_WARP_DRIVE_I,
      Module.MODULE_SHIELD_GENERATOR_I,
    ],
    [Mount.MOUNT_LASER_CANNON_I, Mount.MOUNT_SENSOR_ARRAY_II]
  ),
  [Configuration.SHIP_HEAVY_FREIGHTER]: new ShipConfiguration(
    Configuration.SHIP_HEAVY_FREIGHTER,
    "Heavy Freighter",
    "",
    ShipRole.Hauler,
    Frame.FRAME_HEAVY_FREIGHTER,
    Reactor.REACTOR_FUSION_I,
    Engine.ENGINE_ION_DRIVE_II,
    [
      Module.MODULE_CARGO_HOLD_I,
      Module.MODULE_CARGO_HOLD_I,
      Module.MODULE_CARGO_HOLD_I,
      Module.MODULE_CARGO_HOLD_I,
      Module.MODULE_CARGO_HOLD_I,
      Module.MODULE_CARGO_HOLD_I,
      Module.MODULE_CREW_QUARTERS_I,
      Module.MODULE_CREW_QUARTERS_I,
      Module.MODULE_CREW_QUARTERS_I,
      Module.MODULE_CREW_QUARTERS_I,
      Module.MODULE_WARP_DRIVE_II,
      Module.MODULE_SHIELD_GENERATOR_II,
    ],
    [Mount.MOUNT_TURRET_I, Mount.MOUNT_TURRET_I, Mount.MOUNT_TURRET_I]
  ),
  [Configuration.SHIP_INTERCEPTOR]: new ShipConfiguration(
    Configuration.SHIP_INTERCEPTOR,
    "Interceptor",
    "",
    ShipRole.Interceptor,
    Frame.FRAME_INTERCEPTOR,
    Reactor.REACTOR_CHEMICAL_I,
    Engine.ENGINE_ION_DRIVE_I,
    [Module.MODULE_CREW_QUARTERS_I],
    [Mount.MOUNT_MISSILE_LAUNCHER_I]
  ),
  [Configuration.SHIP_LIGHT_HAULER]: new ShipConfiguration(
    Configuration.SHIP_LIGHT_HAULER,
    "Light Hauler",
    "A small, fast cargo ship that is designed for short-range transport of light loads.",
    ShipRole.Hauler,
    Frame.FRAME_LIGHT_FREIGHTER,
    Reactor.REACTOR_CHEMICAL_I,
    Engine.ENGINE_ION_DRIVE_I,
    [
      Module.MODULE_CARGO_HOLD_II,
      Module.MODULE_CARGO_HOLD_II,
      Module.MODULE_CREW_QUARTERS_I,
      Module.MODULE_CREW_QUARTERS_I,
    ],
    [Mount.MOUNT_TURRET_I]
  ),
  [Configuration.SHIP_LIGHT_SHUTTLE]: new ShipConfiguration(
    Configuration.SHIP_LIGHT_SHUTTLE,
    "Shuttle",
    "",
    ShipRole.Transport,
    Frame.FRAME_SHUTTLE,
    Reactor.REACTOR_CHEMICAL_I,
    Engine.ENGINE_IMPULSE_DRIVE_I,
    [Module.MODULE_CARGO_HOLD_II, Module.MODULE_CREW_QUARTERS_I],
    [Mount.MOUNT_TURRET_I]
  ),
  [Configuration.SHIP_MINING_DRONE]: new ShipConfiguration(
    Configuration.SHIP_MINING_DRONE,
    "Mining Drone",
    "A small, unmanned spacecraft that can be used for mining operations, such as extracting valuable minerals from asteroids.",
    ShipRole.Excavator,
    Frame.FRAME_DRONE,
    Reactor.REACTOR_CHEMICAL_I,
    Engine.ENGINE_IMPULSE_DRIVE_I,
    [Module.MODULE_CARGO_HOLD_I, Module.MODULE_MINERAL_PROCESSOR_I],
    [Mount.MOUNT_MINING_LASER_I]
  ),
  [Configuration.SHIP_ORE_HOUND]: new ShipConfiguration(
    Configuration.SHIP_ORE_HOUND,
    "Ore Hound",
    "The Ore Hound is a specialized mining ship designed for extracting valuable ores and minerals from asteroids and other celestial bodies. With its advanced mining lasers and reinforced hull, the Ore Hound is capable of excavating large amounts of ore and minerals from even the toughest asteroids. It is equipped with a range of modules and mounts for handling a variety of mining and defensive needs, and is an essential vessel for miners and traders looking to profit from the rich resources of the galaxy.",
    ShipRole.Excavator,
    Frame.FRAME_MINER,
    Reactor.REACTOR_FISSION_I,
    Engine.ENGINE_ION_DRIVE_I,
    [
      Module.MODULE_CARGO_HOLD_I,
      Module.MODULE_CARGO_HOLD_I,
      Module.MODULE_MINERAL_PROCESSOR_I,
      Module.MODULE_CREW_QUARTERS_I,
    ],
    [Mount.MOUNT_MINING_LASER_II, Mount.MOUNT_SURVEYOR_I]
  ),
  [Configuration.SHIP_PROBE]: new ShipConfiguration(
    Configuration.SHIP_PROBE,
    "Probe",
    "",
    ShipRole.Satellite,
    Frame.FRAME_PROBE,
    Reactor.REACTOR_SOLAR_I,
    Engine.ENGINE_IMPULSE_DRIVE_I,
    [],
    []
  ),
  [Configuration.SHIP_REFINING_FREIGHTER]: new ShipConfiguration(
    Configuration.SHIP_REFINING_FREIGHTER,
    "Refining Freighter",
    "",
    ShipRole.Refinery,
    Frame.FRAME_HEAVY_FREIGHTER,
    Reactor.REACTOR_FUSION_I,
    Engine.ENGINE_ION_DRIVE_II,
    [
      Module.MODULE_CARGO_HOLD_I,
      Module.MODULE_CARGO_HOLD_I,
      Module.MODULE_CARGO_HOLD_I,
      Module.MODULE_CARGO_HOLD_I,
      Module.MODULE_CREW_QUARTERS_I,
      Module.MODULE_CREW_QUARTERS_I,
      Module.MODULE_CREW_QUARTERS_I,
      Module.MODULE_CREW_QUARTERS_I,
      Module.MODULE_ORE_REFINERY_I,
    ],
    [Mount.MOUNT_TURRET_I, Mount.MOUNT_TURRET_I, Mount.MOUNT_MISSILE_LAUNCHER_I]
  ),
};
