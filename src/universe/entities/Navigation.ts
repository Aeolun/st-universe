import {System} from "src/universe/entities/System";
import {Waypoint} from "src/universe/entities/Waypoint";

export class Location {
  system: string
  waypoint: string
}
export class Navigation {
  current: Location

  route?: {
    from: Location
    to: Location

    arrivalDate: Date
    departureDate: Date
  }
}