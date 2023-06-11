import {Ship} from "src/universe/entities/Ship";

export const renderShipOutput = (ship: Ship) => {
    return {
        symbol: ship.symbol,
        agent: ship.agent,
    };
}