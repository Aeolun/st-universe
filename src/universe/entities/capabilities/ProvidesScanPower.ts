import {Capability} from "src/universe/entities/capabilities/Capability";

export class ProvidesScanPower extends Capability {
  constructor(power: number) {
    super({
      statAdjustments: [
        {
          stat: "scanPower",
          kind: "max",
          value: power
        }
      ]
    })
  }
}