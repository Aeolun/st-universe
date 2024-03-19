import { Waypoint } from "src/universe/entities/Waypoint";
import { universe } from "src/universe/universe";
import { TradeGood, tradeGoods } from "src/universe/static-data/trade-goods";
import { Contract } from "src/universe/entities/Contract";
import { Agent } from "src/universe/entities/Agent";
import { pickRandom, trulyUniqId, uniqueId } from "src/universe/utilities";
import { Faction } from "src/universe/static-data/faction";
import { marketPrice } from "src/universe/formulas/trade";
import { getDistance } from "src/universe/getDistance";
import { SupplyDemand } from "src/universe/static-data/supply-demand";

export function generateContract(agent: Agent, generationWaypoint: Waypoint) {
  if (!generationWaypoint.ownedBy) {
    throw new Error(
      `Waypoint ${generationWaypoint.symbol} is not owned by a faction. Cannot generate a contract here.`
    );
  }

  const system = Object.values(universe.systems).find(
    (s) => s.symbol === generationWaypoint.systemSymbol
  );

  if (!system)
    throw new Error(
      `No systems with needs were found around ${generationWaypoint.symbol}`
    );

  let mostLackingResource:
    | {
        waypoint: string;
        tradeGoodSymbol: TradeGood;
        amount: number;
        amountPercentage: number;
        faction?: Faction;
        supplyDemand: SupplyDemand;
      }
    | undefined;
  system.waypoints.forEach((waypoint) => {
    Object.values(waypoint.supplyDemand).forEach((resource) => {
      if (
        !mostLackingResource ||
        mostLackingResource.amountPercentage >
          waypoint.inventory.get(resource.tradeGood) /
            resource.current.idealSupply
      ) {
        mostLackingResource = {
          waypoint: waypoint.symbol,
          tradeGoodSymbol: resource.tradeGood,
          amount:
            resource.current.idealSupply -
            waypoint.inventory.get(resource.tradeGood),
          amountPercentage:
            waypoint.inventory.get(resource.tradeGood) /
            resource.current.idealSupply,
          faction: waypoint.ownedBy,
          supplyDemand: resource,
        };
      }
    });
  });

  if (!mostLackingResource) {
    throw new Error(`No contracts possible for system ${system.symbol}.`);
  }

  const waypoint = system.waypoints.find(
    (w) => w.symbol === mostLackingResource?.waypoint
  );
  if (!waypoint) {
    throw new Error("Waypoint not found");
  }

  const price = marketPrice(
    tradeGoods[mostLackingResource.tradeGoodSymbol].basePrice ?? 0,
    waypoint?.inventory.get(mostLackingResource.tradeGoodSymbol),
    mostLackingResource.supplyDemand.current.idealSupply,
    mostLackingResource.supplyDemand.current.maxSupply
  );
  const finalCount = Math.max(mostLackingResource.amount, 50);
  const totalReward = price.salePrice * finalCount;

  const contract = new Contract(
    agent.symbol + trulyUniqId(),
    generationWaypoint.ownedBy,
    [
      {
        type: "PROCUREMENT",
        deliveryWaypointSymbol: mostLackingResource.waypoint,
        deliveryGoodSymbol: mostLackingResource.tradeGoodSymbol,
        deliveryQuantity: finalCount,
        deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        deliveredQuantity: 0,
        onAccept: Math.round(totalReward * 0.3),
        onFulfilled: Math.round(totalReward * 0.7),
      },
    ]
  );
  agent.contracts.push(contract);

  return contract;
}
