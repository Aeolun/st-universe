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
        name: "A1",
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
        name: "B1",
        type: "GAS_GIANT",
        x: -39,
        y: 38,
        traits: ["STRONG_MAGNETOSPHERE", "VIBRANT_AURORAS"],
        orbitals: [
          {
            name: "B2",
            type: "ORBITAL_STATION",
            x: -39,
            y: 38,
            traits: ["MARKETPLACE", "MILITARY_BASE"],
          },
        ],
      },
      {
        name: "C1",
        type: "PLANET",
        x: 14,
        y: -3,
        traits: ["TOXIC_ATMOSPHERE", "VOLCANIC", "WEAK_GRAVITY"],
      },
      {
        name: "D1",
        type: "JUMP_GATE",
        x: 8,
        y: -67,
        jumpGateRange: 2000,
      },
      {
        name: "E1",
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
            name: "E2",
            type: "MOON",
            x: -12,
            y: 22,
            traits: ["BARREN", "MARKETPLACE"],
            industries: ["REFINING"],
          },
          {
            name: "E3",
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
            name: "E4",
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
