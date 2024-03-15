import { RequiresCrew } from "src/universe/entities/capabilities/RequiresCrew";
import { ShipReactorType } from "src/universe/entities/ShipReactorType";
import { ProvidesPower } from "src/universe/entities/capabilities/ProvidesPower";
import { Reactor } from "src/universe/static-data/reactor-enum";

export const reactorData: Record<Reactor, ShipReactorType> = {
  [Reactor.REACTOR_CHEMICAL_I]: new ShipReactorType(
    Reactor.REACTOR_CHEMICAL_I,
    "Chemical Reactor I",
    "A basic chemical power reactor, used to generate electricity from chemical reactions.",
    [new RequiresCrew(3), new ProvidesPower(15)]
  ),
  [Reactor.REACTOR_FISSION_I]: new ShipReactorType(
    Reactor.REACTOR_FISSION_I,
    "Fission Reactor I",
    "A basic fission power reactor, used to generate electricity from nuclear fission reactions.",
    [new RequiresCrew(8), new ProvidesPower(31)]
  ),
  [Reactor.REACTOR_FUSION_I]: new ShipReactorType(
    Reactor.REACTOR_FUSION_I,
    "Fusion Reactor I",
    "A basic fusion power reactor, used to generate electricity from nuclear fusion reactions.",
    [new RequiresCrew(12), new ProvidesPower(40)]
  ),
  [Reactor.REACTOR_SOLAR_I]: new ShipReactorType(
    Reactor.REACTOR_SOLAR_I,
    "Solar Reactor I",
    "A basic solar power reactor, used to generate electricity from solar energy.",
    [new RequiresCrew(0), new ProvidesPower(3)]
  ),
};
