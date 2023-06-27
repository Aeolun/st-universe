import {Universe} from "src/universe/entities/Universe";
import {NotFound} from "@tsed/exceptions";

export function getSystem(universe: Universe, systemSymbol: string) {
  if (!universe.systems[systemSymbol]) {
    throw new NotFound(`No system with symbol ${systemSymbol}`)
  }
  return universe.systems[systemSymbol]
}