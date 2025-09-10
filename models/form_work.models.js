const mongoosePaginate = require("mongoose-paginate-v2");
const mongoose = require("mongoose");
// import mongoose from 'mongoose';

const formWorkSchema = new mongoose.Schema({
  // hình thức làm việc

  formWorkName: String, // tên hình thức làm việc : toàn thời gian, bán thời gian , thực tập sinh, Remote
  formWorkSlug: String, // Slug
  //Hình thức làm việc
  deleted: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "active",
  },
  update_at: {
    type: Date,
    default: Date.now,
  },
});
formWorkSchema.plugin(mongoosePaginate);
const Formwork = mongoose.model("Formwork", formWorkSchema, "formwork");
module.exports = Formwork;
