import { trulyUniqId } from "src/universe/utilities";
import { Faction } from "src/universe/static-data/faction";
import { Ship } from "src/universe/entities/Ship";
import { Location } from "src/universe/entities/Navigation";
import { Contract } from "src/universe/entities/Contract";
import {
  ConfigurationKeys,
  shipConfigurationData,
} from "src/universe/static-data/ship-configurations";
import { Waypoint, WaypointChart } from "src/universe/entities/Waypoint";

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
  public charts: WaypointChart[] = [];

  constructor(data: {
    symbol: string;
    faction: Faction;
    headquarters: Location;
    token: string;
    credits: number;
  }) {
    this.symbol = data.symbol;
    this.credits = data.credits;
    this.faction = data.faction;
    this.headquarters = data.headquarters;
    this.token = data.token;
    this.accountId = trulyUniqId();
  }

  public registerShip(data: {
    configuration: ConfigurationKeys;
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
