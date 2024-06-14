'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lat: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      lng: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(2000),
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      // previewImage: {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.dropTable(options);
  }
};
