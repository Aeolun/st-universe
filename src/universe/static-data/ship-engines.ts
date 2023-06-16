import {ShipModule} from "src/universe/entities/ShipModule";
import {ProvidesCrewCapacity} from "src/universe/entities/capabilities/ProvidesCrewCapacity";
import {ProvidesWarpRange} from "src/universe/entities/capabilities/ProvidesWarpRange";
import {ProvidesJumpRange} from "src/universe/entities/capabilities/ProvidesJumpRange";
import {ProvidesShield} from "src/universe/entities/capabilities/ProvidesShield";
import {ShipEngine} from "src/universe/entities/ShipEngine";
import {RequiresCrew} from "src/universe/entities/capabilities/RequiresCrew";
import {RequiresPower} from "src/universe/entities/capabilities/RequiresPower";
import {ProvidesThrust} from "src/universe/entities/capabilities/ProvidesThrust";

export enum Engine {
  ENGINE_IMPULSE_DRIVE_I,
  ENGINE_ION_DRIVE_I,
  ENGINE_ION_DRIVE_II,
  ENGINE_FUSION_DRIVE_I,
  ENGINE_SOLAR_SAIL_I,
}

export const engineData: Record<Engine, ShipEngine> = {
  [Engine.ENGINE_IMPULSE_DRIVE_I]: new ShipEngine(Engine.ENGINE_IMPULSE_DRIVE_I, [
    new RequiresCrew(1),
    new RequiresPower(1),
    new ProvidesThrust(4),
  ]),
  [Engine.ENGINE_ION_DRIVE_I]: new ShipEngine(Engine.ENGINE_ION_DRIVE_I, [
    new RequiresCrew(3),
    new RequiresPower(3),
    new ProvidesThrust(10),
  ]),
  [Engine.ENGINE_ION_DRIVE_II]: new ShipEngine(Engine.ENGINE_ION_DRIVE_II, [
    new RequiresCrew(8),
    new RequiresPower(6),
    new ProvidesThrust(30),
  ]),
  [Engine.ENGINE_FUSION_DRIVE_I]: new ShipEngine(Engine.ENGINE_FUSION_DRIVE_I, [
    new RequiresCrew(6),
    new RequiresPower(2),
    new ProvidesThrust(16),
  ]),
  [Engine.ENGINE_SOLAR_SAIL_I]: new ShipEngine(Engine.ENGINE_SOLAR_SAIL_I, [
    new RequiresCrew(0),
    new RequiresPower(0),
    new ProvidesThrust(2),
  ]),
}