const mongoose = require("mongoose");
const JobApplications = require("../models/job_applications.models");
const BASE_URL = process.env.BASE_URL || "http://localhost:9000";

const getJobApplication = async (req, res) => {
  try {
    const applications = await JobApplications.find({
      deleted: false,
      status: "active",
    })
      .populate("user_id")
      .populate("job_id");

    if (!applications || applications.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy ứng tuyển!" });
    }

    // Thêm cv_file_url cho mỗi application
    const responseData = applications.map((app) => ({
      ...app.toObject(),
      cv_file_url: app.cv_file ? `${BASE_URL}${app.cv_file}` : null,
    }));

    res.status(200).json({
      success: true,
      data: responseData,
      message: "Lấy danh sách công việc thành công!",
    });
  } catch (error) {
    console.error("Lỗi getJobApplication:", error);
    res.status(500).json({ success: false, message: "Lỗi server!" });
  }
};

const listJobApplication = async (req, res) => {
  try {
    const applications = await JobApplications.find()
      .populate("user_id", "fullName email")
      .populate("job_id", "title")
      .populate("company_id", "name");

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    console.error("Lỗi listJobApplication:", error);
    res.status(500).json({ success: false, message: "Lỗi server!" });
  }
};

// const postJobApplication = async (req, res) => {
//   try {
//     const { user_id, job_id, cover_letter } = req.body;

//     console.log("Body:", req.body);
//     console.log("File:", req.file);
//     let cvFilePath = null;
//     if (req.file) {
//       cvFilePath = "/uploads/cv/" + req.file.filename;
//     }
//     const newApplication = new JobApplications({
//       user_id,
//       job_id,
//       cover_letter,
//       cv_file: cvFilePath,
//       viewed_at: new Date(),
//       statusApplication: "pending",
//       status: "active",
//       deleted: false,
//       created_at: new Date(),
//       updated_at: new Date(),
//     });
//     const responseData = {
//       ...newApplication.toObject(), // ✅ dùng đúng biến
//       cv_file_url: newApplication.cv_file
//         ? `${BASE_URL}${newApplication.cv_file}`
//         : null,
//     };

//     await newApplication.save();
//     res.status(201).json({
//       success: true,
//       message: "Ứng tuyển thành công!",
//       jobApplication: {
//         user_id: newApplication.user_id,
//         job_id: newApplication.job_id,
//         cover_letter: newApplication.cover_letter,
//         cv_file: newApplication.cv_file,
//         statusApplication: newApplication.statusApplication,
//         responseData: newApplication.responseData,
//       },
//       jobApplication: responseData,
//     });
//   } catch (error) {
//     console.error("Lỗi postJobApplication:", error);
//     res.status(500).json({ success: false, message: "Lỗi server!" });
//   }
// };

const postJobApplication = async (req, res) => {
  try {
    const { user_id, job_id, cover_letter } = req.body;
    console.log("Body:", req.body);
    console.log("File:", req.file);
    let cvFilePath = null;
    let cvFileUrl = null;
    if (req.file) {
      cvFilePath = "/uploads/cv/" + req.file.filename;
      cvFileUrl = `${BASE_URL}${cvFilePath}`; // Tạo URL đầy đủ
    }

    const newApplication = new JobApplications({
      user_id,
      job_id,
      cover_letter,
      cv_file: cvFilePath,
      cv_file_url: cvFileUrl, // Lưu luôn vào DB
      viewed_at: new Date(),
      statusApplication: "pending",
      status: "active",
      deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await newApplication.save();

    res.status(201).json({
      success: true,
      message: "Ứng tuyển thành công!",
      jobApplication: newApplication,
    });
  } catch (error) {
    console.error("Lỗi postJobApplication:", error);
    res.status(500).json({ success: false, message: "Lỗi server!" });
  }
};

const patchJobApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    updateData.updated_at = Date.now();

    const application = await JobApplications.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy ứng tuyển!" });
    }
    res.status(200).json({
      success: true,
      message: "Cập nhật thành công!",
      data: application,
    });
  } catch (error) {
    console.error("Lỗi patchJobApplication:", error);
    res.status(500).json({ success: false, message: "Lỗi server!" });
  }
};
const deleteJobApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await JobApplications.findByIdAndUpdate(
      id,
      { deleted: true, updated_at: Date.now() },
      { new: true }
    );

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy ứng tuyển!" });
    }
    res
      .status(200)
      .json({ success: true, message: "Xoá thành công!", data: application });
  } catch (error) {
    console.error("Lỗi deleteJobApplication:", error);
    res.status(500).json({ success: false, message: "Lỗi server!" });
  }
};
// controllers/controller.JobApplications.js

const uploadfile = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("File:", req.file);
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Chưa chọn file để upload!",
      });
    }
    const filePath = "/uploads/profile/" + req.file.filename;
    res.status(200).json({
      success: true,
      message: "Upload thành công!",
      filePath,
    });
  } catch (error) {
    console.error("Lỗi uploadfile:", error);
    res.status(500).json({ success: false, message: "Lỗi server!" });
  }
};
module.exports = {
  deleteJobApplication,
  patchJobApplication,
  postJobApplication,
  listJobApplication,
  getJobApplication,
  uploadfile,
};
