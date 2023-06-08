export class Waypoint {
    public symbol: string
    public x: number
    public y: number

    public orbitals: Waypoint[] = []
    constructor(data: {
        x: number
        y: number
        symbol: string
    }) {
    }
}