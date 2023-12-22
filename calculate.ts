import { daScreenPrintCharges } from "./data";
import { GarmentSize, PricingScheduleEntry, QuoteRequest } from "./types";

export function calculateEstimate(quoteRequest: QuoteRequest) {
  return calculateScreenPrintEstimate(quoteRequest); //TODO: conditionally use different formulas depending on type of request
}

function calculateScreenPrintEstimate(quoteRequest: QuoteRequest) {
  const pricesPerProduct = new Map<GarmentSize, number>();
  const { productSpecificData, quantitiesBySize, details } = quoteRequest;
  const locationColorCounts = [
    details.location1ColorCount,
    details.location2ColorCount,
    details.location3ColorCount,
    details.location4ColorCount,
  ];

  for (const sizeQuantity of quantitiesBySize) {
    const basePrice = calculatePricingScheduleBasePrice(
      productSpecificData.pricingSchedule,
      sizeQuantity.quantity
    );
    const foundSizeUpcharge = productSpecificData.sizeUpcharges.find(
      (sizeUpcharge) => sizeUpcharge.size === sizeQuantity.size
    );
    const sizeUpcharge = foundSizeUpcharge ? foundSizeUpcharge.upcharge : 0;
    const locationColorUpchargeSum = locationColorCounts.reduce(
      (accum, thisColorCount, i) => {
        const oneFreeColor = i === 0;
        const colorsToCharge = oneFreeColor
          ? thisColorCount - 1
          : thisColorCount;
        if (colorsToCharge === 0) return accum;

        const locationColorUpcharge =
          daScreenPrintCharges.locationUpcharges.find(
            (locationUpcharge) =>
              locationUpcharge.locationNumber === i + 1 &&
              locationUpcharge.colorCount === colorsToCharge
          );
        if (!locationColorUpcharge) {
          console.error(
            `Could not find a screen print upcharge for ${colorsToCharge} in location ${
              i + 1
            }!`
          );
          return accum;
        }
        return accum + locationColorUpcharge?.upcharge;
      },
      0
    );
    pricesPerProduct.set(
      sizeQuantity.size,
      basePrice + sizeUpcharge + locationColorUpchargeSum
    );
  }

  return pricesPerProduct;
}

function calculatePricingScheduleBasePrice(
  pricingSchedule: PricingScheduleEntry[],
  quantity: number
) {
  if (pricingSchedule.length === 0) {
    console.error("Empty pricing schedule!");
    return 0;
  }
  let basePrice = pricingSchedule[0].pricePerProduct;
  for (const entry of pricingSchedule) {
    if (entry.quantity > quantity) break;
    basePrice = entry.pricePerProduct;
  }
  return basePrice;
}
