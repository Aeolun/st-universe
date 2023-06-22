import {uniqueId} from "src/universe/utilities";
import {Faction} from "src/universe/static-data/faction";
import {Ship} from "src/universe/entities/Ship";
import jwt from 'jsonwebtoken'
import {AuthToken} from "src/models/auth-token";
import {universe} from "src/universe/universe";
import {Location} from "src/universe/entities/Navigation";

export class Agent {
  public symbol: string
  public credits: number
  public faction: Faction
  public headquarters: Location
  public token: string
  public accountId: string
  public shipCounter = 1;
  public ships: Ship[] = []

  constructor(data: {
    symbol: string
    faction: Faction
    headquarters: Location
    credits: number
  }) {
    this.symbol = data.symbol
    this.credits = data.credits
    this.faction = data.faction
    this.headquarters = data.headquarters
    var token = jwt.sign({
      identifier: data.symbol,
      version: 'v2',
      reset_date: universe.createDate,
      sub: 'agent-token'
    } satisfies AuthToken, 'epicmegasuper');
    this.token = token
    this.accountId = uniqueId(Date.now().toString())
  }

  public registerShip(data: {
    configuration: string,
    location: Location
  }) {
    const ship = new Ship({
      symbol: this.symbol+'_'+this.shipCounter.toString(16),
      agentSymbol: this.symbol,
      location: data.location,
    })
    this.ships.push(ship)
    this.shipCounter++

    return ship
  }
}