import type {
  Components,
  TradeGood,
} from "src/universe/static-data/trade-goods";
import type { Storage } from "src/universe/entities/Storage";

export const tickProductionLine = (
  components: Components,
  product: TradeGood,
  volume: number,
  inventory: Storage
): Partial<
  Record<
    TradeGood,
    {
      activity: number;
      consumption: number;
      production: number;
    }
  >
> => {
  let satisfied = true;
  for (const component of Object.keys(components) as TradeGood[]) {
    const requiredCount = (components[component] ?? 0) * volume;
    if (inventory.get(component) < requiredCount) {
      satisfied = false;
    }
  }
  if (satisfied) {
    for (const component of Object.keys(components) as TradeGood[]) {
      const requiredCount = (components[component] ?? 0) * volume;
      inventory.remove(component, requiredCount);
    }

    inventory.add(product, volume);

    const activity = {
      [product]: {
        activity: 1,
        consumption: 0,
        production: volume,
      },
    };
    // activity for components
    for (const component of Object.keys(components) as TradeGood[]) {
      activity[component] = {
        activity: 1,
        consumption: (components[component] ?? 0) * volume,
        production: 0,
      };
    }
    return activity;
  }
  // if we cannot produce a good, activity on that good goes down
  const activity = {
    [product]: {
      activity: -1,
      consumption: 0,
      production: 0,
    },
  };
  // activity for components
  for (const component of Object.keys(components) as TradeGood[]) {
    activity[component] = {
      activity: -1,
      consumption: 0,
      production: 0,
    };
  }
  return activity;
};
