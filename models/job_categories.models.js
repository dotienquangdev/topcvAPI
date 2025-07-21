const mongoose = require("mongoose");
//Danh mục ngành nghề
const jobCategoriesSchema = new mongoose.Schema({
  name: String,
  slug: String,
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
const JobCategories = mongoose.model(
  "JobCategories",
  jobCategoriesSchema,
  "job_categories"
);

module.exports = JobCategories;
