import { expect, test } from "vitest";
import { powerUsageCooldown } from "src/universe/formulas/power";

test("when one power is used in command ship, cooldown is 70 second", () => {
  expect(powerUsageCooldown(1)).toBe(70000);
});

test("when three power is used in command ship, cooldown is 90 second", () => {
  expect(powerUsageCooldown(3)).toBe(90000);
});
