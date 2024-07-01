'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {

    static associate(models) {
      Spot.belongsTo(models.User, { foreignKey: "ownerId", as: "Owner" });
      Spot.hasMany(models.SpotImage, { foreignKey: "spotId" });
      Spot.hasMany(models.Review, { foreignKey: "spotId" });
      Spot.hasMany(models.Booking, { foreignKey: "spotId" });
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      // validate: {
      //   len: [4, 50]
      // }
    },
    description: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    // previewImage: {
    //   type: DataTypes.STRING,
    //   allowNull: true
    // }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
