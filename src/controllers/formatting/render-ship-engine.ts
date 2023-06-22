import {ShipEngine, ShipReactor,} from "src/controllers/schemas";
import {Reactor, reactorData} from "src/universe/static-data/ship-reactors";
import {Engine, engineData} from "src/universe/static-data/ship-engines";

export const renderShipEngine = (symbol: Engine): ShipEngine => {
    const engine = engineData[symbol];

    return {
        symbol: symbol,
        name: engine.name,
        description: engine.description,
        condition: 50,
        speed: engine.stats.thrust,
        requirements: {
            power: engine.stats.powerRequired,
            crew: engine.stats.crewRequired,
            slots: engine.stats.moduleCapacityRequired,
        }
    };
}