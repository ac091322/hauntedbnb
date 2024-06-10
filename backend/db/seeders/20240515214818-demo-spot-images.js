'use strict';

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+1/Gemini_Generated_Image_q2zyk8q2zyk8q2zy.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+1/Gemini_Generated_Image_q2zyk7q2zyk7q2zy.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+1/Gemini_Generated_Image_q2zyk6q2zyk6q2zy.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+1/Gemini_Generated_Image_q2zyk4q2zyk4q2zy.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+1/Gemini_Generated_Image_q2zyk5q2zyk5q2zy.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://picsum.photos/300/300?random=16",
        preview: true
      },
      {
        spotId: 2,
        url: "https://picsum.photos/300/300?random=17",
        preview: false
      },
      {
        spotId: 2,
        url: "https://picsum.photos/300/300?random=18",
        preview: false
      },
      {
        spotId: 2,
        url: "https://picsum.photos/300/300?random=19",
        preview: false
      },
      {
        spotId: 2,
        url: "https://picsum.photos/300/300?random=20",
        preview: false
      },
      {
        spotId: 3,
        url: "https://picsum.photos/300/300?random=11",
        preview: true
      },
      {
        spotId: 3,
        url: "https://picsum.photos/300/300?random=12",
        preview: false
      },
      {
        spotId: 3,
        url: "https://picsum.photos/300/300?random=13",
        preview: false
      },
      {
        spotId: 3,
        url: "https://picsum.photos/300/300?random=14",
        preview: false
      },
      {
        spotId: 3,
        url: "https://picsum.photos/300/300?random=15",
        preview: false
      },
      {
        spotId: 4,
        url: "https://picsum.photos/300/300?random=16",
        preview: true
      },
      {
        spotId: 4,
        url: "https://picsum.photos/300/300?random=17",
        preview: false
      },
      {
        spotId: 4,
        url: "https://picsum.photos/300/300?random=18",
        preview: false
      },
      {
        spotId: 4,
        url: "https://picsum.photos/300/300?random=19",
        preview: false
      },
      {
        spotId: 4,
        url: "https://picsum.photos/300/300?random=20",
        preview: false
      },
      {
        spotId: 5,
        url: "https://picsum.photos/300/300?random=21",
        preview: true
      },
      {
        spotId: 5,
        url: "https://picsum.photos/300/300?random=22",
        preview: false
      },
      {
        spotId: 5,
        url: "https://picsum.photos/300/300?random=23",
        preview: false
      },
      {
        spotId: 5,
        url: "https://picsum.photos/300/300?random=24",
        preview: false
      },
      {
        spotId: 5,
        url: "https://picsum.photos/300/300?random=25",
        preview: false
      },
      {
        spotId: 6,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+06/Gemini_Generated_Image_mvhg96mvhg96mvhg.jpeg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+06/Gemini_Generated_Image_9cqlrc9cqlrc9cql.jpeg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+06/Gemini_Generated_Image_loc71jloc71jloc7.jpeg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+06/Gemini_Generated_Image_mvhg94mvhg94mvhg.jpeg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+06/Gemini_Generated_Image_esh4vqesh4vqesh4.jpeg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://picsum.photos/300/300?random=26",
        preview: true
      },
      {
        spotId: 7,
        url: "https://picsum.photos/300/300?random=27",
        preview: false
      },
      {
        spotId: 7,
        url: "https://picsum.photos/300/300?random=28",
        preview: false
      },
      {
        spotId: 7,
        url: "https://picsum.photos/300/300?random=29",
        preview: false
      },
      {
        spotId: 7,
        url: "https://picsum.photos/300/300?random=30",
        preview: false
      },
      {
        spotId: 8,
        url: "https://picsum.photos/300/300?random=31",
        preview: true
      },
      {
        spotId: 8,
        url: "https://picsum.photos/300/300?random=32",
        preview: false
      }, {
        spotId: 8,
        url: "https://picsum.photos/300/300?random=33",
        preview: false
      },
      {
        spotId: 8,
        url: "https://picsum.photos/300/300?random=34",
        preview: false
      },
      {
        spotId: 8,
        url: "https://picsum.photos/300/300?random=35",
        preview: false
      },
      {
        spotId: 9,
        url: "https://picsum.photos/300/300?random=36",
        preview: true
      },
      {
        spotId: 9,
        url: "https://picsum.photos/300/300?random=37",
        preview: false
      },
      {
        spotId: 9,
        url: "https://picsum.photos/300/300?random=38",
        preview: false
      },
      {
        spotId: 9,
        url: "https://picsum.photos/300/300?random=39",
        preview: false
      },
      {
        spotId: 9,
        url: "https://picsum.photos/300/300?random=40",
        preview: false
      },
      {
        spotId: 10,
        url: "https://picsum.photos/300/300?random=46",
        preview: true
      },
      {
        spotId: 10,
        url: "https://picsum.photos/300/300?random=47",
        preview: false
      },
      {
        spotId: 10,
        url: "https://picsum.photos/300/300?random=48",
        preview: false
      },
      {
        spotId: 10,
        url: "https://picsum.photos/300/300?random=49",
        preview: false
      },
      {
        spotId: 10,
        url: "https://picsum.photos/300/300?random=50",
        preview: false
      },
      {
        spotId: 11,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+11/Gemini_Generated_Image_rsmdvsrsmdvsrsmd.jpeg",
        preview: true
      },
      {
        spotId: 11,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+11/Gemini_Generated_Image_chw4tochw4tochw4.jpeg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+11/Gemini_Generated_Image_chw4tqchw4tqchw4.jpeg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+11/Gemini_Generated_Image_uxoc8wuxoc8wuxoc.jpeg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+11/Gemini_Generated_Image_chw4tpchw4tpchw4.jpeg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://picsum.photos/300/300?random=51",
        preview: true
      },
      {
        spotId: 12,
        url: "https://picsum.photos/300/300?random=52",
        preview: false
      },
      {
        spotId: 12,
        url: "https://picsum.photos/300/300?random=53",
        preview: false
      },
      {
        spotId: 12,
        url: "https://picsum.photos/300/300?random=54",
        preview: false
      },
      {
        spotId: 12,
        url: "https://picsum.photos/300/300?random=55",
        preview: false
      },
      {
        spotId: 13,
        url: "https://picsum.photos/300/300?random=56",
        preview: true
      },
      {
        spotId: 13,
        url: "https://picsum.photos/300/300?random=57",
        preview: false
      },
      {
        spotId: 13,
        url: "https://picsum.photos/300/300?random=58",
        preview: false
      },
      {
        spotId: 13,
        url: "https://picsum.photos/300/300?random=59",
        preview: false
      },
      {
        spotId: 13,
        url: "https://picsum.photos/300/300?random=60",
        preview: false
      },
      {
        spotId: 14,
        url: "https://picsum.photos/300/300?random=61",
        preview: true
      },
      {
        spotId: 14,
        url: "https://picsum.photos/300/300?random=62",
        preview: false
      },
      {
        spotId: 14,
        url: "https://picsum.photos/300/300?random=63",
        preview: false
      },
      {
        spotId: 14,
        url: "https://picsum.photos/300/300?random=64",
        preview: false
      },
      {
        spotId: 14,
        url: "https://picsum.photos/300/300?random=65",
        preview: false
      },
      {
        spotId: 15,
        url: "https://picsum.photos/300/300?random=66",
        preview: true
      },
      {
        spotId: 15,
        url: "https://picsum.photos/300/300?random=67",
        preview: false
      },
      {
        spotId: 15,
        url: "https://picsum.photos/300/300?random=68",
        preview: false
      },
      {
        spotId: 15,
        url: "https://picsum.photos/300/300?random=69",
        preview: false
      },
      {
        spotId: 15,
        url: "https://picsum.photos/300/300?random=70",
        preview: false
      },
      {
        spotId: 16,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+16/Gemini_Generated_Image_7zrzog7zrzog7zrz.jpeg",
        preview: true
      },
      {
        spotId: 16,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+16/Gemini_Generated_Image_igreezigreezigre.jpeg",
        preview: false
      },
      {
        spotId: 16,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+16/Gemini_Generated_Image_oy684poy684poy68.jpeg",
        preview: false
      },
      {
        spotId: 16,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+16/Gemini_Generated_Image_wdk55bwdk55bwdk5.jpeg",
        preview: false
      },
      {
        spotId: 16,
        url: "https://hauntedbnb.s3.us-east-2.amazonaws.com/Spot+16/Gemini_Generated_Image_nrg9frnrg9frnrg9.jpeg",
        preview: false
      },
      {
        spotId: 17,
        url: "https://picsum.photos/300/300?random=76",
        preview: true
      },
      {
        spotId: 17,
        url: "https://picsum.photos/300/300?random=77",
        preview: false
      },
      {
        spotId: 17,
        url: "https://picsum.photos/300/300?random=78",
        preview: false
      },
      {
        spotId: 17,
        url: "https://picsum.photos/300/300?random=79",
        preview: false
      },
      {
        spotId: 17,
        url: "https://picsum.photos/300/300?random=80",
        preview: false
      },
      {
        spotId: 18,
        url: "https://picsum.photos/300/300?random=81",
        preview: true
      },
      {
        spotId: 18,
        url: "https://picsum.photos/300/300?random=82",
        preview: false
      },
      {
        spotId: 18,
        url: "https://picsum.photos/300/300?random=83",
        preview: false
      },
      {
        spotId: 18,
        url: "https://picsum.photos/300/300?random=84",
        preview: false
      },
      {
        spotId: 18,
        url: "https://picsum.photos/300/300?random=85",
        preview: false
      },
      {
        spotId: 19,
        url: "https://picsum.photos/300/300?random=86",
        preview: true
      },
      {
        spotId: 19,
        url: "https://picsum.photos/300/300?random=87",
        preview: false
      },
      {
        spotId: 19,
        url: "https://picsum.photos/300/300?random=88",
        preview: false
      },
      {
        spotId: 19,
        url: "https://picsum.photos/300/300?random=89",
        preview: false
      },
      {
        spotId: 19,
        url: "https://picsum.photos/300/300?random=90",
        preview: false
      },
      {
        spotId: 20,
        url: "https://picsum.photos/300/300?random=91",
        preview: true
      },
      {
        spotId: 20,
        url: "https://picsum.photos/300/300?random=92",
        preview: false
      },
      {
        spotId: 20,
        url: "https://picsum.photos/300/300?random=93",
        preview: false
      },
      {
        spotId: 20,
        url: "https://picsum.photos/300/300?random=94",
        preview: false
      },
      {
        spotId: 20,
        url: "https://picsum.photos/300/300?random=95",
        preview: false
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }
    }, {});
  }
};
