export class Ship {
    public symbol: string;
    public agent: string;
    constructor(data: {
        symbol: string;
        agent: string;
    }) {
        this.symbol = data.symbol;
    }
}