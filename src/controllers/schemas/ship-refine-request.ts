/* tslint:disable */
/* eslint-disable */
/**
 * SpaceTraders API
 * SpaceTraders is an open-universe game and learning platform that offers a set of HTTP endpoints to control a fleet of ships and explore a multiplayer universe.  The API is documented using [OpenAPI](https://github.com/SpaceTradersAPI/api-docs). You can send your first request right here in your browser to check the status of the game server.  ```json http {   \"method\": \"GET\",   \"url\": \"https://api.spacetraders.io/v2\", } ```  Unlike a traditional game, SpaceTraders does not have a first-party client or app to play the game. Instead, you can use the API to build your own client, write a script to automate your ships, or try an app built by the community.  We have a [Discord channel](https://discord.com/invite/jh6zurdWk5) where you can share your projects, ask questions, and get help from other players.
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: joel@spacetraders.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Property } from "@tsed/schema";
import { TradeGood } from "src/universe/static-data/trade-goods";

/**
 *
 * @export
 * @interface ShipRefineRequest
 */
export class ShipRefineRequest {
  /**
   * The type of good to produce out of the refining process.
   * @type {string}
   * @memberof ShipRefineRequest
   */
  @Property()
  "produce": TradeGood;
}

export const ShipRefineRequestProduceEnum = {
  Iron: "IRON",
  Copper: "COPPER",
  Silver: "SILVER",
  Gold: "GOLD",
  Aluminum: "ALUMINUM",
  Platinum: "PLATINUM",
  Uranite: "URANITE",
  Meritium: "MERITIUM",
  Fuel: "FUEL",
} as const;

export type ShipRefineRequestProduceEnum =
  (typeof ShipRefineRequestProduceEnum)[keyof typeof ShipRefineRequestProduceEnum];
