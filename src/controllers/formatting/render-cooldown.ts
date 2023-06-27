import {Contract, ContractTypeEnum, Cooldown} from "src/controllers/schemas";
import {Contract as ContractEntity} from "src/universe/entities/Contract";
import {Ship} from "src/universe/entities/Ship";

export const renderCooldown = (ship: Ship): Cooldown => {
    return ship.cooldown && ship.cooldown.expires > new Date() ? {
        remainingSeconds: Math.ceil((ship.cooldown.expires.getTime() - Date.now()) / 1000),
        expiration: ship.cooldown.expires.toISOString(),
        totalSeconds: ship.cooldown.originalSeconds,
        shipSymbol: ship.symbol,
    } : {
        remainingSeconds: 0,
        expiration: undefined,
        totalSeconds: ship.cooldown?.originalSeconds ?? 0,
        shipSymbol: ship.symbol,
    }
}