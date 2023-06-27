import { uniqueId } from "src/universe/utilities";
import { Faction } from "src/universe/static-data/faction";
import { Ship } from "src/universe/entities/Ship";
import jwt from "jsonwebtoken";
import { AuthToken } from "src/models/auth-token";
import { universe } from "src/universe/universe";
import { Location } from "src/universe/entities/Navigation";
import { Contract } from "src/universe/entities/Contract";
import {
  Configuration,
  shipConfigurationData,
} from "src/universe/static-data/ship-configurations";
import { ShipNavRouteWaypoint } from "src/controllers/schemas";
import { Waypoint } from "src/universe/entities/Waypoint";

export class Agent {
  public symbol: string;
  public credits: number;
  public faction: Faction;
  public headquarters: Location;
  public token: string;
  public accountId: string;
  public shipCounter = 1;
  public ships: Ship[] = [];
  public contracts: Contract[] = [];

  constructor(data: {
    symbol: string;
    faction: Faction;
    headquarters: Location;
    credits: number;
  }) {
    this.symbol = data.symbol;
    this.credits = data.credits;
    this.faction = data.faction;
    this.headquarters = data.headquarters;
    var token = jwt.sign(
      {
        identifier: data.symbol,
        version: "v2",
        reset_date: universe.createDate,
        sub: "agent-token",
      } satisfies AuthToken,
      "epicmegasuper"
    );
    this.token = token;
    this.accountId = uniqueId(Date.now().toString());
  }

  public registerShip(data: {
    configuration: Configuration;
    waypoint: Waypoint;
  }) {
    const ship = new Ship({
      symbol: this.symbol + "-" + this.shipCounter.toString(16),
      configuration: data.configuration,
      agentSymbol: this.symbol,
      role: shipConfigurationData[data.configuration].role,
      waypoint: data.waypoint,
    });
    this.ships.push(ship);
    this.shipCounter++;

    return ship;
  }
}
