const express = require("express");
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking, Spot } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();


// get all bookings by current user
router.get("/:bookings/", requireAuth, async (req, res) => {
  let currentUser = req.user;

  let bookings = await Booking.findAll({
    where: { userId: currentUser.id },
    include: [
      {
        model: Spot,
        attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price", "previewImage"]
      }
    ]
  });

  res.status(200);
  return res.json({ "Bookings": bookings });
});


// edit a booking belonging to current user
router.put("/:bookingId", requireAuth, async (req, res) => {
  let currentUser = req.user;
  let bookingId = req.params.bookingId;

  let { startDate, endDate } = req.body;

  let editBooking = await Booking.findOne({
    where: {
      id: bookingId,
      userId: currentUser.id
    }
  });

  let currentDate = new Date();

  let errors = {};

  if (!startDate) errors.startDate = "Need startDate";
  if (!endDate) errors.endDate = "Need endDate";

  if (Object.keys(errors).length > 0) {
    res.status(400);
    return res.json({
      "message": "Bad Request",
      errors
    });
  }

  if (!editBooking) {
    res.status(404);
    return res.json({ "message": "Booking could not be found " });

  } else if (new Date(startDate) >= new Date(endDate)) {
    errors.endDate = "endDate cannot be on or before startDate";
    res.status(400);
    return res.json({
      "message": "Bad Request",
      errors
    });

  } else if (new Date(startDate) >= new Date(editBooking.startDate) &&
    new Date(startDate) <= new Date(editBooking.endDate)) {
    errors.startDate = "Start date conflicts with an existing booking";
    res.status(403);
    return res.json({
      "message": "Sorry, this spot is already booked for the specified dates",
      errors
    });

  } else if (new Date(endDate) >= new Date(editBooking.startDate) &&
    new Date(startDate) <= new Date(editBooking.endDate)) {
    errors.endDate = "End date conflicts with an existing booking";
    res.status(403);
    return res.json({
      "message": "Sorry, this spot is already booked for the specified dates",
      errors
    });

  } else if (new Date(editBooking.endDate) <= currentDate) {
    res.status(403);
    return res.json({ "message": "Past bookings can't be modified" });

  } else {
    editBooking.startDate = startDate;
    editBooking.endDate = endDate;

    await editBooking.save();
    res.status(200);
    return res.json(editBooking);
  }
});


// delete a booking
router.delete("/:bookingId", requireAuth, async (req, res) => {
  let currentUser = req.user;
  let bookingId = req.params.bookingId;

  let deleteBooking = await Booking.findOne({
    where: {
      id: bookingId,
      [Op.or]: [
        { userId: currentUser.id },
        { "$Spot.ownerId$": currentUser.id }
      ]
    },
    include: [{
      model: Spot,
      required: true
    }]
  });

  let currentDate = new Date();

  if (!deleteBooking) {
    res.status(404);
    return res.json({ "message": "Booking could not be found" });
  } else if (currentDate >= new Date(deleteBooking.startDate)) {
    res.status(403);
    return res.json({ "message": "Bookings that have been started cannot be deleted" })
  } else {
    await deleteBooking.destroy();
    res.status(200);
    return res.json({ "message": "Booking successfully deleted" });
  }
});


module.exports = router;
