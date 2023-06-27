import {Ship} from "src/universe/entities/Ship";
import {Ship as ShipOutput} from "src/controllers/schemas/ship";
import {renderShipReactor} from "src/controllers/formatting/render-ship-reactor";
import {renderShipFrame} from "src/controllers/formatting/render-ship-frame";
import {renderShipEngine} from "src/controllers/formatting/render-ship-engine";
import {renderShipModule} from "src/controllers/formatting/render-ship-module";
import {renderShipMount} from "src/controllers/formatting/render-ship-mount";
import {renderShipNav} from "src/controllers/formatting/render-ship-nav";
import {renderShipCargo} from "src/controllers/formatting/render-ship-cargo";

export const renderShipOutput = (ship: Ship): ShipOutput => {
    return {
        symbol: ship.symbol,
        registration: {
            factionSymbol: '',
            role: ship.role,
            name: ship.symbol
        },
        nav: renderShipNav(ship.navigation),
        cargo: renderShipCargo(ship),
        fuel: {
            current: ship.derivedStats.fuel,
            capacity: ship.stats.fuelCapacity,
        },
        crew: {
            current: ship.derivedStats.crew,
            capacity: ship.stats.crewCapacity,
            required: ship.stats.crewRequired,
            morale: ship.derivedStats.crewMorale,
            rotation: 'STRICT',
            wages: ship.derivedStats.crew
        },
        reactor: renderShipReactor(ship.reactor.symbol),
        frame: renderShipFrame(ship.frame.symbol),
        engine: renderShipEngine(ship.engine.symbol),
        modules: ship.modules.map(module => renderShipModule(module.symbol)),
        mounts: ship.mounts.map(mount => renderShipMount(mount.symbol)),
    };
}