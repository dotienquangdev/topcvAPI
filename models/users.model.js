const mongoose = require("mongoose");
//Thông tin người dùng (ứng viên, nhà tuyển dụng)
const usersSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  tokenUser: String,
  password: String,
  phone: String,
  level: Number,
  avatar_url: String,
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
const Users = mongoose.model("Users", usersSchema, "users");
module.exports = Users;
