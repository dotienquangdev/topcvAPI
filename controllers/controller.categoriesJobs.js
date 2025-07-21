const Categories = require("../models/job_categories.models");

const getCategories = async (req, res) => {
  const categories = await Categories.find({
    deleted: false,
  });
  res.json({
    categories: categories,
  });
};
const listCategories = async (req, res) => {
  try {
    const categoriesId = req.body._id;
    console.log(categoriesId);
    if (!categoriesId) {
      return res.status(400).json({
        success: false,
        message: "Thiếu ID categories",
      });
    }
    const categories = await Categories.findById(categoriesId);
    if (!categories) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy categories!",
      });
    }
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin categories", error);
    res.status(500).json({ success: false, message: "Lỗi server!" });
  }
};
const postCategories = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const categories = await Categories({
      ...req.body,
    });

    await categories.save();
    res.status(200).json({
      success: true,
      message: `Đăng ký thành công!`,
      user: {
        _id: categories._id,
        name: categories.name,
        slug: categories.slug,
        created_at: new Date(),
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Lỗi sever!" });
  }
};
const deleteCategories = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("req.params 123 :", req.params.id);
    if (!id) {
      req.flash("error", "Không có id ");
    }
    const updated = await Categories.updateOne(
      { _id: id },
      {
        deleted: true,
        updated_at: new Date(),
      }
    );
    if (updated.modifiedCount === 0) {
      return res.status(404).json({ message: "Không tìm thấy CV để xóa!" });
    }
    return res.status(404).json({ message: "Xóa người dùng thành công!" });
  } catch (error) {
    console.error({ message: "Lỗi xóa CV" });
  }
};

module.exports = {
  deleteCategories,
  postCategories,
  listCategories,
  getCategories,
};
