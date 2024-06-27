const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User, Booking } = require('../../db/models');
const { Op } = require('sequelize');
const router = express.Router();


// get spot by current user
router.get("/current", requireAuth, async (req, res) => {
  let currentUser = req.user;
  let spots = await Spot.findAll({
    where: {
      ownerId: currentUser.id
    }
  });
  res.status(200);
  return res.json({ "Spots": spots });
});


// get all bookings of a spot by spotId
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  let currentUser = req.user;
  let spotId = req.params.spotId;

  let spot = await Spot.findOne({
    where: { id: spotId }
  });

  if (!spot) {
    res.status(404);
    return res.json({ "message": "Spot could not be found" });
  }

  let bookings;
  if (spot.ownerId === currentUser.id) {
    bookings = await Booking.findAll({
      where: { spotId: spotId },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"]
        }
      ]
    });

    res.status(200);
    return res.json({ "Bookings": bookings })

  } else {
    bookings = await Booking.findAll({
      where: { spotId: spotId },
      attributes: ["spotId", "startDate", "endDate"]
    });

    res.status(200);
    return res.json({ "Bookings": bookings });
  }
});


// get all spots
router.get("/", async (req, res) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
  let pagination = {};
  let where = {};
  let errors = {};

  if (!page) {
    page = 1;
  } else if (isNaN(page)) {
    errors.page = "Page must be an integer";
  }

  if (!size) {
    size = 25;
  } else if (isNaN(size)) {
    errors.size = "Size must be an integer";
  }

  if (page <= 0) errors.page = "Page must be greater than or equal to 1";
  if (size <= 0 || size > 25) errors.size = "Size must be greater than or equal to 1 and less than or equal to 25";

  page = parseInt(page);
  size = parseInt(size);
  pagination.limit = size;
  pagination.offset = size * (page - 1);

  if (minLat) {
    if (!isNaN(minLat)) {
      where.lat = { ...where.lat, [Op.gte]: parseFloat(minLat) };
    } else {
      errors.minLat = "Minimum latitude is invalid";
    }
  }

  if (maxLat) {
    if (!isNaN(maxLat)) {
      where.lat = { ...where.lat, [Op.lte]: parseFloat(maxLat) };
    } else {
      errors.maxaLat = "Maximum latitude is invalid";
    }
  }

  if (minLng) {
    if (!isNaN(minLng)) {
      where.lng = { ...where.lng, [Op.gte]: parseFloat(minLng) };
    } else {
      errors.minLng = "Minimum longitude is invalid";
    }
  }

  if (maxLng) {
    if (!isNaN(maxLng)) {
      where.lng = { ...where.lng, [Op.lte]: parseFloat(maxLng) };
    } else {
      errors.maxLng = "Maximum longitude is invalid";
    }
  }

  if (minPrice) {
    if (!isNaN(minPrice) && minPrice >= 0) {
      where.price = { ...where.price, [Op.gte]: parseFloat(minPrice) };
    } else {
      errors.minPrice = "Minimum price must be greater than or equal to 0";
    }
  }

  if (maxPrice) {
    if (!isNaN(maxPrice) && maxPrice >= 0) {
      where.price = { ...where.price, [Op.lte]: parseFloat(maxPrice) };
    } else {
      errors.maxPrice = "Maximum price must be greater than or equal to 0"
    }
  }

  if (Object.keys(errors).length > 0) {
    res.status(400);
    return res.json({
      "message": "Bad Request",
      errors
    });
  }

  let allSpots = await Spot.findAll({
    where,
    ...pagination,
    include: [
      { model: SpotImage },
      { model: Review }
    ],
  });

  let totalSpots = await Spot.count({});
  let returnedSpots = allSpots.length;

  for (let spot of allSpots) {
    let spotId = spot.id;

    let numReviews = await Review.count({ where: { spotId } });
    let findSumOfStarRatings = await Review.findOne({
      attributes: [
        [Spot.sequelize.literal("SUM(stars)"), "totalStars"]
      ],
      where: { spotId }
    });

    let sumOfStarRating = findSumOfStarRatings.dataValues.totalStars;
    let numberOfStarRatings = numReviews;

    let avgStarRating = numberOfStarRatings > 0 ? Math.round((sumOfStarRating / numberOfStarRatings) * 10) / 10 : 0;

    spot.dataValues.numReviews = numReviews;
    spot.dataValues.avgStarRating = avgStarRating;
  }

  res.status(200);
  return res.json({
    "Spots": allSpots,
    page,
    size,
    returnedSpots,
    totalSpots
  });
});


