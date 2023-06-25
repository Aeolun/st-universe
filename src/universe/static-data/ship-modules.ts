import {ShipModule} from "src/universe/entities/ShipModule";
import {ProvidesCrewCapacity} from "src/universe/entities/capabilities/ProvidesCrewCapacity";
import {ProvidesWarpRange} from "src/universe/entities/capabilities/ProvidesWarpRange";
import {ProvidesJumpRange} from "src/universe/entities/capabilities/ProvidesJumpRange";
import {ProvidesShield} from "src/universe/entities/capabilities/ProvidesShield";
import {ProvidesCargoSpace} from "src/universe/entities/capabilities/ProvidesCargoSpace";

export enum Module {
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
}

export const moduleData: Record<Module, ShipModule> = {
  [Module.MODULE_CARGO_HOLD_I]: new ShipModule(Module.MODULE_CARGO_HOLD_I, '', '', [
    new ProvidesCargoSpace(30),
  ]),
  [Module.MODULE_CREW_QUARTERS_I]: new ShipModule(Module.MODULE_CREW_QUARTERS_I, '', '', [
    new ProvidesCrewCapacity(30)
  ]),
  [Module.MODULE_WARP_DRIVE_I]: new ShipModule(Module.MODULE_WARP_DRIVE_I, '', '', [
    new ProvidesWarpRange(2000)
  ]),
  [Module.MODULE_WARP_DRIVE_II]: new ShipModule(Module.MODULE_WARP_DRIVE_II, '', '', [
    new ProvidesWarpRange(4000)
  ]),
  [Module.MODULE_WARP_DRIVE_III]: new ShipModule(Module.MODULE_WARP_DRIVE_III, '', '', [
    new ProvidesWarpRange(8000)
  ]),
  [Module.MODULE_JUMP_DRIVE_I]: new ShipModule(Module.MODULE_JUMP_DRIVE_I, '', '', [
    new ProvidesJumpRange(500)
  ]),
  [Module.MODULE_JUMP_DRIVE_II]: new ShipModule(Module.MODULE_JUMP_DRIVE_II, '', '', [
    new ProvidesJumpRange(1000)
  ]),
  [Module.MODULE_JUMP_DRIVE_III]: new ShipModule(Module.MODULE_JUMP_DRIVE_III, '', '', [
    new ProvidesJumpRange(2000)
  ]),
  [Module.MODULE_MINERAL_PROCESSOR_I]: new ShipModule(Module.MODULE_MINERAL_PROCESSOR_I, '', '', []),
  [Module.MODULE_ENVOY_QUARTERS_I]: new ShipModule(Module.MODULE_ENVOY_QUARTERS_I, '', '', []),
  [Module.MODULE_SCIENCE_LAB_I]: new ShipModule(Module.MODULE_SCIENCE_LAB_I, '', '', []),
  [Module.MODULE_PASSENGER_CABIN_I]: new ShipModule(Module.MODULE_PASSENGER_CABIN_I, '', '', []),
  [Module.MODULE_ORE_REFINERY_I]: new ShipModule(Module.MODULE_ORE_REFINERY_I, '', '', []),
  [Module.MODULE_SHIELD_GENERATOR_I]: new ShipModule(Module.MODULE_SHIELD_GENERATOR_I, '', '', [
    new ProvidesShield(100)
  ]),
  [Module.MODULE_SHIELD_GENERATOR_II]: new ShipModule(Module.MODULE_SHIELD_GENERATOR_II, '', '', [
    new ProvidesShield(300)
  ]),
}