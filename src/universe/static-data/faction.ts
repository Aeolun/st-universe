export enum Faction {
  COSMIC = "COSMIC",
  VOID = "VOID",
  GALACTIC = "GALACTIC",
  QUANTUM = "QUANTUM",
  DOMINION = "DOMINION",
  ASTRO = "ASTRO",
  CORSAIRS = "CORSAIRS",
  OBSIDIAN = "OBSIDIAN",
  AEGIS = "AEGIS",
  UNITED = "UNITED",
  SOLITARY = "SOLITARY",
  COBALT = "COBALT",
  OMEGA = "OMEGA",
  ECHO = "ECHO",
  LORDS = "LORDS",
  CULT = "CULT",
  ANCIENTS = "ANCIENTS",
  SHADOW = "SHADOW",
  ETHEREAL = "ETHEREAL",
}

export const factionNames = Object.keys(Faction)

export interface FactionData {
  color: string
}
export const factions: Record<Faction, FactionData> = {
  [Faction.COSMIC]: {
    //not white, but close enough
    color: "#a2f4ff",
  },
  [Faction.VOID]: {
    color: "#333333",
  },
  [Faction.GALACTIC]: {
    color: "#ff0000",
  },
  [Faction.QUANTUM]: {
    color: "#00ff00",
  },
  [Faction.DOMINION]: {
    color: "#0000ff",
  },
  [Faction.ASTRO]: {
    color: "#ffff00",
  },
  [Faction.CORSAIRS]: {
    color: "#ff00ff",
  },
  [Faction.OBSIDIAN]: {
    color: "#00ffff",
  },
  [Faction.AEGIS]: {
    color: "#ff8000",
  },
  [Faction.UNITED]: {
    color: "#ff0080",
  },
  [Faction.SOLITARY]: {
    color: "#80ff00",
  },
  [Faction.COBALT]: {
    color: "#0080ff",
  },
  [Faction.OMEGA]: {
    color: "#8000ff",
  },
  [Faction.ECHO]: {
    color: "#00ff80",
  },
  [Faction.LORDS]: {
    color: "#800080",
  },
  [Faction.CULT]: {
    color: "#808000",
  },
  [Faction.ANCIENTS]: {
    color: "#008080",
  },
  [Faction.SHADOW]: {
    color: "#808080",
  },
  [Faction.ETHEREAL]: {
    color: "#ff8080",
  },
}