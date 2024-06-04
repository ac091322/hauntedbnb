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
        spotId: 5,
        userId: 2,
        review: "This rental spot exceeded our expectations! The host was extremely accommodating, and the spot itself was even better than the photos. We had a fantastic time and would definitely stay here again.",
        stars: 5
      },
      {
        spotId: 11,
        userId: 1,
        review: "The spot was lovely and the host was incredibly welcoming. We had a wonderful time and would definitely stay here again!",
        stars: 5
      },
      {
        spotId: 14,
        userId: 1,
        review: "The spot was beautiful and well-maintained. The host was also very responsive to our needs. Would definitely stay here again!",
        stars: 5
      },
      {
        spotId: 18,
        userId: 1,
        review: "Unfortunately, our experience at this spot was disappointing. The cleanliness was lacking and some amenities were broken. Would not recommend.",
        stars: 2
      },
      {
        spotId: 7,
        userId: 1,
        review: "The spot was clean and comfortable, with a nice view of the surroundings. However, it lacked some basic amenities. Overall, an average experience.",
        stars: 3
      },
      {
        spotId: 8,
        userId: 1,
        review: "Had a pleasant stay at this spot. The host was welcoming and the spot had everything we needed for a relaxing vacation. Would recommend!",
        stars: 4
      },
      {
        spotId: 12,
        userId: 1,
        review: "Enjoyed our time at this spot. The location was convenient and the spot was clean. However, some amenities could be improved. Overall, a good experience.",
        stars: 4
      },
      {
        spotId: 20,
        userId: 1,
        review: "Absolutely loved this spot! Everything was perfect, from the location to the amenities. Will definitely be returning!",
        stars: 5
      },
      {
        spotId: 3,
        userId: 2,
        review: "The rental spot was clean and spacious, and the neighborhood felt safe. However, the WiFi connection was a bit spotty at times. Overall, it was a pleasant stay.",
        stars: 3
      },
      {
        spotId: 9,
        userId: 3,
        review: "Unfortunately, our experience at this spot was not as expected. The cleanliness was lacking and the amenities were outdated. Disappointing.",
        stars: 2
      },
      {
        spotId: 9,
        userId: 5,
        review: "The spot was decent, but not as expected. Some amenities were lacking and the cleanliness could be improved. Overall, an average experience.",
        stars: 3
      },
      {
        spotId: 10,
        userId: 4,
        review: "Had a pleasant stay at this spot. The location was convenient and the spot had everything needed for a comfortable stay. Would recommend!",
        stars: 4
      },
      {
        spotId: 11,
        userId: 2,
        review: "Enjoyed our time at this spot. The host was welcoming and the spot was clean. However, some amenities could be improved. Overall, a good experience.",
        stars: 4
      },
      {
        spotId: 20,
        userId: 2,
        review: "Absolutely loved this spot! Everything was perfect, from the location to the amenities. Will definitely be returning!",
        stars: 5
      },
      {
        spotId: 15,
        userId: 2,
        review: "The spot was decent, but the price seemed a bit high for what it offered. Overall, an average experience.",
        stars: 3
      },
      {
        spotId: 19,
        userId: 2,
        review: "The spot was okay, but nothing special. Found it a bit overpriced for what it offered. Probably wouldn't stay here again.",
        stars: 3
      },
      {
        spotId: 1,
        userId: 3,
        review: "Absolutely loved my stay at this cozy spot! The location was perfect and the amenities provided were excellent. Would definitely recommend to anyone visiting the area.",
        stars: 5
      },
      {
        spotId: 6,
        userId: 3,
        review: "The spot was okay, but nothing extraordinary. Found it a bit overpriced for what it offered. Probably wouldn't stay here again.",
        stars: 3
      },
      {
        spotId: 13,
        userId: 3,
        review: "Overall, a pleasant stay. The spot was clean and the location was convenient. However, some amenities were outdated.",
        stars: 3
      },
      {
        spotId: 1,
        userId: 3,
        review: "The spot was clean and comfortable, with a nice view of the surroundings. However, it lacked some basic amenities. Overall, an average experience.",
        stars: 3
      },
      {
        spotId: 2,
        userId: 3,
        review: "Had a pleasant stay at this spot. The location was convenient and the spot had everything we needed for a relaxing vacation. Would recommend!",
        stars: 4
      },
      {
        spotId: 3,
        userId: 3,
        review: "Enjoyed our time at this spot. The host was welcoming and the spot was clean. However, some amenities could be improved. Overall, a good experience.",
        stars: 4
      },
      {
        spotId: 20,
        userId: 3,
        review: "Absolutely loved this spot! Everything was perfect, from the location to the amenities. Will definitely be returning!",
        stars: 5
      },
      {
        spotId: 5,
        userId: 4,
        review: "The spot was decent, but not as expected. Some amenities were lacking and the cleanliness could be improved. Overall, an average experience.",
        stars: 3
      },
      {
        spotId: 6,
        userId: 4,
        review: "Had a pleasant stay at this spot. The location was convenient and the spot had everything needed for a comfortable stay. Would recommend!",
        stars: 4
      },
      {
        spotId: 7,
        userId: 4,
        review: "Enjoyed our time at this spot. The host was welcoming and the spot was clean. However, some amenities could be improved. Overall, a good experience.",
        stars: 4
      },
      {
        spotId: 20,
        userId: 4,
        review: "Absolutely loved this spot! Everything was perfect, from the location to the amenities. Will definitely be returning!",
        stars: 5
      },
      {
        spotId: 4,
        userId: 4,
        review: "Unfortunately, our experience at this spot was not great. The cleanliness was subpar, and some amenities were not as described. The host was unresponsive to our complaints as well. Would not recommend.",
        stars: 2
      },
      {
        spotId: 13,
        userId: 4,
        review: "Had a terrible experience at this spot. The cleanliness was unacceptable and the amenities were in poor condition. Would not recommend.",
        stars: 1
      },
      {
        spotId: 17,
        userId: 4,
        review: "We had a wonderful time at this spot! The host was very friendly and the spot had everything we needed. Will definitely be returning!",
        stars: 5
      },
      {
        spotId: 2,
        userId: 5,
        review: "Had a wonderful time at this rental spot. The view from the balcony was breathtaking and the interior decor was charming. The host was also very responsive to our inquiries. Will definitely be coming back!",
        stars: 4
      },
      {
        spotId: 7,
        userId: 5,
        review: "The spot was clean and comfortable, but lacked some basic amenities. The location was convenient though. Overall, an average experience.",
        stars: 3
      },
      {
        spotId: 10,
        userId: 5,
        review: "The spot was nice and cozy, perfect for a weekend getaway. The host was also very accommodating. Would recommend!",
        stars: 4
      },
      {
        spotId: 16,
        userId: 5,
        review: "This spot was perfect for our vacation! The location was great and the amenities were top-notch. Would highly recommend!",
        stars: 5
      },
      {
        spotId: 13,
        userId: 5,
        review: "The spot was clean and comfortable, with a nice view of the surroundings. However, it lacked some basic amenities. Overall, an average experience.",
        stars: 3
      },
      {
        spotId: 14,
        userId: 5,
        review: "Had a pleasant stay at this spot. The location was convenient and the spot had everything we needed for a relaxing vacation. Would recommend!",
        stars: 4
      },
      {
        spotId: 15,
        userId: 5,
        review: "Enjoyed our time at this spot. The host was welcoming and the spot was clean. However, some amenities could be improved. Overall, a good experience.",
        stars: 4
      },
      {
        spotId: 20,
        userId: 1,
        review: "Absolutely loved this spot! Everything was perfect, from the location to the amenities. Will definitely be returning!",
        stars: 5
      },
      {
        spotId: 10,
        userId: 5,
        review: "Had an amazing time at this spot! The location was perfect and the spot had everything we needed for a comfortable stay. Would definitely recommend!",
        stars: 5
      },
      {
        spotId: 17,
        userId: 5,
        review: "The spot was decent, but not as expected. Some amenities were lacking and the cleanliness could be improved. Overall, an average experience.",
        stars: 3
      },
      {
        spotId: 18,
        userId: 5,
        review: "Had a pleasant stay at this spot. The location was convenient and the spot had everything needed for a comfortable stay. Would recommend!",
        stars: 4
      },
      {
        spotId: 19,
        userId: 2,
        review: "Enjoyed our time at this spot. The host was welcoming and the spot was clean. However, some amenities could be improved. Overall, a good experience.",
        stars: 4
      },
      {
        spotId: 20,
        userId: 3,
        review: "Absolutely loved this spot! Everything was perfect, from the location to the amenities. Will definitely be returning!",
        stars: 5
      }
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


/*
review logic:
userID 1 should not leave reviews for spotIds 1, 2, 3, 4
userID 2 should not leave reviews for spotIds 5, 6, 7, 8
userID 3 should not leave reviews for spotIds 9, 10, 11, 12
userID 4 should not leave reviews for spotIds 13, 14, 15
userID 5 should not leave reviews for spotIds 16, 17, 18, 19
userID 6 should not leave reviews for spotIds 20
*/
