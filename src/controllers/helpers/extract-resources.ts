import { ExtractsResources } from "src/universe/entities/capabilities/ExtractsResources";
import { TradeGood } from "src/universe/static-data/trade-goods";
import { BadRequest } from "@tsed/exceptions";
import { randomBetween, pickRandom } from "src/universe/utilities";
import { ShipMount } from "src/universe/entities/ShipMount";
import { resourceGroups } from "src/universe/static-data/resource-groups";
import { Waypoint } from "src/universe/entities/Waypoint";
import { Survey } from "src/controllers/schemas";
import { STError } from "src/error/STError";
import { TIME_FACTOR } from "src/universe/constants";

export const extractResources = (
  mounts: ShipMount[],
  waypoint: Waypoint,
  survey?: Survey
) => {
  const extractMounts = mounts.filter((m) =>
    m.capabilities.some((c) => c instanceof ExtractsResources)
  );
  const powerUsage = extractMounts.reduce(
    (acc, mount) => acc + mount.stats.powerRequired,
    0
  );

  if (waypoint.extractionInstability > 10) {
    waypoint.extractionInstability += 600;
    throw new STError(
      400,
      4253,
      "Extraction instability too high. Come back here in a while to see if you can extract again."
    );
  }

  let maxPossibleResources = 0;
  const allPossibleResources: TradeGood[] = [];
  let variation = 0;
  let totalPower = 0;
  extractMounts.forEach((mount) => {
    const possibleResources: TradeGood[] = [];
    mount.stats.resourcesExtracted.forEach((resource) => {
      resourceGroups[resource].forEach((good) => {
        if (survey) {
          const resourceAvailableAtWaypoint = Object.keys(
            waypoint.extractableResources
          ).find((ex) => ex === good);
          const resourceAvailableAtSurvey = survey.deposits.filter(
            (d) => d.symbol === good
          );
          if (
            resourceAvailableAtWaypoint &&
            resourceAvailableAtSurvey.length > 0
          ) {
            resourceAvailableAtSurvey.forEach((d) => {
              possibleResources.push(good);
            });
          }
        } else {
          const resourceAvailableAtWaypoint = Object.keys(
            waypoint.extractableResources
          ).find((ex) => ex === good);
          if (resourceAvailableAtWaypoint) {
            possibleResources.push(good);
          }
        }
      });
    });

    if (maxPossibleResources < possibleResources.length) {
      maxPossibleResources = possibleResources.length;
    }

    if (maxPossibleResources === 0) {
      return;
    }

    allPossibleResources.push(...possibleResources);
    totalPower += mount.stats.extractionPower;
    variation += 5;
  });

  if (maxPossibleResources === 0) {
    throw new BadRequest(
      `There are no resources in this location that you can extract with your current mount/module configuration.`
    );
  }

  const resource = pickRandom(allPossibleResources);

  const multiplier =
    (waypoint.extractableResources[resource] || 1) * (survey ? 2 : 1);

  const extracted = Math.ceil(
    (totalPower + randomBetween(-variation, variation)) * multiplier
  );

  waypoint.extractionInstability += 1 / TIME_FACTOR;

  return {
    resource,
    extracted,
    powerUsage,
  };
};
