import {Industry} from "src/universe/static-data/industries";
import {WaypointTrait} from "src/universe/static-data/waypoint-traits";
import {JumpGate} from "src/universe/entities/JumpGate";
import {TradeGood} from "src/universe/static-data/trade-goods";
import {WaypointType} from "src/universe/static-data/waypoint-types";

export class Waypoint {
    public symbol: string
    public x: number
    public y: number

    public type: WaypointType

    public orbitals: Waypoint[] = []

    public industries: Industry[] = []
    public traits: WaypointTrait[] = []

    public jumpGate?: JumpGate

    public extractableResources: TradeGood[] = []

    public imports: TradeGood[] = []
    public exports: TradeGood[] = []
    public exchange: TradeGood[] = []

    public population: number = 0

    constructor(data: {
        x: number
        y: number
        symbol: string
        type: WaypointType
    }) {
        this.x = data.x
        this.y = data.y
        this.symbol = data.symbol
        this.type = data.type
    }
}