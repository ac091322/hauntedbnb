const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');
const router = express.Router();


const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Username must be 4 characters or more'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more'),
  handleValidationErrors
];


// sign up
router.post(
  '/',
  async (req, res) => {
    const { email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, hashedPassword });

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);


//find all users
router.get("/all", async (req, res) => {
  let allUsers = await User.findAll();
  res.status(200);
  return res.json(allUsers);
});


// delete a user
router.delete("/:userId", async (req, res) => {
  let userId = req.params.userId;
  let deleteUser = await User.findByPk(userId);
  await deleteUser.destroy();
  res.status(200);
  return res.json({ "message": `User of the id ${userId} was deleted` });
});


module.exports = router;
