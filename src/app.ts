import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Start server ONLY after DB is connected
const startServer = async () => {
  await connectDB();

  app.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
  });
};

startServer();