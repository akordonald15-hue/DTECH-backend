// server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import projectsRouter from "./routes/projects.js"; 
import contactsRouter from "./routes/contacts.js";
import authRouter from "./routes/auth.js"; // ✅ add this

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // allows frontend requests during dev
app.use(express.json());

// Routes
app.use("/api/contacts", contactsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/auth", authRouter); // ✅ auth routes (register/login)

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

// Fallback route
app.get("/", (req, res) => res.send("Portfolio backend is running"));

// Start server
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
