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
        username: 'FionaG',
        firstName: "Fiona",
        lastName: "Goode",
        email: 'fiona@horror.story',
        hashedPassword: bcrypt.hashSync("password")
      },
      {
        username: 'DelphineL',
        firstName: "Delphine",
        lastName: "LaLaurie",
        email: 'delphine@horror.story',
        hashedPassword: bcrypt.hashSync("password")
      },
      {
        username: 'MyrtleS',
        firstName: "Myrtle",
        lastName: "Snow",
        email: 'myrtle@horror.story',
        hashedPassword: bcrypt.hashSync("password")
      },
      {
        username: "MarieL",
        firstName: "Marie",
        lastName: "Laveau",
        email: "marie@horror.story",
        hashedPassword: bcrypt.hashSync("password")
      },
      {
        username: 'MadisonM',
        firstName: "Madison",
        lastName: "Montgomery",
        email: 'madison@horror.story',
        hashedPassword: bcrypt.hashSync("password")
      },
      {
        username: 'Demo-User',
        email: 'demo-user@hauntedbnb.io',
        firstName: "Demo",
        lastName: "User",
        hashedPassword: bcrypt.hashSync("password")
      },
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
