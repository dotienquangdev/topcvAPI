const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
//Thông tin bài đăng tuyển dụng
const jobsSchema = new mongoose.Schema({
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Companies",
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobCategories",
  },
  title: String, // tiêu đề công việc
  description: String, // mô tả công viêc
  requirements: String, //yêu cầu công việc
  benefits: String, // lợi ích công việc
  salary_min: Number, // lương tối thiểu
  salary_max: Number, // lương tối đa
  job_type: String, // hình thức làm việc full-time, part-time, Remote
  location: String, //vị trí địa chỉ
  experience_level: String, //cấp độ kinh nghiệm, nhân viên, trưởng phòng ,dám đốc
  deadline: Date, // hạn ngày hết hạn
  created_at: Date, // ngày tạo công việc
  updated_at: Date, // ngày cập nhật công việc
  work_experience: Number,
  outstanding: {
    // nổi bật, mặc định không chọn sẽ là job bình thường
    type: String,
    default: "normal",
  },
  // Công nghệ thông tin, Bất động sản, Kinh tế, Luật
  status: {
    // trạng thái
    type: String,
    default: "active",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});
jobsSchema.plugin(mongoosePaginate);
const Jobs = mongoose.model("Jobs", jobsSchema, "jobs");
module.exports = Jobs;
