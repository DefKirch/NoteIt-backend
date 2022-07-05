const { Router } = require("express");
const User = require("../models/").user;
const Project = require("../models").project;
const router = new Router();

router.get("/test", async (req, res) => {
  const userTest = await User.findByPk(2, {
    include: [{ model: Project, include: [User] }],
  });
  console.log("userTest:", userTest);
  res.status(200).send(userTest);
});

module.exports = router;
