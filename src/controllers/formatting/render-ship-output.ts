import {Ship} from "src/universe/entities/Ship";
import {Ship as ShipOutput} from "src/controllers/schemas/ship";

export const renderShipOutput = (ship: Ship): ShipOutput => {
    return {
        symbol: ship.symbol,
        registration: {
            factionSymbol: '',
            role: ship.role,
            name: ship.symbol
        }

    };
}