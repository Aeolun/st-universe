import {Capability} from "src/universe/entities/capabilities/Capability";
import {ResourceGroup} from "src/universe/static-data/resource-groups";

export class SurveysForResources extends Capability {
  constructor(resources: ResourceGroup[], surveys: number) {
    super({
      statAdjustments: [
        {
          stat: "surveysGenerated",
          kind: "add",
          value: surveys
        },
        {
          stat: "resourcesSurveyed",
          kind: "append",
          value: resources
        }
      ]
    })
  }
}