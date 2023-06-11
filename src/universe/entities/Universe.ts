import {System} from "src/universe/entities/System";
import {Agent} from "src/universe/entities/Agent";
import {Ship} from "src/universe/entities/Ship";

export class Universe {
  public name: string;
  public systems: System[] = []
  public agents: Agent[] = []
  public ships: Ship[] = []
  public waypointCount = 0
  public createDate: string

  constructor(data: {
    symbol: string
  }) {
    this.name = data.symbol
    const createDate = new Date()
    this.createDate = createDate.toISOString().split('T')[0]
  }

  public tick() {
    const start = Date.now()
    this.systems.forEach(s => s.tick())
    const end = Date.now()
    console.log(`Universe tick took ${end - start}ms`)
  }

  public addSystem(system: System) {
    this.waypointCount += system.waypoints.length
    this.systems.push(system)
  }
}