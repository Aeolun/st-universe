import * as string_decoder from "string_decoder";

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
  name: string
  description: string
  isRecruiting: boolean
}
export const factions: Record<Faction, FactionData> = {
  [Faction.COSMIC]: {
    //not white, but close enough
    color: "#a2f4ff",
    name: "Cosmic Engineers",
    description: "The Cosmic Engineers are a group of highly advanced scientists and engineers who seek to terraform and colonize new worlds, pushing the boundaries of technology and exploration.",
    isRecruiting: true,
  },
  [Faction.VOID]: {
    color: "#333333",
    name: "Voidfarers",
    description: "The Voidfarers are a group of nomadic traders and adventurers who travel the galaxy in search of riches and adventure, willing to take risks and explore the unknown.",
    isRecruiting: true,
  },
  [Faction.GALACTIC]: {
    color: "#ff0000",
    name: 'Galactic Alliance',
    description: 'The Galactic Alliance is a coalition of planets and factions that have banded together for mutual protection and support, working together to defend against external threats and promote cooperation.',
    isRecruiting: true,
  },
  [Faction.QUANTUM]: {
    color: "#00ff00",
    name: 'Quantum Federation',
    description: 'The Quantum Federation is a group of planets and factions that have joined together to share knowledge and technology, using their collective expertise to advance the science and technology of the galaxy.',
    isRecruiting: true,
  },
  [Faction.DOMINION]: {
    color: "#0000ff",
    name: 'Stellar Dominion',
    description: 'The Stellar Dominion is a powerful, expansionist faction that seeks to conquer and control as many systems as possible, using their advanced technology and military might to dominate their rivals.',
    isRecruiting: true,
  },
  [Faction.ASTRO]: {
    color: "#ffff00",
    name: 'Astro-Salvage Alliance',
    description: 'The Astro-Salvage Alliance is a group of scavengers and salvagers who search the galaxy for ancient artifacts and valuable technology, often combing through old ship battlegrounds and derelict space stations.',
    isRecruiting: true,
  },
  [Faction.CORSAIRS]: {
    color: "#ff00ff",
    name: 'Seventh Space Corsairs',
    description: 'The Seventh Space Corsairs are a feared group of pirates and raiders who operate throughout the galaxy, preying on merchant ships and plundering valuable cargo.',
    isRecruiting: true,
  },
  [Faction.OBSIDIAN]: {
    color: "#00ffff",
    name: 'Obsidian Syndicate',
    description: 'The Obsidian Syndicate is a secretive and powerful organization, often involved in illicit activities. They have a vast network of informants and are known for their intelligence capabilities. Not much is known about their actual structure or aims, as they are a highly guarded faction.',
    isRecruiting: true,
  },
  [Faction.AEGIS]: {
    color: "#ff8000",
    name: 'Aegis Collective',
    description: 'The Aegis Collective is a group of fortified settlements united under a common goal: survival. They focus on defensive strategies and are known to be exceptionally self-sufficient. Despite their somewhat closed-off nature, they are always willing to take in those who need protection.',
    isRecruiting: true,
  },
  [Faction.UNITED]: {
    color: "#ff0080",
    name: 'United Independent Settlements',
    description: 'The United Independent Settlements is a loose coalition of small settlements and outposts that have joined together for mutual support and protection, working to defend their independence against larger factions and protect their way of life.',
    isRecruiting: true,
  },
  [Faction.SOLITARY]: {
    color: "#80ff00",
    name: 'Solitary Systems Alliance',
    description: 'The Solitary Systems Alliance is a loosely-connected group of independent settlements and outposts that have joined together to promote their own interests and protect their autonomy, even if they don\'t always see eye-to-eye.',
    isRecruiting: true,
  },
  [Faction.COBALT]: {
    color: "#0080ff",
    name: 'Cobalt Traders Alliance',
    description: 'The Cobalt Traders Alliance is a group of independent traders and merchants who have come together to promote free trade and open markets, working to protect their interests against larger factions and corporations.',
    isRecruiting: true,
  },
  [Faction.OMEGA]: {
    color: "#8000ff",
    name: 'Omega Star Network',
    description: 'The Omega Star Network is a group of exiles and rebels, united by their refusal to submit to the control of larger factions. Living on the fringes of society, they have built a network based on mutual trust and the shared belief that freedom is paramount.',
    isRecruiting: true,
  },
  [Faction.ECHO]: {
    color: "#00ff80",
    name: 'Echo Technological Conclave',
    description: 'Echo Technological Conclave is an innovative and forward-thinking faction that thrives on technological advancement and scientific discovery. They have a deep commitment to progress and a drive to push the boundaries of what is possible, making them a force to be reckoned with.',
    isRecruiting: true,
  },
  [Faction.LORDS]: {
    color: "#800080",
    name: 'Lords of the Void',
    description: 'The Lords of the Void are a mysterious civilization who traverse the galaxy in search of knowledge and power, often using their advanced technology to their advantage.',
    isRecruiting: true,
  },
  [Faction.CULT]: {
    color: "#808000",
    name: 'Cult of the Machine',
    description: 'The Cult of the Machine is a fanatical group of religious zealots who worship technology and seek to use it to further their own aims, often disregarding the lives of others in pursuit of their own power.',
    isRecruiting: true,
  },
  [Faction.ANCIENTS]: {
    color: "#008080",
    name: 'Ancient Guardians',
    description: 'The Ancient Guardians are a mysterious group of protectors who guard ancient artifacts and sites of power, often using their advanced technology and knowledge to protect against external threats.',
    isRecruiting: true,
  },
  [Faction.SHADOW]: {
    color: "#808080",
    name: 'Shadow Stalkers',
    description: 'The Shadow Stalkers are a clandestine group, seemingly appearing and disappearing at will. Little is known about their actual motivations. Their ability to move without detection has sparked many rumors, some say they are interdimensional travelers.',
    isRecruiting: true,
  },
  [Faction.ETHEREAL]: {
    color: "#ff8080",
    name: 'Ethereal Collective',
    description: 'The Ethereal Enclave is a faction that is said to have transcended physical existence. They are believed to possess great wisdom and mysterious abilities. The actual nature of the Enclave is subject to much speculation, and sightings of their representatives are rare and often dismissed as legends.',
    isRecruiting: true,
  },
}