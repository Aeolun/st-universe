import { ShipFrameType } from "src/universe/entities/ShipFrameType";
import {
  CanAddStats,
  CanMultiplyStats,
} from "src/universe/entities/capabilities/AbstractCapabilities";
import { Stats } from "src/universe/entities/Stats";

export class ShipFrame implements CanAddStats, CanMultiplyStats {
  public condition: number = 1;
  public integrity: number = 1;
  constructor(public frameType: ShipFrameType) {}

  multiplyStats(stats: Stats): Stats {
    return this.frameType.addStats(stats);
  }

  addStats(stats: Stats): Stats {
    return this.frameType.multiplyStats(stats);
  }
}
