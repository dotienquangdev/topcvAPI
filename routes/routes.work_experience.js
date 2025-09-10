const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller.workExperience");

router.get("/getWorkExperience", controller.getWorkExperience);
router.post("/postWorkExperience", controller.postWorkExperience);
router.put("/putWorkExperience/:id", controller.putWorkExperience);
router.delete("/deleteWorkExperience/:id", controller.deleteWorkExperience);

module.exports = router;
