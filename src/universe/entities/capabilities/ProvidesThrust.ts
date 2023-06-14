import {Capability} from "src/universe/entities/capabilities/Capability";

export class ProvidesThrust extends Capability {
  constructor(thrust: number) {
    super({
      statAdjustments: [
        {
          stat: "thrust",
          kind: "add",
          value: thrust
        }
      ]
    })
  }
}