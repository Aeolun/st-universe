import {uniqueId} from "src/universe/utilities";
import {Faction} from "src/universe/static-data/faction";
import {Ship} from "src/universe/entities/Ship";
import jwt from 'jsonwebtoken'
import {AuthToken} from "src/models/auth-token";
import {universe} from "src/universe/universe";

export class Agent {
  public symbol: string
  public credits: number
  public faction: Faction
  public token: string
  public accountId: string
  public shipCounter = 1;
  public ships: Ship[] = []

  constructor(data: {
    symbol: string
    faction: Faction
    credits: number
  }) {
    this.symbol = data.symbol
    this.credits = data.credits
    this.faction = data.faction
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
    configuration: string
  }) {
    const ship = new Ship({
      symbol: this.symbol+'_'+this.shipCounter++,
      agent: this.symbol,
    })
    this.ships.push(ship)

    return ship
  }
}