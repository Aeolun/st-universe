import {ContractTypeEnum} from "src/controllers/schemas";
import {TradeGood} from "src/universe/static-data/trade-goods";
import {Faction} from "src/universe/static-data/faction";

type GeneralTerm = {
  deadline?: Date
  onAccept: number
  onFulfilled: number
}

type ProcurementTerm = {
  type: 'PROCUREMENT'
  deliveryWaypointSymbol: string
  deliveryGoodSymbol: TradeGood
  deliveryQuantity: number
  deliveredQuantity: number
} & GeneralTerm

type ContractTerm = ProcurementTerm

export class Contract {
  availableUntil: Date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
  status: 'AVAILABLE' | 'ACCEPTED' | 'FULFILLED' | 'EXPIRED' = 'AVAILABLE'

  terms: ContractTerm[]

  constructor(public symbol: string, public factionSymbol: Faction, terms: ContractTerm[]) {
    this.terms = terms
  }
}