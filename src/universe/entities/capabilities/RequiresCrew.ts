import {Capability} from "src/universe/entities/capabilities/Capability";

export class RequiresCrew extends Capability {
  constructor(crew: number) {
    super({
      statAdjustments: [
        {
          stat: "crewRequired",
          kind: "add",
          value: crew
        }
      ]
    })
  }
}