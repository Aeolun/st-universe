import { TradeGood } from "src/universe/static-data/trade-goods";

export class Storage {
  resources: Partial<Record<TradeGood, number>> = {};

  constructor(initial?: Partial<Record<TradeGood, number>>) {
    if (initial) {
      this.resources = initial;
    }
  }

  add(resource: TradeGood, amount: number) {
    this.resources[resource] = (this.resources[resource] ?? 0) + amount;
  }

  get(resource: TradeGood) {
    return this.resources[resource] ?? 0;
  }

  total() {
    return Object.values(this.resources).reduce((acc, cur) => acc + cur, 0);
  }

  remove(resource: TradeGood, amount: number) {
    if (!this.has(resource, amount)) {
      throw new Error(`Cannot remove ${amount} of ${resource}`);
    }
    this.resources[resource] = (this.resources[resource] ?? 0) - amount;
  }

  has(resource: TradeGood, amount: number) {
    const value = this.resources[resource];
    return value ? value >= amount : false;
  }

  toGoodArray() {
    return Object.keys(this.resources).map((resource: TradeGood) => ({
      tradeSymbol: resource,
      units: this.get(resource as TradeGood),
    }));
  }
}
