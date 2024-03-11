import { ShipReactorType } from "src/universe/entities/ShipReactorType";
import {
  CanAddStats,
  CanMultiplyStats,
} from "src/universe/entities/capabilities/AbstractCapabilities";
import { Stats } from "src/universe/entities/Stats";

export class ShipReactor implements CanAddStats, CanMultiplyStats {
  public condition: number = 1;
  public integrity: number = 1;
  constructor(public reactorType: ShipReactorType) {}

  multiplyStats(stats: Stats): Stats {
    return this.reactorType.addStats(stats);
  }

  addStats(stats: Stats): Stats {
    return this.reactorType.multiplyStats(stats);
  }
}
