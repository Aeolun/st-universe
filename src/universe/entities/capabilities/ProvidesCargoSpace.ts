import {Capability} from "src/universe/entities/capabilities/Capability";

export class ProvidesCargoSpace extends Capability {
  constructor(space: number) {
    super({
      statAdjustments: [
        {
          stat: "cargoSpace",
          kind: "add",
          value: space
        }
      ]
    })
  }
}