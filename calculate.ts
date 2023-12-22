import { daEmbroideryCharges, daScreenPrintCharges } from "./data";
import {
  EmbroideryRequestDetails,
  GarmentSize,
  PricingScheduleEntry,
  ProductSpecificData,
  QuoteRequest,
  ScreenPrintRequestDetails,
  SizeQuantity,
  embroideryRequestDetailsSchema,
  screenPrintRequestDetailsSchema,
} from "./types";

export function calculateEstimate(quoteRequest: QuoteRequest) {
  const { details, productSpecificData, quantitiesBySize } = quoteRequest;
  try {
    const parsed = screenPrintRequestDetailsSchema.parse(details);
    return calculateWithDesignTypeCharges(
      quantitiesBySize,
      productSpecificData,
      () => calculateScreenPrintExtraCharges(parsed)
    );
  } catch (e) {}
  try {
    const parsed = embroideryRequestDetailsSchema.parse(details);
    return calculateWithDesignTypeCharges(
      quantitiesBySize,
      productSpecificData,
      () => calculateEmbroideryExtraCharges(parsed)
    );
  } catch (e) {}
  try {
  } catch (e) {}
  try {
  } catch (e) {}

  console.error("Couldn't find a valid estimate formula!");
  return new Map<GarmentSize, number>();
}

function calculateWithDesignTypeCharges(
  quantitiesBySize: SizeQuantity[],
  productSpecificData: ProductSpecificData,
  designTypeSpecificChargeFn: () => number
) {
  const pricesPerProduct = new Map<GarmentSize, number>();

  for (const sizeQuantity of quantitiesBySize) {
    const basePrice = calculatePricingScheduleBasePrice(
      productSpecificData.pricingSchedule,
      sizeQuantity.quantity
    );
    const foundSizeUpcharge = productSpecificData.sizeUpcharges.find(
      (sizeUpcharge) => sizeUpcharge.size === sizeQuantity.size
    );
    const sizeUpcharge = foundSizeUpcharge ? foundSizeUpcharge.upcharge : 0;
    const designTypeSpecificCharges = designTypeSpecificChargeFn();
    pricesPerProduct.set(
      sizeQuantity.size,
      basePrice + sizeUpcharge + designTypeSpecificCharges
    );
  }

  return pricesPerProduct;
}

function calculateScreenPrintExtraCharges(
  screenPrintDetails: ScreenPrintRequestDetails
) {
  const locationColorCounts = [
    screenPrintDetails.location1ColorCount,
    screenPrintDetails.location2ColorCount,
    screenPrintDetails.location3ColorCount,
    screenPrintDetails.location4ColorCount,
  ];
  const locationColorUpchargeSum = locationColorCounts.reduce(
    (accum, thisColorCount, i) => {
      const oneFreeColor = i === 0;
      const colorsToCharge = oneFreeColor ? thisColorCount - 1 : thisColorCount;
      if (colorsToCharge === 0) return accum;

      const locationColorUpcharge = daScreenPrintCharges.locationUpcharges.find(
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
  return locationColorUpchargeSum;
}

function calculateEmbroideryExtraCharges(
  embroideryDetails: EmbroideryRequestDetails
) {
  const locationStitchCounts = [
    embroideryDetails.location1StitchCount,
    embroideryDetails.location2StitchCount,
    embroideryDetails.location3StitchCount,
  ];

  const locationStitchCountSum = locationStitchCounts.reduce(
    (accum, stitchCount, i) => {
      const locationCharge = i === 0 ? 0 : 5;
      const stitchCountToCharge = +stitchCount - 5; //5k stitches included per location
      const chargePerExtra5k = daEmbroideryCharges.additional5kStitchCharge;
      const numberOf5ks = Math.floor(stitchCountToCharge / 5);
      return accum + locationCharge + numberOf5ks * chargePerExtra5k;
    },
    0
  );

  return locationStitchCountSum;
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
