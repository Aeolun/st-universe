import {
  TradeGood,
  TradeGoodKey,
  tradeGoods,
} from "src/universe/static-data/trade-goods";
import { resourceGroups } from "src/universe/static-data/resource-groups";
import { ShipRefine200ResponseDataProducedInner } from "src/controllers/schemas/ship-refine200-response-data-produced-inner";
import { AbstractCapabilities } from "src/universe/entities/capabilities/AbstractCapabilities";
import { Storage } from "src/universe/entities/Storage";

export function refine(
  refineries: AbstractCapabilities[],
  cargo: Storage,
  product: TradeGoodKey
) {
  let totalRefined = 0,
    canRefine = false;

  const consumed = new Storage();
  const produced = new Storage();

  refineries.forEach((refinery) => {
    refinery.stats.resourcesRefined.forEach((availableRefining) => {
      const resources: TradeGood[] = [];
      availableRefining.groups.forEach((group) => {
        resources.push(...resourceGroups[group]);
      });

      resources.forEach((resource) => {
        if (resource === product) {
          canRefine = true;
        }

        if (resource !== product) return;

        const tradeGood = tradeGoods[resource];

        let maxConstruction = 1000000;
        if ("components" in tradeGood && tradeGood.components) {
          Object.keys(tradeGood.components).forEach((component: TradeGood) => {
            maxConstruction = Math.min(
              maxConstruction,
              Math.floor(
                cargo.get(component) / tradeGood.components[component]!
              )
            );
          });
        }

        const amount = Math.min(maxConstruction, availableRefining.units);

        totalRefined += amount;

        // consume items from cargo
        if ("components" in tradeGood && tradeGood.components) {
          Object.keys(tradeGood.components).forEach((component: TradeGood) => {
            const componentAmount = tradeGood.components[component]! * amount;
            cargo.remove(component, componentAmount);
            consumed.add(component, componentAmount);
          });
        }
        // produce items to cargo
        cargo.add(resource, amount);
        produced.add(resource, amount);
      });
    });
  });

  return {
    produced: produced.toGoodArray(),
    consumed: consumed.toGoodArray(),
    canRefine,
    totalRefined,
  };
}
