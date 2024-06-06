'use strict';

const { ReviewImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: "https://picsum.photos/300/300?random=1"
      },
      {
        reviewId: 1,
        url: "https://picsum.photos/300/300?random=2"
      },
      {
        reviewId: 1,
        url: "https://picsum.photos/300/300?random=3"
      },
      {
        reviewId: 2,
        url: "https://picsum.photos/300/300?random=4"
      },
      {
        reviewId: 2,
        url: "https://picsum.photos/300/300?random=5"
      },
      {
        reviewId: 3,
        url: "https://picsum.photos/300/300?random=6"
      },
      {
        reviewId: 3,
        url: "https://picsum.photos/300/300?random=7"
      },
      {
        reviewId: 3,
        url: "https://picsum.photos/300/300?random=8"
      },
      {
        reviewId: 3,
        url: "https://picsum.photos/300/300?random=9"
      },
      {
        reviewId: 4,
        url: "https://picsum.photos/300/300?random=10"
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: {
        [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43]
      }
    }, {});
  }
};
