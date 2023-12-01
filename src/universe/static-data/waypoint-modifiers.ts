import { TraitModifiers } from "src/universe/static-data/waypoint-traits";

export type WaypointModifier =
  | "STRIPPED"
  | "UNSTABLE"
  | "RADIATION_LEAK"
  | "CRITICAL_LIMIT"
  | "CIVIL_UNREST";

export type ModifierData = TraitModifiers;
export const waypointModifiers: Record<WaypointModifier, ModifierData> = {
  STRIPPED: {
    productivityMultiplier: 0.5,
  },
  UNSTABLE: {},
  RADIATION_LEAK: {},
  CRITICAL_LIMIT: {
    productivityMultiplier: 0,
  },
  CIVIL_UNREST: {},
};

export const waypointModifierNames = Object.keys(
  waypointModifiers
) as WaypointModifier[];
