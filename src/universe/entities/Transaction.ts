export class Transaction {
  waypointSymbol: string
  shipSymbol: string
  tradeSymbol: string
  type: 'PURCHASE' | 'SELL'
  units: number
  pricePerUnit: number
  totalPrice: number
  timestamp: Date
}