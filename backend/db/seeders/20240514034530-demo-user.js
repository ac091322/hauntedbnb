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
        username: 'Demo-lition',
        email: 'demo@user.io',
        firstName: "Demo",
        lastName: "Lition",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        username: 'Homey',
        email: 'homer@gmail.com',
        firstName: "Homer",
        lastName: "Simpson",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        username: 'Margey',
        firstName: "Marge",
        lastName: "Simpson",
        email: 'marge@gmail.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        username: 'Barty',
        firstName: "Bart",
        lastName: "Simpson",
        email: 'bart@gmail.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        username: 'Lisy',
        firstName: "Lisa",
        lastName: "Simpson",
        email: 'lisa@gmail.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        username: 'Maggy',
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
