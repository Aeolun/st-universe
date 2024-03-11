import { ShipEngine as ApiShipEngine } from "src/controllers/schemas";
import { ShipEngine } from "src/universe/entities/ShipEngine";

export const renderShipEngine = (shipEngine: ShipEngine): ApiShipEngine => {
  const engine = shipEngine.engineType;

  return {
    symbol: shipEngine.engineType.symbol,
    name: engine.name,
    description: engine.description,
    condition: shipEngine.condition,
    integrity: shipEngine.integrity,
    speed: engine.stats.thrust,
    requirements: {
      power: engine.stats.powerRequired,
      crew: engine.stats.crewRequired,
      slots: engine.stats.moduleCapacityRequired,
    },
  };
};
