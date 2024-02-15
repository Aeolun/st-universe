import { Transaction } from "src/universe/entities/Transaction";
import { ShipyardTransaction } from "../schemas";

export function renderShipTransaction(st: Transaction): ShipyardTransaction {
  return {
    waypointSymbol: st.waypointSymbol,
    shipSymbol: st.shipSymbol,
    shipType: st.tradeSymbol,
    price: st.pricePerUnit,
    agentSymbol: st.agentSymbol,
    timestamp: st.timestamp.toISOString()
  }
}
