const mongoose = require("mongoose");
//Lượt xem bài đăng
const jobViewsSchema = new mongoose.Schema({
  job_id: String,
  ip_address: String,
  viewed_at: Date,
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

const Jobviews = mongoose.model("Jobviews", jobViewsSchema, "job_views");
module.exports = Jobviews;
