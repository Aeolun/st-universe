import {System} from "src/universe/entities/System";
import {SystemFaction, SystemType, WaypointType} from "src/controllers/schemas";

export function renderSystem(system: System) {
  const factions: SystemFaction[] = []
  const waypoints = system.waypoints.map(waypoint => {
    if (waypoint.ownedBy) factions.push({
      symbol: waypoint.ownedBy
    })
    return {
      symbol: waypoint.symbol,
      type: waypoint.type as WaypointType,
      x: waypoint.x,
      y: waypoint.y
    }
  })
  return {
    symbol: system.symbol,
    sectorSymbol: system.sectorSymbol,
    type: system.type as SystemType,
    x: system.x,
    y: system.y,
    factions: factions,
    waypoints
  }
}