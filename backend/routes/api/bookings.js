const express = require("express");
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking, Spot } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();


// get all bookings by current user
router.get("/current", requireAuth, async (req, res) => {
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

  let existingBooking = await Booking.findByPk(bookingId);
  if (!existingBooking) {
    res.status(404);
    return res.json({ "message": "Booking could not be found " });

  } else if (currentUser.id !== existingBooking.userId) {
    res.status(403);
    return res.json({ "message": "Forbidden" });

  } else {
    let { startDate, endDate } = req.body;

    existingBooking = await Booking.findOne({
      where: {
        id: bookingId,
        userId: currentUser.id
      }
    });

    let currentDate = new Date();

    let errors = {};

    if (!startDate) errors.startDate = "Need startDate";
    if (!endDate) errors.endDate = "Need endDate";

    if (new Date(startDate) >= new Date(endDate)) errors.endDate = "endDate cannot be on or before startDate";

    if (Object.keys(errors).length > 0) {
      res.status(400);
      return res.json({
        "message": "Bad Request",
        errors
      });
    }

    let conflictingBookings = await Booking.findAll({
      where: {
        spotId: existingBooking.spotId,
        id: { [Op.ne]: existingBooking.id },
        [Op.or]: [
          {
            startDate: {
              [Op.between]: [startDate, endDate]
            }
          },
          {
            endDate: {
              [Op.between]: [startDate, endDate]
            }
          }
        ]
      }
    });

    if (conflictingBookings.length > 0) {
      res.status(403);
      return res.json({
        "message": "Sorry, this spot is already booked for the specified dates",
        "errors": {
          "startDate": "Start date conflicts with an existing booking",
          "endDate": "End date conflicts with an existing booking"
        }
      });
    }

    if (new Date(existingBooking.endDate) <= currentDate) {
      res.status(403);
      return res.json({ "message": "Past bookings can't be modified" });
    }

    existingBooking.startDate = startDate;
    existingBooking.endDate = endDate;

    await existingBooking.save();
    res.status(200);
    return res.json(existingBooking);
  }
});


// delete a booking
router.delete("/:bookingId", requireAuth, async (req, res) => {
  let currentUser = req.user;
  let bookingId = req.params.bookingId;

  let currentBooking = await Booking.findByPk(bookingId, {
    include: {
      model: Spot,
      required: true
    }
  });

  if (!currentBooking) {
    res.status(404);
    return res.json({ "message": "Booking could not be found" });

  } else if (currentUser.id !== currentBooking.userId && currentUser.id !== currentBooking.Spot.ownerId) {
    res.status(403);
    return res.json({ "message": "Forbidden" });

  } else {
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

    if (currentDate >= new Date(deleteBooking.startDate) &&
      currentDate <= new Date(deleteBooking.endDate)) {
      res.status(403);
      return res.json({ "message": "Bookings that have been started cannot be deleted" });

    } else {
      await deleteBooking.destroy();
      res.status(200);
      return res.json({ "message": "Booking successfully deleted" });
    }
  }
});


module.exports = router;
