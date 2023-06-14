import {Capability} from "src/universe/entities/capabilities/Capability";

export class RequiresModuleCapacity extends Capability {
  constructor(capacity: number) {
    super({
      statAdjustments: [
        {
          stat: "moduleCapacityRequired",
          kind: "add",
          value: capacity
        }
      ]
    })
  }
}