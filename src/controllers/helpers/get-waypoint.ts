import {Universe} from "src/universe/entities/Universe";
import {NotFound} from "@tsed/exceptions";

export function getWaypoint(universe: Universe, waypointSymbol: string) {
  if (!universe.waypoints[waypointSymbol]) {
    throw new NotFound(`No waypoint with symbol ${waypointSymbol}`)
  }
  return universe.waypoints[waypointSymbol]
}