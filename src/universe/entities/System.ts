export class System {
    x: number
    y: number
    type: string

    constructor(data: {
        x: number,
        y: number,
        type: string
    }) {
        this.x = data.x;
        this.y = data.y;
        this.type = data.type;
    }
}