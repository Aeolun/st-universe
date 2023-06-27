import {Transaction} from "src/universe/entities/Transaction";

export function renderShipTransaction(st: Transaction) {
  return {
    waypointSymbol: st.waypointSymbol,
    shipSymbol: st.tradeSymbol,
    price: st.pricePerUnit,
    agentSymbol: st.agentSymbol,
    timestamp: st.timestamp.toISOString()
  }
}