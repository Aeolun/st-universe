import {Waypoint} from "./entities/Waypoint";
import {numberBetween, pickRandom, randomWeightedKey, uniqueId} from "./utilities";
import {generatableWaypointTypeNames, WaypointType, waypointTypes} from "./static-data/waypoint-types";
import {
    TraitData,
    TraitModifiers,
    WaypointTrait,
    waypointTraitNames,
    waypointTraits
} from "src/universe/static-data/waypoint-traits";
import {TradeGood, tradeGoods, tradeGoodTypeNames} from "src/universe/static-data/trade-goods";
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
        systemSymbol: systemSymbol,
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

        if (traitData.populationLevel) {
            waypoint.population += traitData.populationLevel
        }

        if (traitData.extractableResources) {
            waypoint.extractableResources.push(...traitData.extractableResources)
        }
    }

    const good: Partial<Record<TradeGood, boolean>> = {}
    const productionRate: Partial<Record<TradeGood, number>> = {}
    const consumptionRate: Partial<Record<TradeGood, number>> = {}
    const productionLineProductionRate: Partial<Record<TradeGood, number>> = {}
    const productionLineConsumptionRate: Partial<Record<TradeGood, number>> = {}
    const extraRequestedStorage: Partial<Record<TradeGood, number>> = {}

    const addRates = (tradeGood: TradeGood, data: {
        production?: number,
      consumption?: number,
      extraStorage?: number,
        productionLineProduction?: number,
      productionLineConsumption?: number,
}) => {
        good[tradeGood] = true
        if (data.production) {
            productionRate[tradeGood] = (productionRate[tradeGood] ?? 0) + data.production
        }
        if (data.consumption) {
            consumptionRate[tradeGood] = (consumptionRate[tradeGood] ?? 0) + data.consumption
        }
        if (data.productionLineProduction) {
            productionLineProductionRate[tradeGood] = (productionLineProductionRate[tradeGood] ?? 0) + data.productionLineProduction
        }
        if (data.productionLineConsumption) {
            productionLineConsumptionRate[tradeGood] = (productionLineConsumptionRate[tradeGood] ?? 0) + data.productionLineConsumption
        }
        if (data.extraStorage) {
            extraRequestedStorage[tradeGood] = (extraRequestedStorage[tradeGood] ?? 0) + data.extraStorage
        }
    }
    const addTraits = (traitData: TraitModifiers) => {
        if (traitData.exports) {
            Object.keys(traitData.exports).forEach((tg: TradeGood) => {
                const count = traitData.exports?.[tg]
                if (count) {
                    addRates(tg, {
                        production: count,
                    })
                }
            })
        }
        if (traitData.imports) {
            Object.keys(traitData.imports).forEach((tg: TradeGood) => {
                const count = traitData.imports?.[tg]
                if (count) {
                    addRates(tg, {
                        consumption: count,
                    })
                }
            })
        }
        if (traitData.exchange) {
            traitData.exchange.forEach(tg => {
                addRates(tg, {
                    extraStorage: 1,
                })
            })
        }
        if (traitData.exchangeGoodsCount) {
            for(let i = 0; i < traitData.exchangeGoodsCount; i++) {
                const tradeGood = pickRandom(tradeGoodTypeNames)
                addRates(tradeGood, {
                    extraStorage: 1,
                })
            }
        }
        if (traitData.productionLine) {
            traitData.productionLine.forEach(line => {
                const tradeGoodData = tradeGoods[line.produces]
                if (tradeGoodData && 'components' in tradeGoodData) {
                    addRates(line.produces, {
                        productionLineProduction: line.count ?? 1
                    })
                    const options = Array.isArray(tradeGoodData.components) ? tradeGoodData.components : [tradeGoodData.components]
                    for (let i = 0; i < options.length; i++) {
                        const componentOptions = options[i]
                        Object.keys(componentOptions).forEach((component: TradeGood) => {
                            const count = componentOptions[component]
                            if (count) {
                                addRates(component, {
                                    productionLineConsumption: count,
                                    extraStorage: count
                                })
                            }
                        })
                    }
                }

                waypoint.productionLines.push(line)
            })
        }
        if (traitData.consumes) {
            Object.keys(traitData.consumes).forEach((tg: TradeGood) => {
                const count = traitData.consumes?.[tg]
                if (count) {
                    addRates(tg, {
                        consumption: count,
                    })
                }
            })
        }
        if (traitData.produces) {
            Object.keys(traitData.produces).forEach((tg: TradeGood) => {
                const count = traitData.produces?.[tg]
                if (count) {
                    addRates(tg, {
                        production: count,
                    })
                }
            })
        }
    }

    // once we've determined other factors, we can determine production
    waypoint.traits.forEach(trait => {
        const traitData = waypointTraits[trait]

        addTraits(traitData)


        if (traitData.industries) {
            for(let i= 0; i < traitData.industries; i++) {
                const newIndustry = pickRandom(industryNames)
                if (!waypoint.industries.includes(newIndustry)) {
                    waypoint.industries.push(newIndustry)

                    const industryData = industries[newIndustry]
                    addTraits(industryData)
                }
            }
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

                addRates(configurationData.engine.symbol, {
                    extraStorage: 1
                })
                addRates(configurationData.frame.symbol, {
                    extraStorage: 1
                })
                addRates(configurationData.reactor.symbol, {
                    extraStorage: 1
                })
                configurationData.modules.forEach(m => {
                    addRates(m.symbol, {
                        extraStorage: 1
                    })
                })
                configurationData.mounts.forEach(m => {
                    addRates(m.symbol, {
                        extraStorage: 1
                    })
                })
            })
        }
    })

    Object.keys(good).forEach((tg: TradeGood) => {
        try {
            const tgProductionRate = (productionRate[tg] ?? 0)
            const tgConsumptionRate = (consumptionRate[tg] ?? 0)
            const tgProductionLineProductionRate = (productionLineProductionRate[tg] ?? 0)
            const tgProductionLineConsumptionRate = (productionLineConsumptionRate[tg] ?? 0)

            const count = tgProductionRate - tgConsumptionRate
            const productionLineCount = tgProductionLineProductionRate - tgProductionLineConsumptionRate
            const totalCount = count + productionLineCount
            const supplyTotal = tgProductionRate + tgConsumptionRate + tgProductionLineProductionRate + tgProductionLineConsumptionRate + (extraRequestedStorage[tg] ?? 0)
            const tradeGoodData = tradeGoods[tg]
            if (count !== undefined) {
                if (totalCount > 0) {
                    // produce
                    const idealSupply = tradeGoodData.baseTradeVolume * 10 * supplyTotal * waypoint.population

                    waypoint.exports.push(tg)
                    waypoint.supplyDemand[tg] = {
                        tradeGood: tg,
                        kind: 'supply',
                        idealSupply: idealSupply,
                        currentSupply: idealSupply,
                        maxSupply: idealSupply * 2,
                        lastTickConsumption: 0,
                        lastTickProduction: 0,
                        stopSaleAt: Math.min(Math.round(idealSupply * 0.2), 1),
                        productionRate: tgProductionRate * waypoint.population,
                        consumptionRate: tgConsumptionRate * waypoint.population,
                        productionLineProductionRate: tgProductionLineProductionRate * waypoint.population,
                        productionLineConsumptionRate: tgProductionLineConsumptionRate * waypoint.population,
                        localFluctuation: numberBetween(-10, 10)
                    }
                } else if (totalCount < 0) {
                    // consumes
                    const idealSupply = tradeGoodData.baseTradeVolume * 10 * supplyTotal * waypoint.population

                    waypoint.imports.push(tg)
                    waypoint.supplyDemand[tg] = {
                        tradeGood: tg,
                        kind: 'demand',
                        idealSupply: idealSupply,
                        currentSupply: idealSupply,
                        maxSupply: idealSupply * 2,
                        lastTickConsumption: 0,
                        lastTickProduction: 0,
                        stopSaleAt: Math.min(Math.round(idealSupply * 0.2), 1),
                        productionRate: tgProductionRate * waypoint.population,
                        consumptionRate: tgConsumptionRate * waypoint.population,
                        productionLineProductionRate: tgProductionLineProductionRate * waypoint.population,
                        productionLineConsumptionRate: tgProductionLineConsumptionRate * waypoint.population,
                        localFluctuation: numberBetween(-10, 10)
                    }
                } else {
                    // exchange
                    const idealSupply = tradeGoodData.baseTradeVolume * 10 * supplyTotal * waypoint.population

                    waypoint.exchange.push(tg)
                    waypoint.supplyDemand[tg] = {
                        tradeGood: tg,
                        kind: 'exchange',
                        idealSupply: idealSupply,
                        currentSupply: idealSupply,
                        maxSupply: idealSupply * 2,
                        lastTickConsumption: 0,
                        lastTickProduction: 0,
                        stopSaleAt: Math.min(Math.round(idealSupply * 0.2), 1),
                        productionRate: tgProductionRate * waypoint.population,
                        consumptionRate: tgConsumptionRate * waypoint.population,
                        productionLineProductionRate: tgProductionLineProductionRate * waypoint.population,
                        productionLineConsumptionRate: tgProductionLineConsumptionRate * waypoint.population,
                        localFluctuation: numberBetween(-10, 10)
                    }
                }
            }
        } catch (e) {
            console.log(`Issue setting consumption rate for ${tg}`)
            console.log(e)

        }
    })

    if (waypoint.imports.length > 0 || waypoint.exports.length > 0 || waypoint.exchange.length > 0) {
        waypoint.traits.push("MARKETPLACE")
    }


    return waypoint
}