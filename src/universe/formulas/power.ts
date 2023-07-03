export const powerUsageCooldown = (
  powerUsed: number,
  powerGenerated: number
) => {
  return Math.max((powerUsed / powerGenerated) * 1000 * 60, 1);
};
