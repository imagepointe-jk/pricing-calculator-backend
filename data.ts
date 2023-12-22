import {
  DADTFCharges,
  DAEmbroideryCharges,
  DAScreenPrintCharges,
} from "./types";

export const daScreenPrintCharges: DAScreenPrintCharges = {
  singleColorSetupCharge: 40,
  eachAdditionalColorSetupCharge: 25,
  locationUpcharges: [
    {
      locationNumber: 1,
      colorCount: 1,
      upcharge: 0.85,
    },
    {
      locationNumber: 2,
      colorCount: 1,
      upcharge: 1,
    },
    {
      locationNumber: 3,
      colorCount: 1,
      upcharge: 2,
    },
    {
      locationNumber: 4,
      colorCount: 1,
      upcharge: 3,
    },
    {
      locationNumber: 1,
      colorCount: 2,
      upcharge: 1.05,
    },
    {
      locationNumber: 2,
      colorCount: 2,
      upcharge: 1.25,
    },
    {
      locationNumber: 3,
      colorCount: 2,
      upcharge: 2.25,
    },
    {
      locationNumber: 4,
      colorCount: 2,
      upcharge: 3.25,
    },
    {
      locationNumber: 1,
      colorCount: 3,
      upcharge: 1.5,
    },
    {
      locationNumber: 2,
      colorCount: 3,
      upcharge: 1.75,
    },
    {
      locationNumber: 3,
      colorCount: 3,
      upcharge: 2.75,
    },
    {
      locationNumber: 4,
      colorCount: 3,
      upcharge: 3.75,
    },
  ],
};

export const daEmbroideryCharges: DAEmbroideryCharges = {
  additional5kStitchCharge: 1.5,
};

export const daDtfCharges: DADTFCharges = {
  sizeQuantityUpcharges: [
    {
      quantity: 12,
      sizeChoices: "small",
      upcharge: 7.5,
    },
    {
      quantity: 24,
      sizeChoices: "small",
      upcharge: 7.5,
    },
    {
      quantity: 48,
      sizeChoices: "small",
      upcharge: 5,
    },
    {
      quantity: 72,
      sizeChoices: "small",
      upcharge: 5,
    },
    {
      quantity: 12,
      sizeChoices: "large",
      upcharge: 12.5,
    },
    {
      quantity: 24,
      sizeChoices: "large",
      upcharge: 12.5,
    },
    {
      quantity: 48,
      sizeChoices: "large",
      upcharge: 10,
    },
    {
      quantity: 72,
      sizeChoices: "large",
      upcharge: 10,
    },
    {
      quantity: 12,
      sizeChoices: "small and large",
      upcharge: 17.5,
    },
    {
      quantity: 24,
      sizeChoices: "small and large",
      upcharge: 17.5,
    },
    {
      quantity: 48,
      sizeChoices: "small and large",
      upcharge: 12.5,
    },
    {
      quantity: 72,
      sizeChoices: "small and large",
      upcharge: 12.5,
    },
  ],
};

export const dyeSubChargePerLocation = 5;
