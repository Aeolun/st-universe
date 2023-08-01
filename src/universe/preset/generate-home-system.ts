import { generateSystem } from "src/universe/generateSystem";
import { TradeGood } from "src/universe/static-data/trade-goods";
import { Configuration } from "src/universe/static-data/ship-configurations";

export function generateHomeSystem(data: {
  x: number;
  y: number;
  universeSymbol: string;
}) {
  return generateSystem({
    ...data,
    waypoints: [
      {
        type: "PLANET",
        x: 13,
        y: -70,
        traits: [
          "DRY_SEABEDS",
          "MARKETPLACE",
          "WEAK_GRAVITY",
          "SCATTERED_SETTLEMENTS",
        ],
      },
      {
        type: "GAS_GIANT",
        x: -39,
        y: 38,
        traits: ["STRONG_MAGNETOSPHERE", "VIBRANT_AURORAS"],
        orbitals: [
          {
            type: "ORBITAL_STATION",
            x: -39,
            y: 38,
            traits: ["MARKETPLACE", "MILITARY_BASE", "HOME_SYSTEM_SHIPYARD"],
          },
        ],
      },
      {
        type: "PLANET",
        x: 14,
        y: -3,
        traits: ["TOXIC_ATMOSPHERE", "VOLCANIC", "WEAK_GRAVITY"],
      },
      {
        type: "JUMP_GATE",
        x: 8,
        y: -67,
        jumpGateRange: 2000,
      },
      {
        type: "ASTEROID_FIELD",
        x: -30,
        y: 25,
        traits: ["COMMON_METAL_DEPOSITS", "MARKETPLACE", "MINERAL_DEPOSITS"],
        industries: ["MINING_EXCHANGE"],
      },
      {
        type: "PLANET",
        x: -12,
        y: 22,
        traits: [
          "BUREAUCRATIC",
          "HIGH_TECH",
          "MARKETPLACE",
          "OVERCROWDED",
          "TEMPERATE",
        ],
        industries: ["BOTANICALS"],
        orbitals: [
          {
            type: "MOON",
            x: -12,
            y: 22,
            traits: ["BARREN", "MARKETPLACE"],
            industries: ["REFINING"],
          },
          {
            type: "MOON",
            x: -12,
            y: 22,
            traits: ["FROZEN", "MARKETPLACE"],
            industries: ["PRECIOUS_METAL_REFINING"],
            tradeGoods: [
              {
                symbol: TradeGood.FUEL,
                type: "exchange",
              },
            ],
          },
          {
            type: "MOON",
            x: -12,
            y: 22,
            traits: ["VOLCANIC", "MARKETPLACE"],
            industries: ["EXPLOSIVES", "FERTILIZERS", "CHEMICALS"],
          },
        ],
      },
    ],
  });
}
