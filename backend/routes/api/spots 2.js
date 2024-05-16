const express = require('express')
const { Spot, User, SpotImage } = require('../../db/models');
const router = express.Router();


// get spot by current user
router.get("/current", async (req, res) => {
  let currentUser = req.user;
  let spots = await Spot.findAll({
    where: {
      ownerId: currentUser.id
    }
  })
  res.status(200);
  return res.json({ "Spots": spots });
});


// get all spots
router.get("/", async (req, res) => {
  let allSpots = await Spot.findAll();
  res.status(200);
  return res.json({ "Spots": allSpots });
});


// get spot by spotId
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
  res.status(200);
  return res.json(spot);
});


//create a spot belonging to the current user
router.post("/", async (req, res) => {
  let currentUser = req.user;
  let { address, city, state, country, lat, lng, name, description, price } = req.body;

  let errors = {};
  if (!address) errors.address = "Street address is required";
  if (!city) errors.city = "City is required";
  if (!state) errors.state = "State is required";
  if (!country) errors.country = "Countryt is required";
  if (!lat || isNaN(lat)) errors.lat = "Latitude is invalid";
  if (!lng || isNaN(lng)) errors.lng = "Longitude is invalid";
  if (!name) errors.name = "Name must be less than 50 characters";
  if (!description) errors.description = "Description is required";
  if (!price || isNaN(price)) errors.price = "Price per day is required";

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
router.put("/:spotId", async (req, res) => {
  let currentUser = req.user;
  let spotId = req.params.spotId;
  let { address, city, state, country, lat, lng, name, description, price } = req.body;
  let editSpot = await Spot.findOne({
    where: {
      id: spotId,
      ownerId: currentUser.id
    }
  });

  if (!editSpot) {
    res.status(404);
    return res.json({ "message": "Spot could not be found" });
  }

  let errors = {};
  if (!address) errors.address = "Street address is required";
  if (!city) errors.city = "City is required";
  if (!state) errors.state = "State is required";
  if (!country) errors.country = "Countryt is required";
  if (!lat || isNaN(lat)) errors.lat = "Latitude is invalid";
  if (!lng || isNaN(lng)) errors.lng = "Longitude is invalid";
  if (!name) errors.name = "Name must be less than 50 characters";
  if (!description) errors.description = "Description is required";
  if (!price || isNaN(price)) errors.price = "Price per day is required";

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
  return res.json(editSpot);
});


// // add an image to a spot
router.post("/:spotId/images", async (req, res) => {
  let currentUser = req.user
  let spotId = req.params.spotId;

  let spot = await Spot.findOne({
    where: {
      id: spotId,
      ownerId: currentUser.id
    }
  });

  if (!spot) {
    res.status(404);
    return res.json({ "message": "Spot could not be found" });
  }

  let { url, preview } = req.body;
  let postImage = await SpotImage.create({
    spotId, url, preview
  });
  // console.log(postImage)
  res.status(200);
  return res.json({
    id: postImage.id,
    url: postImage.url,
    preview: postImage.preview
  });
});


// delete a spot belonging to current user
router.delete("/:spotId", async (req, res) => {
  let currentUser = req.user;
  let spotId = req.params.spotId;
  let deleteSpot = await Spot.findOne({
    where: {
      id: spotId,
      ownerId: currentUser.id
    }
  });
  if (!deleteSpot) {
    res.status(404);
    return res.json({ "message": "Spot could not be found" });
  }
  await deleteSpot.destroy();
  res.status(200);
  return res.json({ "message": "Spot successfully deleted" });
});


module.exports = router;
