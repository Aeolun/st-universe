import {ShipEngine} from "src/universe/entities/ShipEngine";
import {ShipFrame} from "src/universe/entities/ShipFrame";
import {ShipReactor} from "src/universe/entities/ShipReactor";
import {ShipMount} from "src/universe/entities/ShipMount";
import {ShipModule} from "src/universe/entities/ShipModule";

export class ShipConfiguration {
  symbol: string

  frame: ShipFrame
  reactor: ShipReactor
  engine: ShipEngine

  modules: ShipModule[] = []
  mounts: ShipMount[] = []

  constructor(data: {
    symbol: string
    frame: ShipFrame
    reactor: ShipReactor
    engine: ShipEngine
    modules: ShipModule[]
    mounts: ShipMount[]
  }) {
    this.symbol = data.symbol

    this.frame = data.frame
    this.reactor = data.reactor
    this.engine = data.engine

    this.modules = data.modules
    this.mounts = data.mounts
  }
}