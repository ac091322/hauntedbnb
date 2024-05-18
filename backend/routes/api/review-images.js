const express = require("express");
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review, ReviewImage, User } = require("../../db/models");

const router = express.Router();


// delete an image for a review belonging to current user
router.delete("/:imageId", requireAuth, async (req, res) => {
  let currentUser = req.user;
  let imageId = req.params.imageId;

  let image = await ReviewImage.findByPk(imageId)
  if (!image) {
    res.status(404);
    return res.json({ "message": "Review Image could not be found" });




  } else {
    let review = await Review.findOne({
      where: { id: review.userId }
    });

    if (currentUser.id !== review.userId) {
      res.status(403);
      return res.json({ "message": "Forbidden" });

    } else {
      let deleteImage = await ReviewImage.findOne({
        where: { id: imageId },
        include: [
          {
            model: Review,
            where: { userId: currentUser.id }
          }
        ]
      });

      await deleteImage.destroy();
      res.status(200);
      return res.json({ "message": "Review image successfully deleted" });
    }
  }
});


module.exports = router;
