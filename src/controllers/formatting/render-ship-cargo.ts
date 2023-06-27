import { ShipCargo, ShipNav } from "src/controllers/schemas";
import { Ship } from "src/universe/entities/Ship";
import { TradeGood } from "src/universe/static-data/trade-goods";

export const renderShipCargo = (ship: Ship): ShipCargo => {
  let total = 0;
  const cargoData = Object.keys(ship.cargo).map((cargo: TradeGood) => {
    total += ship.cargo.get(cargo);
    return {
      symbol: cargo,
      name: cargo,
      description: cargo,
      units: ship.cargo.get(cargo),
    };
  });

  return {
    capacity: ship.stats.cargoSpace,
    units: total,
    inventory: cargoData,
  };
};
