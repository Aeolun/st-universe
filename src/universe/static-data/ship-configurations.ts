import {ShipConfiguration} from "src/universe/entities/ShipConfiguration";
import {Frame} from "src/universe/static-data/ship-frames";
import {Reactor} from "src/universe/static-data/ship-reactors";
import {Engine} from "src/universe/static-data/ship-engines";
import {Module} from "src/universe/static-data/ship-modules";
import {Mount} from "src/universe/static-data/ship-mounts";

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
  SHIP_REFINING_FREIGHTER = "SHIP_REFINING_FREIGHTER",
}

export const shipConfigurationData: Record<Configuration, ShipConfiguration> = {
  [Configuration.SHIP_COMMAND_FRIGATE]: new ShipConfiguration(
    Configuration.SHIP_COMMAND_FRIGATE,
    '',
    '',
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
    '',
    '',
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
    [
      Mount.MOUNT_LASER_CANNON_I,
      Mount.MOUNT_SENSOR_ARRAY_II,
    ]
  ),
  [Configuration.SHIP_HEAVY_FREIGHTER]: new ShipConfiguration(
    Configuration.SHIP_HEAVY_FREIGHTER,
    '',
    '',
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
      Module.MODULE_WARP_DRIVE_II,
      Module.MODULE_SHIELD_GENERATOR_II,
    ],
    [
      Mount.MOUNT_TURRET_I,
      Mount.MOUNT_TURRET_I,
      Mount.MOUNT_TURRET_I,
    ]
  ),
  [Configuration.SHIP_INTERCEPTOR]: new ShipConfiguration(
    Configuration.SHIP_INTERCEPTOR,
    '',
    '',
    Frame.FRAME_INTERCEPTOR,
    Reactor.REACTOR_CHEMICAL_I,
    Engine.ENGINE_ION_DRIVE_I,
    [
      Module.MODULE_CREW_QUARTERS_I,
    ],
    [
      Mount.MOUNT_MISSILE_LAUNCHER_I,
    ]
  ),
  [Configuration.SHIP_LIGHT_HAULER]: new ShipConfiguration(
    Configuration.SHIP_LIGHT_HAULER,
    '',
    '',
    Frame.FRAME_LIGHT_FREIGHTER,
    Reactor.REACTOR_CHEMICAL_I,
    Engine.ENGINE_ION_DRIVE_I,
    [
      Module.MODULE_CARGO_HOLD_I,
      Module.MODULE_CARGO_HOLD_I,
      Module.MODULE_CARGO_HOLD_I,
      Module.MODULE_CARGO_HOLD_I,
      Module.MODULE_CREW_QUARTERS_I,
      Module.MODULE_CREW_QUARTERS_I,
    ],
    [
      Mount.MOUNT_SURVEYOR_I,
    ]
  ),
  [Configuration.SHIP_LIGHT_SHUTTLE]: new ShipConfiguration(
    Configuration.SHIP_LIGHT_SHUTTLE,
    '',
    '',
    Frame.FRAME_SHUTTLE,
    Reactor.REACTOR_CHEMICAL_I,
    Engine.ENGINE_IMPULSE_DRIVE_I,
    [
      Module.MODULE_CARGO_HOLD_I,
      Module.MODULE_CREW_QUARTERS_I,
      Module.MODULE_PASSENGER_CABIN_I,
      Module.MODULE_ENVOY_QUARTERS_I,
    ],
    [
      Mount.MOUNT_TURRET_I,
    ]
  ),
  [Configuration.SHIP_MINING_DRONE]: new ShipConfiguration(
    Configuration.SHIP_MINING_DRONE,
    '',
    '',
    Frame.FRAME_DRONE,
    Reactor.REACTOR_CHEMICAL_I,
    Engine.ENGINE_IMPULSE_DRIVE_I,
    [
      Module.MODULE_CARGO_HOLD_I,
      Module.MODULE_MINERAL_PROCESSOR_I,
    ],
    [
      Mount.MOUNT_MINING_LASER_I,
    ]
  ),
  [Configuration.SHIP_ORE_HOUND]: new ShipConfiguration(
    Configuration.SHIP_ORE_HOUND,
    '',
    '',
    Frame.FRAME_MINER,
    Reactor.REACTOR_FISSION_I,
    Engine.ENGINE_ION_DRIVE_I,
    [
      Module.MODULE_CARGO_HOLD_I,
      Module.MODULE_CARGO_HOLD_I,
      Module.MODULE_MINERAL_PROCESSOR_I,
      Module.MODULE_CREW_QUARTERS_I,
    ],
    [
      Mount.MOUNT_MINING_LASER_II,
      Mount.MOUNT_SURVEYOR_I
    ]
  ),
  [Configuration.SHIP_PROBE]: new ShipConfiguration(
    Configuration.SHIP_PROBE,
    '',
    '',
    Frame.FRAME_PROBE,
    Reactor.REACTOR_SOLAR_I,
    Engine.ENGINE_IMPULSE_DRIVE_I,
    [],
    []
  ),
  [Configuration.SHIP_REFINING_FREIGHTER]: new ShipConfiguration(
    Configuration.SHIP_REFINING_FREIGHTER,
    '',
    '',
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
    [
      Mount.MOUNT_TURRET_I,
      Mount.MOUNT_TURRET_I,
      Mount.MOUNT_MISSILE_LAUNCHER_I,
    ]
  ),
}