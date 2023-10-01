import {
  Configuration,
  shipConfigurationData,
} from "src/universe/static-data/ship-configurations";
import { ShipType, ShipyardShip } from "src/controllers/schemas";
import { renderShipFrame } from "src/controllers/formatting/render-ship-frame";
import { renderShipReactor } from "src/controllers/formatting/render-ship-reactor";
import { renderShipEngine } from "src/controllers/formatting/render-ship-engine";
import { renderShipModule } from "src/controllers/formatting/render-ship-module";
import { renderShipMount } from "src/controllers/formatting/render-ship-mount";
import { Waypoint } from "src/universe/entities/Waypoint";
import { shipPrice } from "src/universe/formulas/trade";

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
    frame: renderShipFrame(shipConfiguration.frame),
    reactor: renderShipReactor(shipConfiguration.reactor),
    engine: renderShipEngine(shipConfiguration.engine),
    modules: shipConfiguration.modules.map(renderShipModule),
    mounts: shipConfiguration.mounts.map(renderShipMount),
    crew: shipConfiguration.crew,
  };
};
