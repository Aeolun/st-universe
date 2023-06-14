import {Capability, StatAdjustment} from "src/universe/entities/capabilities/Capability";

export class StoresFuel extends Capability {
  constructor(fuel: number) {
    super({
      statAdjustments: [
        {
          stat: "fuelCapacity",
          kind: "add",
          value: fuel
        }
      ]
    })
  }
}