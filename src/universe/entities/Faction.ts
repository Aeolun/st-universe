import { Location} from "src/universe/entities/Navigation";
import {Faction as FactionEnum} from "src/universe/static-data/faction";
import {FactionTrait} from "src/universe/static-data/faction-traits";

export class Faction {
  public headquarters: Location
  public traits: FactionTrait[]
  public isRecruiting: boolean = false
  constructor(public symbol: FactionEnum, public name: string, public description: string, public data: {
    headquarters: Location
    traits: FactionTrait[]
    isRecruiting: boolean
  }) {
    this.headquarters = data.headquarters
    this.traits = data.traits
    this.isRecruiting = data.isRecruiting
  }
}