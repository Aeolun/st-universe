import {Waypoint} from "./Waypoint";

export class System {
    x: number
    y: number
    type: string
    symbol: string

    public waypoints: Waypoint[] = []

    constructor(data: {
        x: number,
        y: number,
        type: string
        symbol: string
    }) {
        this.x = data.x;
        this.y = data.y;
        this.type = data.type;
        this.symbol = data.symbol;
    }
}