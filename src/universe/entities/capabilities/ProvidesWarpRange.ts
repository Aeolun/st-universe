import {Capability} from "src/universe/entities/capabilities/Capability";

export class ProvidesWarpRange extends Capability {
  constructor(range: number) {
    super({
      statAdjustments: [
        {
          stat: "warpRange",
          kind: "max",
          value: range
        }
      ]
    })
  }
}