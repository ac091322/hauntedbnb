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
      { model: Spot },
      {
        model: ReviewImage,
        attributes: ["id", "url"]
      }
    ]
  });

  res.status(200);
  return res.json({ "Reviews": reviews });
});


// edit an existing review
router.put("/:reviewId", async (req, res) => {
  let currentUser = req.user;
  let reviewId = req.params.reviewId;

  let { review, stars } = req.body;
  let editReview = await Review.findOne({
    where: {
      id: reviewId,
      userId: currentUser.id
    }
  });

  if (!editReview) {
    res.status(404);
    return res.json({ "message": "Review could not be found" });
  }

  let errors = {};
  if (!review) errors.review = "Review text is required";
  if (!stars) errors.stars = "Stars must be an integer from 1 to 5";
  if (Object.keys(errors).length > 0) {
    res.status(400);
    return res.json({
      "message": "Bad Request",
      errors
    });
  }

  editReview.review = review;
  editReview.stars = stars;

  await editReview.save();
  res.status(200);
  return res.json(editReview);
});


// add an image to a review
router.post("/:reviewId/images", async (req, res) => {
  let currentUser = req.user;
  let reviewId = req.params.reviewId;

  let review = await Review.findOne({
    where: {
      id: reviewId,
      userId: currentUser.id
    }
  });

  let { url } = req.body;

  if (!review) {
    res.status(404);
    return res.json({ "message": "Review could not be found" });
  }

  let imageCount = await ReviewImage.count({
    where: { reviewId: reviewId }
  });

  if (imageCount <= 9) {

    let postImage = await ReviewImage.create({
      reviewId, url
    });

    res.status(200);
    return res.json({
      reviewImageId: postImage.id,
      reviewId: review.id,
      userId: currentUser.id,
      spotId: review.spotId,
      review: review.review,
      stars: review.stars,
      url: url,
      createdAt: postImage.createdAt,
      updatedAt: postImage.updatedAt
    });
  } else {
    res.status(403);
    return res.json({ "message": "Maximum number of images for this resource reached" });
  }
});


// delete a review belonging to current user
router.delete("/:reviewId", async (req, res) => {
  let currentUser = req.user;
  let reviewId = req.params.reviewId;

  let deleteReview = await Review.findOne({
    where: {
      id: reviewId,
      userId: currentUser.id
    }
  });

  if (!deleteReview) {
    res.status(404);
    return res.json({ "message": "Review could not be found" });
  } else {
    await deleteReview.destroy();
    res.status(200);
    return res.json({ "message": "Review successfully deleted" });
  }
});


module.exports = router;
