import {Capability} from "src/universe/entities/capabilities/Capability";

export class ProvidesShield extends Capability {
  constructor(power: number) {
    super({
      statAdjustments: [
        {
          stat: "shieldCapacity",
          kind: "add",
          value: power
        }
      ]
    })
  }
}