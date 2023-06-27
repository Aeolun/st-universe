import {Ship} from "src/universe/entities/Ship";
import {BadRequest} from "@tsed/exceptions";

export function checkShipNotOnCooldown(ship: Ship) {
  if (!ship.cooldown || ship.cooldown.expires <= new Date()) {
    throw new BadRequest(`Ship ${ship.symbol} cannot use it's reactor again so soon.`)
  }
}