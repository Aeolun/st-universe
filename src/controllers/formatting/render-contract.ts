import {Contract, ContractTypeEnum} from "src/controllers/schemas";
import {Contract as ContractEntity} from "src/universe/entities/Contract";

export const renderContract = (contract: ContractEntity): Contract => {
    const firstTerms = contract.terms[0]

    if (!firstTerms) {
        throw new Error(`Contract ${contract.symbol} has no terms`)
    }

    return {
        id: contract.symbol,
        factionSymbol: contract.factionSymbol,
        type: firstTerms.type,

        terms: {
            deadline: firstTerms.deadline?.toISOString() ?? new Date('2040-01-01').toISOString(),
            deliver: [{
                destinationSymbol: firstTerms.deliveryWaypointSymbol,
                tradeSymbol: firstTerms.deliveryGoodSymbol,
                unitsRequired: firstTerms.deliveryQuantity,
                unitsFulfilled: 0,
            }],
            payment: {
                onAccepted: firstTerms.onAccept,
                onFulfilled: firstTerms.onFulfilled,
            }
        },
        accepted: contract.status === 'ACCEPTED',
        fulfilled: contract.status === 'FULFILLED',
        expiration: contract.availableUntil.toISOString(),
        deadlineToAccept: contract.availableUntil.toISOString(),
    };
}