import {ShipEngine, ShipFrame, ShipReactor,} from "src/controllers/schemas";
import {Reactor, reactorData} from "src/universe/static-data/ship-reactors";
import {Engine, engineData} from "src/universe/static-data/ship-engines";
import {Frame, frameData} from "src/universe/static-data/ship-frames";

export const renderShipFrame = (symbol: Frame): ShipFrame => {
    const frame = frameData[symbol];

    return {
        symbol: symbol,
        name: frame.name,
        description: frame.description,
        condition: 50,
        moduleSlots: frame.stats.moduleCapacity,
        mountingPoints: frame.stats.mountingPoints,
        fuelCapacity: frame.stats.fuelCapacity,
        requirements: {
            power: frame.stats.powerRequired,
            crew: frame.stats.crewRequired,
            slots: frame.stats.moduleCapacityRequired,
        }
    };
}