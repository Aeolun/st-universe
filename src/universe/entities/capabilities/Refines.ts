import { Capability } from "src/universe/entities/capabilities/Capability";
import { RefineStat } from "src/universe/entities/Stats";

export class Refines extends Capability {
  constructor(resources: RefineStat[]) {
    super({
      statAdjustments: [
        {
          stat: "resourcesRefined",
          kind: "append",
          value: resources,
        },
      ],
    });
  }
}
