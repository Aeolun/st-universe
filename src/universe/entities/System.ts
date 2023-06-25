import {Waypoint} from "./Waypoint";
import {Faction} from "src/universe/static-data/faction";

export class System {
    x: number
    y: number
    type: string
    sectorSymbol: string
    symbol: string
    factions: Faction[] = []

    hasMarket: boolean = false

    public waypoints: Waypoint[] = []

    constructor(data: {
        x: number,
        y: number,
        type: string
        sectorSymbol: string
        symbol: string
    }) {
        this.x = data.x;
        this.y = data.y;
        this.type = data.type;
        this.sectorSymbol = data.sectorSymbol;
        this.symbol = data.symbol;
    }

    public addWaypoint(waypoint: Waypoint) {
        if (waypoint.traits.includes("MARKETPLACE")) {
            this.hasMarket = true
        }
        this.waypoints.push(waypoint)
    }

    public tick() {
        this.waypoints.forEach(w => w.tick())
    }
}