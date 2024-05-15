'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {

    static associate(models) {
      Spot.hasMany(models.Booking, { foreignKey: "spotId" });
      Spot.hasMany(models.SpotImage, { foreignKey: "spotId" });
      Spot.belongsTo(models.User, { foreignKey: "ownerId", as: "Owner" });
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
      // validate: {
      //   isAlpha: true,
      //   isUppercase: true,
      //   len: [2, 2]
      // }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      // validate: {
      //   len: [4, 50]
      // }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    previewImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    avgRating: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
