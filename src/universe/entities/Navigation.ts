import {
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

  setRoute(
    fromWaypoint: ShipNavRouteWaypoint,
    toWaypoint: ShipNavRouteWaypoint,
    departureTime: Date,
    arrivalTime: Date
  ) {
    this.route = {
      from: {
        symbol: fromWaypoint.symbol,
        systemSymbol: fromWaypoint.systemSymbol,
        x: fromWaypoint.x,
        y: fromWaypoint.y,
        type: fromWaypoint.type,
      },
      to: {
        symbol: toWaypoint.symbol,
        systemSymbol: toWaypoint.systemSymbol,
        x: toWaypoint.x,
        y: toWaypoint.y,
        type: toWaypoint.type,
      },
      departureDate: departureTime,
      arrivalDate: arrivalTime,
    };
  }

  setCurrent(waypoint: ShipNavRouteWaypoint) {
    this.current = {
      symbol: waypoint.symbol,
      systemSymbol: waypoint.systemSymbol,
      x: waypoint.x,
      y: waypoint.y,
      type: waypoint.type,
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
