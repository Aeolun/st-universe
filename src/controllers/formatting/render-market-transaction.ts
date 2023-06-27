import { Transaction } from "src/universe/entities/Transaction";
import { MarketTransaction } from "src/controllers/schemas";

export function renderMarketTransaction(st: Transaction): MarketTransaction {
  return {
    waypointSymbol: st.waypointSymbol,
    shipSymbol: st.tradeSymbol,
    pricePerUnit: st.pricePerUnit,
    totalPrice: st.totalPrice,
    tradeSymbol: st.tradeSymbol,
    units: st.units,
    type: st.type,
    timestamp: st.timestamp.toISOString(),
  };
}
