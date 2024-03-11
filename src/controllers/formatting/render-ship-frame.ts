import { ShipFrame as ApiShipFrame } from "src/controllers/schemas";
import { ShipFrame } from "src/universe/entities/ShipFrame";

export const renderShipFrame = (shipFrame: ShipFrame): ApiShipFrame => {
  const frame = shipFrame.frameType;

  return {
    symbol: shipFrame.frameType.symbol,
    name: frame.name,
    description: frame.description,
    condition: shipFrame.condition,
    integrity: shipFrame.integrity,
    moduleSlots: frame.stats.moduleCapacity,
    mountingPoints: frame.stats.mountingPoints,
    fuelCapacity: frame.stats.fuelCapacity,
    requirements: {
      power: frame.stats.powerRequired,
      crew: frame.stats.crewRequired,
      slots: frame.stats.moduleCapacityRequired,
    },
  };
};
