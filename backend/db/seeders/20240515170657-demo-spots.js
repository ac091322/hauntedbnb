'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spots";
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "13 Rue Toulouse",
        city: "New Orleans",
        state: "LA",
        country: "USA",
        lat: 29.9330,
        lng: -90.0756,
        name: "Unveiling Whispers: The Blackwood Manor",
        description: "Dare to step into the captivating, yet eerily silent, Blackwood Manor. Nestled in the heart of New Orleans' historic Garden District, this meticulously restored Victorian mansion holds secrets beneath its ornate facade. Soaring ceilings and intricate moldings cast long shadows, while rich hardwood floors creak with whispers of the past. Four spacious guest rooms await, each elegantly appointed with period furniture and plush bedding. But will sleep find you? Or will you be kept awake by the unseen residents who linger within these walls? Unwind by a crackling fireplace in the grand parlor, if you dare.  Indulge in a cup of tea in the sunroom overlooking the lush courtyard, but keep an eye out for fleeting shadows that flit across the glass. Explore the hidden nooks and crannies of this captivating residence, but remember, you may not be alone. Blackwood Manor offers a unique experience, perfect for those seeking a taste of history... and perhaps a brush with the unknown.",
        price: 260
      },
      {
        ownerId: 1,
        address: "113 Gallows Hill Road",
        city: "Hancock",
        state: "NY",
        country: "USA",
        lat: 44.7872,
        lng: -68.0128,
        name: "Hollow Creek Asylum",
        description: "Eerie silence hangs heavy in the air, broken only by the creak of floorboards underfoot and the unsettling sigh of the wind whistling through shattered windows. As you explore the deserted corridors of the abandoned Hollow Creek Asylum, a shiver crawls down your spine. The peeling wallpaper whispers forgotten stories, and the shadows seem to writhe with unseen movement. Here, in this crumbling monument to a bygone era of medicine, you'll swear you can feel the weight of countless anguished souls who once walked these very paths. Dare you spend a night in this paranormal playground? Just be prepared for the whispers in the dark...",
        price: 790
      },
      {
        ownerId: 1,
        address: "13 Grim Pike Lane",
        city: "Thurmond",
        state: "WV",
        country: "USA",
        lat: 37.8000,
        lng: -81.2333,
        name: "Crimson Hook Slaughter",
        description: "Nestled in the forgotten shadows of Shanksville, West Virginia, the Crimson Hook Slaughter stands as a chilling monument to a bygone era.  Erected in the late 18th century, the slaughterhouse processed countless souls before its closure in the early 1900s.  Legends of mistreated cattle and whispers of unexplained accidents linger in the decaying timber.  The locals avoid the area, their fear a palpable presence that chills you to the bone.  Now, the slaughterhouse awaits...could it be your next eerie escape? But be warned, the rumors of restless spirits and lingering moans may not be mere whispers.  The Crimson Hook Slaughter promises a hauntingly unforgettable stay,  but only for the brave souls who dare to unlock its dark secrets.",
        price: 65
      },
      {
        ownerId: 1,
        address: "1313 Hickory Ln",
        city: "Phoenix",
        state: "AZ",
        country: "USA",
        lat: 33.4484,
        lng: -112.0740,
        name: "Desert Oasis in Phoenix",
        description: "A beautiful desert oasis with a pool.",
        price: 240.00
      },
      {
        ownerId: 1,
        address: "404 Spruce St",
        city: "Austin",
        state: "TX",
        country: "USA",
        lat: 30.2672,
        lng: -97.7431,
        name: "Eclectic Home in Austin",
        description: "An eclectic home with a unique charm.",
        price: 320
      },
      {
        ownerId: 2,
        address: " 679 Blackwood Lane",
        city: "Sleepy Hollow",
        state: "NY",
        country: "USA",
        lat: 41.1345,
        lng: -73.8917,
        name: "Sleepy Hollow's Secret: The Crypt Awaits",
        description: "Descend into a bygone era at the Whispering Crypt, a hauntingly beautiful bed and breafast nestled beneath a forgotten chapel. This captivating crypt offers a unique accommodation experience, steeped in history and a touch of the otherworldly. Explore the labyrinthine corridors, adorned with weathered stone and cryptic symbols, and lose yourself in the captivating atmosphere.",
        price: 350
      },
      {
        ownerId: 2,
        address: "909 Cypress Ave",
        city: "Nashville",
        state: "TN",
        country: "USA",
        lat: 36.1627,
        lng: -86.7816,
        name: "Music City Condo in Nashville",
        description: "A condo located in the heart of Music City.",
        price: 790.00
      },
      {
        ownerId: 2,
        address: "1414 Poplar St",
        city: "Charlotte",
        state: "NC",
        country: "USA",
        lat: 35.2271,
        lng: -80.8431,
        name: "Elegant Apartment in Charlotte",
        description: "An elegant apartment in a prime location.",
        price: 190
      },
      {
        ownerId: 2,
        address: "789 Oak Dr",
        city: "Chicago",
        state: "IL",
        country: "USA",
        lat: 41.8781,
        lng: -87.6298,
        name: "Charming Bungalow in Chicago",
        description: "A charming bungalow perfect for a weekend getaway.",
        price: 130.00
      },
      {
        ownerId: 2,
        address: "505 Aspen Ave",
        city: "Denver",
        state: "CO",
        country: "USA",
        lat: 39.7392,
        lng: -104.9903,
        name: "Mountain Retreat in Denver",
        description: "A cozy retreat near the mountains.",
        price: 205
      },
      {
        ownerId: 3,
        address: "130 Coffin Gate Avenue",
        city: "St. Augustine",
        state: "Florida",
        country: "USA",
        lat: 29.89,
        lng: 81.31,
        name: "The Wysteria",
        description: "Step into a bygone era at The Wysteria, a meticulously restored Victorian gem nestled amidst a bustling modern city. Its crimson brick facade, adorned with delicate white trim and overflowing wisteria vines, whispers of a bygone elegance. But beneath the surface, a darker history lingers. The Wysteria Manor isn't for the faint of heart. It's a place where the veil between worlds seems thin, where shadows dance with a life of their own, and the air is thick with the scent of forgotten memories. Are you brave enough to become part of its chilling legacy?",
        price: 1500
      },
      {
        ownerId: 3,
        address: "1515 Magnolia Blvd",
        city: "Houston",
        state: "TX",
        country: "USA",
        lat: 29.7604,
        lng: -95.3698,
        name: "Spacious Home in Houston",
        description: "A spacious home perfect for large groups.",
        price: 3270
      },
      {
        ownerId: 3,
        address: "101 Pine St",
        city: "Los Angeles",
        state: "CA",
        country: "USA",
        lat: 34.0522,
        lng: -118.2437,
        name: "Luxury Condo in LA",
        description: "A luxurious condo with a beautiful city view.",
        price: 300
      },
      {
        ownerId: 3,
        address: "606 Willow Ln",
        city: "Portland",
        state: "OR",
        country: "USA",
        lat: 45.5152,
        lng: -122.6784,
        name: "Chic Studio in Portland",
        description: "A chic studio apartment in the trendy district.",
        price: 60
      },
      {
        ownerId: 3,
        address: "1111 Fir St",
        city: "Philadelphia",
        state: "PA",
        country: "USA",
        lat: 39.9526,
        lng: -75.1652,
        name: "Quaint Home in Philadelphia",
        description: "A quaint home near historic sites.",
        price: 970.00
      },
      {
        ownerId: 4,
        address: "Point Reyes National Seashore",
        city: "Bodega Bay",
        state: "CA",
        country: "USA",
        lat: 38.3332,
        lng: -123.0481,
        name: "The Harbinger of Despair",
        description: "Experience the chilling allure of The Harbinger of Despair, a once-luxurious cruise liner forever moored off the coast of Bodega Bay, California. Its opulent halls are now silent tombs, whispers of tragedy clinging to the decaying grandeur. Legends of a doomed voyage and restless spirits linger in the salty air. Dare to embark on a paranormal adventure unlike any other.",
        price: 800
      },
      {
        ownerId: 4,
        address: "202 Cedar St",
        city: "Miami",
        state: "FL",
        country: "USA",
        lat: 25.7617,
        lng: -80.1918,
        name: "Beachfront Villa in Miami",
        description: "A luxurious beachfront villa with stunning ocean views.",
        price: 400
      },

      {
        ownerId: 4,
        address: "606 Ocean Ave",
        city: "Santa Monica",
        state: "CA",
        country: "USA",
        lat: 34.0094,
        lng: -118.4965,
        name: "Beachfront Condo in Santa Monica",
        description: "A luxurious beachfront condo with stunning ocean views.",
        price: 400
      },
      {
        ownerId: 4,
        address: "909 Palm St",
        city: "Miami",
        state: "FL",
        country: "USA",
        lat: 25.7824,
        lng: -80.2988,
        name: "Modern Apartment in Miami",
        description: "A modern apartment located in the heart of Miami.",
        price: 450
      },
      {
        ownerId: 4,
        address: "550 Bluecrest Way",
        city: "Newport Beach",
        state: "CA",
        country: "USA",
        lat: 34.0094,
        lng: -118.4965,
        name: "Cliffhouse in Newport Beach",
        description: "A beautiful cliffhouse overlooing the bay.",
        price: 700
      },
      // {
      //   ownerId: 5,
      //   address: "123 Seeder Blvd",
      //   city: "Union City",
      //   state: "CA",
      //   country: "USA",
      //   lat: 34.0094,
      //   lng: -118.4965,
      //   name: "A seeder spot where I live",
      //   description: "This is a fake spot that you should book.",
      //   price: 100
      // },
      // {
      //   ownerId: 5,
      //   address: "699 Fake Ave",
      //   city: "Millbrae",
      //   state: "CA",
      //   country: "USA",
      //   lat: 34.0094,
      //   lng: -118.4965,
      //   name: "The city where I used to work.",
      //   description: "I used to work in this over-priced city across the Bay.",
      //   price: 980
      // },
      // {
      //   ownerId: 5,
      //   address: "911 Police St",
      //   city: "Oakland",
      //   state: "CA",
      //   country: "USA",
      //   lat: 34.0094,
      //   lng: -118.4965,
      //   name: "Nice quiet spot in Oakland.",
      //   description: "No shootings nearby, it's safe to book.",
      //   price: 10
      // },
      // {
      //   ownerId: 5,
      //   address: "000 Nonexistent Ln",
      //   city: "Fremont",
      //   state: "CA",
      //   country: "USA",
      //   lat: 34.0094,
      //   lng: -118.4965,
      //   name: "Fake address.",
      //   description: "I don't think this address even exists.",
      //   price: 10
      // },
      // {
      //   ownerId: 5,
      //   address: "999 Last Seeder Ct",
      //   city: "Santa Cruz",
      //   state: "CA",
      //   country: "USA",
      //   lat: 34.0094,
      //   lng: -118.4965,
      //   name: "Fake house by the sea.",
      //   description: "Overlooking the bay, this fake spot is incredible.",
      //   price: 610
      // }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