// get details of a spot by spotId
router.get("/:spotId", async (req, res) => {
  let spotId = req.params.spotId;

  let spot = await Spot.findByPk(spotId, {
    attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "description", "price", "createdAt", "updatedAt"],
    include: [
      {
        model: SpotImage,
        as: "SpotImages",
        attributes: ["id", "url", "preview"]
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"]
      }
    ],
  });

  if (!spot) {
    res.status(404);
    return res.json({ "message": "Spot could not be found" });
  }

  let numReviews = await Review.aggregate("spotId", "count", { where: { spotId } });
  let findSumOfStarRatings = await Review.findOne({
    attributes: [
      [Spot.sequelize.literal("SUM(stars)"), "totalStars"]
    ],
    where: {
      spotId: spot.id
    }
  });

  let sumOfStarRating = findSumOfStarRatings.dataValues.totalStars
  let numberOfStarRatings = await Review.count({
    where: {
      spotId: spot.id
    }
  });

  let avgStarRating = Math.round((sumOfStarRating / numberOfStarRatings) * 10) / 10;

  spot.dataValues.numReviews = numReviews;
  spot.dataValues.avgStarRating = avgStarRating;

  res.status(200);
  return res.json(spot);
});


//get all reviews of a spot
router.get("/:spotId/reviews", async (req, res) => {
  let spotId = req.params.spotId;
  let spot = await Spot.findByPk(spotId);

  if (!spot) {
    res.status(404);
    return res.json({ "message": "Spot could not be found" });
  }

  let reviews = await Review.findAll({
    where: { spotId: spotId },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"]
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"]
      }
    ]
  });

  res.status(200);
  return res.json({ "Reviews": reviews });
});


//create a spot belonging to the current user
router.post("/", requireAuth, async (req, res) => {
  let currentUser = req.user;

  let { address, city, state, country, lat, lng, name, description, price } = req.body;

  let errors = {};
  if (!address) errors.address = "Street address is required";
  if (!city) errors.city = "City is required";
  if (!state) errors.state = "State is required";
  if (!country) errors.country = "Countryt is required";
  if (!lat || isNaN(lat)) errors.lat = "Latitude is invalid";
  if (!lng || isNaN(lng)) errors.lng = "Longitude is invalid";
  if (!name || name.length > 50) errors.name = "Name must be less than 50 characters";
  if (!description) errors.description = "Description is required";
  if (!price || isNaN(price) || price < 0) errors.price = "Price per day is required and must be a number equal to or greater than 0";

  if (Object.keys(errors).length > 0) {
    res.status(400);
    return res.json({
      "message": "Bad Request",
      errors
    });
  }

  let createSpot = await Spot.create({
    ownerId: currentUser.id, address, city, state, country, lat, lng, name, description, price
  });

  res.status(201);
  return res.json(createSpot);
});


// edit a spot belonging to current user
router.put("/:spotId", requireAuth, async (req, res) => {
  let currentUser = req.user;
  let spotId = req.params.spotId;

  let existingSpot = await Spot.findByPk(spotId);
  if (!existingSpot) {
    res.status(404);
    return res.json({ "message": "Spot could not be found" });

  } else if (currentUser.id !== existingSpot.ownerId) {
    res.status(403);
    return res.json({ "message": "Forbidden" });

  } else {
    let { address, city, state, country, lat, lng, name, description, price, previewImage } = req.body;

    let editSpot = await Spot.findOne({
      where: {
        id: spotId,
        ownerId: currentUser.id
      }
    });

    let errors = {};
    if (!address) errors.address = "Street address is required";
    if (!city) errors.city = "City is required";
    if (!state) errors.state = "State is required";
    if (!country) errors.country = "Countryt is required";
    if (!lat || isNaN(lat)) errors.lat = "Latitude is invalid";
    if (!lng || isNaN(lng)) errors.lng = "Longitude is invalid";
    if (!name || name.length > 50) errors.name = "Name must be less than 50 characters";
    if (!description) errors.description = "Description is required";
    if (!price || isNaN(price) || price < 0) errors.price = "Price per day is required and must be a number equal to or greater than 0";
    if (!previewImage) errors.previewImage = "Preview image is required";

    if (Object.keys(errors).length > 0) {
      res.status(400);
      return res.json({
        "message": "Bad Request",
        errors
      })
    }

    editSpot.address = address;
    editSpot.city = city;
    editSpot.country = country;
    editSpot.lat = lat;
    editSpot.lng = lng;
    editSpot.name = name;
    editSpot.description = description;
    editSpot.price = price;

    await editSpot.save();
    res.status(200);
    return res.json(editSpot);
  }
});


