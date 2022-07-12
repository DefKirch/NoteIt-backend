const { Router } = require("express");
const { toData } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const User = require("../models/").user;
const Task = require("../models/").task;
const Project = require("../models").project;
const UserProject = require("../models").userproject;
const router = new Router();

router.get("/me", authMiddleware, async (req, res, next) => {
  try {
    const auth =
      req.headers.authorization && req.headers.authorization.split(" ");
    const data = toData(auth[1]);
    const id = data.userId;
    console.log("ID", id);
    const userProjects = await User.findByPk(id, {
      include: [{ model: Project, include: [User] }],
      // attributes: ["name", "profilePicture"],
    });
    // Todo: remove some of the details of the other users and all passwords when sending back the information
    // delete userProjects.dataValues["password"];
    console.log(userProjects);
    res.status(200).send(userProjects);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const projectResponse = await Project.findByPk(id, {
      include: [User, Task],
    });
    // Todo: remove some of the details of the other users and all passwords when sending back the information
    // delete projectResponse.dataValues["password"];
    res.status(200).send(projectResponse);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const auth =
      req.headers.authorization && req.headers.authorization.split(" ");
    const data = toData(auth[1]);
    const id = data.userId;
    const { name, description } = req.body;
    if (name) {
      const newProject = await Project.create({
        name,
        description,
      });
      const newProjectId = newProject.dataValues.id;
      const newUserProject = await UserProject.create({
        userId: id,
        projectId: newProjectId,
      });
      const body = { newProject, newUserProject };
      res.status(201).send(body);
    } else {
      res.status(400).send({ message: "Title is required." });
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

module.exports = router;
