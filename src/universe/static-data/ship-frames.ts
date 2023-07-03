import { ShipFrame } from "src/universe/entities/ShipFrame";
import { ProvidesModuleCapacity } from "src/universe/entities/capabilities/ProvidesModuleCapacity";
import { RequiresCrew } from "src/universe/entities/capabilities/RequiresCrew";
import { ProvidesMountingPoings } from "src/universe/entities/capabilities/ProvidesMountingPoings";
import { StoresFuel } from "src/universe/entities/capabilities/StoresFuel";
import { TradeGood } from "src/universe/static-data/trade-goods";
import { RequiresPower } from "src/universe/entities/capabilities/RequiresPower";

export enum Frame {
  FRAME_PROBE = TradeGood.FRAME_PROBE,
  FRAME_DRONE = TradeGood.FRAME_DRONE,
  FRAME_INTERCEPTOR = TradeGood.FRAME_INTERCEPTOR,
  FRAME_RACER = TradeGood.FRAME_RACER,
  FRAME_FIGHTER = TradeGood.FRAME_FIGHTER,
  FRAME_FRIGATE = TradeGood.FRAME_FRIGATE,
  FRAME_SHUTTLE = TradeGood.FRAME_SHUTTLE,
  FRAME_EXPLORER = TradeGood.FRAME_EXPLORER,
  FRAME_MINER = TradeGood.FRAME_MINER,
  FRAME_LIGHT_FREIGHTER = TradeGood.FRAME_LIGHT_FREIGHTER,
  FRAME_HEAVY_FREIGHTER = TradeGood.FRAME_HEAVY_FREIGHTER,
  // FRAME_TRANSPORT = "FRAME_TRANSPORT",
  // FRAME_DESTROYER = "FRAME_DESTROYER",
  // FRAME_CRUISER = "FRAME_CRUISER",
  // FRAME_BATTLESHIP = "FRAME_BATTLESHIP",
  // FRAME_DREADNOUGHT = "FRAME_DREADNOUGHT",
  // FRAME_TITAN = "FRAME_TITAN",
  // FRAME_LEVIATHAN = "FRAME_LEVIATHAN",
  // FRAME_CARRIER = "FRAME_CARRIER",
  // FRAME_FLEET_CARRIER = "FRAME_FLEET_CARRIER",
  // FRAME_MOTHERSHIP = "FRAME_MOTHERSHIP",
  // FRAME_STARBASE = "FRAME_STARBASE",
  // FRAME_STATION = "FRAME_STATION",
}

