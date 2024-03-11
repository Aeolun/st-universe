import { AbstractCapabilities } from "src/universe/entities/capabilities/AbstractCapabilities";
import { Engine } from "src/universe/static-data/ship-engines";
import { Capability } from "src/universe/entities/capabilities/Capability";

export class ShipEngineType extends AbstractCapabilities {
  constructor(
    public symbol: Engine,
    public name: string,
    public description: string,
    capabilities: Capability[]
  ) {
    super();

    this.capabilities = capabilities;
  }
}
