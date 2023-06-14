import {Capability} from "src/universe/entities/capabilities/Capability";

export class ProvidesPower extends Capability {
  constructor(power: number) {
    super({
      statAdjustments: [
        {
          stat: "powerGenerated",
          kind: "add",
          value: power
        }
      ]
    })
  }
}