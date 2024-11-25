const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');

const router = express.Router();


// find an image by id (own route)
router.get("/:imageId", requireAuth, async (req, res) => {
  let imageId = req.params.imageId;
  let image = await SpotImage.findByPk(imageId);
  res.status(200);
  return res.json(image);
});


// update spot images
router.put("/:imageId", requireAuth, async (req, res) => {
  let currentUser = req.user;
  let imageId = req.params.imageId;
  const { url, preview } = req.body;

  let existingImage = await SpotImage.findByPk(imageId);
  if (!existingImage) {
    res.status(400);
    return res.json({ message: "Spot Image could not be found" });

  } else {
    let spot = await Spot.findOne({
      where: { id: existingImage.spotId }
    });
    if (currentUser.id !== spot.ownerId) {
      res.status(403);
      return res.json({ message: "Forbidden" });

    } else {
      existingImage = await SpotImage.findOne({
        where: { id: imageId }
      })
      existingImage.url = url;
      existingImage.preview = preview;

      await existingImage.save();
      res.status(200);
      return res.json(existingImage);
    }
  }
});

// delete an image for a spot belonging to current user
router.delete("/:imageId", requireAuth, async (req, res) => {
  let currentUser = req.user;
  let imageId = req.params.imageId;

  let image = await SpotImage.findByPk(imageId);
  if (!image) {
    res.status(404);
    return res.json({ message: "Spot Image could not be found" });

  } else {
    let spot = await Spot.findOne({
      where: { id: image.spotId }
    });

    if (currentUser.id !== spot.ownerId) {
      res.status(403);
      return res.json({ message: "Forbidden" });

    } else {
      let deleteImage = await SpotImage.findOne({
        where: { id: imageId },
        include: [
          {
            model: Spot,
            as: "SpotImages",
            where: { ownerId: currentUser.id }
          }
        ]
      });

      await deleteImage.destroy();
      res.status(200);
      return res.json({ message: "Spot Image successfully deleted" });
    }
  }
});


module.exports = router;
