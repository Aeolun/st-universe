import { shipConfigurationData } from "src/universe/static-data/ship-configurations";
import {
  ShipType,
  ShipyardShip,
  ShipyardShipTypesInner,
  SupplyLevel,
} from "src/controllers/schemas";
import { renderShipFrame } from "src/controllers/formatting/render-ship-frame";
import { renderShipReactor } from "src/controllers/formatting/render-ship-reactor";
import { renderShipEngine } from "src/controllers/formatting/render-ship-engine";
import { renderShipModule } from "src/controllers/formatting/render-ship-module";
import { renderShipMount } from "src/controllers/formatting/render-ship-mount";
import { Waypoint } from "src/universe/entities/Waypoint";
import { shipPrice } from "src/universe/formulas/trade";
import { ShipFrame } from "src/universe/entities/ShipFrame";
import { frameData } from "src/universe/static-data/ship-frames";
import { reactorData } from "src/universe/static-data/ship-reactors";
import { ShipReactor } from "src/universe/entities/ShipReactor";
import { engineData } from "src/universe/static-data/ship-engines";
import { ShipEngine } from "src/universe/entities/ShipEngine";
import { Configuration } from "src/universe/static-data/configuration-enum";

export const renderShipConfiguration = (
  configurationSymbol: Configuration,
  waypoint: Waypoint
): ShipyardShip => {
  const shipConfiguration = shipConfigurationData[configurationSymbol];

  return {
    type: configurationSymbol as ShipType,
    name: shipConfiguration.name,
    description: shipConfiguration.description,
    purchasePrice: shipPrice(shipConfiguration, waypoint),
    frame: renderShipFrame(new ShipFrame(frameData[shipConfiguration.frame])),
    reactor: renderShipReactor(
      new ShipReactor(reactorData[shipConfiguration.reactor])
    ),
    engine: renderShipEngine(
      new ShipEngine(engineData[shipConfiguration.engine])
    ),
    modules: shipConfiguration.modules.map(renderShipModule),
    mounts: shipConfiguration.mounts.map(renderShipMount),
    supply: SupplyLevel.High,
    crew: {
      required: 0,
      capacity: 0,
    },
  };
};
