import { Controller } from "@tsed/di";
import { Get, Hidden, View } from "@tsed/schema";
import { PathParams } from "@tsed/platform-params";
import { universe } from "src/universe/universe";
import { getSystem } from "src/controllers/helpers/get-system";
import { marketPrice } from "src/universe/formulas/trade";

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
        Object.values(waypoint.supplyDemand).forEach((sd) => {
          const price = marketPrice(waypoint.inventory.get(sd.tradeGood), sd);
          sd.price = price;
        });
        return {
          ...waypoint,
          supplyDemand: waypoint.supplyDemand,
        };
      }),
    };
  }
}
