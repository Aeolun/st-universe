import {Capability} from "src/universe/entities/capabilities/Capability";
import {ResourceGroup} from "src/universe/static-data/resource-groups";

export class ExtractsResources extends Capability {
  constructor(resources: ResourceGroup[], power: number) {
    super({
      statAdjustments: [
        {
          stat: "extractionPower",
          kind: "add",
          value: power
        },
        {
          stat: "resourcesExtracted",
          kind: "append",
          value: resources
        }
      ]
    })
  }
}