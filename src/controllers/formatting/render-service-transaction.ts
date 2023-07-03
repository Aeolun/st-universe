import { Transaction } from "src/universe/entities/Transaction";
import { ShipModificationTransaction } from "src/controllers/schemas";

export function renderServiceTransaction(
  st: Transaction
): ShipModificationTransaction {
  return {
    waypointSymbol: st.waypointSymbol,
    shipSymbol: st.shipSymbol,
    totalPrice: st.totalPrice,
    tradeSymbol: st.tradeSymbol,
    timestamp: st.timestamp.toISOString(),
  };
}
