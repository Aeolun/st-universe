import {System} from "src/universe/entities/System";
import {Agent} from "src/universe/entities/Agent";
import {Ship} from "src/universe/entities/Ship";
import {SupplyDemand} from "src/universe/entities/Waypoint";
import {TradeGood} from "src/universe/static-data/trade-goods";
import {Faction} from "src/universe/entities/Faction";

export class Universe {
  public name: string;
  public systems: System[] = []
  public agents: Agent[] = []
  public ships: Ship[] = []
  public factions: Faction[] = []
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

  public allGoods() {
    const goods: Partial<Record<TradeGood, {
      symbol: TradeGood
      productionRate: number
      consumptionRate: number
      productionLineProductionRate: number
      productionLineConsumptionRate: number
      lastTickProduction: number
      lastTickConsumption: number
      supplyOnConsumers: number
      supplyOnProducers: number
      supplyOnExchange: number
      desiredSupply: number
      maxSupply: number
    }>> = {}
    this.systems.forEach(s => {
      s.waypoints.forEach(w => {
        Object.values(w.supplyDemand).forEach(sd => {
          if (!goods[sd.tradeGood]) {
            goods[sd.tradeGood] = {
              symbol: sd.tradeGood,
              supplyOnConsumers: 0,
              supplyOnProducers: 0,
              supplyOnExchange: 0,
              lastTickProduction: 0,
              lastTickConsumption: 0,
              productionRate: 0,
              consumptionRate: 0,
              productionLineProductionRate: 0,
              productionLineConsumptionRate: 0,
              desiredSupply: 0,
              maxSupply: 0,
            }
          }
          const good = goods[sd.tradeGood]
          if (good) {
            good.supplyOnConsumers += sd.kind === 'demand' ? sd.currentSupply : 0
            good.supplyOnProducers += sd.kind === 'supply' ? sd.currentSupply : 0
            good.supplyOnExchange += sd.kind === 'exchange' ? sd.currentSupply : 0
            good.productionRate += sd.productionRate
            good.consumptionRate += sd.consumptionRate
            good.lastTickProduction += sd.lastTickProduction
            good.lastTickConsumption += sd.lastTickConsumption
            good.productionLineProductionRate += sd.productionLineProductionRate
            good.productionLineConsumptionRate += sd.productionLineConsumptionRate
            good.desiredSupply += sd.idealSupply
            good.maxSupply += sd.maxSupply
          }
        })
      })
    })
    return Object.values(goods)
  }
}