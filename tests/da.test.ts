import { calculateEstimate } from "../calculate";
import {
  TestRequest,
  request1,
  request2,
  request3,
  request4,
  request5,
} from "./testData";

describe("Test screen print calculations", () => {
  it("should correctly calculate a screen print DA Classic Zip Hoodie request", () => {
    checkTestRequest(request1);
  });
  it("should correctly calculate a screen print DA Raglan request", () => {
    checkTestRequest(request2);
  });
});

describe("Test embroidery calculations", () => {
  it("should correctly calculate an embroidery DA Heavyweight Zip Hoodie request", () => {
    checkTestRequest(request3);
  });
});

describe("Test DTF calculations", () => {
  it("should correctly calculate a DTF DA Raglan request", () => {
    checkTestRequest(request4);
  });
});

describe("Test dye sub calculations", () => {
  it("should correctly calculate a dye sub DA Classic Pullover Hoodie request", () => {
    checkTestRequest(request5);
  });
});

function checkTestRequest(testRequest: TestRequest) {
  const { expectedPricesPerProduct, request } = testRequest;

  const estimate = calculateEstimate(request);
  const smallPrice = estimate.get("Small") || 0;
  const medPrice = estimate.get("Medium") || 0;
  const lgPrice = estimate.get("Large") || 0;
  const xlPrice = estimate.get("XL") || 0;
  const twoXlPrice = estimate.get("2XL") || 0;
  const threeXlPrice = estimate.get("3XL") || 0;
  const fourXlPrice = estimate.get("4XL") || 0;

  expect(smallPrice).toBeCloseTo(expectedPricesPerProduct.small);
  expect(medPrice).toBeCloseTo(expectedPricesPerProduct.medium);
  expect(lgPrice).toBeCloseTo(expectedPricesPerProduct.large);
  expect(xlPrice).toBeCloseTo(expectedPricesPerProduct.xl);
  expect(twoXlPrice).toBeCloseTo(expectedPricesPerProduct["2xl"]);
  expect(threeXlPrice).toBeCloseTo(expectedPricesPerProduct["3xl"]);
  expect(fourXlPrice).toBeCloseTo(expectedPricesPerProduct["4xl"]);
}
