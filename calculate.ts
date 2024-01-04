import {
  daDtfCharges,
  daEmbroideryCharges,
  daScreenPrintCharges,
  dyeSubChargePerLocation,
} from "./data";
import {
  GarmentSize,
  PricingScheduleEntry,
  QuoteRequest,
  dtfRequestDetailsSchema,
  dyeSubRequestDetailsSchema,
  embroideryRequestDetailsSchema,
  screenPrintRequestDetailsSchema,
} from "./types";

export function calculateEstimate(quoteRequest: QuoteRequest) {
  const designTypeSpecificFn = getDesignTypeSpecificFn(quoteRequest);
  if (!designTypeSpecificFn) {
    console.error("Couldn't find a valid estimate formula!");
    return new Map<GarmentSize, number>();
  }
  return calculateWithDesignTypeCharges(quoteRequest, designTypeSpecificFn);
}

function getDesignTypeSpecificFn(quoteRequest: QuoteRequest) {
  if (screenPrintRequestDetailsSchema.safeParse(quoteRequest.details).success)
    return calculateScreenPrintExtraCharges;
  else if (
    embroideryRequestDetailsSchema.safeParse(quoteRequest.details).success
  )
    return calculateEmbroideryExtraCharges;
  else if (dtfRequestDetailsSchema.safeParse(quoteRequest.details).success)
    return calculateDtfExtraCharges;
  else if (dyeSubRequestDetailsSchema.safeParse(quoteRequest.details).success)
    return calculateDyeSubExtraCharges;
}

function calculateWithDesignTypeCharges(
  quoteRequest: QuoteRequest,
  designTypeSpecificChargeFn: (
    quoteRequest: QuoteRequest,
    quantity: number
  ) => number
) {
  const pricesPerProduct = new Map<GarmentSize, number>();
  const { quantitiesBySize, productSpecificData } = quoteRequest;

  for (const sizeQuantity of quantitiesBySize) {
    const basePrice = calculatePricingScheduleBasePrice(
      productSpecificData.pricingSchedule,
      sizeQuantity.quantity
    );
    const foundSizeUpcharge = productSpecificData.sizeUpcharges.find(
      (sizeUpcharge) => sizeUpcharge.size === sizeQuantity.size
    );
    const sizeUpcharge =
      foundSizeUpcharge && sizeQuantity.quantity > 0
        ? foundSizeUpcharge.upcharge
        : 0;
    const designTypeSpecificCharges =
      sizeQuantity.quantity > 0
        ? designTypeSpecificChargeFn(quoteRequest, sizeQuantity.quantity)
        : 0;
    pricesPerProduct.set(
      sizeQuantity.size,
      basePrice + sizeUpcharge + designTypeSpecificCharges
    );
  }

  return pricesPerProduct;
}

function calculateScreenPrintExtraCharges(quoteRequest: QuoteRequest) {
  const screenPrintDetails = screenPrintRequestDetailsSchema.parse(
    quoteRequest.details
  );
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

function calculateEmbroideryExtraCharges(quoteRequest: QuoteRequest) {
  const embroideryDetails = embroideryRequestDetailsSchema.parse(
    quoteRequest.details
  );
  const locationStitchCounts = [
    embroideryDetails.location1StitchCount,
    embroideryDetails.location2StitchCount,
    embroideryDetails.location3StitchCount,
  ];

  const locationStitchCountSum = locationStitchCounts.reduce(
    (accum, stitchCount, i) => {
      if (stitchCount === "0") return accum;
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

function calculateDtfExtraCharges(
  quoteRequest: QuoteRequest,
  quantity: number
) {
  const dtfDetails = dtfRequestDetailsSchema.parse(quoteRequest.details);
  const quantities = [12, 24, 48, 72];
  let quantityToUse = quantities[0];
  for (const q of quantities) {
    if (q > quantity) break;
    quantityToUse = q;
  }
  const sizeQuantityUpcharge = daDtfCharges.sizeQuantityUpcharges.find(
    (entry) =>
      entry.quantity === quantityToUse &&
      entry.sizeChoices === dtfDetails.sizeChoices
  );
  if (!sizeQuantityUpcharge) {
    console.error(
      `Couldn't find a DTF upcharge for quantity ${quantity} and size choices ${dtfDetails.sizeChoices}!`
    );
    return 0;
  }
  return sizeQuantityUpcharge.upcharge;
}

function calculateDyeSubExtraCharges(quoteRequest: QuoteRequest) {
  const dyeSubDetails = dyeSubRequestDetailsSchema.parse(quoteRequest.details);
  const locationCount = +dyeSubDetails.dyeSubLocationCount;
  return dyeSubChargePerLocation * locationCount;
}

function calculatePricingScheduleBasePrice(
  pricingSchedule: PricingScheduleEntry[],
  quantity: number
) {
  if (quantity === 0) return 0;
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
