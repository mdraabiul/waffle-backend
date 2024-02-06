import express from "express";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import db from "./db.js";

import router from "./appRoute.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173/", // Adjust the origin as needed
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(morgan("tiny"));

// routes
app.use("/", router);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