// add an image to a spot
router.post("/:spotId/images", requireAuth, async (req, res) => {
  let currentUser = req.user
  let spotId = req.params.spotId;

  let existingSpot = await Spot.findByPk(spotId);

  if (!existingSpot) {
    res.status(404);
    return res.json({ "message": "Spot could not be found" });

  } else if (currentUser.id !== existingSpot.ownerId) {
    res.status(403);
    return res.json({ "message": "Forbidden" });

  } else {
    existingSpot = await Spot.findOne({
      where: {
        id: spotId,
        ownerId: currentUser.id
      }
    });

    let { url, preview } = req.body;

    let postImage = await SpotImage.create({
      spotId, url, preview
    });

    res.status(200);
    return res.json({
      id: postImage.id,
      url: postImage.url,
      preview: postImage.preview
    });
  }
});

// create a review for a spot
router.post("/:spotId/reviews", requireAuth, async (req, res) => {
  let currentUser = req.user;
  let spotId = req.params.spotId;

  let spot = await Spot.findOne({
    where: {
      id: spotId,
    }
  });

  if (!spot) {
    res.status(404);
    return res.json({ "message": "Spot could not be found" });
  }

  let existingReview = await Review.findOne({
    where: {
      spotId: spotId,
      userId: currentUser.id
    }
  });

  let { review, stars } = req.body;

  let errors = {};
  if (!review) errors.review = "Review text is required";
  if (!stars || isNaN(stars) || stars > 5 || stars < 1) errors.stars = "Blood drops must be from 1 to 5";
  if (Object.keys(errors).length > 0) {
    res.status(400);
    return res.json({
      "message": "Bad Request",
      errors
    })
  }

  if (existingReview) {
    res.status(500);
    return res.json({ "message": "User already has a review for this spot" });

  } else {
    let createReview = await Review.create({
      spotId, userId: currentUser.id, review, stars
    });
    res.status(201);
    return res.json(createReview);
  }
});


// create a booking for a spot
router.post("/:spotId/bookings", requireAuth, async (req, res) => {
  let currentUser = req.user;
  let spotId = req.params.spotId;

  let spot = await Spot.findOne({
    where: { id: spotId }
  });

  let booking = await Booking.findAll({
    where: { spotId: spotId }
  });

  let { startDate, endDate } = req.body
  let currentDate = new Date();
  let errors = {};

  for (let key in booking) {
    if (new Date(booking[key].startDate) > new Date(startDate) &&
      new Date(booking[key].endDate) < new Date(endDate)) {
      errors.conflicts = "Start date and end date conflict with an existing booking"

    } else if (new Date(booking[key].startDate) <= new Date(startDate) &&
      new Date(booking[key].endDate) >= new Date(endDate)) {
      errors.conflicts = "Start date and end date conflict with an existing booking"

    } else if (new Date(startDate) >= new Date(booking[key].startDate) &&
      new Date(startDate) <= new Date(booking[key].endDate)) {
      errors.startDate = "Start date conflicts with an existing booking";

    } else if (new Date(endDate) >= new Date(booking[key].startDate) &&
      new Date(endDate) <= new Date(booking[key].endDate)) {
      errors.endDate = "End date conflicts with an existing booking";
    }
  }

  if (Object.keys(errors).length > 0) {
    res.status(403);
    return res.json({
      "message": "Sorry, this spot is already booked for the specified dates",
      errors
    });
  }

  if (!spot) {
    res.status(404);
    return res.json({ "message": "Spot could not be found" });

  } else if (spot.ownerId === currentUser.id) {
    res.status(403);
    return res.json({ "message": "You cannot book your own spot" });

  } else if (new Date(startDate) >= new Date(endDate)) {
    errors.endDate = "endDate cannot be on or before startDate";
    res.status(400);
    return res.json({
      "message": "Bad Request",
      errors
    });

  } else if (new Date(startDate) <= currentDate || new Date(endDate) <= currentDate) {
    errors.pastDates = "Cannot book past dates"
    res.status(403);
    return res.json({
      "message": "Bad Request",
      errors
    })

  } else {
    let createBooking = await Booking.create({
      spotId: +spotId, userId: currentUser.id, startDate, endDate
    });
    res.status(200);
    return res.json(createBooking);
  }
});


// delete a spot belonging to current user
router.delete("/:spotId", requireAuth, async (req, res) => {
  let currentUser = req.user;
  let spotId = req.params.spotId;

  let existingSpot = await Spot.findByPk(spotId);
  if (!existingSpot) {
    res.status(404);
    return res.json({ "message": "Spot could not be found" });

  } else if (currentUser.id !== existingSpot.ownerId) {
    res.status(403);
    return res.json({ "message": "Forbidden" });

  } else {
    existingSpot = await Spot.findOne({
      where: {
        id: spotId,
        ownerId: currentUser.id
      }
    });

    await existingSpot.destroy();
    res.status(200);
    return res.json({ "message": "Spot successfully deleted" });
  }
});


module.exports = router;
