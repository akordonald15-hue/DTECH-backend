// server/models/Project.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: { type: [String], default: [] },
    githubLink: { type: String },
    liveDemo: { type: String },
    image: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
