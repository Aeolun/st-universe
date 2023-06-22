import {AbstractCapabilities} from "src/universe/entities/capabilities/AbstractCapabilities";
import {Reactor} from "src/universe/static-data/ship-reactors";
import {Capability} from "src/universe/entities/capabilities/Capability";

export class ShipReactor extends AbstractCapabilities {

    constructor(public symbol: Reactor, public name: string, public description: string, capabilities: Capability[]) {
        super();

        this.capabilities = capabilities;
    }

}