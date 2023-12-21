import express, { json } from "express";

const app = express();
const isDevMode = app.get("env") === "development";

const allowedOrigins = [""];
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

app.get("/", (req, res) => {
  res.status(200).send({ message: "Llamas" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
