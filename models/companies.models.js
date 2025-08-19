const mongoosePaginate = require("mongoose-paginate-v2");
const mongoose = require("mongoose");
// import mongoose from 'mongoose';

const companiesSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  logo_url: {
    type: String,
    default: "", // hoặc null nếu bạn muốn cho phép không có logo
  },

  description: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  size: {
    type: String, // hoặc bạn có thể dùng enum nếu muốn giới hạn số lựa chọn
    default: "",
  },
  founded_year: {
    type: String, // hoặc Number nếu bạn muốn xử lý là số
    default: "",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  update_at: {
    type: Date,
    default: Date.now,
  },
});
companiesSchema.plugin(mongoosePaginate);
const Companies = mongoose.model("Companies", companiesSchema, "companies");
module.exports = Companies;
