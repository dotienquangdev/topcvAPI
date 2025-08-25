const mongoose = require("mongoose");
//Thông tin ứng tuyển của ứng viên vào các việc làm
const jobApplicationsSchema = new mongoose.Schema({
  user_id: String, // Ai nộp
  job_id: String, // Công việc nào, công ty nào,
  resume_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resumes",
  }, // CV nào (có thể null nếu nộp trực tiếp)

  cv_file: String,
  cv_file_url: String,

  cover_letter: String, // Thư xin việc
  viewed_at: { type: Date }, // Khi nhà tuyển dụng mở CV
  statusApplication: {
    type: String,
    enum: ["pending", "viewed", "interview", "hired", "rejected"],
    default: "pending",
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

const JobApplications = mongoose.model(
  "JobApplications",
  jobApplicationsSchema,
  "job_applications"
);
module.exports = JobApplications;
