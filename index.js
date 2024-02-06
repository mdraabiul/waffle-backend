import express from "express";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import db from "./db.js";

import router from "./appRoute.js";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(morgan("tiny"));

// routes
app.use("/", router);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
