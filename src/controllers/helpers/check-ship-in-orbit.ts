import {Ship} from "src/universe/entities/Ship";
import {BadRequest} from "@tsed/exceptions";

export function checkShipInOrbit(ship: Ship) {
  if (ship.navigation.status === 'IN_TRANSIT') {
    throw new BadRequest(`Ship ${ship.symbol} is in transit, cannot perform operation while under way.`)
  }
  if (ship.navigation.status === 'DOCKED') {
    throw new BadRequest(`Ship ${ship.symbol} is docked, needs to be in orbit.`)
  }
}