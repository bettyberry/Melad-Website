import mongoose from "mongoose";

const ManuscriptSchema = new mongoose.Schema({
  title: String,
  category: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Manuscript || mongoose.model("Manuscript", ManuscriptSchema);
