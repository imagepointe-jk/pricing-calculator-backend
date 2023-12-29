import { quoteRequestSchema } from "./types";

export function parseQuoteRequest(json: any) {
  return quoteRequestSchema.parse(json);
}
