import { ShipNav } from "src/controllers/schemas";
import { Ship } from "src/universe/entities/Ship";

export const renderShipNav = (nav: Ship["navigation"]): ShipNav => {
  const now = new Date().toISOString();

  return {
    flightMode: nav.flightMode,
    systemSymbol: nav.current.systemSymbol,
    waypointSymbol: nav.current.symbol,
    route: nav.route
      ? {
          departure: nav.route.from,
          destination: nav.route.to,
          departureTime: nav.route.departureDate.toISOString(),
          arrival: nav.route.arrivalDate.toISOString(),
        }
      : {
          departure: nav.current,
          destination: nav.current,
          departureTime: now,
          arrival: now,
        },
    status: nav.status,
  };
};
