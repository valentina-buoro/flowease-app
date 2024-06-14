const express = require("express");
const createProject = require("../controllers/projectControllers/createProjectController");
const { authenticate } = require("../middleware/authentication");
const getProjectById = require("../controllers/projectControllers/viewProjectController");
const listProjects = require("../controllers/projectControllers/listProjectsController");
const updateProject = require("../controllers/projectControllers/updateProjectController");

const projectRouter = express.Router();

projectRouter.post("/create", authenticate, createProject);
projectRouter.get("/:project_id/project", getProjectById);
projectRouter.get("/list", authenticate, listProjects);
projectRouter.put("/:project_id/edit", authenticate, updateProject);

module.exports = projectRouter;
