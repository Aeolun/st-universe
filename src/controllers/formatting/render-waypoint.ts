import {
  SystemFaction,
  SystemType,
  Waypoint,
  WaypointFaction,
  WaypointTraitSymbolEnum,
  WaypointType
} from "src/controllers/schemas";
import {Waypoint as WaypointEntity} from "src/universe/entities/Waypoint";

export function renderWaypoint(waypoint: WaypointEntity): Waypoint {
  return {
    symbol: waypoint.symbol,
    systemSymbol: waypoint.systemSymbol,
    type: waypoint.type as WaypointType,
    x: waypoint.x,
    y: waypoint.y,
    faction: waypoint.ownedBy ? {
      symbol: waypoint.ownedBy
    } : undefined,
    orbitals: waypoint.orbitals.map(orbital => {
      return {
        symbol: orbital.symbol,
      }
    }),
    traits: waypoint.traits.map(trait => {
      return {
        symbol: trait as WaypointTraitSymbolEnum,
        name: trait,
        description: trait,
      }
    }),
    chart: waypoint.chart ? {
      waypointSymbol: waypoint.symbol,
      submittedBy: waypoint.chart.submittedBy,
      submittedOn: waypoint.chart.submittedOn.toISOString(),
    } : undefined,
  }
}