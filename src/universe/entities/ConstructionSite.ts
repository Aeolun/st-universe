import { TradeGood } from "src/universe/static-data/trade-goods";

export class ConstructionSite {
  public requiredResources: Partial<Record<TradeGood, number>> = {};
  public resources: Partial<Record<TradeGood, number>> = {};
  public isComplete: boolean = false;
  constructor(data: { requiredResources: Partial<Record<TradeGood, number>> }) {
    this.requiredResources = data.requiredResources;
  }
}
