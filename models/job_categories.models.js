const mongoose = require("mongoose");
//Danh mục ngành nghề
const jobCategoriesSchema = new mongoose.Schema({
  name: String, // tên ngàng nghề
  slug: String, // Slug
  status: {
    // Trạng thái
    type: String,
    default: "active",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  created_at: Date, // ngày tạo
  updated_at: Date, //ngày cập nhật
});
const JobCategories = mongoose.model(
  "JobCategories",
  jobCategoriesSchema,
  "job_categories"
);

module.exports = JobCategories;
