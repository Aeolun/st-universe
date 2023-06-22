import {Ship} from "src/universe/entities/Ship";
import {Configuration, shipConfigurationData} from "src/universe/static-data/ship-configurations";
import {ShipType, ShipyardShip, ShipyardShipTypesInner} from "src/controllers/schemas";
import {renderShipFrame} from "src/controllers/formatting/render-ship-frame";
import {renderShipReactor} from "src/controllers/formatting/render-ship-reactor";
import {renderShipEngine} from "src/controllers/formatting/render-ship-engine";

export const renderShipOutput = (configurationSymbol: Configuration, waypointSymbol: string): ShipyardShip => {
    const shipConfiguration = shipConfigurationData[configurationSymbol];

    return {
        type: configurationSymbol as ShipType,
        name: shipConfiguration.name,
        description: shipConfiguration.description,
        purchasePrice: 0,
        frame: renderShipFrame(shipConfiguration.frame),
        reactor: renderShipReactor(shipConfiguration.reactor),
        engine: renderShipEngine(shipConfiguration.engine),
        modules: shipConfiguration.modules.map(renderShipModule),
        mounts: shipConfiguration.mounts.map(renderShipMount),
    };
}