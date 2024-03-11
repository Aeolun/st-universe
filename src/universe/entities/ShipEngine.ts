import { ShipEngineType } from "src/universe/entities/ShipEngineType";
import {
  CanAddStats,
  CanMultiplyStats,
} from "src/universe/entities/capabilities/AbstractCapabilities";
import { Stats } from "./Stats";

export class ShipEngine implements CanAddStats, CanMultiplyStats {
  public condition: number = 1;
  public integrity: number = 1;

  constructor(public engineType: ShipEngineType) {}

  multiplyStats(stats: Stats): Stats {
    return this.engineType.addStats(stats);
  }

  addStats(stats: Stats): Stats {
    return this.engineType.multiplyStats(stats);
  }
}
