import { z } from "zod";

const garmentSizes = [
  "Small",
  "Medium",
  "Large",
  "XL",
  "2XL",
  "3XL",
  "4XL",
] as const;
const garmentSizeSchema = z.enum(garmentSizes);

const designTypes = [
  "Screen Print",
  "DTF",
  "Dye Sublimation",
  "Embroidery",
] as const;
const designTypeSchema = z.enum(designTypes);

const locationUpchargeSchema = z.object({
  locationNumber: z.number(),
  colorCount: z.number(),
  upcharge: z.number(),
});

const sizeUpchargeSchema = z.object({
  size: garmentSizeSchema,
  upcharge: z.number(),
});

const daScreenPrintChargesSchema = z.object({
  singleColorSetupCharge: z.number(),
  eachAdditionalColorSetupCharge: z.number(),
  locationUpcharges: z.array(locationUpchargeSchema),
});

const screenPrintRequestDetailsSchema = z.object({
  location1ColorCount: z.number(),
  location2ColorCount: z.number(),
  location3ColorCount: z.number(),
  location4ColorCount: z.number(),
});

const pricingScheduleEntrySchema = z.object({
  quantity: z.number(),
  pricePerProduct: z.number(),
});

const productSpecificDataSchema = z.object({
  pricingSchedule: z.array(pricingScheduleEntrySchema),
  sizeUpcharges: z.array(sizeUpchargeSchema),
});

const quoteRequestSchema = z.object({
  quantitiesBySize: z.array(
    z.object({
      quantity: z.number(),
      size: garmentSizeSchema,
    })
  ),
  productSpecificData: productSpecificDataSchema,
  details: screenPrintRequestDetailsSchema,
});

export type LocationUpcharge = z.infer<typeof locationUpchargeSchema>;
export type SizeUpcharge = z.infer<typeof sizeUpchargeSchema>;
export type DAScreenPrintCharges = z.infer<typeof daScreenPrintChargesSchema>;
export type DesignType = z.infer<typeof designTypeSchema>;
export type GarmentSize = z.infer<typeof garmentSizeSchema>;
export type ScreenPrintRequestDetails = z.infer<
  typeof screenPrintRequestDetailsSchema
>;
export type PricingScheduleEntry = z.infer<typeof pricingScheduleEntrySchema>;
export type ProductSpecificData = z.infer<typeof productSpecificDataSchema>;
export type QuoteRequest = z.infer<typeof quoteRequestSchema>;
