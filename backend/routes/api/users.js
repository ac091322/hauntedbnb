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


//find all users
router.get("/all", async (req, res) => {
  let allUsers = await User.findAll();
  res.status(200);
  return res.json(allUsers);
});


// delete all users by dropping table
// bad because this prevents seeding new data
router.delete("/delete", async (req, res) => {
  await User.drop();  // drops table
  await User.sync();  // recreates table using same schema
  res.status(200);
  return res.json({ message: "All users deleted" });
});


// sign up
router.post('/', validateSignup, async (req, res) => {
  const { username, email, firstName, lastName, password, } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({ username, email, firstName, lastName, hashedPassword });

  const safeUser = {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser
  });
});


module.exports = router;
