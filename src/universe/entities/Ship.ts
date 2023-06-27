import {ShipFrame} from "src/universe/entities/ShipFrame";
import {ShipReactor} from "src/universe/entities/ShipReactor";
import {ShipEngine} from "src/universe/entities/ShipEngine";
import {ShipModule} from "src/universe/entities/ShipModule";
import {ShipMount} from "src/universe/entities/ShipMount";
import {Location, Navigation} from "src/universe/entities/Navigation";
import {Stats} from "src/universe/entities/Stats";
import {DerivedStats} from "src/universe/entities/DerivedStats";
import {ShipRole} from "src/controllers/schemas";
import {Configuration, shipConfigurationData} from "src/universe/static-data/ship-configurations";
import {frameData} from "src/universe/static-data/ship-frames";
import {reactorData} from "src/universe/static-data/ship-reactors";
import {engineData} from "src/universe/static-data/ship-engines";
import {mountData} from "src/universe/static-data/ship-mounts";
import {moduleData} from "src/universe/static-data/ship-modules";
import {TradeGood} from "src/universe/static-data/trade-goods";
import {Waypoint} from "src/universe/entities/Waypoint";

export class Ship {
    public symbol: string;
    public agentSymbol: string;
    public role: ShipRole

    navigation: Navigation

    frame: ShipFrame
    reactor: ShipReactor
    engine: ShipEngine

    modules: ShipModule[] = []
    mounts: ShipMount[] = []

    cargo: Partial<Record<TradeGood, number>> = {}

    stats: Stats = new Stats()
    derivedStats: DerivedStats = new DerivedStats()
    constructor(data: {
        symbol: string;
        configuration: Configuration;
        agentSymbol: string;
        role: ShipRole;
        waypoint: Waypoint;
    }) {
        this.symbol = data.symbol;
        this.agentSymbol = data.agentSymbol;
        this.role = data.role;
        this.navigation = new Navigation(data.waypoint)

        const newConfiguration = shipConfigurationData[data.configuration]
        this.frame = frameData[newConfiguration.frame]
        this.reactor = reactorData[newConfiguration.reactor]
        this.engine = engineData[newConfiguration.engine]
        newConfiguration.mounts.forEach(mount => {
            this.mounts.push(mountData[mount])
        })
        newConfiguration.modules.forEach(module => {
            this.modules.push(moduleData[module])
        })

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