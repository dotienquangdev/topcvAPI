const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller.skills");

router.get("/getSkills", controller.getSkills);
router.post("/postSkill", controller.postSkill);
router.put("/putSkill/:id", controller.putSkill);
router.delete("/deleteSkill/:id", controller.deleteSkill);

module.exports = router;
