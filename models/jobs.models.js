const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
//Thông tin bài đăng tuyển dụng
const jobsSchema = new mongoose.Schema({
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Companies",
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobCategories",
  },

  title: String,
  description: String,
  requirements: String,
  salary_min: Number,
  salary_max: Number,
  job_type: String,
  location: String,
  experience_level: String,
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
jobsSchema.plugin(mongoosePaginate);
const Jobs = mongoose.model("Jobs", jobsSchema, "jobs");
module.exports = Jobs;
