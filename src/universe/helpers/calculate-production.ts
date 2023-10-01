import {
  TradeGood,
  tradeGoods,
  tradeGoodTypeNames,
} from "src/universe/static-data/trade-goods";
import {
  TraitModifiers,
  WaypointTrait,
  waypointTraits,
} from "src/universe/static-data/waypoint-traits";
import { pickRandom } from "src/universe/utilities";
import {
  Configuration,
  shipConfigurationData,
} from "src/universe/static-data/ship-configurations";
import { industries, Industry } from "src/universe/static-data/industries";

export type ProductionRates = {
  production: number;
  consumption: number;
  productionLineProduction: number;
  productionLineConsumption: number;
  extraStorage: number;
  consumedByConstruction: boolean;
};
export function calculateProduction(
  traits: WaypointTrait[],
  industryLevels: Partial<Record<Industry, number>>,
  shipConfigurations: Configuration[]
) {
  const good: Partial<Record<TradeGood, ProductionRates>> = {};

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
    if (!good[tradeGood]) {
      good[tradeGood] = {
        production: 0,
        consumption: 0,
        productionLineProduction: 0,
        productionLineConsumption: 0,
        extraStorage: 0,
        consumedByConstruction: false,
      };
    }

    const tmpRates = good[tradeGood];
    if (!tmpRates) {
      throw new Error("We just ensured this cannot happen.");
    }
    if (data.production) {
      tmpRates.production = (tmpRates.production ?? 0) + data.production;
    }
    if (data.consumption) {
      tmpRates.consumption = (tmpRates.consumption ?? 0) + data.consumption;
    }
    if (data.productionLineProduction) {
      tmpRates.productionLineProduction =
        (tmpRates.productionLineProduction ?? 0) +
        data.productionLineProduction;
    }
    if (data.productionLineConsumption) {
      tmpRates.productionLineConsumption =
        (tmpRates.productionLineConsumption ?? 0) +
        data.productionLineConsumption;
    }
    if (data.extraStorage) {
      tmpRates.extraStorage = (tmpRates.extraStorage ?? 0) + data.extraStorage;
    }
    if (data.consumedByConstruction) {
      tmpRates.consumedByConstruction = true;
    }
  };

  const addTraits = (traitData: TraitModifiers, level: number = 1) => {
    if (traitData.exports) {
      Object.keys(traitData.exports).forEach((tg: TradeGood) => {
        const count = traitData.exports?.[tg];
        if (count) {
          addRates(tg, {
            production: count * level,
          });
        }
      });
    }
    if (traitData.imports) {
      Object.keys(traitData.imports).forEach((tg: TradeGood) => {
        const count = traitData.imports?.[tg];
        if (count) {
          addRates(tg, {
            consumption: count * level,
          });
        }
      });
    }
    if (traitData.exchange) {
      traitData.exchange.forEach((tg) => {
        addRates(tg, {
          extraStorage: 1 * level,
        });
      });
    }
    if (traitData.exchangeGoodsCount) {
      for (let i = 0; i < traitData.exchangeGoodsCount; i++) {
        const tradeGood = pickRandom(tradeGoodTypeNames);
        addRates(tradeGood, {
          extraStorage: 1 * level,
        });
      }
    }
    if (traitData.productionLine) {
      traitData.productionLine.forEach((line) => {
        const tradeGoodData = tradeGoods[line.produces];
        if (tradeGoodData && "components" in tradeGoodData) {
          addRates(line.produces, {
            productionLineProduction: (line.count ?? 1) * level,
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
                  productionLineConsumption: count * level,
                  extraStorage: count * level,
                });
              }
            });
          }
        }
      });
    }
    if (traitData.consumes) {
      Object.keys(traitData.consumes).forEach((tg: TradeGood) => {
        const count = traitData.consumes?.[tg];
        if (count) {
          addRates(tg, {
            consumption: count * level,
          });
        }
      });
    }
    if (traitData.produces) {
      Object.keys(traitData.produces).forEach((tg: TradeGood) => {
        const count = traitData.produces?.[tg];
        if (count) {
          addRates(tg, {
            production: count * level,
          });
        }
      });
    }

    shipConfigurations.forEach((configuration) => {
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
  };

  traits.forEach((trait) => {
    const traitData = waypointTraits[trait];
    if (traitData) {
      addTraits(traitData);
    }
  });
  Object.keys(industryLevels).forEach((industry: Industry) => {
    const industryData = industries[industry];
    const industryLevel = industryLevels[industry] ?? 1;
    if (industryData) {
      addTraits(industryData, industryLevel);
    }
  });

  return good;
}
