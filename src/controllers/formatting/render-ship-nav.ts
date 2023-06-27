import {
    ShipNav,
} from "src/controllers/schemas";
import {Ship} from "src/universe/entities/Ship";

export const renderShipNav = (nav: Ship['navigation']): ShipNav => {
    let arrived = false
    if (nav.route && nav.status === 'IN_TRANSIT' && nav.route.arrivalDate > new Date()) {
        //arrived
        arrived = true
    }

    const now = new Date().toISOString();

    return {
        flightMode: nav.flightMode,
        systemSymbol: nav.current.systemSymbol,
        waypointSymbol: nav.current.symbol,
        route: nav.route && !arrived ? {
            departure: nav.route.from,
            destination: nav.route.to,
            departureTime: nav.route.departureDate.toISOString(),
            arrival: nav.route.arrivalDate.toISOString(),
        } : {
            departure: nav.current,
            destination: nav.current,
            departureTime: now,
            arrival: now,
        },
        status: arrived ? 'IN_ORBIT' : nav.status
    };
}