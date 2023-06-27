import {Ship} from "src/universe/entities/Ship";
import {BadRequest} from "@tsed/exceptions";

export function checkShipDocked(ship: Ship) {
  if (ship.navigation.status === 'IN_TRANSIT') {
    throw new BadRequest(`Ship ${ship.symbol} is in transit.`)
  }
  if (ship.navigation.status === 'IN_ORBIT') {
    throw new BadRequest(`Ship ${ship.symbol} is in orbit.`)
  }
}