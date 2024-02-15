export class JumpGate {
  public range: number
  public connections: string[]
  constructor(data: {
    range: number
    connections: string[]
  }) {
    this.range = data.range
    this.connections = data.connections
  }
}
