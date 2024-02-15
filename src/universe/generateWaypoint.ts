import { Waypoint } from "./entities/Waypoint";
import {
  numberBetween,
  pickRandom,
  randomString,
  randomWeightedKey,
  trulyUniqId,
  uniqueId,
} from "./utilities";
import {
  generatableWaypointTypeNames,
  WaypointType,
  waypointTypes,
} from "./static-data/waypoint-types";
import {
  TraitModifiers,
  WaypointTrait,
  waypointTraitNames,
  waypointTraits,
} from "src/universe/static-data/waypoint-traits";
import {
  TradeGood,
  tradeGoods,
  tradeGoodTypeNames,
} from "src/universe/static-data/trade-goods";
import {
  industries,
  Industry,
  industryNames,
} from "src/universe/static-data/industries";
import {
  Configuration,
  shipConfigurationData,
} from "src/universe/static-data/ship-configurations";
import { JumpGate } from "src/universe/entities/JumpGate";

const availableTraits: Record<string, WaypointTrait[]> = {};

export interface WaypointGenerationProperties {
  x: number;
  y: number;
  inOrbitOf?: string;
  type?: WaypointType;
  traits?: WaypointTrait[];
  industries?: Industry[];
  tradeGoods?: { symbol: TradeGood; type: "import" | "export" | "exchange" }[];
  shipHullsAvailable?: Configuration[];
  jumpGateRange?: number;
  systemSymbol: string;
}
export const generateWaypoint = (data: WaypointGenerationProperties) => {
  const { systemSymbol, traits, ...rest } = data;

  const waypointSymbol = `${systemSymbol}-${randomString(4)}`;

  const waypointType: WaypointType =
    data.type ?? pickRandom(generatableWaypointTypeNames);

  const waypoint = new Waypoint({
    ...rest,
    systemSymbol: systemSymbol,
    symbol: waypointSymbol,
    type: waypointType,
  });
  waypoint.traits.push("UNCHARTED");

  const waypointTypeData = waypointTypes[waypointType];

  let availableTraitsForType = availableTraits[waypointType];
  if (!availableTraitsForType) {
    availableTraitsForType = waypointTraitNames.filter((t) =>
      waypointTraits[t].validFor.includes(waypointType)
    );
    availableTraits[waypointType] = availableTraitsForType;
  }

  const waypointTraitCount = numberBetween(0, waypointTypeData.maxTraits);

  if (data.traits) {
    waypoint.traits.push(...data.traits);
  } else {
    waypointTrait: for (let i = 0; i < waypointTraitCount; i++) {
      if (availableTraitsForType.length === 0) {
        continue;
      }

      const newTrait = pickRandom(availableTraitsForType);
      const traitData = waypointTraits[newTrait];
      const requiredCategories = traitData.requiresCategory;
      if (requiredCategories) {
        for (const category of requiredCategories) {
          if (
            !waypoint.traits.some(
              (t) => waypointTraits[t].category === category
            )
          ) {
            continue waypointTrait;
          }
        }
      }

      waypoint.traits.push(newTrait);
    }
  }
  waypoint.traits.forEach((trait) => {
    const traitData = waypointTraits[trait];
    if (traitData.populationLevel) {
      waypoint.population += traitData.populationLevel;
    }

    if (traitData.extractableResources) {
      traitData.extractableResources.forEach((ex) => {
        waypoint.extractableResources[ex.tradegood] =
          (waypoint.extractableResources[ex.tradegood] ?? 0) + ex.prevalence;
      });
    }
  });

  if (waypoint.population === 1) {
    waypoint.traits.push("SPARSELY_POPULATED");
  } else if (waypoint.population > 1) {
    waypoint.traits.push("POPULATED");
  }

  const good: Partial<Record<TradeGood, boolean>> = {};
  const productionRate: Partial<Record<TradeGood, number>> = {};
  const consumptionRate: Partial<Record<TradeGood, number>> = {};
  const productionLineProductionRate: Partial<Record<TradeGood, number>> = {};
  const productionLineConsumptionRate: Partial<Record<TradeGood, number>> = {};
  const extraRequestedStorage: Partial<Record<TradeGood, number>> = {};
  const consumedByConstruction: Partial<Record<TradeGood, boolean>> = {};

  const addRates = (
    tradeGood: TradeGood,
    data: {
      production?: number;
      consumption?: number;
      extraStorage?: number;
      productionLineProduction?: number;
      productionLineConsumption?: number;
      consumedByConstruction?: boolean;
    }
  ) => {
    good[tradeGood] = true;
    if (data.production) {
      productionRate[tradeGood] =
        (productionRate[tradeGood] ?? 0) + data.production;
    }
    if (data.consumption) {
      consumptionRate[tradeGood] =
        (consumptionRate[tradeGood] ?? 0) + data.consumption;
    }
    if (data.productionLineProduction) {
      productionLineProductionRate[tradeGood] =
        (productionLineProductionRate[tradeGood] ?? 0) +
        data.productionLineProduction;
    }
    if (data.productionLineConsumption) {
      productionLineConsumptionRate[tradeGood] =
        (productionLineConsumptionRate[tradeGood] ?? 0) +
        data.productionLineConsumption;
    }
    if (data.extraStorage) {
      extraRequestedStorage[tradeGood] =
        (extraRequestedStorage[tradeGood] ?? 0) + data.extraStorage;
    }
    if (data.consumedByConstruction) {
      consumedByConstruction[tradeGood] = true;
    }
  };
  const addTraits = (traitData: TraitModifiers) => {
    if (traitData.exports) {
      Object.keys(traitData.exports).forEach((tg: TradeGood) => {
        const count = traitData.exports?.[tg];
        if (count) {
          addRates(tg, {
            production: count,
          });
        }
      });
    }
    if (traitData.imports) {
      Object.keys(traitData.imports).forEach((tg: TradeGood) => {
        const count = traitData.imports?.[tg];
        if (count) {
          addRates(tg, {
            consumption: count,
          });
        }
      });
    }
    if (traitData.exchange) {
      traitData.exchange.forEach((tg) => {
        addRates(tg, {
          extraStorage: 1,
        });
      });
    }
    if (traitData.exchangeGoodsCount) {
      for (let i = 0; i < traitData.exchangeGoodsCount; i++) {
        const tradeGood = pickRandom(tradeGoodTypeNames);
        addRates(tradeGood, {
          extraStorage: 1,
        });
      }
    }
    if (traitData.productionLine) {
      traitData.productionLine.forEach((line) => {
        const tradeGoodData = tradeGoods[line.produces];
        if (tradeGoodData && "components" in tradeGoodData) {
          addRates(line.produces, {
            productionLineProduction: line.count ?? 1,
          });
          const options = Array.isArray(tradeGoodData.components)
            ? tradeGoodData.components
            : [tradeGoodData.components];
          for (let i = 0; i < options.length; i++) {
            const componentOptions = options[i];
            Object.keys(componentOptions).forEach((component: TradeGood) => {
              const count = componentOptions[component];
              if (count) {
                addRates(component, {
                  productionLineConsumption: count,
                  extraStorage: count,
                });
              }
            });
          }
        }

        waypoint.productionLines.push(line);
      });
    }
    if (traitData.consumes) {
      Object.keys(traitData.consumes).forEach((tg: TradeGood) => {
        const count = traitData.consumes?.[tg];
        if (count) {
          addRates(tg, {
            consumption: count,
          });
        }
      });
    }
    if (traitData.produces) {
      Object.keys(traitData.produces).forEach((tg: TradeGood) => {
        const count = traitData.produces?.[tg];
        if (count) {
          addRates(tg, {
            production: count,
          });
        }
      });
    }

    const newHulls: Configuration[] = [];
    if (traitData.shipHullCount) {
      for (let i = 0; i < traitData.shipHullCount; i++) {
        const newHull = pickRandom(Object.values(Configuration));
        if (!newHulls.includes(newHull)) {
          newHulls.push(newHull);
        }
      }
    }
    if (traitData.shipHullsAvailable) {
      traitData.shipHullsAvailable.forEach((hull) => {
        if (!newHulls.includes(hull)) {
          newHulls.push(hull);
        }
      });
    }
    newHulls.forEach((configuration) => {
      // add all the components to imports
      const configurationData = shipConfigurationData[configuration];
      const frameTradeGood =
        tradeGoods[configurationData.frame as unknown as TradeGood];

      addRates(configurationData.engine as unknown as TradeGood, {
        extraStorage: 1,
        consumedByConstruction: true,
      });
      if ("components" in frameTradeGood) {
        Object.keys(frameTradeGood.components).forEach((component) => {
          addRates(component as unknown as TradeGood, {
            extraStorage: frameTradeGood.components[component as TradeGood],
            consumedByConstruction: true,
          });
        });
      }
      addRates(configurationData.reactor as unknown as TradeGood, {
        extraStorage: 1,
        consumedByConstruction: true,
      });
      configurationData.modules.forEach((m) => {
        addRates(m as unknown as TradeGood, {
          extraStorage: 1,
          consumedByConstruction: true,
        });
      });
      configurationData.mounts.forEach((m) => {
        addRates(m as unknown as TradeGood, {
          extraStorage: 1,
          consumedByConstruction: true,
        });
      });
    });
    newHulls.forEach((newHull) => {
      if (!waypoint.availableShipConfigurations.includes(newHull)) {
        waypoint.availableShipConfigurations.push(newHull);
      }
    });
  };

  // once we've determined other factors, we can determine production
  waypoint.traits.forEach((trait) => {
    const traitData = waypointTraits[trait];

    addTraits(traitData);

    // generate random industries based on traits if none are specified
    if (traitData.industries && !data.industries) {
      for (let i = 0; i < traitData.industries; i++) {
        const newIndustry = pickRandom(industryNames);
        if (!waypoint.industries.includes(newIndustry)) {
          waypoint.industries.push(newIndustry);

          const industryData = industries[newIndustry];
          addTraits(industryData);
        }
      }
    }
  });

  // if specific industries have been passed to the function, add them
  if (data.industries) {
    data.industries.forEach((industry) => {
      const industryData = industries[industry];
      addTraits(industryData);
    });
  }

  if (
    waypoint.availableShipConfigurations.length > 0 &&
    !waypoint.traits.includes("SHIPYARD")
  ) {
    waypoint.traits.push("SHIPYARD");
  }

  Object.keys(good).forEach((tg: TradeGood) => {
    try {
      const tgProductionRate = productionRate[tg] ?? 0;
      const tgConsumptionRate = consumptionRate[tg] ?? 0;
      const tgProductionLineProductionRate =
        productionLineProductionRate[tg] ?? 0;
      const tgProductionLineConsumptionRate =
        productionLineConsumptionRate[tg] ?? 0;
      const tgConsumedByConstruction = consumedByConstruction[tg] ?? false;

      const count = tgProductionRate - tgConsumptionRate;
      const productionLineCount =
        tgProductionLineProductionRate - tgProductionLineConsumptionRate;
      const totalCount =
        count + productionLineCount - (tgConsumedByConstruction ? 1 : 0);
      const supplyTotal =
        (tgProductionRate +
          tgConsumptionRate +
          tgProductionLineProductionRate +
          tgProductionLineConsumptionRate +
          Math.max(extraRequestedStorage[tg] ?? 0, 1)) *
        Math.max(waypoint.population, 1);
      const tradeGoodData = tradeGoods[tg];
      if (count !== undefined) {
        if (totalCount > 0) {
          // produce
          const idealSupply = tradeGoodData.baseTradeVolume * 10 * supplyTotal;

          waypoint.exports.push(tg);
          waypoint.inventory.add(tg, idealSupply);
          waypoint.supplyDemand[tg] = {
            tradeGood: tg,
            kind: "supply",
            tradeVolume: tradeGoodData.baseTradeVolume,
            idealSupply: idealSupply,
            maxSupply: idealSupply * 2,
            lastTickConsumption: 0,
            lastTickProduction: 0,
            activity: 0,
            stopSaleAt: Math.min(Math.round(idealSupply * 0.2), 1),
            productionRate: tgProductionRate * waypoint.population,
            consumptionRate: tgConsumptionRate * waypoint.population,
            productionLineProductionRate:
              tgProductionLineProductionRate * waypoint.population,
            productionLineConsumptionRate:
              tgProductionLineConsumptionRate * waypoint.population,
            localFluctuation: numberBetween(-10, 10),
          };
        } else if (totalCount < 0) {
          // consumes
          const idealSupply = tradeGoodData.baseTradeVolume * 10 * supplyTotal;

          waypoint.imports.push(tg);
          waypoint.inventory.add(tg, idealSupply);
          waypoint.supplyDemand[tg] = {
            tradeGood: tg,
            kind: "demand",
            tradeVolume: tradeGoodData.baseTradeVolume,
            idealSupply: idealSupply,
            maxSupply: idealSupply * 2,
            lastTickConsumption: 0,
            lastTickProduction: 0,
            activity: 0,
            stopSaleAt: Math.min(Math.round(idealSupply * 0.2), 1),
            productionRate: tgProductionRate * waypoint.population,
            consumptionRate: tgConsumptionRate * waypoint.population,
            productionLineProductionRate:
              tgProductionLineProductionRate * waypoint.population,
            productionLineConsumptionRate:
              tgProductionLineConsumptionRate * waypoint.population,
            localFluctuation: numberBetween(-10, 10),
          };
        } else {
          // exchange
          const idealSupply = tradeGoodData.baseTradeVolume * 10 * supplyTotal;

          waypoint.exchange.push(tg);
          waypoint.inventory.add(tg, idealSupply);
          waypoint.supplyDemand[tg] = {
            tradeGood: tg,
            kind: "exchange",
            tradeVolume: tradeGoodData.baseTradeVolume,
            idealSupply: idealSupply,
            maxSupply: idealSupply * 2,
            lastTickConsumption: 0,
            lastTickProduction: 0,
            activity: 0,
            stopSaleAt: Math.min(Math.round(idealSupply * 0.2), 1),
            productionRate: tgProductionRate * waypoint.population,
            consumptionRate: tgConsumptionRate * waypoint.population,
            productionLineProductionRate:
              tgProductionLineProductionRate * waypoint.population,
            productionLineConsumptionRate:
              tgProductionLineConsumptionRate * waypoint.population,
            localFluctuation: numberBetween(-10, 10),
          };
        }
      }
    } catch (e) {
      console.log(`Issue setting consumption rate for ${tg}`);
      console.log(e);
    }
  });

  if (
    (waypoint.imports.length > 0 ||
      waypoint.exports.length > 0 ||
      waypoint.exchange.length > 0) &&
    !waypoint.traits.includes("MARKETPLACE")
  ) {
    waypoint.traits.push("MARKETPLACE");
  }

  if (data.jumpGateRange) {
    waypoint.jumpGate = new JumpGate({
      range: data.jumpGateRange,
      // connections need to be added after all waypoints are generated
      connections: [],
    });
  }

  return waypoint;
};
