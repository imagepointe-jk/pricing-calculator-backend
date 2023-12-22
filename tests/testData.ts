import { ProductSpecificData, QuoteRequest } from "../types";

export type TestRequest = {
  request: QuoteRequest;
  expectedPricesPerProduct: {
    small: number;
    medium: number;
    large: number;
    xl: number;
    ["2xl"]: number;
    ["3xl"]: number;
    ["4xl"]: number;
  };
};

const daClassicZipHoodie: ProductSpecificData = {
  pricingSchedule: [
    {
      quantity: 12,
      pricePerProduct: 89.99,
    },
    {
      quantity: 24,
      pricePerProduct: 71.99,
    },
    {
      quantity: 48,
      pricePerProduct: 63.99,
    },
    {
      quantity: 72,
      pricePerProduct: 61.99,
    },
    {
      quantity: 144,
      pricePerProduct: 59.99,
    },
    {
      quantity: 288,
      pricePerProduct: 56.49,
    },
    {
      quantity: 500,
      pricePerProduct: 54.99,
    },
  ],
  sizeUpcharges: [
    {
      size: "2XL",
      upcharge: 5,
    },
    {
      size: "3XL",
      upcharge: 7,
    },
    {
      size: "4XL",
      upcharge: 9,
    },
  ],
};

const daRaglan: ProductSpecificData = {
  pricingSchedule: [
    {
      quantity: 12,
      pricePerProduct: 72.99,
    },
    {
      quantity: 24,
      pricePerProduct: 58.49,
    },
    {
      quantity: 48,
      pricePerProduct: 51.99,
    },
    {
      quantity: 72,
      pricePerProduct: 49.99,
    },
    {
      quantity: 144,
      pricePerProduct: 47.49,
    },
    {
      quantity: 288,
      pricePerProduct: 44.99,
    },
    {
      quantity: 500,
      pricePerProduct: 42.49,
    },
  ],
  sizeUpcharges: [
    {
      size: "2XL",
      upcharge: 5,
    },
    {
      size: "3XL",
      upcharge: 7,
    },
    {
      size: "4XL",
      upcharge: 9,
    },
  ],
};

export const request1: TestRequest = {
  request: {
    productSpecificData: daClassicZipHoodie,
    details: {
      location1ColorCount: 2,
      location2ColorCount: 1,
      location3ColorCount: 0,
      location4ColorCount: 0,
    },
    quantitiesBySize: [
      {
        quantity: 25,
        size: "Small",
      },
    ],
  },
  expectedPricesPerProduct: {
    small: 73.84,
    medium: 0,
    large: 0,
    xl: 0,
    "2xl": 0,
    "3xl": 0,
    "4xl": 0,
  },
};

export const request2: TestRequest = {
  request: {
    productSpecificData: daRaglan,
    details: {
      location1ColorCount: 1,
      location2ColorCount: 3,
      location3ColorCount: 2,
      location4ColorCount: 0,
    },
    quantitiesBySize: [
      {
        quantity: 322,
        size: "Medium",
      },
      {
        quantity: 67,
        size: "3XL",
      },
    ],
  },
  expectedPricesPerProduct: {
    small: 0,
    medium: 48.99,
    large: 0,
    xl: 0,
    "2xl": 0,
    "3xl": 62.99,
    "4xl": 0,
  },
};
