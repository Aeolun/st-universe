import {Waypoint} from "./Waypoint";
import {Faction} from "src/universe/static-data/faction";

export class System {
    x: number
    y: number
    type: string
    sectorSymbol: string
    symbol: string
    factions: Faction[] = []

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

    public tick() {
        this.waypoints.forEach(w => w.tick())
    }
}