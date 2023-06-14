import {Capability} from "src/universe/entities/capabilities/Capability";
import {AbstractCapabilities} from "src/universe/entities/capabilities/AbstractCapabilities";
import {Frame} from "src/universe/static-data/ship-frames";

export class ShipFrame extends AbstractCapabilities {
  symbol: Frame

  constructor(symbol: Frame, capabilities: Capability[]) {
    super()

    this.symbol = symbol
    this.capabilities = capabilities
  }
}