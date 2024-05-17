'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {

    static associate(models) {
      Review.hasMany(models.ReviewImage, { foreignKey: "reviewId" });
      Review.belongsTo(models.User, { foreignKey: "userId" });
      Review.belongsTo(models.Spot, { foreignKey: "spotId" });
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // validate: {
      //   isNumeric: true,
      //   isIn: [[1, 2, 3, 4, 5]]
      // }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
