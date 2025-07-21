const Companies = require("../models/companies.models");

const applyCompanies = async (req, res) => {
  const exitName = await Companies.findOne({
    name: req.body.name,
  });
  const exitLogoUrl = await Companies.findOne({
    logo_url: req.body.logo_url,
  });
  const exitWebsite = await Companies.findOne({
    website: req.body.website,
  });
  if (exitName) {
    return res
      .status(400)
      .json({ success: false, message: "Tên công ty đã tồn tại!" });
  }
  if (exitLogoUrl) {
    return res
      .status(400)
      .json({ success: false, message: "Logo công ty đã tồn tại!" });
  }
  if (exitWebsite) {
    return res
      .status(400)
      .json({ success: false, message: "Website công ty đã tồn tại!" });
  }
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
const getCompanies = async (req, res) => {
  const companies = await Companies.find({
    deleted: false,
  });
  res.json({
    companies: companies,
  });
};
const listJobsCompanies = async (req, res) => {
  try {
    const companyId = req.body._id;
    console.log(companyId);
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
    });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin công ty:", error);
    res.status(500).json({ success: false, message: "Lỗi server!" });
  }
};
const updateCompanies = async (req, res) => {
  const id = req.params.id;
  if (req.file) {
    req.body.logo_url = `/upload/${req.file.filename}`;
  }
  try {
    const updatedBy = {
      account_id: res.locals.companies.id,
      update_at: new Date(),
    };
    await Companies.updateOne(
      { _id: id },
      {
        ...req.body,
        $push: {
          updatedBy: updatedBy,
        },
      }
    );
  } catch (error) {
    req.flash("error", "Cập nhật thất bại!");
  }
};

module.exports = {
  getCompanies,
  listJobsCompanies,
  applyCompanies,
  updateCompanies,
};
