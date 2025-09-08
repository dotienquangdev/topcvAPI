const mongoosePaginate = require("mongoose-paginate-v2");
const mongoose = require("mongoose");
// import mongoose from 'mongoose';

const workExperienceSchema = new mongoose.Schema({
  //kinh nghiệm làm việc
  workExperienceName: Number, // 0 năm, 1 năm, 2 năm, 3 năm
  workExperienceSlug: String, //
  deleted: {
    type: Boolean,
    default: false,
  },
  update_at: {
    type: Date,
    default: Date.now,
  },
});
workExperienceSchema.plugin(mongoosePaginate);
const workExperience = mongoose.model(
  "WorkExperience",
  workExperienceSchema,
  "workExperience"
);
module.exports = workExperience;
