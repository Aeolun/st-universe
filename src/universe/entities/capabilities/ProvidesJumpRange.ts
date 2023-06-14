import {Capability} from "src/universe/entities/capabilities/Capability";

export class ProvidesJumpRange extends Capability {
  constructor(jumpRange: number) {
    super({
      statAdjustments: [
        {
          stat: "powerGenerated",
          kind: "max",
          value: jumpRange
        }
      ]
    })
  }
}