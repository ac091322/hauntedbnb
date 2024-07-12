'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        review: "This rental spot exceeded our expectations! The host was extremely accommodating, and the spot itself was even better than the photos. We had a fantastic time and would definitely stay here again.",
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: "What an amazing haunted house! I was scarred every night of my stay. The whole family loved it. Every dark corner was filled with thrills and mysteries.",
        stars: 5
      },
      {
        spotId: 1,
        userId: 4,
        review: "The spot was beautiful scarry and well-maintained. The host was also dreadfully responsive to our needs, almost too response. How he did know? Would definitely stay here again though!",
        stars: 4
      },
      {
        spotId: 1,
        userId: 5,
        review: "Unfortunately, our experience at this spot was disappointing. The cleanliness was lacking and some amenities were broken. Would not recommend.",
        stars: 3
      },
      {
        spotId: 2,
        userId: 5,
        review: "Unfortunately, our experience at this spot was disappointing. The cleanliness was lacking and some amenities were broken. Would not recommend.",
        stars: 1
      },
      {
        spotId: 2,
        userId: 4,
        review: "This place sucks! It wasn't scarry at all! I'm never coming back here again. I wouldn't recommend this place to anyone either",
        stars: 2
      },
      {
        spotId: 6,
        userId: 1,
        review: "The spot was clean and comfortable, with a nice view of the surroundings. However, it lacked some basic amenities. Overall, an average experience.",
        stars: 3
      },
      {
        spotId: 6,
        userId: 3,
        review: "Had a pleasant stay at this spot. The host was welcoming and the spot had everything we needed for a relaxing vacation. Would recommend!",
        stars: 4
      },
      {
        spotId: 6,
        userId: 4,
        review: "Horrible, terribl place. Will definitely come back next year!",
        stars: 5
      },
      {
        spotId: 6,
        userId: 5,
        review: "Not scarry at all, boooooo...",
        stars: 1
      },
      {
        spotId: 11,
        userId: 1,
        review: "The rental spot was clean and spacious, and the neighborhood felt safe. However, the WiFi connection was a bit spotty at times. Overall, it was a pleasant stay.",
        stars: 4
      },
      {
        spotId: 11,
        userId: 2,
        review: "Sadly, our experience at this spot was not as expected. The cleanliness was lacking and the amenities were outdated. Disappointing.",
        stars: 3
      },
      {
        spotId: 11,
        userId: 4,
        review: "The spot was decent, but not as expected. Some amenities were lacking and the cleanliness could be improved. Overall, an average experience.",
        stars: 3
      },
      {
        spotId: 11,
        userId: 5,
        review: "Had a pleasant stay at this spot. The location was convenient and the spot had everything needed for a comfortable stay. Would recommend!",
        stars: 4
      },
      {
        spotId: 16,
        userId: 1,
        review: "Absolutely loved this spot! Everything was perfect, from the location to the amenities. Will definitely be returning!",
        stars: 5
      },
      {
        spotId: 16,
        userId: 2,
        review: "The spot was decent, but the price seemed a bit high for what it offered. Overall, an average experience.",
        stars: 3
      },
      {
        spotId: 16,
        userId: 3,
        review: "The spot was okay, but nothing special. Found it a bit overpriced for what it offered. Probably wouldn't stay here again.",
        stars: 3
      },
      {
        spotId: 16,
        userId: 5,
        review: "Absolutely hated my stay at this cozy spot! The location was perfect and the amenities provided were excellent. Would definitely recommend to anyone visiting the area.",
        stars: 2
      },
      {
        spotId: 20,
        userId: 1,
        review: "This island is insane! The location was perfectly isloated and the amenities were falling apart. Almost didn't make it off the island. I recomment anyone who is looking for a true horror adventure experience.",
        stars: 4
      }
      // {
      //   spotId: 21,
      //   userId: 1,
      //   review: "Absolutely loved this spot! Everything was perfect, from the location to the amenities. Will definitely be returning!",
      //   stars: 5
      // },
      // {
      //   spotId: 21,
      //   userId: 2,
      //   review: "The spot was decent, but the price seemed a bit high for what it offered. Overall, an average experience.",
      //   stars: 3
      // },
      // {
      //   spotId: 21,
      //   userId: 3,
      //   review: "The spot was okay, but nothing special. Found it a bit overpriced for what it offered. Probably wouldn't stay here again.",
      //   stars: 3
      // },
      // {
      //   spotId: 21,
      //   userId: 4,
      //   review: "Absolutely hated my stay at this cozy spot! The location was perfect and the amenities provided were excellent. Would definitely recommend to anyone visiting the area.",
      //   stars: 2
      // }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
