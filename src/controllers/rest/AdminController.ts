import {Controller} from "@tsed/di";
import {Get} from "@tsed/schema";
import {PathParams} from "@tsed/platform-params";
import {universe} from "src/universe/universe";

@Controller("/admin/")
export class AdminController {
  @Get("/global-market")
  globalMarket() {
    return universe.allGoods();
  }
}
