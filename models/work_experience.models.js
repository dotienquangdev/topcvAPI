const mongoosePaginate = require("mongoose-paginate-v2");
const mongoose = require("mongoose");

const workExperienceSchema = new mongoose.Schema({
  // số năm kinh nghiệm
  years: {
    type: Number, // 0, 1, 2, 3...
    required: true,
  },
  label: {
    type: String, // "Không có kinh nghiệm", "1 năm", "2 năm", "3 năm"
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "active",
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

workExperienceSchema.plugin(mongoosePaginate);
const WorkExperience = mongoose.model(
  "WorkExperience",
  workExperienceSchema,
  "workExperience"
);
module.exports = WorkExperience;
