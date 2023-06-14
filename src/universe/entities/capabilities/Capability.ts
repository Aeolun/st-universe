import {Stats} from "src/universe/entities/Stats";

type AddMultiplyStats =
  | "powerGenerated"
  | "thrust"
  | "warpRange"
  | "surveysGenerated"
  | "scanPower"
  | "jumpRange"
  | "crewRequired"
  | "mountingPoints"
  | "mountingPointsRequired"
  | "moduleCapacity"
  | "moduleCapacityRequired"
  | "shieldCapacity"
  | "hullCapacity"
  | 'crewCapacity'
  | 'fuelCapacity'
  | 'powerRequired'
  | 'extractionPower'
type AppendStats = "resourcesExtracted" | "resourcesSurveyed"

interface AddStatAdjustment<T extends AddMultiplyStats = AddMultiplyStats> {
  stat: AddMultiplyStats
  kind: "add"
  value: Stats[T]
}

interface MaxStatAdjustment<T extends AddMultiplyStats = AddMultiplyStats> {
  stat: AddMultiplyStats
  kind: "max"
  value: Stats[T]
}

interface MinStatAdjustment<T extends AddMultiplyStats = AddMultiplyStats> {
  stat: AddMultiplyStats
  kind: "min"
  value: Stats[T]
}

interface MultiplyStatAdjustment<T extends AddMultiplyStats = AddMultiplyStats> {
  stat: AddMultiplyStats
  kind: "multiply"
  value: Stats[T]
}

interface AppendStatAdjustment<T extends AppendStats = AppendStats> {
  stat: AppendStats
  kind: "append"
  value: Stats[T]
}

export type StatAdjustment = AddStatAdjustment | MaxStatAdjustment | MinStatAdjustment | MultiplyStatAdjustment | AppendStatAdjustment

export class Capability {
  statAdjustments: StatAdjustment[]

  constructor(data: {
    statAdjustments: StatAdjustment[]
  }) {
    this.statAdjustments = data.statAdjustments
  }

  addStats(stats: Stats): Stats {
    return this.statAdjustments.reduce((stats, adjustment) => {
      if (adjustment.kind === "add") {
        const value = stats[adjustment.stat]

        stats[adjustment.stat] = value + adjustment.value
      }
      if (adjustment.kind === "append") {
        const value = stats[adjustment.stat]

        stats[adjustment.stat] = value.concat(adjustment.value)
      }
      if (adjustment.kind === "max") {
        const value = stats[adjustment.stat]

        stats[adjustment.stat] = value > adjustment.value ? value : adjustment.value
      }
      if (adjustment.kind === "min") {
        const value = stats[adjustment.stat]

        stats[adjustment.stat] = value < adjustment.value ? value : adjustment.value
      }
      return stats
    }, stats)
  }

  multiplyStats(stats: Stats): Stats {
    return this.statAdjustments.reduce((stats, adjustment) => {
      if (adjustment.kind === "multiply") {
        const value = stats[adjustment.stat]

        stats[adjustment.stat] = value * adjustment.value
      }
      return stats
    }, stats)
  }
}