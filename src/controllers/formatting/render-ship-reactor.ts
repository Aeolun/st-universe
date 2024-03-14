import { ShipReactor } from "src/universe/entities/ShipReactor";
import { ShipReactor as APIShipReactor } from "src/controllers/schemas/ship-reactor";

export const renderShipReactor = (shipReactor: ShipReactor): APIShipReactor => {
  return {
    symbol: shipReactor.reactorType.symbol,
    name: shipReactor.reactorType.name,
    description: shipReactor.reactorType.description,
    condition: shipReactor.condition,
    integrity: shipReactor.integrity,
    powerOutput: shipReactor.reactorType.stats.powerGenerated,
    requirements: {
      power: shipReactor.reactorType.stats.powerRequired,
      crew: shipReactor.reactorType.stats.crewRequired,
      slots: shipReactor.reactorType.stats.moduleCapacityRequired,
    },
  };
};
