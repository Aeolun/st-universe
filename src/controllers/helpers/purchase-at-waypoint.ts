import { BadRequest } from "@tsed/exceptions";
import { marketPrice } from "src/universe/formulas/trade";
import { Transaction } from "src/universe/entities/Transaction";
import { Waypoint } from "src/universe/entities/Waypoint";
import { TradeSymbol } from "src/controllers/schemas";
import { Ship } from "src/universe/entities/Ship";
import { Agent } from "src/universe/entities/Agent";
import { STError } from "src/error/STError";

export function purchaseAtWaypoint(
  agent: Agent,
  waypoint: Waypoint,
  ship: Ship,
  tradeSymbol: TradeSymbol,
  units: number
) {
  const supplyDemand = waypoint.supplyDemand[tradeSymbol];
  if (!supplyDemand) {
    throw new STError(400, 4602, `You cannot buy ${tradeSymbol} here.`);
  }

  if (ship.cargo.total() + units > ship.stats.cargoSpace) {
    throw new STError(400, 4217, `You do not have enough cargo space.`);
  }

  const price = marketPrice(
    waypoint.inventory.get(supplyDemand.tradeGood),
    supplyDemand
  );
  const total = price.salePrice * units;

  if (agent.credits < total) {
    throw new STError(400, 4600, `You do not have enough credits.`);
  }

  agent.credits -= total;
  ship.cargo.add(tradeSymbol, units);
  const transaction: Transaction = {
    waypointSymbol: waypoint.symbol,
    tradeSymbol: tradeSymbol,
    timestamp: new Date(),
    shipSymbol: ship.symbol,
    agentSymbol: agent.symbol,
    type: "PURCHASE",
    totalPrice: total,
    pricePerUnit: price.salePrice,
    units: units,
  };
  waypoint.transactions.push(transaction);
  waypoint.inventory.remove(supplyDemand.tradeGood, units);

  return { transaction };
}
