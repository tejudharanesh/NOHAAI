import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";

import connectMongoBD from "./db/connectDB.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); //to get body data
app.use(express.urlencoded({ extended: true })); //to parse form data
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // If you need cookies or authentication headers
  })
);
app.use("/api/auth", authRoutes); //to use auth routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectMongoBD();
});
