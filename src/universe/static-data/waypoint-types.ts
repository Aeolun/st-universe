import { Industry } from "src/universe/static-data/industries";
import { WaypointTrait } from "src/universe/static-data/waypoint-trait-enum";
import { WaypointType } from "src/universe/static-data/waypoint-type-enum";

export const waypointTypes: Record<
  WaypointType,
  {
    text?: string;
    isOrbital: boolean;
    maxTraits: number;
    guaranteedTraits?: WaypointTrait[];
    guaranteedIndustries?: Industry[];
    orbitalOptions?: {
      type: WaypointType;
      orbitalCount: Record<number, number>;
    }[];
  }
> = {
  ASTEROID: {
    isOrbital: false,
    maxTraits: 3,
    orbitalOptions: [],
  },
  ASTEROID_BASE: {
    isOrbital: false,
    maxTraits: 2,
    orbitalOptions: [],
  },
  ENGINEERED_ASTEROID: {
    isOrbital: false,
    maxTraits: 3,
    guaranteedTraits: ["COMMON_METAL_DEPOSITS"],
    orbitalOptions: [],
  },
  FUEL_STATION: {
    isOrbital: false,
    maxTraits: 0,
    guaranteedIndustries: ["FUEL_STATION"],
    orbitalOptions: [],
  },
  PLANET: {
    isOrbital: false,
    maxTraits: 4,
    orbitalOptions: [
      {
        type: "MOON",
        orbitalCount: {
          0: 50,
          1: 25,
          2: 15,
          3: 10,
        },
      },
      {
        type: "ORBITAL_STATION",
        orbitalCount: {
          0: 90,
          1: 9,
          2: 1,
        },
      },
    ],
  },
  MOON: {
    isOrbital: true,
    maxTraits: 2,
    orbitalOptions: [],
  },
  ORBITAL_STATION: {
    isOrbital: true,
    maxTraits: 3,
    orbitalOptions: [],
  },
  GAS_GIANT: {
    isOrbital: false,
    maxTraits: 2,
    orbitalOptions: [
      {
        type: "MOON",
        orbitalCount: {
          0: 80,
          1: 15,
          2: 5,
        },
      },
      {
        type: "ORBITAL_STATION",
        orbitalCount: {
          0: 90,
          1: 10,
        },
      },
    ],
  },
  JUMP_GATE: {
    isOrbital: false,
    maxTraits: 0,
    guaranteedIndustries: ["JUMP_GATE"],
    orbitalOptions: [],
  },
};

export const waypointTypeNames = Object.keys(waypointTypes) as WaypointType[];
export const generatableWaypointTypeNames = waypointTypeNames.filter(
  (type) =>
    !waypointTypes[type].isOrbital &&
    !["JUMP_GATE", "ASTEROID", "ASTEROID_BASE", "FUEL_STATION"].includes(type)
) as WaypointType[];
