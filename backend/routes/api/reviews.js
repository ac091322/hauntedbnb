const express = require('express')
const { Spot, User, Review, ReviewImage } = require('../../db/models');
const router = express.Router();


// get all reviews of current user
router.get("/current", async (req, res) => {
  let currentUser = req.user;
  let reviews = await Review.findAll({
    where: {
      userId: currentUser.id
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"]
      },
      {
        model: Spot
      },
      {
        model: ReviewImage
      }
    ]
  });
  res.status(200);
  return res.json({ "Reviews": reviews });
});


//get all reviews of by spotId





module.exports = router;
