"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "projects",
      [
        {
          name: "Portfolio project",
          description: "My first project",
          backgroundColor: "#120A46",
          color: "#FFFFFF",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Super secret tech project",
          description: "Cutting edge things are being made here",
          backgroundColor: "#120A46",
          color: "#FFFFFF",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Agile project",
          description: "Sprints and stuff",
          backgroundColor: "#120A46",
          color: "#FFFFFF",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("projects", null, {});
  },
};
