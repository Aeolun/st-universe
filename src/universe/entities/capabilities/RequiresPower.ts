import {Capability} from "src/universe/entities/capabilities/Capability";

export class RequiresPower extends Capability {
  constructor(power: number) {
    super({
      statAdjustments: [
        {
          stat: "powerRequired",
          kind: "add",
          value: power
        }
      ]
    })
  }
}