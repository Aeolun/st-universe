import {HasCapabilities} from "src/universe/entities/capabilities/HasCapabilities";
import {Capability} from "src/universe/entities/capabilities/Capability";
import {Stats} from "src/universe/entities/Stats";

export abstract class AbstractCapabilities implements HasCapabilities {
  symbol: string
  capabilities: Capability[] = []
  calculatedStats?: Stats

  addStats(stats: Stats): Stats {
    if (!this.capabilities) {
      throw new Error(`Capabilities not initialized on ${this.symbol}`)
    }
    return this.capabilities.reduce((stats, capability) => capability.addStats(stats), stats)
  }

  multiplyStats(stats: Stats): Stats {
    return this.capabilities.reduce((stats, capability) => capability.multiplyStats(stats), stats)
  }

  get stats(): Stats {
    if (this.calculatedStats)
      return this.calculatedStats

    this.calculatedStats = new Stats()
    this.addStats(this.calculatedStats)
    this.multiplyStats(this.calculatedStats)
    return this.calculatedStats
  }
}