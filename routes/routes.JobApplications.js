const express = require("express");
const controller = require("../controllers/controller.JobApplications");
const router = express.Router();
const upload = require("../middlewares/upload");

router.get("/getJobApplications", controller.getJobApplication);
router.get("/listJobApplications/:id", controller.listJobApplication);
router.post(
  "/postJobApplications",
  upload.single("cv"),
  controller.postJobApplication
);

router.patch("/patchJobApplications", controller.patchJobApplication);

router.delete("/deleteJobApplications", controller.deleteJobApplication);
router.post("/upload-profile-pic", controller.uploadfile);

module.exports = router;
