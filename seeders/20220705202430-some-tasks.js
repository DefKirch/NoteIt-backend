"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tasks",
      [
        {
          title: "Make a list",
          description: "",
          status: "Todo",
          createdAt: new Date(),
          updatedAt: new Date(),
          projectId: 1,
        },
        {
          title: "Try some new things",
          description:
            "Look at this and this to discover new things to try on this project",
          status: "In Progress",
          createdAt: new Date(),
          updatedAt: new Date(),
          projectId: 1,
        },
        {
          title: "Draw something",
          description: "Draw a picture of something, just something",
          status: "Todo",
          createdAt: new Date(),
          updatedAt: new Date(),
          projectId: 2,
        },
        {
          title: "Make a new playlist",
          description: "Check out that new artist, or not...",
          status: "Done",
          createdAt: new Date(),
          updatedAt: new Date(),
          projectId: 1,
        },
        {
          title: "Pet the DBeaver",
          description:
            "what? pet the dbeaver? but that's a databasemanager, right?",
          status: "Todo",
          createdAt: new Date(),
          updatedAt: new Date(),
          projectId: 3,
        },
        {
          title: "Setup a migration",
          description:
            "migrate some things, model some things and seed them I guess",
          status: "In Progress",
          createdAt: new Date(),
          updatedAt: new Date(),
          projectId: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tasks", null, {});
  },
};
