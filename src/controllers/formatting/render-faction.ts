import {Faction} from "src/universe/entities/Faction";
import {factionTraits} from "src/universe/static-data/faction-traits";

export function renderFaction(faction: Faction) {
  return {
    symbol: faction.symbol,
    name: faction.name,
    description: faction.description,
    headquarters: faction.headquarters.waypoint,
    traits: faction.traits.map((trait) => {
      return {
        symbol: trait,
        name: factionTraits[trait].name,
        description: factionTraits[trait].description
      }
    }),
    isRecruiting: faction.isRecruiting
  }
}