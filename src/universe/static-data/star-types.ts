export const starTypes: Record<
  string,
  {
    color: string;
    prevalence: number;
    waypoints: { min: number; max: number };
    belts: { min: number; max: number; density: number };
  }
> = {
  YOUNG_STAR: {
    prevalence: 10,
    waypoints: { min: 1, max: 3 },
    belts: { min: 0, max: 1, density: 0.5 },
    color: "white",
  },
  BLUE_STAR: {
    prevalence: 20,
    waypoints: { min: 5, max: 8 },
    belts: { min: 1, max: 2, density: 0.5 },
    color: "blue",
  },
  ORANGE_STAR: {
    prevalence: 20,
    waypoints: { min: 3, max: 7 },
    belts: { min: 0, max: 2, density: 0.5 },
    color: "orange",
  },
  RED_STAR: {
    prevalence: 30,
    waypoints: { min: 3, max: 10 },
    belts: { min: 1, max: 3, density: 0.5 },
    color: "red",
  },
  BLACK_HOLE: {
    prevalence: 5,
    waypoints: { min: 0, max: 1 },
    belts: { min: 0, max: 0, density: 0.5 },
    color: "gray",
  },
  UNSTABLE: {
    prevalence: 5,
    waypoints: { min: 0, max: 1 },
    color: "pink",
    belts: { min: 2, max: 4, density: 1 },
  },
  WHITE_DWARF: {
    prevalence: 15,
    waypoints: { min: 1, max: 2 },
    belts: { min: 0, max: 1, density: 0.5 },
    color: "white",
  },
  HYPERGIANT: {
    prevalence: 10,
    waypoints: { min: 1, max: 2 },
    belts: { min: 0, max: 1, density: 0.5 },
    color: "darkred",
  },
  NEUTRON_STAR: {
    prevalence: 5,
    waypoints: { min: 0, max: 1 },
    belts: { min: 0, max: 0, density: 0.5 },
    color: "yellow",
  },
  NEBULA: {
    prevalence: 5,
    waypoints: { min: 1, max: 3 },
    belts: { min: 0, max: 1, density: 0.5 },
    color: "green",
  },
};

export const starTypeNames = Object.keys(starTypes);
