import { ShipRole } from "src/controllers/schemas";
import { Engine } from "src/universe/static-data/engine-enum";
import { Frame } from "src/universe/static-data/frame-enum";
import { Module } from "src/universe/static-data/module-enum";
import { Mount } from "src/universe/static-data/mount-enum";
import { Reactor } from "src/universe/static-data/reactor-enum";
import { Configuration } from "src/universe/static-data/configuration-enum";

export class ShipConfiguration {
  symbol: Configuration;

  name: string;
  role: ShipRole;
  description: string;

  frame: Frame;
  reactor: Reactor;
  engine: Engine;

  modules: Module[] = [];
  mounts: Mount[] = [];

  crew: {
    required: number;
    capacity: number;
  } = {
    required: 0,
    capacity: 0,
  };

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
    this.symbol = symbol;
    this.name = name;
    this.role = defaultRole;
    this.description = description;
    this.frame = frame;
    this.reactor = reactor;
    this.engine = engine;
    this.modules = modules;
    this.mounts = mounts;
  }
}
