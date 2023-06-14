import {Capability} from "src/universe/entities/capabilities/Capability";
import {Stats} from "src/universe/entities/Stats";

export interface HasCapabilities {
  capabilities: Capability[]

  addStats(stats: Stats): Stats
  multiplyStats(stats: Stats): Stats
}