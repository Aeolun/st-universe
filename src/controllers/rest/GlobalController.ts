import {Controller} from "@tsed/di";
import {Get, Post} from "@tsed/schema";
import {PathParams} from "@tsed/platform-params";

@Controller("/")
export class AgentsController {
  @Post("/register")
  register() {
    return "hello";
  }

  @Get('/')
  get() {
    return "hello"
  }
}
