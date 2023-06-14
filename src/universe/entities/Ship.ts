import {ShipFrame} from "src/universe/entities/ShipFrame";
import {ShipReactor} from "src/universe/entities/ShipReactor";
import {ShipEngine} from "src/universe/entities/ShipEngine";
import {ShipModule} from "src/universe/entities/ShipModule";
import {ShipMount} from "src/universe/entities/ShipMount";
import {Navigation} from "src/universe/entities/Navigation";
import {Stats} from "src/universe/entities/Stats";
import {DerivedStats} from "src/universe/entities/DerivedStats";

export class Ship {
    public symbol: string;
    public agentSymbol: string;

    navigation: Navigation = new Navigation()

    frame: ShipFrame
    reactor: ShipReactor
    engine: ShipEngine

    modules: ShipModule[] = []
    mounts: ShipMount[] = []

    stats: Stats = new Stats()
    derivedStats: DerivedStats = new DerivedStats()
    constructor(data: {
        symbol: string;
        agentSymbol: string;
    }) {
        this.symbol = data.symbol;
        this.agentSymbol = data.agentSymbol;

        this.calculateStats()
    }

    public calculateStats() {
        this.stats = new Stats()
        this.frame.addStats(this.stats)
        this.reactor.addStats(this.stats)
        this.engine.addStats(this.stats)
        this.modules.forEach(module => {
            module.addStats(this.stats)
        })
        this.mounts.forEach(mount => {
            mount.addStats(this.stats)
        })
        this.frame.multiplyStats(this.stats)
        this.reactor.multiplyStats(this.stats)
        this.engine.multiplyStats(this.stats)
        this.modules.forEach(module => {
            module.multiplyStats(this.stats)
        })
        this.mounts.forEach(mount => {
            mount.multiplyStats(this.stats)
        })
    }

    isViable(): boolean {
        if (this.stats.moduleCapacityRequired > this.stats.moduleCapacity) {
            return false
        }
        if (this.stats.mountingPointsRequired > this.stats.mountingPoints) {
            return false
        }
        if (this.stats.powerRequired > this.stats.powerGenerated) {
            return false
        }
        if (this.stats.crewRequired > this.stats.crewCapacity) {
            return false
        }
        return true;
    }
}