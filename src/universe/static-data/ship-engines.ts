import { ShipEngineType } from "src/universe/entities/ShipEngineType";
import { RequiresCrew } from "src/universe/entities/capabilities/RequiresCrew";
import { RequiresPower } from "src/universe/entities/capabilities/RequiresPower";
import { ProvidesThrust } from "src/universe/entities/capabilities/ProvidesThrust";
import { Engine } from "src/universe/static-data/engine-enum";

export const engineData: Record<Engine, ShipEngineType> = {
  [Engine.ENGINE_IMPULSE_DRIVE_I]: new ShipEngineType(
    Engine.ENGINE_IMPULSE_DRIVE_I,
    "Impulse Drive I",
    "A basic low-energy propulsion system that generates thrust for interplanetary travel.",
    [new RequiresCrew(1), new RequiresPower(1), new ProvidesThrust(3)]
  ),
  [Engine.ENGINE_ION_DRIVE_I]: new ShipEngineType(
    Engine.ENGINE_ION_DRIVE_I,
    "Ion Drive I",
    "An advanced propulsion system that uses ionized particles to generate high-speed, low-thrust acceleration.",
    [new RequiresCrew(3), new RequiresPower(3), new ProvidesThrust(10)]
  ),
  [Engine.ENGINE_ION_DRIVE_II]: new ShipEngineType(
    Engine.ENGINE_ION_DRIVE_II,
    "Ion Drive II",
    "An advanced propulsion system that uses ionized particles to generate high-speed, low-thrust acceleration, with improved efficiency and performance.",
    [new RequiresCrew(8), new RequiresPower(6), new ProvidesThrust(30)]
  ),
};
