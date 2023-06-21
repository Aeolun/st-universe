import {Property} from "@tsed/schema";
import {GlobalGetResponseServerResets, GlobalGetResponseStats} from "src/controllers/schemas/global-get-response";



export class SystemsListSystemResponse {
  @Property()
  data: string

  @Property()
  version: string

  @Property()
  resetDate: string

  @Property()
  description: string

  @Property()
  stats: GlobalGetResponseStats

  @Property()
  serverResets: GlobalGetResponseServerResets
}