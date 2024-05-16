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
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 1,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 2,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 2,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 3,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 3,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 4,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 4,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 5,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 5,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 6,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 6,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 7,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 7,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 8,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 8,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 9,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 9,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 10,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 10,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 11,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 11,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 12,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 12,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 13,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 13,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 14,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 14,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 15,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 15,
        url: "https://example.com/review_image.jpg"
      }, {
        reviewId: 16,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 16,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 17,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 17,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 18,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 18,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 19,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 19,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 20,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 20,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 21,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 21,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 22,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 22,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 23,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 23,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 24,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 24,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 25,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 25,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 26,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 26,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 27,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 27,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 28,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 28,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 29,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 29,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 30,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 30,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 31,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 31,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 32,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 32,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 33,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 33,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 34,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 34,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 35,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 35,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 36,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 36,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 37,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 37,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 38,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 38,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 39,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 39,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 40,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 40,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 41,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 41,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 42,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 42,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 43,
        url: "https://example.com/review_image.jpg"
      },
      {
        reviewId: 43,
        url: "https://example.com/review_image.jpg"
      }
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
