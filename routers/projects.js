const { Router } = require("express");
const User = require("../models/").user;
const Task = require("../models/").task;
const Project = require("../models").project;
const router = new Router();

router.get("/test", async (req, res) => {
  const userTest = await User.findByPk(2, {
    include: [{ model: Project, include: [User] }],
  });
  console.log("userTest:", userTest);
  res.status(200).send(userTest);
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const projectResponse = await Project.findByPk(id, {
      include: [User, Task],
    });
    res.status(200).send(projectResponse);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

module.exports = router;
