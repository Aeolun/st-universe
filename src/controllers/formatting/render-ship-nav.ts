import {
    MarketTradeGoodSupplyEnum,
    ShipEngine,
    ShipModule,
    ShipMount,
    ShipMountDepositsEnum,
    ShipReactor,
} from "src/controllers/schemas";
import {Reactor, reactorData} from "src/universe/static-data/ship-reactors";
import {Engine, engineData} from "src/universe/static-data/ship-engines";
import {Module, moduleData} from "src/universe/static-data/ship-modules";
import {Mount, mountData} from "src/universe/static-data/ship-mounts";
import {resourceGroups} from "src/universe/static-data/resource-groups";

export const renderShipNav = (symbol: Mount): ShipMount => {
    const mount = mountData[symbol];

    return {
        symbol: symbol,
        name: mount.name,
        description: mount.description,
        strength: mount.stats.scanPower ?? mount.stats.extractionPower,
        deposits: (mount.stats.resourcesExtracted ?? mount.stats.resourcesSurveyed).reduce((total, current) => {
            return [ ...total, ...resourceGroups[current] as ShipMountDepositsEnum[] ];
        }, [] as ShipMountDepositsEnum[]),
        requirements: {
            power: mount.stats.powerRequired,
            crew: mount.stats.crewRequired,
            slots: mount.stats.moduleCapacityRequired,
        }
    };
}