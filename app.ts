import express, { json } from "express";
import { parseQuoteRequest } from "./validations";
import { BAD_REQUEST, OK } from "./statusCodes";
import { calculateEstimate } from "./calculate";

const app = express();
const isDevMode = app.get("env") === "development";

const allowedOrigins = [
  "https://react-frontend-production-1eb8.up.railway.app",
];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && (isDevMode || allowedOrigins.includes(origin))) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(json());
if (isDevMode) {
  console.log("=====DEV ENVIRONMENT======");
}

app.post("/quote-request", (req, res) => {
  try {
    const quoteRequest = parseQuoteRequest(req.body);
    const estimate = calculateEstimate(quoteRequest);
    return res.status(OK).send(Object.fromEntries(estimate));
  } catch (error) {
    return res.status(BAD_REQUEST).send(error);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
