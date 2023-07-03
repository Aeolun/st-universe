import { ShipCargo, ShipNav } from "src/controllers/schemas";
import { Ship } from "src/universe/entities/Ship";
import { TradeGood } from "src/universe/static-data/trade-goods";

export const renderShipCargo = (ship: Ship): ShipCargo => {
  let total = 0;
  const cargoData: ShipCargo["inventory"] = ship.cargo
    .toGoodArray()
    .map((cargo) => {
      total += cargo.units;
      return {
        symbol: cargo.tradeSymbol,
        name: cargo.tradeSymbol,
        description: cargo.tradeSymbol,
        units: cargo.units,
      };
    });

  return {
    capacity: ship.stats.cargoSpace,
    units: total,
    inventory: cargoData,
  };
};
