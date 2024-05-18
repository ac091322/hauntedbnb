const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review, ReviewImage, Spot, User } = require('../../db/models');

const router = express.Router();


// get all reviews of current user
router.get("/current", requireAuth, async (req, res) => {
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
router.put("/:reviewId", requireAuth, async (req, res) => {
  let currentUser = req.user;
  let reviewId = req.params.reviewId;

  let { review, stars } = req.body;

  let existingReview = await Review.findByPk(reviewId);
  if (!existingReview) {
    res.status(404);
    return res.json({ "message": "Review could not be found" });

  } else if (currentUser.id !== existingReview.userId) {
    res.status(403);
    return res.json({ "message": "Forbidden" });

  } else {

    let editReview = await Review.findOne({
      where: {
        id: reviewId,
        userId: currentUser.id
      }
    });

    editReview.review = review;
    editReview.stars = stars;

    let errors = {};
    if (!review) errors.review = "Review text is required";
    if (!stars || isNaN(stars) || stars > 5 || stars < 1) errors.stars = "Stars must be an integer from 1 to 5";
    if (Object.keys(errors).length > 0) {
      res.status(400);
      return res.json({
        "message": "Bad Request",
        errors
      });
    }

    await editReview.save();
    res.status(200);
    return res.json(editReview);
  }
});


// add an image to a review
router.post("/:reviewId/images", requireAuth, async (req, res) => {
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
router.delete("/:reviewId", requireAuth, async (req, res) => {
  let currentUser = req.user;
  let reviewId = req.params.reviewId;

  let existingReview = await Review.findByPk(reviewId);
  if (!existingReview) {
    res.status(404);
    return res.json({ "message": "Review could not be found" });

  } else if (currentUser.id !== existingReview.userId) {
    res.status(403);
    return res.json({ "message": "Forbidden" });

  } else {
    let deleteReview = await Review.findOne({
      where: {
        id: reviewId,
        userId: currentUser.id
      }
    });

    await deleteReview.destroy();
    res.status(200);
    return res.json({ "message": "Review successfully deleted" });
  }
});


module.exports = router;
