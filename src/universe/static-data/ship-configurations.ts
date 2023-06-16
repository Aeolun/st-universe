import {ShipConfiguration} from "src/universe/entities/ShipConfiguration";
import {Frame, frameData} from "src/universe/static-data/ship-frames";
import {Reactor, reactorData} from "src/universe/static-data/ship-reactors";
import {Engine, engineData} from "src/universe/static-data/ship-engines";
import {Module, moduleData} from "src/universe/static-data/ship-modules";
import {Mount, mountData} from "src/universe/static-data/ship-mounts";

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
    frameData[Frame.FRAME_FRIGATE],
    reactorData[Reactor.REACTOR_FUSION_I],
    engineData[Engine.ENGINE_ION_DRIVE_II],
    [
      moduleData[Module.MODULE_CARGO_HOLD_I],
      moduleData[Module.MODULE_CARGO_HOLD_I],
      moduleData[Module.MODULE_CREW_QUARTERS_I],
      moduleData[Module.MODULE_CREW_QUARTERS_I],
      moduleData[Module.MODULE_MINERAL_PROCESSOR_I],
      moduleData[Module.MODULE_JUMP_DRIVE_I],
      moduleData[Module.MODULE_WARP_DRIVE_I],
    ],
    [
      mountData[Mount.MOUNT_MINING_LASER_I],
      mountData[Mount.MOUNT_SURVEYOR_I],
      mountData[Mount.MOUNT_SENSOR_ARRAY_I],
    ]
  ),
  [Configuration.SHIP_EXPLORER]: new ShipConfiguration(
    Configuration.SHIP_EXPLORER,
    frameData[Frame.FRAME_EXPLORER],
    reactorData[Reactor.REACTOR_FUSION_I],
    engineData[Engine.ENGINE_ION_DRIVE_II],
    [
      moduleData[Module.MODULE_CARGO_HOLD_I],
      moduleData[Module.MODULE_CREW_QUARTERS_I],
      moduleData[Module.MODULE_CREW_QUARTERS_I],
      moduleData[Module.MODULE_SCIENCE_LAB_I],
      moduleData[Module.MODULE_WARP_DRIVE_I],
      moduleData[Module.MODULE_SHIELD_GENERATOR_I],
    ],
    [
      mountData[Mount.MOUNT_LASER_CANNON_I],
      mountData[Mount.MOUNT_SENSOR_ARRAY_II],
    ]
  ),
  [Configuration.SHIP_HEAVY_FREIGHTER]: new ShipConfiguration(
    Configuration.SHIP_HEAVY_FREIGHTER,
    frameData[Frame.FRAME_HEAVY_FREIGHTER],
    reactorData[Reactor.REACTOR_FUSION_I],
    engineData[Engine.ENGINE_ION_DRIVE_II],
    [
      moduleData[Module.MODULE_CARGO_HOLD_I],
      moduleData[Module.MODULE_CARGO_HOLD_I],
      moduleData[Module.MODULE_CARGO_HOLD_I],
      moduleData[Module.MODULE_CARGO_HOLD_I],
      moduleData[Module.MODULE_CREW_QUARTERS_I],
      moduleData[Module.MODULE_CREW_QUARTERS_I],
      moduleData[Module.MODULE_CREW_QUARTERS_I],
      moduleData[Module.MODULE_CREW_QUARTERS_I],
      moduleData[Module.MODULE_WARP_DRIVE_II],
      moduleData[Module.MODULE_SHIELD_GENERATOR_II],
    ],
    [
      mountData[Mount.MOUNT_TURRET_I],
      mountData[Mount.MOUNT_TURRET_I],
      mountData[Mount.MOUNT_TURRET_I],
    ]
  ),
  [Configuration.SHIP_INTERCEPTOR]: new ShipConfiguration(
    Configuration.SHIP_INTERCEPTOR,
    frameData[Frame.FRAME_INTERCEPTOR],
    reactorData[Reactor.REACTOR_CHEMICAL_I],
    engineData[Engine.ENGINE_ION_DRIVE_I],
    [
      moduleData[Module.MODULE_CREW_QUARTERS_I],
    ],
    [
      mountData[Mount.MOUNT_MISSILE_LAUNCHER_I],
    ]
  ),
  [Configuration.SHIP_LIGHT_HAULER]: new ShipConfiguration(
    Configuration.SHIP_LIGHT_HAULER,
    frameData[Frame.FRAME_LIGHT_FREIGHTER],
    reactorData[Reactor.REACTOR_CHEMICAL_I],
    engineData[Engine.ENGINE_ION_DRIVE_I],
    [
      moduleData[Module.MODULE_CARGO_HOLD_I],
      moduleData[Module.MODULE_CARGO_HOLD_I],
      moduleData[Module.MODULE_CARGO_HOLD_I],
      moduleData[Module.MODULE_CARGO_HOLD_I],
      moduleData[Module.MODULE_CREW_QUARTERS_I],
      moduleData[Module.MODULE_CREW_QUARTERS_I],
    ],
    [
      mountData[Mount.MOUNT_SURVEYOR_I],
    ]
  ),
  [Configuration.SHIP_LIGHT_SHUTTLE]: new ShipConfiguration(
    Configuration.SHIP_LIGHT_SHUTTLE,
    frameData[Frame.FRAME_SHUTTLE],
    reactorData[Reactor.REACTOR_CHEMICAL_I],
    engineData[Engine.ENGINE_IMPULSE_DRIVE_I],
    [
      moduleData[Module.MODULE_CARGO_HOLD_I],
      moduleData[Module.MODULE_CREW_QUARTERS_I],
      moduleData[Module.MODULE_PASSENGER_CABIN_I],
      moduleData[Module.MODULE_ENVOY_QUARTERS_I],
    ],
    [
      mountData[Mount.MOUNT_TURRET_I],
    ]
  ),
  [Configuration.SHIP_MINING_DRONE]: new ShipConfiguration(
    Configuration.SHIP_MINING_DRONE,
    frameData[Frame.FRAME_DRONE],
    reactorData[Reactor.REACTOR_CHEMICAL_I],
    engineData[Engine.ENGINE_IMPULSE_DRIVE_I],
    [
      moduleData[Module.MODULE_CARGO_HOLD_I],
      moduleData[Module.MODULE_MINERAL_PROCESSOR_I],
    ],
    [
      mountData[Mount.MOUNT_MINING_LASER_I],
    ]
  ),
  [Configuration.SHIP_ORE_HOUND]: new ShipConfiguration(
    Configuration.SHIP_ORE_HOUND,
    frameData[Frame.FRAME_MINER],
    reactorData[Reactor.REACTOR_FISSION_I],
    engineData[Engine.ENGINE_ION_DRIVE_I],
    [
      moduleData[Module.MODULE_CARGO_HOLD_I],
      moduleData[Module.MODULE_CARGO_HOLD_I],
      moduleData[Module.MODULE_MINERAL_PROCESSOR_I],
      moduleData[Module.MODULE_CREW_QUARTERS_I],
    ],
    [
      mountData[Mount.MOUNT_MINING_LASER_II],
      mountData[Mount.MOUNT_SURVEYOR_I]
    ]
  ),
  [Configuration.SHIP_PROBE]: new ShipConfiguration(
    Configuration.SHIP_PROBE,
    frameData[Frame.FRAME_PROBE],
    reactorData[Reactor.REACTOR_SOLAR_I],
    engineData[Engine.ENGINE_IMPULSE_DRIVE_I],
    [],
    []
  ),
  [Configuration.SHIP_REFINING_FREIGHTER]: new ShipConfiguration(
    Configuration.SHIP_REFINING_FREIGHTER,
    frameData[Frame.FRAME_HEAVY_FREIGHTER],
    reactorData[Reactor.REACTOR_FUSION_I],
    engineData[Engine.ENGINE_ION_DRIVE_II],
    [
      moduleData[Module.MODULE_CARGO_HOLD_I],
      moduleData[Module.MODULE_CARGO_HOLD_I],
      moduleData[Module.MODULE_CARGO_HOLD_I],
      moduleData[Module.MODULE_CARGO_HOLD_I],
      moduleData[Module.MODULE_CREW_QUARTERS_I],
      moduleData[Module.MODULE_CREW_QUARTERS_I],
      moduleData[Module.MODULE_CREW_QUARTERS_I],
      moduleData[Module.MODULE_CREW_QUARTERS_I],
      moduleData[Module.MODULE_ORE_REFINERY_I],
    ],
    [
      mountData[Mount.MOUNT_TURRET_I],
      mountData[Mount.MOUNT_TURRET_I],
      mountData[Mount.MOUNT_MISSILE_LAUNCHER_I],
    ]
  ),
}