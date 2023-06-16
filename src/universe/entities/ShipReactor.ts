import {AbstractCapabilities} from "src/universe/entities/capabilities/AbstractCapabilities";
import {Reactor} from "src/universe/static-data/ship-reactors";
import {Capability} from "src/universe/entities/capabilities/Capability";

export class ShipReactor extends AbstractCapabilities {
  symbol: Reactor

    constructor(symbol: Reactor, capabilities: Capability[]) {
        super();

        this.symbol = symbol;
        this.capabilities = capabilities;
    }

}