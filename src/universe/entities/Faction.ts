import { Location} from "src/universe/entities/Navigation";
import {Faction as FactionEnum} from "src/universe/static-data/faction";

export class Faction {
  constructor(public symbol: FactionEnum, public name: string, public description: string, public data: {
    headquarters: Location
    traits: FactionTrait
  }) {

  }
}