const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
// Thông tin bài đăng tuyển dụng
const jobsSchema = new mongoose.Schema({
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Companies",
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobCategories",
    required: true,
  },
  formWork_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Formwork", // phải trùng tên model
  },
  workExperience_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WorkExperience",
  },
  experience_level_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExperienceLevel",
  },
  // cấp bậc (Nhân viên, Trưởng phòng, Giám đốc)
  title: { type: String, required: true }, // tiêu đề công việc
  description: { type: String, required: true }, // mô tả công việc
  requirements: String, // yêu cầu công việc
  benefits: String, // lợi ích công việc
  salary_min: Number, // lương tối thiểu
  salary_max: Number, // lương tối đa
  location: String, // địa điểm làm việc
  deadline: Date, // hạn nộp hồ sơ
  job_benefits: String, // phúc lợi bổ sung
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  outstanding: {
    type: String,
    default: "normal",
  },
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
