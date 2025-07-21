const Jobs = require("../models/jobs.models");

const getJobs = async (req, res) => {
  const jobs = await Jobs.find({
    deleted: false,
    status: "active",
  });
  res.json({
    jobs: jobs,
  });
};
const listJobs = async (req, res) => {
  try {
    const jobsId = req.body._id;
    console.log(jobsId);
    if (!jobsId) {
      return res.status(400).json({
        success: false,
        message: "Thiếu ID jobs",
      });
    }
    const jobs = await Jobs.findById(jobsId);
    if (!jobs) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy jobs!",
      });
    }
    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin Jobs", error);
    res.status(500).json({ success: false, message: "Lỗi server!" });
  }
};
const postJobsApply = async (req, res) => {
  try {
    const {
      title,
      requirements,
      salary_min,
      salary_max,
      job_type,
      experience_level,
      location,
      company_id,
      category_id,
      deadline,
    } = req.body;
    if (
      !title ||
      !requirements ||
      salary_min == null ||
      salary_max == null ||
      !job_type ||
      !experience_level
    ) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ thông tin!",
      });
    }
    if (salary_min < 0 || salary_max <= 0) {
      return res.status(400).json({
        success: false,
        message: "Tiền lương phải lớn hơn 0!",
      });
    }
    if (salary_min > salary_max) {
      return res.status(400).json({
        success: false,
        message: "Tiền lương max phải lớn hơn min!",
      });
    }
    const existingJob = await Jobs.findOne({
      title,
      requirements,
      salary_min,
      salary_max,
      job_type,
      experience_level,
    });
    if (existingJob) {
      return res.status(409).json({
        success: false,
        message: "Công việc này đã tồn tại!",
      });
    }
    const newJob = new Jobs({
      title,
      requirements,
      salary_min: parseInt(salary_min),
      salary_max: parseInt(salary_max),
      job_type,
      experience_level,
      location,
      company_id,
      category_id,
      deadline,
      created_at: new Date(),
      updated_at: new Date(),
    });
    await newJob.save();
    return res.status(201).json({
      success: true,
      message: "Tạo công việc mới thành công!",
      jobs: {
        _id: newJob._id,
        title: newJob.title,
        requirements: newJob.requirements,
        salary_min: newJob.salary_min,
        salary_max: newJob.salary_max,
        job_type: newJob.job_type,
        experience_level: newJob.experience_level,
        location: newJob.location,
      },
    });
  } catch (error) {
    console.error("Lỗi postJobsApply:", error);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi phía server.",
    });
  }
};
const deleteJobs = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("req params : ", id);
    if (!id) {
      req.flash("error", "Không có id");
    }
    const deletedJobs = await Jobs.updateOne(
      { _id: id },
      {
        deleted: true,
        updated_at: new Date(),
      }
    );
    if (deletedJobs.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy người dùng để xóa ! " });
    }
    return res.status(404).json({ message: "Xóa Jobs thành công !" });
  } catch (error) {
    console.error("Lỗi khi xóa Jobs", error);
  }
};
const saveJob = async (req, res) => {};
const savedJobs = async (req, res) => {};
const suggestionsJobs = async (req, res) => {};
module.exports = {
  getJobs,
  listJobs,
  postJobsApply,
  saveJob,
  savedJobs,
  suggestionsJobs,
  deleteJobs,
};
