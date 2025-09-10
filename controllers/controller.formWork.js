const FormWork = require("../models/form_work.models");

// Lấy danh sách hình thức làm việc
const getFormWork = async (req, res) => {
  try {
    const formWork = await FormWork.find({
      deleted: false,
      status: "active",
    });
    res.json({
      message: "Lấy danh sách hình thức làm việc thành công!",
      formWork,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error });
  }
};

// Tạo mới hình thức làm việc
const postFormWork = async (req, res) => {
  try {
    const formWork = new FormWork({
      ...req.body,
      created_at: new Date(),
    });
    await formWork.save();
    res.status(200).json({
      success: true,
      message: `Tạo mới hình thức làm việc thành công: ${formWork.formWorkName}`,
      formWork,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo mới!", error });
  }
};

// Cập nhật hình thức làm việc
const putFormWork = async (req, res) => {
  const id = req.params.id;
  try {
    const updated = await FormWork.updateOne(
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

// Xóa hình thức làm việc (soft delete)
const deleteFormWork = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await FormWork.updateOne(
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
  getFormWork,
  postFormWork,
  putFormWork,
  deleteFormWork,
};
