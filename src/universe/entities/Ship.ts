import { ShipFrameType } from "src/universe/entities/ShipFrameType";
import { ShipReactorType } from "src/universe/entities/ShipReactorType";
import { ShipEngineType } from "src/universe/entities/ShipEngineType";
import { ShipModule } from "src/universe/entities/ShipModule";
import { ShipMount } from "src/universe/entities/ShipMount";
import { Location, Navigation } from "src/universe/entities/Navigation";
import { Stats } from "src/universe/entities/Stats";
import { DerivedStats } from "src/universe/entities/DerivedStats";
import {
  ShipNav,
  ShipNavRouteWaypoint,
  ShipRole,
} from "src/controllers/schemas";
import {
  Configuration,
  ConfigurationKeys,
  shipConfigurationData,
} from "src/universe/static-data/ship-configurations";
import { frameData } from "src/universe/static-data/ship-frames";
import { reactorData } from "src/universe/static-data/ship-reactors";
import { engineData } from "src/universe/static-data/ship-engines";
import { mountData } from "src/universe/static-data/ship-mounts";
import { moduleData } from "src/universe/static-data/ship-modules";
import { Storage } from "src/universe/entities/Storage";
import { Waypoint } from "src/universe/entities/Waypoint";
import { powerUsageCooldown } from "src/universe/formulas/power";
import { ShipFrame } from "src/universe/entities/ShipFrame";
import { ShipReactor } from "src/universe/entities/ShipReactor";
import { ShipEngine } from "src/universe/entities/ShipEngine";

export class Ship {
  public symbol: string;
  public agentSymbol: string;
  public role: ShipRole;

  navigation: Navigation;

  frame: ShipFrame;
  reactor: ShipReactor;
  engine: ShipEngine;

  modules: ShipModule[] = [];
  mounts: ShipMount[] = [];

  cargo: Storage = new Storage();

  cooldown?: {
    expires: Date;
    originalSeconds: number;
  };

  stats: Stats = new Stats();
  derivedStats: DerivedStats = new DerivedStats();
  constructor(data: {
    symbol: string;
    configuration: ConfigurationKeys;
    agentSymbol: string;
    role: ShipRole;
    waypoint: ShipNavRouteWaypoint;
  }) {
    this.symbol = data.symbol;
    this.agentSymbol = data.agentSymbol;
    this.role = data.role;
    this.navigation = new Navigation(data.waypoint);

    const newConfiguration = shipConfigurationData[data.configuration];
    this.frame = new ShipFrame(frameData[newConfiguration.frame]);
    this.reactor = new ShipReactor(reactorData[newConfiguration.reactor]);
    this.engine = new ShipEngine(engineData[newConfiguration.engine]);
    newConfiguration.mounts.forEach((mount) => {
      this.mounts.push(mountData[mount]);
    });
    newConfiguration.modules.forEach((module) => {
      this.modules.push(moduleData[module]);
    });

    // TODO: Move this to it's own function that returns a stats object
    this.calculateStats();

    this.derivedStats.crew = this.stats.crewRequired;
    this.derivedStats.fuel = this.stats.fuelCapacity;
    this.derivedStats.crewMorale = 50;
    this.derivedStats.crewExperience = 0;
    this.derivedStats.condition = 100;
  }

  public calculateStats() {
    this.stats = new Stats();
    this.frame.addStats(this.stats);
    this.reactor.addStats(this.stats);
    this.engine.addStats(this.stats);
    this.modules.forEach((module) => {
      module.addStats(this.stats);
    });
    this.mounts.forEach((mount) => {
      mount.addStats(this.stats);
    });

    this.frame.multiplyStats(this.stats);
    this.reactor.multiplyStats(this.stats);
    this.engine.multiplyStats(this.stats);
    this.modules.forEach((module) => {
      module.multiplyStats(this.stats);
    });
    this.mounts.forEach((mount) => {
      mount.multiplyStats(this.stats);
    });
  }

  isViable(): boolean {
    if (this.stats.moduleCapacityRequired > this.stats.moduleCapacity) {
      return false;
    }
    if (this.stats.mountingPointsRequired > this.stats.mountingPoints) {
      return false;
    }
    if (this.stats.powerRequired > this.stats.powerGenerated) {
      return false;
    }
    if (this.stats.crewRequired > this.stats.crewCapacity) {
      return false;
    }
    return true;
  }

  setCooldown(powerUsage: number) {
    const ms = powerUsageCooldown(powerUsage, this.stats.powerGenerated);

    console.log(
      "cooldown set",
      ms,
      powerUsage,
      this.stats.powerGenerated,
      "expire at ",
      new Date(Date.now() + ms).toISOString()
    );
    this.cooldown = {
      expires: new Date(Date.now() + ms),
      originalSeconds: Math.round(ms / 1000),
    };
  }
}
