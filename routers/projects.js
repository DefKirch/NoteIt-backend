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
    res.status(400).send(e.message);
    next(e);
  }
});

router.get("/allUsers", authMiddleware, async (req, res, next) => {
  try {
    const allUsersWithId = await User.findAll({
      attributes: ["id", "email"],
    });
    res.status(200).send(allUsersWithId);
  } catch (e) {
    res.status(400).send(e.message);
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
    res.status(400).send(e.message);
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
    res.status(400).send(e.message);
  }
});

router.post("/task/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, title } = req.body;
    if (title && status) {
      const newTask = await Task.create({
        title,
        status,
        projectId: id,
      });
      console.log(newTask);
      res.status(201).send(newTask);
    } else {
      res.status(400).send({ message: "Title and Status are required" });
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.patch("/task/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log();
    const { title, description, status } = req.body;
    const updatedTask = await Task.update(
      {
        title,
        description,
        status,
      },
      {
        where: { id: id },
      }
    );
    // console.log(updatedTask);
    res.status(200).send({ message: "task updated succesfully" });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.delete("/task/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.destroy({ where: { id } });
    res.status(200).send({ message: "Task deleted succesfully" });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/newUserProject", authMiddleware, async (req, res, next) => {
  try {
    const { pId, uId } = req.body;
    // console.log(pId, uId);
    const userProjectExists = await UserProject.findAll({
      where: {
        userId: uId,
        projectId: pId,
      },
    });
    console.log(userProjectExists);
    if (!userProjectExists) {
      const newUserProject = await UserProject.create({
        userId: uId,
        projectId: pId,
      });
      res.status(200).send(userProjectExists);
    } else {
      res.status(400).send({ message: "User already member of this project" });
    }
  } catch (e) {
    console.log(e.message);
  }
});
module.exports = router;
