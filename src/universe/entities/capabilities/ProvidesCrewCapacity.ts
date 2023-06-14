import {Capability} from "src/universe/entities/capabilities/Capability";

export class ProvidesCrewCapacity extends Capability {
  constructor(crew: number) {
    super({
      statAdjustments: [
        {
          stat: "crewCapacity",
          kind: "add",
          value: crew
        }
      ]
    })
  }
}