import { AbstractCapabilities } from "src/universe/entities/capabilities/AbstractCapabilities";
import { Capability } from "src/universe/entities/capabilities/Capability";

import { Module } from "src/universe/static-data/module-enum";

export class ShipModule extends AbstractCapabilities {
  constructor(
    public symbol: Module,
    public name: string,
    public description: string,
    capabilities: Capability[]
  ) {
    super();

    this.capabilities = capabilities;
  }
}
