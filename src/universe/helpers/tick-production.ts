import type { Storage } from "src/universe/entities/Storage";
import { SupplyDemand } from "src/universe/static-data/supply-demand";

export const tickProduction = (
  supplyDemand: SupplyDemand,
  inventory: Storage
) => {
  supplyDemand.lastTickProduction = 0;
  supplyDemand.lastTickConsumption = 0;

  if (
    supplyDemand.current.productionRate > 0 &&
    inventory.get(supplyDemand.tradeGood) < supplyDemand.current.maxSupply
  ) {
    inventory.add(supplyDemand.tradeGood, supplyDemand.current.productionRate);
    supplyDemand.activity++;
  } else if (supplyDemand.current.productionRate > 0) {
    supplyDemand.activity--;
  }
  if (
    supplyDemand.current.consumptionRate > 0 &&
    inventory.get(supplyDemand.tradeGood) > supplyDemand.current.consumptionRate
  ) {
    inventory.remove(
      supplyDemand.tradeGood,
      supplyDemand.current.consumptionRate
    );
    supplyDemand.activity++;
  } else if (supplyDemand.current.consumptionRate > 0) {
    supplyDemand.activity--;
  }
};
