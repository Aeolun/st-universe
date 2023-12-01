export class JumpGate {
  public range: number;
  public connectedWaypointSymbols: string[] = [];
  constructor(data: { range: number; connectedWaypointSymbols: string[] }) {
    this.range = data.range;
    this.connectedWaypointSymbols = data.connectedWaypointSymbols;
  }
}
