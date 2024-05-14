'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "Users",
      "firstName",
      {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false
      }
    );
    await queryInterface.addColumn(
      "Users",
      "lastName",
      {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "firstName");
    await queryInterface.removeColumn("Users", "lastName");
  }
};
