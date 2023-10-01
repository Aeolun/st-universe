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
import { calculateProduction } from "src/universe/helpers/calculate-production";
import { calculateSupplyDemand } from "src/universe/helpers/calculate-supply-demand";

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

    if (traitData.productionLine) {
      traitData.productionLine.forEach((line) => {
        waypoint.productionLines.push(line);
      });
    }

    if (traitData.extractableResources) {
      traitData.extractableResources.forEach((ex) => {
        waypoint.extractableResources[ex.tradegood] =
          (waypoint.extractableResources[ex.tradegood] ?? 0) +
          numberBetween(ex.richness.min * 100, ex.richness.max * 100) / 100;
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
    newHulls.forEach((newHull) => {
      if (!waypoint.availableShipConfigurations.includes(newHull)) {
        waypoint.availableShipConfigurations.push(newHull);
      }
    });
  });

  if (waypoint.population > 1) {
    waypoint.traits.push("CANT_PRODUCE_EVERYTHING_PLANETSIDE");
  }

  // if specific industries have been passed to the function, add them
  if (data.industries) {
    data.industries.forEach((industry) => {
      waypoint.industries[industry] = (waypoint.industries[industry] ?? 0) + 1;
    });
  } else {
    waypoint.traits.forEach((trait) => {
      const traitData = waypointTraits[trait];

      // generate random industries based on traits if none are specified
      if (traitData.industries) {
        for (let i = 0; i < traitData.industries; i++) {
          const newIndustry = pickRandom(industryNames);
          waypoint.industries[newIndustry] =
            (waypoint.industries[newIndustry] ?? 0) + 1;
        }
      }
    });
  }

  // add traits that come from industries
  Object.keys(waypoint.industries).forEach((industry: Industry) => {
    const industryData = industries[industry];

    // nothing yet, all covered by calculateProduction for now
  });

  if (
    waypoint.availableShipConfigurations.length > 0 &&
    !waypoint.traits.includes("SHIPYARD")
  ) {
    waypoint.traits.push("SHIPYARD");
  }

  // once we've determined other factors, we can determine production
  const goods = calculateProduction(
    waypoint.traits,
    waypoint.industries,
    waypoint.availableShipConfigurations
  );

  const res = calculateSupplyDemand(goods, waypoint.population);
  waypoint.imports = res.imports;
  waypoint.exports = res.exports;
  waypoint.exchange = res.exchange;
  waypoint.supplyDemand = res.supplyDemand;

  // start out all waypoints with ideal supply
  Object.keys(res.supplyDemand).forEach((good: TradeGood) => {
    if (res.supplyDemand[good]) {
      waypoint.inventory.set(
        good,
        res.supplyDemand[good]?.current.idealSupply ?? 0
      );
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
    });
  }

  return waypoint;
};
