import { Waypoint } from "./entities/Waypoint";
import {
  randomBetweenInt,
  pickRandom,
  random,
  randomString,
  randomWeightedKey,
  trulyUniqId,
  uniqueId,
  randomBetweenFloat,
} from "./utilities";
import {
  generatableWaypointTypeNames,
  waypointTypes,
} from "./static-data/waypoint-types";
import {
  TraitModifiers,
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
import { shipConfigurationData } from "src/universe/static-data/ship-configurations";
import { JumpGate } from "src/universe/entities/JumpGate";
import { calculateSupplyDemand } from "src/universe/helpers/calculate-supply-demand";
import { Configuration } from "src/universe/static-data/configuration-enum";
import { WaypointTrait } from "src/universe/static-data/waypoint-trait-enum";
import { WaypointType } from "src/universe/static-data/waypoint-type-enum";

const availableTraits: Record<string, WaypointTrait[]> = {};

export interface WaypointGenerationProperties {
  x: number;
  y: number;
  name: string;
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

  const waypointSymbol = `${systemSymbol}-${data.name}`;

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

  const waypointTraitCount = randomBetweenInt(0, waypointTypeData.maxTraits);

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
  for (const trait of waypoint.traits) {
    const traitData = waypointTraits[trait];
    if (traitData.populationLevel) {
      waypoint.population += traitData.populationLevel;
    }

    if (traitData.extractableResources) {
      for (const ex of traitData.extractableResources) {
        waypoint.extractableResources[ex.tradegood] =
          (waypoint.extractableResources[ex.tradegood] ?? 0) +
          randomBetweenFloat(ex.richness.min, ex.richness.max);
      }
    }
  }

  const good: Partial<Record<TradeGood, boolean>> = {};
  const productionRates: Partial<
    Record<
      TradeGood,
      {
        production: number;
        consumption: number;
        extraStorage: number;
        productionLineProduction: number;
        productionLineConsumption: number;
        consumedByConstruction: boolean;
      }
    >
  > = {};

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
    if (!productionRates[tradeGood]) {
      productionRates[tradeGood] = {
        production: 0,
        consumption: 0,
        extraStorage: 0,
        productionLineConsumption: 0,
        productionLineProduction: 0,
        consumedByConstruction: false,
      };
    }
    const rates = productionRates[tradeGood];
    if (!rates) {
      return;
    }
    if (data.production) {
      rates.production += data.production;
    }
    if (data.consumption) {
      rates.consumption += data.consumption;
    }
    if (data.productionLineProduction) {
      rates.productionLineProduction += data.productionLineProduction;
    }
    if (data.productionLineConsumption) {
      rates.productionLineConsumption += data.productionLineConsumption;
    }
    if (data.extraStorage) {
      rates.extraStorage += data.extraStorage;
    }
    if (data.consumedByConstruction) {
      rates.consumedByConstruction = true;
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
      for (const line of traitData.productionLine) {
        const tradeGoodData = tradeGoods[line.produces];
        if (tradeGoodData && "components" in tradeGoodData) {
          addRates(line.produces, {
            productionLineProduction: 1,
          });
          const options = Array.isArray(tradeGoodData.components)
            ? tradeGoodData.components
            : [tradeGoodData.components];
          for (let i = 0; i < options.length; i++) {
            const componentOptions = options[i];
            for (const component of Object.keys(
              componentOptions
            ) as TradeGood[]) {
              const count = componentOptions[component];
              if (count) {
                addRates(component, {
                  productionLineConsumption: count,
                  extraStorage: count,
                });
              }
            }
          }
        }

        waypoint.productionLines.push(line);
      }
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
        if (!waypoint.industries[newIndustry]) {
          waypoint.industries[newIndustry] = 0;

          const industryData = industries[newIndustry];
          addTraits(industryData);
        }
        waypoint.industries[newIndustry] =
          (waypoint.industries[newIndustry] ?? 0) + 1;
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

  const { exports, imports, exchange, supplyDemand } = calculateSupplyDemand(
    productionRates,
    waypoint.population
  );
  waypoint.exports = exports;
  waypoint.imports = imports;
  waypoint.exchange = exchange;
  waypoint.supplyDemand = supplyDemand;

  Object.values(supplyDemand).forEach((sd) => {
    waypoint.inventory.add(
      sd.tradeGood,
      supplyDemand[sd.tradeGood]?.current.idealSupply ?? 0
    );
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
