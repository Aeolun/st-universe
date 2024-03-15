import { Controller } from "@tsed/di";
import { Get, Hidden, View } from "@tsed/schema";
import { PathParams } from "@tsed/platform-params";
import { universe } from "@src/universe/universe";
import { getSystem } from "@src/controllers/helpers/get-system";
import { marketPrice } from "@src/universe/formulas/trade";
import { tradeGoods } from "@src/universe/static-data/trade-goods";

@Controller("/admin/")
export class AdminController {
  @Get("/global-market")
  @Hidden()
  globalMarket() {
    return universe.allGoods();
  }

  @Get("/ships")
  @Hidden()
  ships() {
    return universe.ships;
  }

  @Get("/systems")
  @View("systems.ejs")
  @Hidden()
  systems() {
    return {
      systems: Object.keys(universe.systems),
    };
  }

  @Get("/system/:systemSymbol")
  @Hidden()
  system(@PathParams("systemSymbol") systemSymbol: string) {
    const system = getSystem(universe, systemSymbol);

    return {
      ...system,
      waypoints: system.waypoints.map((waypoint) => {
        for (const sd of Object.values(waypoint.supplyDemand)) {
          const price = marketPrice(
            tradeGoods[sd.tradeGood].basePrice ?? 0,
            waypoint.inventory.get(sd.tradeGood),
            sd.current.idealSupply,
            sd.current.maxSupply,
            sd.localFluctuation
          );
          sd.price = price;
        }
        return {
          ...waypoint,
          supplyDemand: waypoint.supplyDemand,
        };
      }),
    };
  }
}
