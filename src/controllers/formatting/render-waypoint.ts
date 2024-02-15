import {
  SystemFaction,
  SystemType,
  Waypoint,
  WaypointFaction,
  WaypointTraitSymbol,
  WaypointType,
} from "src/controllers/schemas";
import { Waypoint as WaypointEntity } from "src/universe/entities/Waypoint";
import { waypointTraits } from "src/universe/static-data/waypoint-traits";

export function renderWaypoint(waypoint: WaypointEntity): Waypoint {
  return {
    symbol: waypoint.symbol,
    systemSymbol: waypoint.systemSymbol,
    isUnderConstruction: false,
    type: waypoint.type as WaypointType,
    x: waypoint.x,
    y: waypoint.y,
    faction: waypoint.ownedBy
      ? {
        symbol: waypoint.ownedBy,
      }
      : undefined,
    orbitals: waypoint.orbitals.map((orbital) => {
      return {
        symbol: orbital.symbol,
      };
    }),
    traits: (waypoint.traits.includes("UNCHARTED")
      ? ["UNCHARTED"]
      : waypoint.traits.filter((trait) => {
        const traitData = waypointTraits[trait];
        return !traitData.hidden;
      })
    ).map((trait) => {
      return {
        symbol: trait as WaypointTraitSymbol,
        name: trait,
        description: trait,
      };
    }),
    chart: waypoint.chart
      ? {
        waypointSymbol: waypoint.symbol,
        submittedBy: waypoint.chart.submittedBy,
        submittedOn: waypoint.chart.submittedOn.toISOString(),
      }
      : undefined,
  };
}
