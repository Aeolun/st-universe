import { Capability } from "src/universe/entities/capabilities/Capability";
import { AbstractCapabilities } from "src/universe/entities/capabilities/AbstractCapabilities";

import { Frame } from "src/universe/static-data/frame-enum";

export class ShipFrameType extends AbstractCapabilities {
  constructor(
    public symbol: Frame,
    public name: string,
    public description: string,
    capabilities: Capability[]
  ) {
    super();

    this.capabilities = capabilities;
  }
}
