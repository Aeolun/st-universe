import {SupplyDemand, Waypoint} from "src/universe/entities/Waypoint";
import {universe} from "src/universe/universe";
import {TradeGood} from "src/universe/static-data/trade-goods";
import {Contract} from "src/universe/entities/Contract";
import {Agent} from "src/universe/entities/Agent";
import {uniqueId} from "src/universe/utilities";
import {Faction} from "src/universe/static-data/faction";
import {marketPrice} from "src/universe/formulas/trade";

export function generateContract(agent: Agent, generationWaypoint: Waypoint) {
  if (!generationWaypoint.ownedBy) {
    throw new Error(`Waypoint ${generationWaypoint.symbol} is not owned by a faction. Cannot generate a contract here.`)
  }

  const system = universe.systems.filter(s => s.hasMarket).find(s => s.symbol === generationWaypoint.systemSymbol)
  if (!system) throw new Error(`System not found for waypoint ${generationWaypoint}`)

  let mostLackingResource: {waypoint: string, tradeGoodSymbol: TradeGood, amount: number, amountPercentage: number, faction?: Faction, supplyDemand: SupplyDemand } | undefined
  system.waypoints.forEach(waypoint => {
    Object.values(waypoint.supplyDemand).forEach(resource => {
      if (!mostLackingResource || mostLackingResource.amountPercentage > resource.currentSupply / resource.idealSupply) {
        mostLackingResource = {
          waypoint: waypoint.symbol,
          tradeGoodSymbol: resource.tradeGood,
          amount: resource.idealSupply - resource.currentSupply,
          amountPercentage: resource.currentSupply / resource.idealSupply,
          faction: waypoint.ownedBy,
          supplyDemand: resource
        }
      }
    })
  })

  if (!mostLackingResource) throw new Error(`No contracts possible for system ${system.symbol}.`);

  const price = marketPrice(mostLackingResource.supplyDemand);
  const totalReward = price.salePrice * mostLackingResource.amount;

  const contract = new Contract(agent.symbol+uniqueId(), generationWaypoint.ownedBy, [{
    type: 'PROCUREMENT',
    deliveryWaypointSymbol: mostLackingResource.waypoint,
    deliveryGoodSymbol: mostLackingResource.tradeGoodSymbol,
    deliveryQuantity: mostLackingResource.amount,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    deliveredQuantity: 0,
    onAccept: Math.round(totalReward * 0.3),
    onFulfilled: Math.round(totalReward * 0.7),
  }])
  agent.contracts.push(contract)

  return contract
}