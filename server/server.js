import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import "./db/connection.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors({
  origin: "https://mernprojectday2.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());
app.use("/record", records);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});