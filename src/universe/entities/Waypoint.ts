import {Industry} from "src/universe/static-data/industries";
import {WaypointTrait} from "src/universe/static-data/waypoint-traits";
import {JumpGate} from "src/universe/entities/JumpGate";
import {TradeGood, tradeGoods} from "src/universe/static-data/trade-goods";
import {WaypointType} from "src/universe/static-data/waypoint-types";
import {Faction} from "src/universe/static-data/faction";

export interface SupplyDemand {
    tradeGood: TradeGood
    idealSupply: number
    currentSupply: number
    maxSupply: number
    stopSaleAt: number
    consumptionRate: number
    productionRate: number
}

export class Waypoint {
    public symbol: string
    public x: number
    public y: number

    public type: WaypointType
    public ownedBy?: Faction

    public orbitals: Waypoint[] = []
    public inOrbitOf?: string

    public industries: Industry[] = []
    public traits: WaypointTrait[] = []

    public jumpGate?: JumpGate

    public extractableResources: TradeGood[] = []

    public imports: TradeGood[] = []
    public exports: TradeGood[] = []
    public exchange: TradeGood[] = []

    public supplyDemand: SupplyDemand[] = []

    public population: number = 0

    constructor(data: {
        x: number
        y: number
        inOrbitOf?: string
        symbol: string
        type: WaypointType
    }) {
        this.x = data.x
        this.y = data.y
        this.inOrbitOf = data.inOrbitOf
        this.symbol = data.symbol
        this.type = data.type
    }

    public tick() {
        this.supplyDemand.forEach(supplyDemand => {
            supplyDemand.currentSupply -= supplyDemand.consumptionRate
            supplyDemand.currentSupply += supplyDemand.productionRate
        })
    }
}