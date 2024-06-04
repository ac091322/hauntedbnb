'use strict';

const bcrypt = require("bcryptjs");
const { User } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Users";
    await User.bulkCreate([
      {
        username: 'HomerS',
        email: 'homer@gmail.com',
        firstName: "Homer",
        lastName: "Simpson",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        username: 'MargeS',
        firstName: "Marge",
        lastName: "Simpson",
        email: 'marge@gmail.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        username: 'BartS',
        firstName: "Bart",
        lastName: "Simpson",
        email: 'bart@gmail.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        username: 'LisaS',
        firstName: "Lisa",
        lastName: "Simpson",
        email: 'lisa@gmail.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        username: 'MaggieS',
        firstName: "Maggie",
        lastName: "Simpson",
        email: 'maggie@gmail.com',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ["Demo-lition", "Homey", "Margey", "Barty", "Lisy", "Maggy"] }
    }, {});
  }
};
