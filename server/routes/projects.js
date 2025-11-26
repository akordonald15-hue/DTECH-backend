// server/routes/projects.js
import express from "express";
import Project from "../models/Project.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/projects -> list all
router.get("/", async (req, res) => {
  try {
    const items = await Project.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/projects/:id
router.get("/:id", async (req, res) => {
  try {
    const p = await Project.findById(req.params.id);
    if (!p) return res.status(404).json({ error: "Not found" });
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// CREATE (protected)
router.post("/", auth, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE (protected)
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE (protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
