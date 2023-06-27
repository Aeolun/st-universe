import {System} from "src/universe/entities/System";
import {Waypoint} from "src/universe/entities/Waypoint";
import {ShipNav, ShipNavFlightMode, ShipNavRouteWaypoint, ShipNavStatus} from "src/controllers/schemas";

export class Location {
  systemSymbol: string
  waypointSymbol: string
}
export class Navigation {
  flightMode: ShipNavFlightMode = ShipNavFlightMode.Cruise
  isDocked: boolean = false

  route?: {
    from: ShipNavRouteWaypoint
    to: ShipNavRouteWaypoint

    arrivalDate: Date
    departureDate: Date
  }

  constructor(public current: ShipNavRouteWaypoint) {

  }

  get status(): ShipNavStatus {
    if (this.route && this.route.arrivalDate < new Date()) {
      return ShipNavStatus.InTransit
    } else if (this.isDocked) {
      return ShipNavStatus.Docked
    } else {
      return ShipNavStatus.InOrbit
    }
  }
}