const ExperienceLevel = require("../models/experience_level.model");

// Lấy danh sách cấp bậc
const getExperienceLevels = async (req, res) => {
  try {
    const experienceLevel = await ExperienceLevel.find({
      deleted: false,
      status: "active",
    });
    res.status(200).json({
      success: true,
      message: "Lấy danh sách cấp bậc thành công",
      experienceLevel,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server", error });
  }
};

// Tạo cấp bậc mới
const postExperienceLevel = async (req, res) => {
  try {
    const experienceLevel = new ExperienceLevel({
      ...req.body,
      created_at: new Date(),
    });
    await experienceLevel.save();
    res.status(201).json({
      success: true,
      message: "Thêm cấp bậc thành công",
      data: experienceLevel,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Không thể thêm cấp bậc", error });
  }
};

// Cập nhật cấp bậc
const putExperienceLevel = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await ExperienceLevel.findByIdAndUpdate(
      id,
      { ...req.body, updated_at: new Date() },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy cấp bậc để cập nhật",
      });
    }
    res.status(200).json({
      success: true,
      message: "Cập nhật cấp bậc thành công",
      data: updated,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Lỗi khi cập nhật cấp bậc", error });
  }
};

// Xóa cấp bậc (xóa mềm)
const deleteExperienceLevel = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ExperienceLevel.findByIdAndUpdate(
      id,
      { deleted: true, updated_at: new Date() },
      { new: true }
    );
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy cấp bậc để xóa" });
    }
    res.status(200).json({
      success: true,
      message: "Xóa cấp bậc thành công",
      data: deleted,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Lỗi khi xóa cấp bậc", error });
  }
};

module.exports = {
  getExperienceLevels,
  postExperienceLevel,
  putExperienceLevel,
  deleteExperienceLevel,
};
