import { System } from "src/universe/entities/System";
import {
  SystemFaction,
  System as SystemSchema,
  SystemType,
  WaypointType,
  SystemWaypoint,
} from "src/controllers/schemas";

export function renderSystem(system: System): SystemSchema {
  const factions: SystemFaction[] = [];
  const waypoints: SystemWaypoint[] = system.waypoints.map((waypoint) => {
    if (
      waypoint.ownedBy &&
      !factions.some((f) => f.symbol === waypoint.ownedBy)
    )
      factions.push({
        symbol: waypoint.ownedBy,
      });
    return {
      symbol: waypoint.symbol,
      orbitals: waypoint.orbitals.map((orbital) => {
        return {
          symbol: orbital.symbol,
        };
      }),
      type: waypoint.type as WaypointType,
      x: waypoint.x,
      y: waypoint.y,
    };
  });
  return {
    symbol: system.symbol,
    sectorSymbol: system.sectorSymbol,
    type: system.type as SystemType,
    x: system.x,
    y: system.y,
    factions: factions,
    waypoints,
  };
}
