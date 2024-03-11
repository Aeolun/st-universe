import { ShipReactor } from "src/controllers/schemas";
import { Reactor, reactorData } from "src/universe/static-data/ship-reactors";

export const renderShipReactor = (symbol: Reactor): ShipReactor => {
  const reactor = reactorData[symbol];

  return {
    symbol: symbol,
    name: reactor.name,
    description: reactor.description,
    condition: 1,
    integrity: 1,
    powerOutput: reactor.stats.powerGenerated,
    requirements: {
      power: reactor.stats.powerRequired,
      crew: reactor.stats.crewRequired,
      slots: reactor.stats.moduleCapacityRequired,
    },
  };
};
