import {Capability} from "src/universe/entities/capabilities/Capability";

export class ProvidesHull extends Capability {
  constructor(power: number) {
    super({
      statAdjustments: [
        {
          stat: "hullCapacity",
          kind: "add",
          value: power
        }
      ]
    })
  }
}