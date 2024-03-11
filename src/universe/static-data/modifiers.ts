import { WaypointModifierSymbolEnum } from "src/controllers/schemas";

export const modifiers: Record<
  WaypointModifierSymbolEnum,
  {
    name: string;
    description: string;
  }
> = {
  CRITICAL_LIMIT: {
    name: "Critical Limit",
    description: "The waypoint is at a critical limit.",
  },
  STRIPPED: {
    name: "Stripped",
    description: "The waypoint has been stripped.",
  },
  CIVIL_UNREST: {
    name: "Civil Unrest",
    description: "The waypoint is experiencing civil unrest.",
  },
  UNSTABLE: {
    name: "Unstable",
    description: "The waypoint is unstable.",
  },
  RADIATION_LEAK: {
    name: "Radiation Leak",
    description: "The waypoint has a radiation leak.",
  },
};
