import { ShipNavFlightMode } from "src/controllers/schemas";

export function navigateFuelUsed(
  distance: number,
  travelMethod: ShipNavFlightMode
) {
  if (travelMethod === ShipNavFlightMode.Cruise) {
    return distance;
  } else if (travelMethod === ShipNavFlightMode.Burn) {
    return distance * 2;
  } else if (travelMethod === ShipNavFlightMode.Drift) {
    return 1;
  } else {
    return distance;
  }
}

export function warpFuelUsed(
  distance: number,
  travelMethod: ShipNavFlightMode
) {
  if (travelMethod === ShipNavFlightMode.Cruise) {
    return distance / 2;
  } else if (travelMethod === ShipNavFlightMode.Burn) {
    return distance;
  } else if (travelMethod === ShipNavFlightMode.Drift) {
    return 1;
  } else {
    return distance / 2;
  }
}

export function navigateTravelTime(
  distance: number,
  travelMethod: ShipNavFlightMode,
  speed: number
) {
  if (travelMethod === ShipNavFlightMode.Cruise) {
    return 15 + Math.round((distance * 15) / speed);
  } else if (travelMethod === ShipNavFlightMode.Burn) {
    return 15 + Math.round((distance * 7.5) / speed);
  } else if (travelMethod === ShipNavFlightMode.Drift) {
    return 15 + Math.round((distance * 150) / speed);
  } else {
    return 15 + Math.round((distance * 30) / speed);
  }
}

export function warpTravelTime(
  distance: number,
  travelMethod: ShipNavFlightMode,
  speed: number
) {
  if (travelMethod === ShipNavFlightMode.Cruise) {
    return 15 + Math.round((distance * 20) / speed);
  } else if (travelMethod === ShipNavFlightMode.Burn) {
    return 15 + Math.round((distance * 10) / speed);
  } else if (travelMethod === ShipNavFlightMode.Drift) {
    return 15 + Math.round((distance * 200) / speed);
  } else {
    return 15 + Math.round((distance * 40) / speed);
  }
}
