import {AbstractCapabilities} from "src/universe/entities/capabilities/AbstractCapabilities";
import {Mount} from "src/universe/static-data/ship-mounts";
import {Capability} from "src/universe/entities/capabilities/Capability";

export class ShipMount extends AbstractCapabilities {

  constructor(public symbol: Mount, public name: string, public description: string, capabilities: Capability[]) {
    super()

    this.capabilities = capabilities
  }
}