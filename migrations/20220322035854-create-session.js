"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Sessions", {
      sid: {
        primaryKey: true,
        type: Sequelize.STRING,
      },
      userId: Sequelize.INTEGER,
      expires: Sequelize.DATE,
      data: Sequelize.TEXT,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("Sessions");
  },
};
