export class JumpGate {
  public range: number;
  public connectionCount: number;
  public connections: string[];
  constructor(data: {
    range: number;
    connectionCount: number;
    connections: string[];
  }) {
    this.range = data.range;
    this.connectionCount = data.connectionCount;
    this.connections = data.connections;
  }
}
