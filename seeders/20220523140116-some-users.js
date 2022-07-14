"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Apple",
          email: "apple@apple.com",
          phone: 1234567,
          password: bcrypt.hashSync("apple", 10),
          profilePicture:
            "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Banana",
          email: "banana@banana.com",
          phone: 1234567,
          password: bcrypt.hashSync("banana", 10),
          profilePicture:
            "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Coco",
          email: "coco@coco.com",
          phone: 1234567,
          password: bcrypt.hashSync("coco", 10),
          profilePicture:
            "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Thijmen Kirch",
          email: "t@t.com",
          password: bcrypt.hashSync("t", 10),
          profilePicture:
            "https://avatars.githubusercontent.com/u/98259991?v=4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
