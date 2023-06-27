import {Agent} from "src/universe/entities/Agent";
import {NotFound} from "@tsed/exceptions";
import {Ship} from "src/universe/entities/Ship";

export function getShip(agent: Agent, shipSymbol: string): Ship {
  const ship = agent.ships.find(ship => ship.symbol === shipSymbol)
  if (!ship) {
    throw new NotFound(`No ship with symbol ${shipSymbol}`)
  }

  return ship
}