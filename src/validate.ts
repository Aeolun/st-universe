import {TradeGood, TradeGoodData, tradeGoods, tradeGoodTypeNames} from "src/universe/static-data/trade-goods";
import {waypointTraitNames, waypointTraits} from "src/universe/static-data/waypoint-traits";
import {industries, industryNames} from "src/universe/static-data/industries";

const tradeGoodsGenerated: Set<TradeGood> = new Set()
const tradeGoodsSunk: Set<TradeGood> = new Set()

waypointTraitNames.forEach(trait => {
  const traitData = waypointTraits[trait]
  if (traitData.extractableResources) {
    traitData.extractableResources.forEach(tg => {
      tradeGoodsGenerated.add(tg)
    })
  }
  if (traitData.produces) {
    Object.keys(traitData.produces).forEach((tg: TradeGood) => {
      tradeGoodsGenerated.add(tg)
    })
  }
  if (traitData.consumes) {
    Object.keys(traitData.consumes).forEach((tg: TradeGood) => {
      tradeGoodsSunk.add(tg)
    })
  }
})

industryNames.forEach(industry => {
  const industryData = industries[industry]
  if (industryData.produces) {
    Object.keys(industryData.produces).forEach((tg: TradeGood) => {
      tradeGoodsGenerated.add(tg)
    })
  }
  if (industryData.productionLine) {
    industryData.productionLine.forEach((line) => {
      tradeGoodsGenerated.add(line.produces)
      const tradeGoodData = tradeGoods[line.produces]
      if ('components' in tradeGoodData) {
        Object.keys(tradeGoodData.components).forEach((component) => {
          tradeGoodsSunk.add(component as TradeGood)
        })
      }
    })
  }
})

tradeGoodTypeNames.forEach(tg => {
  if (!tradeGoodsGenerated.has(tg)) {
    console.log(`Trade Good with no source: ${tg}`)
  }
  if (!tradeGoodsSunk.has(tg)) {
    console.log(`Trade Good with no sink: ${tg}`)
  }
});

industryNames.forEach(industry => {
  const industryData = industries[industry]

  Object.keys(industryData.exports ?? {}).forEach((tg: TradeGood) => {
    const tradeGoodData = tradeGoods[tg]
    if (!tradeGoodData) {
      console.log(`Industry ${industry} exports ${tg} but trade good is not defined.`)
    }
    if ('components' in tradeGoodData) {
      if (!Object.keys(industryData.imports ?? {}).every(tg => Object.keys(tradeGoodData.components).includes(tg))) {
        console.log(`Industry ${industry} exports ${tg} but not all components are defined for trade good.`)
      }
    } else {
      console.log(`Industry ${industry} constructs ${tg} from ${Object.keys(industryData.imports ?? {}).join(', ')}, but same components are not defined for trade good.`)
    }
  })
})