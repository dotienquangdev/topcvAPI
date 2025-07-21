const routeUser = require("./routes.users");
const routeCompanies = require("./routes.companies");
const routeCandidate = require("./routes.candidate");
const routeJobs = require("./routes.jobs");
const routeCategories = require("./routes.categoriesJobs");
const routeResumes = require("./routes.resumes");
const routeEmployer = require("./routes.employer");

module.exports = (app) => {
  app.use("/api/user", routeUser);
  app.use("/api/companies", routeCompanies);
  app.use("/api/candidate", routeCandidate);
  app.use("/api/jobs", routeJobs);
  app.use("/api/resumes", routeResumes);
  app.use("/api/employers", routeEmployer);
  app.use("/api/categories", routeCategories);
};
