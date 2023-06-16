import {ShipModule} from "src/universe/entities/ShipModule";
import {ProvidesCrewCapacity} from "src/universe/entities/capabilities/ProvidesCrewCapacity";
import {ProvidesWarpRange} from "src/universe/entities/capabilities/ProvidesWarpRange";
import {ProvidesJumpRange} from "src/universe/entities/capabilities/ProvidesJumpRange";
import {ProvidesShield} from "src/universe/entities/capabilities/ProvidesShield";
import {ShipEngine} from "src/universe/entities/ShipEngine";
import {RequiresCrew} from "src/universe/entities/capabilities/RequiresCrew";
import {RequiresPower} from "src/universe/entities/capabilities/RequiresPower";
import {ProvidesThrust} from "src/universe/entities/capabilities/ProvidesThrust";
import {ShipReactor} from "src/universe/entities/ShipReactor";
import {ProvidesPower} from "src/universe/entities/capabilities/ProvidesPower";

export enum Reactor {
  REACTOR_CHEMICAL_I = "REACTOR_CHEMICAL_I",
  REACTOR_FISSION_I = "REACTOR_FISSION_I",
  REACTOR_FUSION_I = "REACTOR_FUSION_I",
  REACTOR_SOLAR_I = "REACTOR_SOLAR_I"
}

export const reactorData: Record<Reactor, ShipReactor> = {
  [Reactor.REACTOR_CHEMICAL_I]: new ShipReactor(Reactor.REACTOR_CHEMICAL_I, [
    new RequiresCrew(3),
    new ProvidesPower(15),
  ]),
  [Reactor.REACTOR_FISSION_I]: new ShipReactor(Reactor.REACTOR_FISSION_I, [
    new RequiresCrew(8),
    new ProvidesPower(31),
  ]),
  [Reactor.REACTOR_FUSION_I]: new ShipReactor(Reactor.REACTOR_FUSION_I, [
    new RequiresCrew(12),
    new ProvidesPower(40),
  ]),
  [Reactor.REACTOR_SOLAR_I]: new ShipReactor(Reactor.REACTOR_SOLAR_I, [
    new RequiresCrew(0),
    new ProvidesPower(3),
  ]),
}