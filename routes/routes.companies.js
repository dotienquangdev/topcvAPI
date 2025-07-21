const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllers.companies");

router.get("/getCompanies", controller.getCompanies); //Danh sách công ty
router.post("/detail", controller.listJobsCompanies); // Chi tiết công ty
router.post("/postCompanies", controller.applyCompanies); // Dành cho admin, nhà tuyển dụng tạo công ty
router.put("/putCompanies", controller.updateCompanies); // Dành cho admin, nhà tuyển dụng tạo công ty

module.exports = router;
