import { TradeGood, TradeGoodKey } from "src/universe/static-data/trade-goods";

export class Storage {
  resources: Partial<Record<TradeGood, number>> = {};

  constructor(initial?: Partial<Record<TradeGoodKey, number>>) {
    if (initial) {
      this.resources = initial;
    }
  }

  add(resource: TradeGoodKey, amount: number) {
    this.resources[resource] = (this.resources[resource] ?? 0) + amount;
  }

  get(resource: TradeGoodKey) {
    return this.resources[resource] ?? 0;
  }

  set(resource: TradeGoodKey, amount: number) {
    this.resources[resource] = amount;
  }

  total() {
    return Object.values(this.resources).reduce((acc, cur) => acc + cur, 0);
  }

  remove(resource: TradeGoodKey, amount: number) {
    if (!this.has(resource, amount)) {
      throw new Error(
        `Cannot remove ${amount} of ${resource}, have ${this.get(resource)}`
      );
    }
    this.resources[resource] = (this.resources[resource] ?? 0) - amount;
    if (this.resources[resource] === 0) {
      delete this.resources[resource];
    }
  }

  has(resource: TradeGoodKey, amount: number) {
    const value = this.resources[resource];
    return value ? value >= amount : false;
  }

  toGoodArray() {
    return Object.keys(this.resources)
      .map((resource: TradeGood) => ({
        tradeSymbol: resource,
        units: this.get(resource as TradeGood),
      }))
      .filter(({ units }) => units > 0);
  }
}
