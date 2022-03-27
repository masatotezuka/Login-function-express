"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return [
      queryInterface.addColumn("Users", "verificationToken", {
        type: Sequelize.STRING,
        after: "password",
      }),
    ];
  },

  async down(queryInterface) {
    return await queryInterface.removeColumn("Users", "verificationToken");
  },
};
