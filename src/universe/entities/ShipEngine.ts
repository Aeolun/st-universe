import {Crew} from "src/universe/entities/Crew";
import {Power} from "src/universe/entities/Power";
import {AbstractCapabilities} from "src/universe/entities/capabilities/AbstractCapabilities";

export class ShipEngine extends AbstractCapabilities {
  symbol: string
  speed: number

  constructor(data: {
    symbol: string
    speed: number
  }) {
    super()

    this.symbol = data.symbol
    this.speed = data.speed
  }
}