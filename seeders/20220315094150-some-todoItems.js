"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "todoItems",
      [
        {
          task: "learn React",
          deadline: "last week",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "learn Backend",
          deadline: "this week",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "sleep",
          deadline: "tonight",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "buy flowers",
          deadline: "weekend",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
