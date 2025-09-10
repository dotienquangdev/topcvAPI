const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller.experienceLevel");

router.get("/getExperienceLevel", controller.getExperienceLevels);
router.post("/postExperienceLevel", controller.postExperienceLevel);
router.put("/putExperienceLevel/:id", controller.putExperienceLevel);
router.delete("/deleteExperienceLevel/:id", controller.deleteExperienceLevel);

module.exports = router;
