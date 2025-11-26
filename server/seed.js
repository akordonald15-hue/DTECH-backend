// server/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "./models/Project.js";

dotenv.config();

const sampleProjects = [
  {
    title: "Portfolio Website",
    desc: "My personal portfolio built with React + Tailwind, showcasing projects and skills.",
    img: "/images/portfolio.jpg",
    github: "https://github.com/yourusername/portfolio",
    demo: "#"
  },
  {
    title: "Oil Company Calculator",
    desc: "Engineering tool for production calculations, built with C# and Node backend.",
    img: "/images/oil-app.jpg",
    github: "https://github.com/yourusername/oil-calculator",
    demo: "#"
  },
  {
    title: "Restaurant Web App",
    desc: "A modern restaurant ordering system with responsive UI and smooth UX.",
    img: "/images/restaurant.jpg",
    github: "https://github.com/yourusername/restaurant-app",
    demo: "#"
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // Clear old data
    await Project.deleteMany();
    console.log("🗑️ Old projects removed");

    // Insert sample data
    await Project.insertMany(sampleProjects);
    console.log("🌱 Sample projects added");

    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seed();
