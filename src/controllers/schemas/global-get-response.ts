import {Enum, Property} from "@tsed/schema";
import {Faction} from "src/universe/static-data/faction";


export class GlobalGetResponseStats {
  @Property()
  agents: number
  @Property()
  ships: number
  @Property()
  systems: number
  @Property()
  waypoints: number
}
export class GlobalGetResponseServerResets {
  @Property()
  next: string
  @Property()
  frequency: string
}

export class GlobalGetResponse {
  @Property()
  status: string

  @Property()
  version: string

  @Property()
  resetDate: string

  @Property()
  description: string

  @Property()
  stats: GlobalGetResponseStats

  @Property()
  serverResets: GlobalGetResponseServerResets
}