const Companies = require("../models/companies.models");
const mongoose = require("mongoose");
const getCompanies = async (req, res) => {
  const {
    _page = 1,
    _limit = 9,
    _sort = "createdAt",
    _oder = "asc",
  } = req.query;
  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _oder === "asc" ? 1 : -1,
    },
  };
  const companies = await Companies.paginate({ deleted: false }, options);
  res.json({
    message: "Lay danh sach san pham thanh cong!",
    companies: companies,
  });
};

const applyCompanies = async (req, res) => {
  console.log("BODY:", req.body); // <--- THÊM DÒNG NÀY
  const exitName = await Companies.findOne({
    name: req.body.name,
  });
  const exitLogoUrl = await Companies.findOne({
    logo_url: req.body.logo_url,
  });
  const exitWebsite = await Companies.findOne({
    website: req.body.website,
  });
  const companies = new Companies({
    ...req.body,
    created_at: new Date(),
  });
  await companies.save();
  res.status(200).json({
    success: true,
    message: `Đăng ký công ty thành công : ` + `${companies.name}`,
    companies: {
      _id: companies._id,
      name: companies.name,
      logo_url: companies.logo_url,
      website: companies.website,
    },
  });
};

const listJobsCompanies = async (req, res) => {
  try {
    const companyId = req.params.id;
    console.log("companyId: ", companyId);

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "Thiếu ID công ty!",
      });
    }

    const company = await Companies.findById(companyId);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy công ty!",
      });
    }
    res.status(200).json({
      success: true,
      data: company,
      message: "llay thong tin compani thành công!",
    });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin công ty:", error);
    res.status(500).json({ success: false, message: "Lỗi server!" });
  }
};
const updateCompanies = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ" });
    }

    const updateData = { ...req.body };
    if (req.file) {
      updateData.logo_url = `/upload/${req.file.filename}`;
    }

    const updatedBy = {
      account_id: res.locals.companies?.id || null,
      update_at: new Date(),
    };

    const updatedCompanies = await Companies.findByIdAndUpdate(
      id,
      {
        $set: updateData,
        $push: { updatedBy },
      },
      { new: true, runValidators: true } // ✅ Trả về document mới sau khi update
    );

    if (!updatedCompanies) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy công ty để cập nhật" });
    }

    res.json({ message: "Cập nhật thành công", updatedCompanies });
  } catch (error) {
    console.error("Lỗi update company:", error);
    res.status(500).json({ message: "Cập nhật thất bại" });
  }
};

const deleteCompanies = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("req params : ", id);
    if (!id) {
      req.flash("error", "Không có id");
    }
    const deletedJobs = await Companies.updateOne(
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

// const updateAllCompaniesStatus = async () => {
//   try {
//     const result = await Companies.updateMany(
//       {}, // không điều kiện -> áp dụng cho tất cả
//       { $set: { status: "active" } }
//     );
//     console.log("Kết quả cập nhật:", result);
//   } catch (error) {
//     console.error("Lỗi cập nhật status:", error);
//   }
// };

module.exports = {
  getCompanies,
  listJobsCompanies,
  applyCompanies,
  updateCompanies,
  deleteCompanies,
};
