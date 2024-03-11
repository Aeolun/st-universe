export const efficiencyDegradation = (condition: number, integrity: number) => {
  return 0.5 * Math.pow(condition, 2) + 0.5;
};
