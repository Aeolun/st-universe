import {Waypoint} from "./entities/Waypoint";
import {numberBetween, pickRandom, randomWeightedKey, uniqueId} from "./utilities";
import {generatableWaypointTypeNames, WaypointType, waypointTypes} from "./static-data/waypoint-types";
import {WaypointTrait, waypointTraitNames, waypointTraits} from "src/universe/static-data/waypoint-traits";
import {tradeGoods, tradeGoodTypeNames} from "src/universe/static-data/trade-goods";
import {industries, industryNames} from "src/universe/static-data/industries";
import {Configuration, shipConfigurationData} from "src/universe/static-data/ship-configurations";
import {checkNullable} from "ajv/dist/vocabularies/jtd/nullable";

const availableTraits: Record<string, WaypointTrait[]> = {}

export const generateWaypoint = (data: {
    x: number,
    y: number,
    inOrbitOf?: string,
    type?: WaypointType
    systemSymbol: string
}) => {
    const { systemSymbol, ...rest } = data

    const waypointSymbol = `${systemSymbol}_${uniqueId(data.x.toString()+data.y.toString()).substring(0, 4)}`

    const waypointType = data.type ?? pickRandom(generatableWaypointTypeNames)

    const waypoint = new Waypoint({
        type: waypointType,
        symbol: waypointSymbol,
        ...rest,
    })

    const waypointTypeData = waypointTypes[waypointType]

    const orbitalOptions = waypointTypeData.orbitalOptions
    if (orbitalOptions) {
        orbitalOptions.forEach(o => {
            const count = randomWeightedKey(o.orbitalCount)
            if (count) {
                for (let i = 0; i < count; i++) {
                    const newOrbital = generateWaypoint({
                        x: data.x,
                        y: data.y,
                        inOrbitOf: waypointSymbol,
                        systemSymbol,
                        type: o.type
                    })
                    waypoint.orbitals.push(newOrbital)
                }
            }
        })
    }

    let availableTraitsForType = availableTraits[waypointType]
    if (!availableTraitsForType) {
        availableTraitsForType = waypointTraitNames.filter(t => waypointTraits[t].validFor.includes(waypointType))
        availableTraits[waypointType] = availableTraitsForType
    }

    const waypointTraitCount = numberBetween(0, waypointTypeData.maxTraits);

    waypointTrait:
    for(let i = 0; i < waypointTraitCount; i++) {
        if (availableTraitsForType.length === 0) {
            continue;
        }

        const newTrait = pickRandom(availableTraitsForType)
        const traitData = waypointTraits[newTrait]
        const requiredCategories = traitData.requiresCategory
        if (requiredCategories) {
            for(const category of requiredCategories) {
                if (!waypoint.traits.some(t => waypointTraits[t].category === category)) {
                    continue waypointTrait
                }
            }
        }

        waypoint.traits.push(newTrait)

        if (traitData.exports) {
            traitData.exports.forEach(tg => {
                if (!waypoint.exports.includes(tg)) {
                    waypoint.exports.push(tg)
                }
            })
        }
        if (traitData.imports) {
            traitData.imports.forEach(tg => {
                if (!waypoint.imports.includes(tg)) {
                    waypoint.imports.push(tg)
                }
            })
        }
        if (traitData.exchange) {
            traitData.exchange.forEach(tg => {
                if (!waypoint.exchange.includes(tg)) {
                    waypoint.exchange.push(tg)
                }
            })
        }
        if (traitData.exchangeGoodsCount) {
            for(let i = 0; i < traitData.exchangeGoodsCount; i++) {
                const tradeGood = pickRandom(tradeGoodTypeNames)
                if (!waypoint.exports.includes(tradeGood) && !waypoint.imports.includes(tradeGood) && !waypoint.exchange.includes(tradeGood)) {
                    waypoint.exchange.push(tradeGood)
                }
            }
        }

        if (traitData.industries) {
            for(let i= 0; i < traitData.industries; i++) {
                const newIndustry = pickRandom(industryNames)
                if (!waypoint.industries.includes(newIndustry)) {
                    waypoint.industries.push(newIndustry)

                    const industryData = industries[newIndustry]
                    if (industryData.imports) {
                        industryData.imports.forEach(tg => {
                            if (!waypoint.imports.includes(tg)) {
                                waypoint.imports.push(tg)
                            }
                        })
                    }
                    if (industryData.exports) {
                        industryData.exports.forEach(tg => {
                            if (!waypoint.exports.includes(tg)) {
                                waypoint.exports.push(tg)
                            }
                        })
                    }
                }
            }
        }

        if (traitData.populationLevel) {
            waypoint.population += traitData.populationLevel
        }

        if (traitData.extractableResources) {
            waypoint.extractableResources.push(...traitData.extractableResources)
        }

        if (traitData.shipHullCount) {
            for(let i = 0; i < traitData.shipHullCount; i++) {
                const newHull = pickRandom(Object.values(Configuration))
                if (!waypoint.availableShipConfigurations.includes(newHull)) {
                    waypoint.availableShipConfigurations.push(newHull)
                }
            }

            waypoint.availableShipConfigurations.forEach(configuration => {
                // add all the components to imports
                const configurationData = shipConfigurationData[configuration]
                waypoint.imports.push(configurationData.engine.symbol)
                waypoint.imports.push(configurationData.frame.symbol)
                waypoint.imports.push(configurationData.reactor.symbol)
                configurationData.modules.forEach(m => {
                    waypoint.imports.push(m.symbol)
                })
                configurationData.mounts.forEach(m => {
                    waypoint.imports.push(m.symbol)
                })
            })
        }
    }

    waypoint.imports.forEach(imp => {
        const exp = waypoint.exports.find(exp => exp === imp)
        if (exp) {
            waypoint.exports.splice(waypoint.exports.indexOf(exp), 1)
            waypoint.imports.splice(waypoint.imports.indexOf(imp), 1)
            if (!waypoint.exchange.includes(exp)) {
                waypoint.exchange.push(exp)
            }
        }
    })

    if (waypoint.imports.length > 0 || waypoint.exports.length > 0 || waypoint.exchange.length > 0) {
        waypoint.traits.push("MARKETPLACE")
    }

    //TODO: Base consumption rate/supply off of how many times the industry/good is requested by some trait/industry
    waypoint.imports.forEach(imp => {
        const tradeGoodData = tradeGoods[imp]

        const idealSupply = tradeGoodData.baseTradeVolume * 10 * waypoint.population

        waypoint.supplyDemand.push({
            tradeGood: imp,
            idealSupply: idealSupply,
            currentSupply: idealSupply,
            maxSupply: idealSupply * 2,
            stopSaleAt: Math.min(Math.round(idealSupply * 0.2), 1),
            consumptionRate: tradeGoodData.notConsumed ? 0 : waypoint.population,
            productionRate: 0,
            localFluctuation: numberBetween(-10, 10)
        })
    })

    waypoint.exports.forEach(imp => {
        const tradeGoodData = tradeGoods[imp]

        const idealSupply = tradeGoodData.baseTradeVolume * 10 * waypoint.population

        waypoint.supplyDemand.push({
            tradeGood: imp,
            idealSupply: idealSupply * 0.5,
            currentSupply: idealSupply * 0.5,
            maxSupply: idealSupply * 2,
            stopSaleAt: Math.min(Math.round(idealSupply * 0.2), 1),
            consumptionRate: 0,
            productionRate: waypoint.population,
            localFluctuation: numberBetween(-10, 10)
        })
    })

    waypoint.exchange.forEach(imp => {
        const tradeGoodData = tradeGoods[imp]

        const idealSupply = tradeGoodData.baseTradeVolume * 10 * waypoint.population

        waypoint.supplyDemand.push({
            tradeGood: imp,
            idealSupply: idealSupply,
            currentSupply: idealSupply,
            maxSupply: idealSupply * 2,
            stopSaleAt: Math.min(Math.round(idealSupply * 0.2), 1),
            consumptionRate: 0,
            productionRate: 0,
            localFluctuation: numberBetween(-10, 10)
        })
    })

    return waypoint
}