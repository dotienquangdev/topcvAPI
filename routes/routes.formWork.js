const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller.formWork");

router.get("/getFormWork", controller.getFormWork);
router.post("/postFormWork", controller.postFormWork);
router.put("/putFormWork/:id", controller.putFormWork);
router.delete("/deleteFormWork/:id", controller.deleteFormWork);

module.exports = router;