export const frameData: Record<Frame, ShipFrame> = {
  [Frame.FRAME_PROBE]: new ShipFrame(Frame.FRAME_PROBE, "", "", [
    new RequiresCrew(-3),
  ]),
  [Frame.FRAME_DRONE]: new ShipFrame(
    Frame.FRAME_DRONE,
    "Drone Frame",
    "A small, unmanned spacecraft used for various tasks, such as surveillance, transportation, or combat.",
    [
      new RequiresCrew(1),
      new ProvidesModuleCapacity(2),
      new ProvidesMountingPoings(1),
      new StoresFuel(100),
    ]
  ),
  [Frame.FRAME_INTERCEPTOR]: new ShipFrame(Frame.FRAME_INTERCEPTOR, "", "", [
    new RequiresCrew(1),
    new ProvidesModuleCapacity(2),
    new ProvidesMountingPoings(2),
    new StoresFuel(200),
  ]),
  [Frame.FRAME_RACER]: new ShipFrame(Frame.FRAME_RACER, "", "", [
    new RequiresCrew(1),
    new ProvidesModuleCapacity(2),
    new ProvidesMountingPoings(2),
    new StoresFuel(400),
  ]),
  [Frame.FRAME_FIGHTER]: new ShipFrame(Frame.FRAME_FIGHTER, "", "", [
    new RequiresCrew(1),
    new ProvidesModuleCapacity(2),
    new ProvidesMountingPoings(2),
    new StoresFuel(400),
  ]),
  [Frame.FRAME_FRIGATE]: new ShipFrame(Frame.FRAME_FRIGATE, "", "", [
    new RequiresCrew(1),
    new ProvidesModuleCapacity(8),
    new ProvidesMountingPoings(5),
    new StoresFuel(1200),
  ]),
  [Frame.FRAME_SHUTTLE]: new ShipFrame(Frame.FRAME_SHUTTLE, "", "", [
    new RequiresCrew(1),
    new ProvidesModuleCapacity(2),
    new ProvidesMountingPoings(2),
    new StoresFuel(700),
  ]),
  [Frame.FRAME_EXPLORER]: new ShipFrame(Frame.FRAME_EXPLORER, "", "", [
    new RequiresCrew(1),
    new ProvidesModuleCapacity(2),
    new ProvidesMountingPoings(2),
    new StoresFuel(700),
  ]),
  [Frame.FRAME_MINER]: new ShipFrame(
    Frame.FRAME_MINER,
    "Frame Miner",
    "A medium-sized spacecraft designed for mining operations and resource extraction.",
    [
      new RequiresCrew(1),
      new ProvidesModuleCapacity(2),
      new ProvidesMountingPoings(2),
      new StoresFuel(700),
    ]
  ),
  [Frame.FRAME_LIGHT_FREIGHTER]: new ShipFrame(
    Frame.FRAME_LIGHT_FREIGHTER,
    "",
    "",
    [
      new RequiresCrew(1),
      new ProvidesModuleCapacity(2),
      new ProvidesMountingPoings(2),
      new StoresFuel(1500),
    ]
  ),
  [Frame.FRAME_HEAVY_FREIGHTER]: new ShipFrame(
    Frame.FRAME_HEAVY_FREIGHTER,
    "",
    "",
    [
      new RequiresCrew(1),
      new ProvidesModuleCapacity(12),
      new ProvidesMountingPoings(3),
      new RequiresPower(10),
      new RequiresCrew(100),
      new StoresFuel(2300),
    ]
  ),
  // [Frame.FRAME_TRANSPORT]: new ShipFrame(Frame.FRAME_TRANSPORT, [
  //   new RequiresCrew(1),
  //   new ProvidesModuleCapacity(2),
  //   new ProvidesMountingPoings(2),
  //   new StoresFuel(700)
  // ]),
  // [Frame.FRAME_DESTROYER]: new ShipFrame(Frame.FRAME_DESTROYER, [
  //   new RequiresCrew(1),
  //   new ProvidesModuleCapacity(2),
  //   new ProvidesMountingPoings(2),
  //   new StoresFuel(700)
  // ]),
  // [Frame.FRAME_CRUISER]: new ShipFrame(Frame.FRAME_CRUISER, [
  //   new RequiresCrew(1),
  //   new ProvidesModuleCapacity(2),
  //   new ProvidesMountingPoings(2),
  //   new StoresFuel(100),
  // ]),
  // [Frame.FRAME_BATTLESHIP]: new ShipFrame(Frame.FRAME_BATTLESHIP, [
  //   new RequiresCrew(1),
  //   new ProvidesModuleCapacity(2),
  //   new ProvidesMountingPoings(2),
  //   new StoresFuel(100),
  // ]),
  // [Frame.FRAME_DREADNOUGHT]: new ShipFrame(Frame.FRAME_DREADNOUGHT, [
  //   new RequiresCrew(1),
  //   new ProvidesModuleCapacity(2),
  //   new ProvidesMountingPoings(2),
  //   new StoresFuel(100),
  // ]),
  // [Frame.FRAME_TITAN]: new ShipFrame(Frame.FRAME_TITAN, [
  //   new RequiresCrew(1),
  //   new ProvidesModuleCapacity(2),
  //   new ProvidesMountingPoings(2),
  //   new StoresFuel(100),
  // ]),
  // [Frame.FRAME_LEVIATHAN]: new ShipFrame(Frame.FRAME_LEVIATHAN, [
  //   new RequiresCrew(1),
  //   new ProvidesModuleCapacity(2),
  //   new ProvidesMountingPoings(2),
  //   new StoresFuel(100),
  // ]),
  // [Frame.FRAME_CARRIER]: new ShipFrame(Frame.FRAME_CARRIER, [
  //   new RequiresCrew(1),
  //   new ProvidesModuleCapacity(2),
  //   new ProvidesMountingPoings(2),
  //   new StoresFuel(100),
  // ]),
  // [Frame.FRAME_FLEET_CARRIER]: new ShipFrame(Frame.FRAME_FLEET_CARRIER, [
  //   new RequiresCrew(1),
  //   new ProvidesModuleCapacity(2),
  //   new ProvidesMountingPoings(2),
  //   new StoresFuel(100),
  // ]),
  // [Frame.FRAME_MOTHERSHIP]: new ShipFrame(Frame.FRAME_MOTHERSHIP, [
  //   new RequiresCrew(1),
  //   new ProvidesModuleCapacity(2),
  //   new ProvidesMountingPoings(2),
  //   new StoresFuel(10000)
  // ]),
  // [Frame.FRAME_STARBASE]: new ShipFrame(Frame.FRAME_STARBASE, [
  //   new RequiresCrew(1),
  //   new ProvidesModuleCapacity(2),
  //   new ProvidesMountingPoings(2),
  // ]),
  // [Frame.FRAME_STATION]: new ShipFrame(Frame.FRAME_STATION, [
  //   new RequiresCrew(1),
  //   new ProvidesModuleCapacity(2),
  //   new ProvidesMountingPoings(2),
  // ]),
};
