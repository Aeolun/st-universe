import {Controller} from "@tsed/di";
import {Get, Patch, Post} from "@tsed/schema";
import {PathParams} from "@tsed/platform-params";

@Controller("/my/")
export class FleetController {
  @Get("/ships")
  listShips() {
    return "hello";
  }

  @Post("/ships")
  purchaseShip() {
    return "hello";
  }

  @Get("/ships/:shipSymbol")
  ship(@PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Get("/ships/:shipSymbol/cargo")
  cargo(@PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/orbit")
  orbit(@PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/refine")
  refine(@PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/chart")
  chart(@PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Get("/ships/:shipSymbol/cooldown")
  cooldowns(@PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/dock")
  dock(@PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/survey")
  survey(@PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/extract")
  extract(@PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/jettison")
  jettison(@PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/jump")
  jump(@PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/navigate")
  navigate(@PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Patch("/ships/:shipSymbol/nav")
  patchNav(@PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Get("/ships/:shipSymbol/nav")
  getNav(@PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/warp")
  warp(@PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/sell")
  sell(@PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/scan/systems")
  scanSystems(@PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/scan/waypoints")
  scanWaypoints(@PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/scan/ships")
  scanShips(@PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/refuel")
  refuel(@PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/purchase")
  purchase(@PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/transfer")
  transfer(@PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }

  @Post("/ships/:shipSymbol/negotiate/contract")
  negotiateContract(@PathParams('shipSymbol') shipSymbol: string) {
    return "hello";
  }
}
