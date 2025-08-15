const Jobs = require("../models/jobs.models");
const mongoose = require("mongoose");
const getJobs = async (req, res) => {
  try {
    const {
      _page = 1,
      _limit = 9,
      _sort = "title",
      _order = "asc",
    } = req.query;
    let params = [];
    params.sortField = "title";
    params.sortType = "asc";

    const page = parseInt(_page);
    const limit = parseInt(_limit);
    const skip = (page - 1) * limit;
    const sortOrder = _order === "asc" ? 1 : -1;

    // Lấy danh sách jobs có phân trang, sắp xếp và populate
    const jobs = await Jobs.find({
      deleted: false,
      status: "active",
    })
      .sort({ [_sort]: sortOrder })
      .skip(skip)
      .limit(limit)
      .populate("company_id")
      .populate("category_id");

    // Lấy tổng số lượng job để tính tổng số trang
    const total = await Jobs.countDocuments({
      deleted: false,
      status: "active",
    });

    res.status(200).json({
      success: true,
      message: "Lấy danh sách công việc thành công!",
      docs: jobs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Lỗi getJobs:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi máy chủ!",
    });
  }
};

const listJobs = async (req, res) => {
  try {
    const jobsId = req.params.id; // ✅ lấy từ params, không phải body
    console.log("ID nhận được:", jobsId);

    if (!jobsId) {
      return res.status(400).json({
        success: false,
        message: "Thiếu ID jobs",
      });
    }

    const jobs = await Jobs.findById(jobsId)
      .populate("company_id")
      .populate("category_id");
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
      !salary_min ||
      !salary_max ||
      !job_type ||
      !experience_level
    ) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ thông tin!",
      });
    }
    if (salary_min < 0 || salary_max < 0) {
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

const normalizeSalaryFields = async (req, res) => {
  try {
    const jobs = await Jobs.find({
      salary_min: { $gt: 1000000 },
    });

    let count = 0;

    for (const job of jobs) {
      job.salary_min = Math.round(job.salary_min / 1_000_000);
      job.salary_max = Math.round(job.salary_max / 1_000_000);
      await job.save();
      count++;
    }

    return res.status(200).json({
      success: true,
      message: `✅ Đã cập nhật ${count} job thành công.`,
    });
  } catch (error) {
    console.error("❌ Lỗi cập nhật lương:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật salary_min/salary_max",
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

const editJobsApply = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ" });
    }
    const updateData = { ...req.body };
    // Nếu company_id là object => chỉ lấy _id
    if (updateData.company_id?._id) {
      updateData.company_id = updateData.company_id._id;
    }
    if (updateData.category_id?._id) {
      updateData.category_id = updateData.category_id._id;
    }
    const updatedJob = await Jobs.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
      { updated_at: new Date() }
    );
    if (!updatedJob) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy công việc để cập nhật" });
    }
    res.json({ updatedJob });
    // console.log("Dữ liệu nhận được:", updatedJob);
  } catch (error) {
    console.error("Lỗi cập nhật công việc:", error);
    return res.status(500).json({ message: "Lỗi server." });
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
  normalizeSalaryFields,
  editJobsApply,
};
