import {Configuration} from "src/universe/static-data/ship-configurations";
import {Frame} from "src/universe/static-data/ship-frames";
import {Reactor} from "src/universe/static-data/ship-reactors";
import {Engine} from "src/universe/static-data/ship-engines";
import {Module} from "src/universe/static-data/ship-modules";
import {Mount} from "src/universe/static-data/ship-mounts";
import {ShipRole} from "src/controllers/schemas";

export class ShipConfiguration {
  symbol: Configuration

  name: string
  description: string

  frame: Frame
  reactor: Reactor
  engine: Engine

  modules: Module[] = []
  mounts: Mount[] = []

  constructor(
    symbol: Configuration,
    name: string,
    description: string,
    defaultRole: ShipRole,
    frame: Frame,
    reactor: Reactor,
    engine: Engine,
    modules: Module[],
    mounts: Mount[]
  ) {
    this.symbol = symbol
    this.name = name
    this.description = description
    this.frame = frame
    this.reactor = reactor
    this.engine = engine
    this.modules = modules
    this.mounts = mounts
  }
}