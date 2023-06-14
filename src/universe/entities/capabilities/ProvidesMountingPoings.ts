import {Capability} from "src/universe/entities/capabilities/Capability";

export class ProvidesMountingPoings extends Capability {
  constructor(power: number) {
    super({
      statAdjustments: [
        {
          stat: "mountingPoints",
          kind: "add",
          value: power
        }
      ]
    })
  }
}