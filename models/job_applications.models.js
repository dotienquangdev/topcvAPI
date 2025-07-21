const mongoose = require("mongoose");
//Thông tin ứng tuyển của ứng viên vào các việc làm
const jobApplicationsSchema = new mongoose.Schema({
  user_id: String,
  job_id: String,
  resume_id: String,
  cover_letter: String,
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

const JobApplications = mongoose.model(
  "JobApplications",
  jobApplicationsSchema,
  "job_applications"
);
module.exports = JobApplications;
