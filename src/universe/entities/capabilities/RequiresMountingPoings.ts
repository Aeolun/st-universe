import {Capability} from "src/universe/entities/capabilities/Capability";

export class RequiresMountingPoings extends Capability {
  constructor(power: number) {
    super({
      statAdjustments: [
        {
          stat: "mountingPointsRequired",
          kind: "add",
          value: power
        }
      ]
    })
  }
}