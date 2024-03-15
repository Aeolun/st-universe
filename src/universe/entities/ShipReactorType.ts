import { AbstractCapabilities } from "src/universe/entities/capabilities/AbstractCapabilities";
import { Capability } from "src/universe/entities/capabilities/Capability";
import { Reactor } from "src/universe/static-data/reactor-enum";

export class ShipReactorType extends AbstractCapabilities {
  constructor(
    public symbol: Reactor,
    public name: string,
    public description: string,
    capabilities: Capability[]
  ) {
    super();

    this.capabilities = capabilities;
  }
}
