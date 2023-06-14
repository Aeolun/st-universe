import {HasCapabilities} from "src/universe/entities/capabilities/HasCapabilities";
import {Capability} from "src/universe/entities/capabilities/Capability";
import {Stats} from "src/universe/entities/Stats";

export abstract class AbstractCapabilities implements HasCapabilities {
  capabilities: Capability[] = []

  addStats(stats: Stats): Stats {
    return this.capabilities.reduce((stats, capability) => capability.addStats(stats), stats)
  }

  multiplyStats(stats: Stats): Stats {
    return this.capabilities.reduce((stats, capability) => capability.multiplyStats(stats), stats)
  }
}