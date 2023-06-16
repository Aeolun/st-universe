import {AbstractCapabilities} from "src/universe/entities/capabilities/AbstractCapabilities";
import {Engine} from "src/universe/static-data/ship-engines";
import {Capability} from "src/universe/entities/capabilities/Capability";

export class ShipEngine extends AbstractCapabilities {
  symbol: Engine

  constructor(symbol: Engine, capabilities: Capability[]) {
    super()

    this.symbol = symbol
    this.capabilities = capabilities
  }
}