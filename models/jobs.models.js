const mongoose = require("mongoose");
//Thông tin bài đăng tuyển dụng
const jobsSchema = new mongoose.Schema({
  company_id: String,
  title: String,
  description: String,
  requirements: String,
  salary_min: Number,
  salary_max: Number,
  job_type: String,
  location: String,
  experience_level: String,
  category_id: String,
  deadline: Date,
  created_at: Date,
  updated_at: Date,
  status: {
    type: String,
    default: "active",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const Jobs = mongoose.model("Jobs", jobsSchema, "jobs");
module.exports = Jobs;
