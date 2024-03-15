import type { ProductionRates } from "src/universe/helpers/calculate-production";

export const calculateSupplyTotal = (
  productionRates: ProductionRates,
  baseTradeVolume: number
) => {
  const supplyTotal =
    productionRates.production +
    productionRates.consumption +
    productionRates.productionLineProduction +
    productionRates.productionLineConsumption +
    Math.max(productionRates.extraStorage ?? 0, 1);

  return baseTradeVolume * 10 * supplyTotal;
};
