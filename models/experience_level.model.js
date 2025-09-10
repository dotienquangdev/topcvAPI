const mongoosePaginate = require("mongoose-paginate-v2");
const mongoose = require("mongoose");

const experienceLevelSchema = new mongoose.Schema({
  // cấp bậc (Nhân viên, Trưởng phòng, Giám đốc)
  experienceName: {
    type: String,
    required: true,
  },
  experienceLabel: {
    type: String,
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

experienceLevelSchema.plugin(mongoosePaginate);
const ExperienceLevel = mongoose.model(
  "ExperienceLevel",
  experienceLevelSchema,
  "experienceLevel"
);
module.exports = ExperienceLevel;
