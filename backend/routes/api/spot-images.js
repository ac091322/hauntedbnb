const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');

const router = express.Router();


// find an image by id
router.get("/:imageId", requireAuth, async (req, res) => {
  let imageId = req.params.imageId;
  let image = await SpotImage.findByPk(imageId);
  res.status(200);
  return res.json(image);
})


// delete an image for a spot belonging to current user
router.delete("/:imageId", requireAuth, async (req, res) => {
  let currentUser = req.user;
  let imageId = req.params.imageId;

  let deleteImage = await SpotImage.findOne({
    where: {
      id: imageId,
    },
    include: [
      {
        model: Spot,
        as: "SpotImages",
        where: {
          ownerId: currentUser.id
        }
      },
    ]
  });

  if (!deleteImage) {
    res.status(404);
    return res.json({ "message": "Spot Image could not be found" });
  } else {
    await deleteImage.destroy();
    res.status(200);
    return res.json({ "message": "Spot Image successfully deleted" });
  }
});


module.exports = router;
