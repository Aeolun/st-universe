import { ShipNavFlightMode } from "src/controllers/schemas";
import {
  MINIMUM_NAVIGATE_TIME,
  MINIMUM_WARP_TIME,
  NAVIGATION_FACTOR,
  WARP_FACTOR,
} from "src/universe/constants";

export function navigateFuelUsed(
  distance: number,
  travelMethod: ShipNavFlightMode
) {
  if (travelMethod === ShipNavFlightMode.Cruise) {
    return Math.round(distance);
  } else if (travelMethod === ShipNavFlightMode.Burn) {
    return Math.round(distance * 2);
  } else if (travelMethod === ShipNavFlightMode.Drift) {
    return 1;
  } else {
    return Math.round(distance);
  }
}

export function warpFuelUsed(
  distance: number,
  travelMethod: ShipNavFlightMode
) {
  if (travelMethod === ShipNavFlightMode.Cruise) {
    return Math.round(distance / 2);
  } else if (travelMethod === ShipNavFlightMode.Burn) {
    return Math.round(distance);
  } else if (travelMethod === ShipNavFlightMode.Drift) {
    return 1;
  } else {
    return Math.round(distance / 2);
  }
}

export function navigateTravelTime(
  distance: number,
  travelMethod: ShipNavFlightMode,
  speed: number
) {
  if (travelMethod === ShipNavFlightMode.Cruise) {
    return (
      MINIMUM_NAVIGATE_TIME + Math.round((distance * NAVIGATION_FACTOR) / speed)
    );
  } else if (travelMethod === ShipNavFlightMode.Burn) {
    return (
      MINIMUM_NAVIGATE_TIME +
      Math.round((distance * NAVIGATION_FACTOR) / 2 / speed)
    );
  } else if (travelMethod === ShipNavFlightMode.Drift) {
    return (
      MINIMUM_NAVIGATE_TIME +
      Math.round((distance * NAVIGATION_FACTOR * 10) / speed)
    );
  } else {
    return (
      MINIMUM_NAVIGATE_TIME +
      Math.round((distance * NAVIGATION_FACTOR * 2) / speed)
    );
  }
}

export function warpTravelTime(
  distance: number,
  travelMethod: ShipNavFlightMode,
  speed: number
) {
  if (travelMethod === ShipNavFlightMode.Cruise) {
    return MINIMUM_WARP_TIME + Math.round((distance * WARP_FACTOR) / speed);
  } else if (travelMethod === ShipNavFlightMode.Burn) {
    return MINIMUM_WARP_TIME + Math.round((distance * WARP_FACTOR) / 2 / speed);
  } else if (travelMethod === ShipNavFlightMode.Drift) {
    return (
      MINIMUM_WARP_TIME + Math.round((distance * WARP_FACTOR * 10) / speed)
    );
  } else {
    return MINIMUM_WARP_TIME + Math.round((distance * WARP_FACTOR * 2) / speed);
  }
}
