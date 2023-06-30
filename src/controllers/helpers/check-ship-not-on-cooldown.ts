import { Ship } from "src/universe/entities/Ship";
import { BadRequest } from "@tsed/exceptions";

export function checkShipNotOnCooldown(ship: Ship) {
  if (ship.cooldown && ship.cooldown.expires.getTime() > Date.now()) {
    throw new BadRequest(
      `Ship ${
        ship.symbol
      } cannot use it's reactor again so soon. Please wait ${Math.ceil(
        ship.cooldown.expires.getTime() - Date.now()
      )} seconds.`
    );
  }
}
