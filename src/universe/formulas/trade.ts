import { TradeGood, tradeGoods } from "src/universe/static-data/trade-goods";
import { ShipConfiguration } from "src/universe/entities/ShipConfiguration";
import { Engine } from "src/universe/static-data/engine-enum";
import { Frame } from "src/universe/static-data/frame-enum";
import { Module } from "src/universe/static-data/module-enum";
import { Mount } from "src/universe/static-data/mount-enum";
import { Reactor } from "src/universe/static-data/reactor-enum";
import { Storage } from "src/universe/entities/Storage";
import {
  MarketPrice,
  SupplyDemand,
} from "src/universe/static-data/supply-demand";

export function marketPrice(
  basePrice: number,
  inventory: number,
  idealSupply: number,
  maxSupply: number,
  localFluctuation = 0
): MarketPrice {
  let salePrice = 0;
  let purchasePrice = 0;

  if (inventory > maxSupply) {
    // supply saturated
    salePrice = basePrice / (inventory / idealSupply) ** 3;
    purchasePrice = (basePrice / (inventory / idealSupply) ** 3) * 0.8;
  } else if (inventory >= idealSupply) {
    // demand satisfied
    salePrice = basePrice / (inventory / idealSupply);
    purchasePrice = (basePrice / (inventory / idealSupply) ** 3) * 0.9;
  } else {
    // demand not satisfied
    salePrice = basePrice * Math.min(idealSupply / inventory, 3);
    purchasePrice =
      basePrice * (1 + (idealSupply - inventory) / idealSupply) * 0.9;
  }

  const fluct = 1 + localFluctuation / 100;
  return {
    purchasePrice: Math.max(Math.round(purchasePrice * fluct), 1),
    salePrice: Math.max(Math.round(salePrice * fluct), 1),
  };
}

export function shipPrice(
  configuration: ShipConfiguration,
  supplyDemandR: Partial<Record<TradeGood, SupplyDemand>>,
  inventory: Storage
) {
  let total = 0;
  const allShipModules: (Frame | Reactor | Engine | Module | Mount)[] = [
    configuration.frame,
    configuration.reactor,
    configuration.engine,
    ...configuration.modules,
    ...configuration.mounts,
  ];
  for (const module of allShipModules) {
    const supplyDemand = supplyDemandR[module];
    const basePrice = tradeGoods[module].basePrice;
    if (supplyDemand && basePrice) {
      const price = marketPrice(
        basePrice,
        inventory.get(module),
        supplyDemand.current.idealSupply,
        supplyDemand.current.maxSupply,
        supplyDemand.localFluctuation
      );
      total += price.purchasePrice;
    }
  }
  return total;
}
