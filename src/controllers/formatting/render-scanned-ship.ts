import { Ship } from "src/universe/entities/Ship";
import { Ship as ShipOutput } from "src/controllers/schemas/ship";
import { renderShipReactor } from "src/controllers/formatting/render-ship-reactor";
import { renderShipFrame } from "src/controllers/formatting/render-ship-frame";
import { renderShipEngine } from "src/controllers/formatting/render-ship-engine";
import { renderShipModule } from "src/controllers/formatting/render-ship-module";
import { renderShipMount } from "src/controllers/formatting/render-ship-mount";
import { renderShipNav } from "src/controllers/formatting/render-ship-nav";
import { renderShipCargo } from "src/controllers/formatting/render-ship-cargo";
import { ScannedShip } from "src/controllers/schemas";

export const renderScannedShip = (ship: Ship): ScannedShip => {
  return {
    symbol: ship.symbol,
    registration: {
      factionSymbol: "",
      role: ship.role,
      name: ship.symbol,
    },
    nav: renderShipNav(ship.navigation),
    reactor: {
      symbol: ship.reactor.symbol,
    },
    frame: {
      symbol: ship.frame.symbol,
    },
    engine: {
      symbol: ship.engine.symbol,
    },
    mounts: ship.mounts.map((mount) => {
      return {
        symbol: mount.symbol,
      };
    }),
  };
};
