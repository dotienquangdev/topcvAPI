const multer = require("multer");
const path = require("path");

// Cấu hình nơi lưu file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/cv"); // Thư mục lưu CV
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Tạo tên file unique
  },
});

// Giới hạn loại file (chỉ pdf/doc/docx)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [".pdf", ".doc", ".docx"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ cho phép file PDF/DOC/DOCX!"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
