import {Capability} from "src/universe/entities/capabilities/Capability";

export class ProvidesModuleCapacity extends Capability {
  constructor(modules: number) {
    super({
      statAdjustments: [
        {
          stat: "moduleCapacity",
          kind: "add",
          value: modules
        }
      ]
    })
  }
}