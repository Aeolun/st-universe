import { Waypoint } from "./Waypoint";
import { Faction } from "src/universe/static-data/faction";
import { generateWaypoint } from "src/universe/generateWaypoint";
import { JumpGate } from "src/universe/entities/JumpGate";
import { percentageChance } from "src/universe/utilities";

export class System {
  x: number;
  y: number;
  type: string;
  sectorSymbol: string;
  symbol: string;
  factions: Faction[] = [];

  hasMarket: boolean = false;

  public waypoints: Waypoint[] = [];

  constructor(data: {
    x: number;
    y: number;
    type: string;
    sectorSymbol: string;
    symbol: string;
  }) {
    this.x = data.x;
    this.y = data.y;
    this.type = data.type;
    this.sectorSymbol = data.sectorSymbol;
    this.symbol = data.symbol;
  }

  public addWaypoint(waypoint: Waypoint) {
    if (waypoint.traits.includes("MARKETPLACE")) {
      this.hasMarket = true;
    }
    if (!this.waypoints.includes(waypoint)) {
      this.waypoints.push(waypoint);
    }
    waypoint.orbitals.forEach((o) => {
      this.addWaypoint(o);
    });
  }

  public tick() {
    this.waypoints.forEach((w) => w.tick());
  }

  public addJumpGate(radius: number, range: number) {
    const angle = Math.random() * Math.PI * 2;
    const jumpGate = generateWaypoint({
      x: Math.round(Math.sin(angle) * radius),
      y: Math.round(Math.cos(angle) * radius),
      systemSymbol: this.symbol,
      type: "JUMP_GATE",
    });
    jumpGate.jumpGate = new JumpGate({
      range: range,
    });
    this.addWaypoint(jumpGate);

    return jumpGate;
  }
}
