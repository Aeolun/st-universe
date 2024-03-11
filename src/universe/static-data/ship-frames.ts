import { ShipFrameType } from "src/universe/entities/ShipFrameType";
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
  FRAME_TRANSPORT = TradeGood.FRAME_TRANSPORT,
  FRAME_DESTROYER = TradeGood.FRAME_DESTROYER,
  FRAME_CRUISER = TradeGood.FRAME_CRUISER,
  // FRAME_BATTLESHIP = "FRAME_BATTLESHIP",
  // FRAME_DREADNOUGHT = "FRAME_DREADNOUGHT",
  // FRAME_TITAN = "FRAME_TITAN",
  // FRAME_LEVIATHAN = "FRAME_LEVIATHAN",
  FRAME_CARRIER = TradeGood.FRAME_CARRIER,
  // FRAME_FLEET_CARRIER = "FRAME_FLEET_CARRIER",
  // FRAME_MOTHERSHIP = "FRAME_MOTHERSHIP",
  // FRAME_STARBASE = "FRAME_STARBASE",
  // FRAME_STATION = "FRAME_STATION",
}

export const frameData: Record<Frame, ShipFrameType> = {
  [Frame.FRAME_PROBE]: new ShipFrameType(
    Frame.FRAME_PROBE,
    "Frame Probe",
    "A small, unmanned spacecraft used for exploration, reconnaissance, and scientific research.",
    [new RequiresPower(1)]
  ),
  [Frame.FRAME_DRONE]: new ShipFrameType(
    Frame.FRAME_DRONE,
    "Drone Frame",
    "A small, unmanned spacecraft used for various tasks, such as surveillance, transportation, or combat.",
    [
      new RequiresCrew(-3),
      new RequiresPower(1),
      new ProvidesModuleCapacity(3),
      new ProvidesMountingPoings(2),
      new StoresFuel(100),
    ]
  ),
  [Frame.FRAME_INTERCEPTOR]: new ShipFrameType(
    Frame.FRAME_INTERCEPTOR,
    "Frame Interceptor",
    "A small, agile spacecraft designed for high-speed, short-range combat missions.",
    [
      new RequiresCrew(5),
      new RequiresPower(1),
      new ProvidesModuleCapacity(2),
      new ProvidesMountingPoings(2),
      new StoresFuel(500),
    ]
  ),
  [Frame.FRAME_RACER]: new ShipFrameType(Frame.FRAME_RACER, "", "", [
    new RequiresCrew(1),
    new ProvidesModuleCapacity(2),
    new ProvidesMountingPoings(2),
    new StoresFuel(400),
  ]),
  [Frame.FRAME_FIGHTER]: new ShipFrameType(Frame.FRAME_FIGHTER, "", "", [
    new RequiresCrew(1),
    new ProvidesModuleCapacity(2),
    new ProvidesMountingPoings(2),
    new StoresFuel(400),
  ]),
  [Frame.FRAME_FRIGATE]: new ShipFrameType(
    Frame.FRAME_FRIGATE,
    "Frame Frigate",
    "A medium-sized, multi-purpose spacecraft, often used for combat, transport, or support operations.",
    [
      new RequiresCrew(25),
      new RequiresPower(8),
      new ProvidesModuleCapacity(8),
      new ProvidesMountingPoings(5),
      new StoresFuel(1200),
    ]
  ),
  [Frame.FRAME_SHUTTLE]: new ShipFrameType(
    Frame.FRAME_SHUTTLE,
    "Frame Shuttle",
    "A small, reusable spacecraft designed for short-range, low-speed travel between spacecraft or planetary surfaces.",
    [
      new RequiresCrew(10),
      new RequiresPower(1),
      new ProvidesModuleCapacity(4),
      new ProvidesMountingPoings(1),
      new StoresFuel(900),
    ]
  ),
  [Frame.FRAME_EXPLORER]: new ShipFrameType(
    Frame.FRAME_EXPLORER,
    "Frame Explorer",
    "A large, long-range spacecraft designed for deep space exploration and scientific research.",
    [
      new RequiresCrew(30),
      new RequiresPower(5),
      new ProvidesModuleCapacity(8),
      new ProvidesMountingPoings(2),
      new StoresFuel(1500),
    ]
  ),
  [Frame.FRAME_MINER]: new ShipFrameType(
    Frame.FRAME_MINER,
    "Frame Miner",
    "A medium-sized spacecraft designed for mining operations and resource extraction.",
    [
      new RequiresCrew(15),
      new RequiresPower(5),
      new ProvidesModuleCapacity(5),
      new ProvidesMountingPoings(3),
      new StoresFuel(900),
    ]
  ),
  [Frame.FRAME_LIGHT_FREIGHTER]: new ShipFrameType(
    Frame.FRAME_LIGHT_FREIGHTER,
    "Frame Light Freighter",
    "A small, versatile spacecraft used for cargo transport and other commercial operations.",
    [
      new RequiresCrew(40),
      new RequiresPower(5),
      new ProvidesModuleCapacity(6),
      new ProvidesMountingPoings(1),
      new StoresFuel(1700),
    ]
  ),
  [Frame.FRAME_HEAVY_FREIGHTER]: new ShipFrameType(
    Frame.FRAME_HEAVY_FREIGHTER,
    "Frame Heavy Freighter",
    "A large, heavily-armed spacecraft used for cargo transport and other commercial operations in hostile environments.",
    [
      new ProvidesModuleCapacity(12),
      new ProvidesMountingPoings(3),
      new RequiresPower(10),
      new RequiresCrew(100),
      new StoresFuel(2300),
    ]
  ),
  [Frame.FRAME_TRANSPORT]: new ShipFrameType(Frame.FRAME_TRANSPORT, "", "", [
    new RequiresCrew(1),
    new ProvidesModuleCapacity(2),
    new ProvidesMountingPoings(2),
    new StoresFuel(700),
  ]),
  [Frame.FRAME_DESTROYER]: new ShipFrameType(Frame.FRAME_DESTROYER, "", "", [
    new RequiresCrew(1),
    new ProvidesModuleCapacity(2),
    new ProvidesMountingPoings(2),
    new StoresFuel(700),
  ]),
  [Frame.FRAME_CRUISER]: new ShipFrameType(Frame.FRAME_CRUISER, "", "", [
    new RequiresCrew(1),
    new ProvidesModuleCapacity(2),
    new ProvidesMountingPoings(2),
    new StoresFuel(100),
  ]),
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
  [Frame.FRAME_CARRIER]: new ShipFrameType(Frame.FRAME_CARRIER, "", "", [
    new RequiresCrew(1),
    new ProvidesModuleCapacity(2),
    new ProvidesMountingPoings(2),
    new StoresFuel(100),
  ]),
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
