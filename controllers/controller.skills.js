const Skills = require("../models/skills.models");

const mongoose = require("mongoose");
const getSkills = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const filter = {
      deleted: false,
      status: "active",
    };
    if (categoryId) {
      filter.categoryId = mongoose.Types.ObjectId(categoryId);
    }
    const skills = await Skills.find(filter)
      .populate({
        path: "categoryId",
        select: "name slug status deleted created_at updated_at", // chỉ lấy những field cần thiết
      })
      .sort({ created_at: -1 }); // có thể sắp xếp theo thời gian
    res.json({
      message: "Danh sách skills",
      skills,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

// Thêm skill mới
const postSkill = async (req, res) => {
  try {
    const { name, slug, categoryId } = req.body;
    const skill = new Skills({
      name,
      slug,
      categoryId, // chỉ cần _id
      created_at: new Date(),
    });
    await skill.save();
    res.status(201).json({
      message: "Thêm skill thành công",
      skill,
    });
  } catch (error) {
    res.status(500).json({ error: "Không thể thêm skill" });
  }
};
// Cập nhật skill
const putSkill = async (req, res) => {
  try {
    const { id } = req.params;
    await Skills.updateOne(
      { _id: id },
      {
        ...req.body,
        updated_at: new Date(),
      }
    );
    res.json({ message: "Cập nhật skill thành công" });
  } catch (error) {
    res.status(500).json({ error: "Không thể cập nhật skill" });
  }
};

// Xóa mềm skill
const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    await Skills.updateOne(
      { _id: id },
      { deleted: true, updated_at: new Date() }
    );
    res.json({ message: "Xóa skill thành công" });
  } catch (error) {
    res.status(500).json({ error: "Không thể xóa skill" });
  }
};

module.exports = {
  getSkills,
  postSkill,
  putSkill,
  deleteSkill,
};
