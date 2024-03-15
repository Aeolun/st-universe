import { ShipEngine, ShipModule, ShipReactor } from "src/controllers/schemas";
import { reactorData } from "src/universe/static-data/ship-reactors";
import { engineData } from "src/universe/static-data/ship-engines";
import { moduleData } from "src/universe/static-data/ship-modules";
import { Engine } from "src/universe/static-data/engine-enum";
import { Module } from "src/universe/static-data/module-enum";
import { Reactor } from "src/universe/static-data/reactor-enum";

export const renderShipModule = (symbol: Module): ShipModule => {
  const module = moduleData[symbol];

  return {
    symbol: symbol,
    name: module.name,
    description: module.description,
    capacity: module.stats.crewCapacity
      ? module.stats.crewCapacity
      : module.stats.cargoSpace,
    range: module.stats.jumpRange
      ? module.stats.jumpRange
      : module.stats.warpRange,
    requirements: {
      power: module.stats.powerRequired,
      crew: module.stats.crewRequired,
      slots: module.stats.moduleCapacityRequired,
    },
  };
};
