import {Enum, Property} from "@tsed/schema";
import {Faction} from "src/universe/static-data/faction";

export class GlobalRegisterPayload {
  @Property()
  symbol: string

  @Enum(Faction)
  faction: Faction

  @Property()
  email?: string
}