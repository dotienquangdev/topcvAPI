const mongoose = require("mongoose");

// Kỹ năng
const skillsSchema = new mongoose.Schema({
  name: String, // tên kỹ năng
  slug: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobCategories", // Liên kết tới ngành nghề
    required: true,
  },
  status: {
    type: String,
    default: "active",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Skills = mongoose.model("Skills", skillsSchema, "skills");
module.exports = Skills;
