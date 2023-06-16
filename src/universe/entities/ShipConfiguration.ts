import {ShipEngine} from "src/universe/entities/ShipEngine";
import {ShipFrame} from "src/universe/entities/ShipFrame";
import {ShipReactor} from "src/universe/entities/ShipReactor";
import {ShipMount} from "src/universe/entities/ShipMount";
import {ShipModule} from "src/universe/entities/ShipModule";
import {Configuration} from "src/universe/static-data/ship-configurations";

export class ShipConfiguration {
  symbol: Configuration

  frame: ShipFrame
  reactor: ShipReactor
  engine: ShipEngine

  modules: ShipModule[] = []
  mounts: ShipMount[] = []

  constructor(
    symbol: Configuration,
    frame: ShipFrame,
    reactor: ShipReactor,
    engine: ShipEngine,
    modules: ShipModule[],
    mounts: ShipMount[]
  ) {
    this.symbol = symbol
    this.frame = frame
    this.reactor = reactor
    this.engine = engine
    this.modules = modules
    this.mounts = mounts
  }
}