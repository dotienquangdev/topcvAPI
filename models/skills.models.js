const mongoose = require("mongoose");
//Kỹ năng (dùng để gắn vào CV hoặc yêu cầu công việc)
const skillsSchema = new mongoose.Schema({
  name: String, // tên công việc
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

const Skills = mongoose.model("Skills", skillsSchema, "skills");
module.exports = Skills;
