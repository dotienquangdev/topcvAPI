const express = require("express");
const router = express.Router();
const controllerUsers = require("../controllers/controller.users");

router.post("/register", controllerUsers.register); //Đăng ký
router.get("/login", controllerUsers.getLogin); //Danh sách user
router.post("/login", controllerUsers.postLogin); //Đăng nhập
router.delete("/deleteLogin/:id", controllerUsers.deleteLogin); //Cập nhật hồ sơ

router.get("/user/profile ", controllerUsers.userProfile); //Lấy thông tin người dùng
router.put("/user/profile ", controllerUsers.updateLogin); //Cập nhật hồ sơ

router.post("/user/forgot", controllerUsers.userForgot);
router.post("/user/otp", controllerUsers.userOtp);
router.post("user/resetPassword", controllerUsers.userResetPassword);

module.exports = router;
