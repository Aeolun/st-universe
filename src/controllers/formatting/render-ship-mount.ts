import { ShipMount, ShipMountDepositsEnum } from "src/controllers/schemas";
import { Mount, mountData } from "src/universe/static-data/ship-mounts";
import { resourceGroups } from "src/universe/static-data/resource-groups";

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
