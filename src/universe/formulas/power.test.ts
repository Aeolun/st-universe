import { expect, test } from "vitest";
import { powerUsageCooldown } from "src/universe/formulas/power";

test("when one power is used in command ship, cooldown is 1.5 second", () => {
  expect(powerUsageCooldown(1, 40)).toBe(1500);
});
