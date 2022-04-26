module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("todoLists", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id"
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("todoLists", "userId");
  },
};