const express = require("express");
const controller = require("../controllers/controller.JobApplications");
const router = express.Router();

router.get("/getJobApplications", controller.getJobApplication);
router.get("/listJobApplications/:id", controller.listJobApplication);
router.post("/postJobApplications", controller.postJobApplication);
router.patch("/patchJobApplications", controller.patchJobApplication);
router.delete("/deleteJobApplications", controller.deleteJobApplication);

module.exports = router;
