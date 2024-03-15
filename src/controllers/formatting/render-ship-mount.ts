import {
  ShipEngine,
  ShipModule,
  ShipMount,
  ShipMountDepositsEnum,
  ShipReactor,
} from "src/controllers/schemas";
import { reactorData } from "src/universe/static-data/ship-reactors";
import { engineData } from "src/universe/static-data/ship-engines";
import { moduleData } from "src/universe/static-data/ship-modules";
import { mountData } from "src/universe/static-data/ship-mounts";
import { resourceGroups } from "src/universe/static-data/resource-groups";
import { Engine } from "src/universe/static-data/engine-enum";
import { Module } from "src/universe/static-data/module-enum";
import { Mount } from "src/universe/static-data/mount-enum";
import { Reactor } from "src/universe/static-data/reactor-enum";

export const renderShipMount = (symbol: Mount): ShipMount => {
  const mount = mountData[symbol];

  return {
    symbol: symbol,
    name: mount.name,
    description: mount.description,
    strength: mount.stats.scanPower ?? mount.stats.extractionPower,
    deposits: (
      mount.stats.resourcesExtracted ?? mount.stats.resourcesSurveyed
    ).reduce((total, current) => {
      return [
        ...total,
        ...(resourceGroups[current] as ShipMountDepositsEnum[]),
      ];
    }, [] as ShipMountDepositsEnum[]),
    requirements: {
      power: mount.stats.powerRequired,
      crew: mount.stats.crewRequired,
      slots: mount.stats.moduleCapacityRequired,
    },
  };
};
