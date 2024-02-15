import { Agent } from "src/universe/entities/Agent";

export function renderAgent(newAgent: Agent) {
  return {
    symbol: newAgent.symbol,
    accountId: newAgent.accountId,
    headquarters: newAgent.headquarters.waypointSymbol,
    credits: newAgent.credits,
    shipCount: newAgent.ships.length,
    startingFaction: newAgent.faction,
  };
}
