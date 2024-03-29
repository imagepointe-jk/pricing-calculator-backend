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
  imageUrl: "",
  productName: "",
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

const daClassicPulloverHoodie: ProductSpecificData = {
  imageUrl: "",
  productName: "",
  pricingSchedule: [
    {
      quantity: 12,
      pricePerProduct: 82.99,
    },
    {
      quantity: 24,
      pricePerProduct: 65.59,
    },
    {
      quantity: 48,
      pricePerProduct: 57.99,
    },
    {
      quantity: 72,
      pricePerProduct: 55.49,
    },
    {
      quantity: 144,
      pricePerProduct: 54.49,
    },
    {
      quantity: 288,
      pricePerProduct: 52.99,
    },
    {
      quantity: 500,
      pricePerProduct: 49.99,
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
  imageUrl: "",
  productName: "",
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

const daHeavyweightZip: ProductSpecificData = {
  imageUrl: "",
  productName: "",
  pricingSchedule: [
    {
      quantity: 12,
      pricePerProduct: 112.99,
    },
    {
      quantity: 24,
      pricePerProduct: 94.99,
    },
    {
      quantity: 48,
      pricePerProduct: 89.98,
    },
    {
      quantity: 72,
      pricePerProduct: 84.99,
    },
    {
      quantity: 144,
      pricePerProduct: 83.49,
    },
    {
      quantity: 288,
      pricePerProduct: 81.99,
    },
    {
      quantity: 500,
      pricePerProduct: 79.99,
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

export const request3: TestRequest = {
  request: {
    details: {
      location1StitchCount: "10",
      location2StitchCount: "5",
      location3StitchCount: "10",
    },
    productSpecificData: daHeavyweightZip,
    quantitiesBySize: [
      {
        quantity: 72,
        size: "2XL",
      },
    ],
  },
  expectedPricesPerProduct: {
    small: 0,
    medium: 0,
    large: 0,
    xl: 0,
    "2xl": 102.99,
    "3xl": 0,
    "4xl": 0,
  },
};

export const request4: TestRequest = {
  request: {
    details: {
      dtfSizeChoices: "small and large",
    },
    productSpecificData: daRaglan,
    quantitiesBySize: [
      {
        quantity: 51,
        size: "3XL",
      },
    ],
  },
  expectedPricesPerProduct: {
    small: 0,
    medium: 0,
    large: 0,
    xl: 0,
    "2xl": 0,
    "3xl": 71.49,
    "4xl": 0,
  },
};

export const request5: TestRequest = {
  request: {
    details: {
      dyeSubLocationCount: "2",
    },
    productSpecificData: daClassicPulloverHoodie,
    quantitiesBySize: [
      {
        quantity: 293,
        size: "XL",
      },
    ],
  },
  expectedPricesPerProduct: {
    small: 0,
    medium: 0,
    large: 0,
    xl: 62.99,
    "2xl": 0,
    "3xl": 0,
    "4xl": 0,
  },
};

export const request6: TestRequest = {
  request: {
    details: {
      location1StitchCount: "10",
      location2StitchCount: "10",
      location3StitchCount: "10",
    },
    productSpecificData: daRaglan,
    quantitiesBySize: [
      {
        quantity: 133,
        size: "2XL",
      },
      {
        quantity: 1187,
        size: "3XL",
      },
      {
        quantity: 56,
        size: "4XL",
      },
    ],
  },
  expectedPricesPerProduct: {
    small: 0,
    medium: 0,
    large: 0,
    xl: 0,
    "2xl": 69.49,
    "3xl": 63.99,
    "4xl": 75.49,
  },
};

export const request7: TestRequest = {
  request: {
    details: {
      location1StitchCount: "10",
      location2StitchCount: "5",
      location3StitchCount: "0",
    },
    productSpecificData: daClassicZipHoodie,
    quantitiesBySize: [
      {
        quantity: 6,
        size: "Small",
      },
      {
        quantity: 11,
        size: "XL",
      },
    ],
  },
  expectedPricesPerProduct: {
    small: 96.49,
    medium: 0,
    large: 0,
    xl: 96.49,
    "2xl": 0,
    "3xl": 0,
    "4xl": 0,
  },
};

export const request8: TestRequest = {
  request: {
    details: {
      dtfSizeChoices: "large",
    },
    productSpecificData: daHeavyweightZip,
    quantitiesBySize: [
      {
        quantity: 811,
        size: "Medium",
      },
      {
        quantity: 35,
        size: "2XL",
      },
    ],
  },
  expectedPricesPerProduct: {
    small: 0,
    medium: 89.99,
    large: 0,
    xl: 0,
    "2xl": 112.49,
    "3xl": 0,
    "4xl": 0,
  },
};

export const request9: TestRequest = {
  request: {
    details: {
      dtfSizeChoices: "small and large",
    },
    productSpecificData: daClassicPulloverHoodie,
    quantitiesBySize: [
      {
        quantity: 47,
        size: "4XL",
      },
    ],
  },
  expectedPricesPerProduct: {
    small: 0,
    medium: 0,
    large: 0,
    xl: 0,
    "2xl": 0,
    "3xl": 0,
    "4xl": 92.09,
  },
};

export const request10: TestRequest = {
  request: {
    details: {
      dtfSizeChoices: "small",
    },
    productSpecificData: daClassicZipHoodie,
    quantitiesBySize: [
      {
        quantity: 8,
        size: "Large",
      },
    ],
  },
  expectedPricesPerProduct: {
    small: 0,
    medium: 0,
    large: 97.49,
    xl: 0,
    "2xl": 0,
    "3xl": 0,
    "4xl": 0,
  },
};
