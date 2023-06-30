export const powerUsageCooldown = (
  powerUsed: number,
  powerGenerated: number
) => {
  return (powerUsed / powerGenerated) * 1000 * 60;
};
