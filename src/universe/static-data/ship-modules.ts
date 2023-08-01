import { ShipModule } from "src/universe/entities/ShipModule";
import { ProvidesCrewCapacity } from "src/universe/entities/capabilities/ProvidesCrewCapacity";
import { ProvidesWarpRange } from "src/universe/entities/capabilities/ProvidesWarpRange";
import { ProvidesJumpRange } from "src/universe/entities/capabilities/ProvidesJumpRange";
import { ProvidesShield } from "src/universe/entities/capabilities/ProvidesShield";
import { ProvidesCargoSpace } from "src/universe/entities/capabilities/ProvidesCargoSpace";
import { Refines } from "src/universe/entities/capabilities/Refines";
import { ResourceGroup } from "src/universe/static-data/resource-groups";
import { RequiresCrew } from "src/universe/entities/capabilities/RequiresCrew";
import { RequiresPower } from "src/universe/entities/capabilities/RequiresPower";
import { RequiresModuleCapacity } from "src/universe/entities/capabilities/RequiresModuleCapacity";

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
  [Module.MODULE_CARGO_HOLD_I]: new ShipModule(
    Module.MODULE_CARGO_HOLD_I,
    "Cargo Hold",
    "A module that increases a ship's cargo capacity.",
    [
      new ProvidesCargoSpace(30),
      new RequiresPower(1),
      new RequiresModuleCapacity(1),
    ]
  ),
  [Module.MODULE_CREW_QUARTERS_I]: new ShipModule(
    Module.MODULE_CREW_QUARTERS_I,
    "Crew Quarters",
    "A module that provides living space and amenities for the crew.",
    [
      new ProvidesCrewCapacity(40),
      new RequiresCrew(2),
      new RequiresPower(1),
      new RequiresModuleCapacity(1),
    ]
  ),
  [Module.MODULE_WARP_DRIVE_I]: new ShipModule(
    Module.MODULE_WARP_DRIVE_I,
    "Warp Drive I",
    "A basic warp drive that allows for short-range interstellar travel.",
    [
      new ProvidesWarpRange(2000),
      new RequiresCrew(2),
      new RequiresPower(3),
      new RequiresModuleCapacity(1),
    ]
  ),
  [Module.MODULE_WARP_DRIVE_II]: new ShipModule(
    Module.MODULE_WARP_DRIVE_II,
    "Warp Drive II",
    "An advanced warp drive that allows for longer-range interstellar travel with improved reliability.",
    [
      new ProvidesWarpRange(6000),
      new RequiresCrew(8),
      new RequiresPower(5),
      new RequiresModuleCapacity(1),
    ]
  ),
  [Module.MODULE_WARP_DRIVE_III]: new ShipModule(
    Module.MODULE_WARP_DRIVE_III,
    "",
    "",
    [
      new ProvidesWarpRange(18000),
      new RequiresCrew(10),
      new RequiresPower(6),
      new RequiresModuleCapacity(1),
    ]
  ),
  [Module.MODULE_JUMP_DRIVE_I]: new ShipModule(
    Module.MODULE_JUMP_DRIVE_I,
    "",
    "",
    [
      new ProvidesJumpRange(500),
      new RequiresCrew(10),
      new RequiresPower(4),
      new RequiresModuleCapacity(1),
    ]
  ),
  [Module.MODULE_JUMP_DRIVE_II]: new ShipModule(
    Module.MODULE_JUMP_DRIVE_II,
    "",
    "",
    [
      new ProvidesJumpRange(1500),
      new RequiresCrew(20),
      new RequiresPower(8),
      new RequiresModuleCapacity(1),
    ]
  ),

  [Module.MODULE_JUMP_DRIVE_III]: new ShipModule(
    Module.MODULE_JUMP_DRIVE_III,
    "",
    "",
    [
      new ProvidesJumpRange(4500),
      new RequiresCrew(40),
      new RequiresPower(14),
      new RequiresModuleCapacity(1),
    ]
  ),
  [Module.MODULE_MINERAL_PROCESSOR_I]: new ShipModule(
    Module.MODULE_MINERAL_PROCESSOR_I,
    "Mineral Processor",
    "Crushes and processes extracted minerals and ores into their component parts, filters out impurities, and containerizes them into raw storage units.",
    []
  ),
  [Module.MODULE_ENVOY_QUARTERS_I]: new ShipModule(
    Module.MODULE_ENVOY_QUARTERS_I,
    "",
    "",
    []
  ),
  [Module.MODULE_SCIENCE_LAB_I]: new ShipModule(
    Module.MODULE_SCIENCE_LAB_I,
    "",
    "",
    []
  ),
  [Module.MODULE_PASSENGER_CABIN_I]: new ShipModule(
    Module.MODULE_PASSENGER_CABIN_I,
    "",
    "",
    []
  ),
  [Module.MODULE_ORE_REFINERY_I]: new ShipModule(
    Module.MODULE_ORE_REFINERY_I,
    "Ore Refinery",
    "A specialized module that can refine raw ores into usable metals and other materials.",
    [
      new Refines([
        {
          groups: [
            ResourceGroup.METALS,
            ResourceGroup.PRECIOUS_METALS,
            ResourceGroup.RARE_METALS,
          ],
          units: 10,
        },
      ]),
      new RequiresCrew(20),
      new RequiresPower(12),
      new RequiresModuleCapacity(4),
    ]
  ),
  [Module.MODULE_SHIELD_GENERATOR_I]: new ShipModule(
    Module.MODULE_SHIELD_GENERATOR_I,
    "",
    "",
    [new ProvidesShield(100)]
  ),
  [Module.MODULE_SHIELD_GENERATOR_II]: new ShipModule(
    Module.MODULE_SHIELD_GENERATOR_II,
    "",
    "",
    [new ProvidesShield(300)]
  ),
};
