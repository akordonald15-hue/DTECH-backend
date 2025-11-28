// server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import projectsRouter from "./routes/projects.js"; 
import contactsRouter from "./routes/contacts.js";
import authRouter from "./routes/auth.js";

dotenv.config();
const app = express();

// ====== FIXED CORS (MUST COME BEFORE ROUTES) ======
app.use(
  cors({
    origin: "https://dtech-green.vercel.app",   // lowercase domain
    methods: ["GET", "POST"],
    credentials: false,
  })
);

// Middleware
app.use(express.json());

// ====== ROUTES ======
app.use("/api/contacts", contactsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/auth", authRouter);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected 🚀"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// API test route
app.get("/api/hello", (req, res) => res.json({ message: "Hello from backend 🚀" }));

app.get("/", (req, res) => res.send("Portfolio backend is running"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
