import {AbstractCapabilities} from "src/universe/entities/capabilities/AbstractCapabilities";
import {Capability} from "src/universe/entities/capabilities/Capability";
import {Module} from "src/universe/static-data/ship-modules";

export class ShipModule extends AbstractCapabilities {
  constructor(symbol: Module, capabilities: Capability[]) {
    super()

    this.capabilities = capabilities
  }
}