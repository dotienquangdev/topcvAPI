const JobApplications = require("../models/job_applications.models");

const getJobApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await JobApplications.findById(id)
      .populate("user_id", "fullName email") // join user
      .populate("job_id", "title") // join job
      .populate("company_id", "name"); // join company

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy ứng tuyển!" });
    }
    res.status(200).json({ success: true, data: application });
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
const postJobApplication = async (req, res) => {
  try {
    const { user_id, job_id, resume_id, cover_letter, company_id } = req.body;

    const application = new JobApplications({
      user_id,
      job_id,
      resume_id,
      cover_letter,
      company_id,
    });

    await application.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Ứng tuyển thành công!",
        data: application,
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
    res
      .status(200)
      .json({
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
module.exports = {
  deleteJobApplication,
  patchJobApplication,
  postJobApplication,
  listJobApplication,
  getJobApplication,
};
