import { System } from "src/universe/entities/System";
import { Waypoint } from "src/universe/entities/Waypoint";
import {
  ShipNav,
  ShipNavFlightMode,
  ShipNavRouteWaypoint,
  ShipNavStatus,
} from "src/controllers/schemas";

export class Location {
  systemSymbol: string;
  waypointSymbol: string;
}
export class Navigation {
  current: ShipNavRouteWaypoint;
  flightMode: ShipNavFlightMode = ShipNavFlightMode.Cruise;
  isDocked: boolean = false;

  route?: {
    from: ShipNavRouteWaypoint;
    to: ShipNavRouteWaypoint;

    arrivalDate: Date;
    departureDate: Date;
  };

  constructor(current: ShipNavRouteWaypoint) {
    this.current = {
      symbol: current.symbol,
      systemSymbol: current.systemSymbol,
      x: current.x,
      y: current.y,
      type: current.type,
    };
  }

  setCurrent(waypoint: ShipNavRouteWaypoint) {
    this.current = {
      symbol: current.symbol,
      systemSymbol: current.systemSymbol,
      x: current.x,
      y: current.y,
      type: current.type,
    };
  }

  get status(): ShipNavStatus {
    if (this.route && this.route.arrivalDate.getTime() > Date.now()) {
      return ShipNavStatus.InTransit;
    } else if (this.isDocked) {
      return ShipNavStatus.Docked;
    } else {
      return ShipNavStatus.InOrbit;
    }
  }
}
