const mongoose = require("mongoose");
const { create } = require("./users.model");
//CV/hồ sơ của ứng viên
const resumesSchema = new mongoose.Schema({
  user_id: String,
  file_url: String, // Link tải file
  title: String,
  is_default: Boolean,
  status: {
    type: String,
    default: "active",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  created_at: Date,
  updated_at: Date,
});

const Resumes = mongoose.model("Resumes", resumesSchema, "resumes");
module.exports = Resumes;
