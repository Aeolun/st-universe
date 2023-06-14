import {AbstractCapabilities} from "src/universe/entities/capabilities/AbstractCapabilities";
import {ProvidesPower} from "src/universe/entities/capabilities/ProvidesPower";

export class ShipReactor extends AbstractCapabilities {
  symbol: string

    constructor(data: {
      symbol: string
      power: number
    }) {
        super();
        this.symbol = data.symbol;
        this.capabilities = [
          new ProvidesPower(data.power)
        ]
    }

}