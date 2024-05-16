const express = require("express");
const { Review, ReviewImage } = require("../../db/models");
const router = express.Router();


// delete an image for a review belonging to current user
router.delete("/:imageId", async (req, res) => {
  let currentUser = req.user;
  let imageId = req.params.imageId;

  let deleteImage = await ReviewImage.findOne({
    where: { id: imageId },
    include: [{
      model: Review,
      userId: currentUser.id
    }]
  });

  if (!deleteImage) {
    res.status(404);
    return res.json({ "message": "Review image could not be found" });
  } else {
    await deleteImage.destroy();
    res.status(200);
    return res.json({ "message": "Review image successfully deleted" });
  }
});


module.exports = router;
