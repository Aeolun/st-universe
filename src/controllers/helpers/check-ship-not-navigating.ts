import { Ship } from "src/universe/entities/Ship";
import { BadRequest } from "@tsed/exceptions";

export function checkShipNotNavigating(ship: Ship) {
  if (
    ship.navigation.status === "IN_TRANSIT" &&
    ship.navigation.route?.arrivalDate &&
    ship.navigation.route?.arrivalDate.getTime() > Date.now()
  ) {
    throw new BadRequest(`Ship ${ship.symbol} is in transit.`);
  }
}
