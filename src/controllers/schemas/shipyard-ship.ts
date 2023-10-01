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

// May contain unused imports in some cases
// @ts-ignore
import { ShipEngine } from "./ship-engine";
// May contain unused imports in some cases
// @ts-ignore
import { ShipFrame } from "./ship-frame";
// May contain unused imports in some cases
// @ts-ignore
import { ShipModule } from "./ship-module";
// May contain unused imports in some cases
// @ts-ignore
import { ShipMount } from "./ship-mount";
// May contain unused imports in some cases
// @ts-ignore
import { ShipReactor } from "./ship-reactor";
// May contain unused imports in some cases
// @ts-ignore
import { ShipType } from "./ship-type";
import { ShipyardShipCrew } from "src/controllers/schemas/shipyard-ship-crew";

/**
 *
 * @export
 * @interface ShipyardShip
 */
export interface ShipyardShip {
  /**
   *
   * @type {ShipType}
   * @memberof ShipyardShip
   */
  type?: ShipType;
  /**
   *
   * @type {string}
   * @memberof ShipyardShip
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof ShipyardShip
   */
  description: string;
  /**
   *
   * @type {number}
   * @memberof ShipyardShip
   */
  purchasePrice: number;
  /**
   *
   * @type {ShipFrame}
   * @memberof ShipyardShip
   */
  frame: ShipFrame;
  /**
   *
   * @type {ShipReactor}
   * @memberof ShipyardShip
   */
  reactor: ShipReactor;
  /**
   *
   * @type {ShipEngine}
   * @memberof ShipyardShip
   */
  engine: ShipEngine;
  /**
   *
   * @type {Array<ShipModule>}
   * @memberof ShipyardShip
   */
  modules: Array<ShipModule>;
  /**
   *
   * @type {Array<ShipMount>}
   * @memberof ShipyardShip
   */
  mounts: Array<ShipMount>;
  /**
   *
   * @type {ShipyardShipCrew}
   * @memberof ShipyardShip
   */
  crew: ShipyardShipCrew;
}
