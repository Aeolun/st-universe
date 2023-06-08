import {Controller} from "@tsed/di";
import {Get} from "@tsed/schema";
import {PathParams} from "@tsed/platform-params";

@Controller("/my/")
export class AgentsController {
  @Get("/agent")
  get() {
    return "hello";
  }

}
