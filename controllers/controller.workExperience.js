const WorkExperience = require("../models/work_experience.models");

// Lấy danh sách kinh nghiệm
const getWorkExperience = async (req, res) => {
  try {
    const workExperience = await WorkExperience.find({
      deleted: false,
      status: "active",
    }).sort({ years: 1 });
    res.json({
      message: "Lấy danh sách kinh nghiệm thành công!",
      workExperience,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error });
  }
};

// Tạo mới kinh nghiệm
const postWorkExperience = async (req, res) => {
  try {
    const workExperience = new WorkExperience({
      ...req.body,
      created_at: new Date(),
    });
    await workExperience.save();
    res.status(200).json({
      success: true,
      message: `Tạo mới kinh nghiệm thành công: ${workExperience.label}`,
      workExperience,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo mới!", error });
  }
};

// Cập nhật kinh nghiệm
const putWorkExperience = async (req, res) => {
  const id = req.params.id;
  try {
    const updated = await WorkExperience.updateOne(
      { _id: id },
      {
        ...req.body,
        updated_at: new Date(),
      }
    );
    if (updated.modifiedCount === 0) {
      return res.status(404).json({ message: "Không tìm thấy để cập nhật" });
    }
    res.json({ message: "Cập nhật thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật!", error });
  }
};

// Xóa kinh nghiệm (soft delete)
const deleteWorkExperience = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await WorkExperience.updateOne(
      { _id: id },
      {
        deleted: true,
        updated_at: new Date(),
      }
    );
    if (updated.modifiedCount === 0) {
      return res.status(404).json({ message: "Không tìm thấy để xóa" });
    }
    res.json({ message: "Xóa thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa!", error });
  }
};

module.exports = {
  getWorkExperience,
  postWorkExperience,
  putWorkExperience,
  deleteWorkExperience,
};
