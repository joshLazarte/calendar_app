const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  User = require("../models/Users"),
  jwt = require("jsonwebtoken"),
  passport = require("passport");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// @route    POST /register
// @desc     Register a user
// @access   Public
router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const existingUser = await User.findOne({ userName: req.body.userName });

  if (existingUser) {
    errors.userName = "Username already exists";
    return res.status(400).json(errors);
  } else {
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) console.log(err);
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) console.log(err);
        newUser.password = hash;
        newUser.save((err, user) => {
          if (err) return console.log(err);
          res.json(user);
        });
      });
    });
  }
});

// @route    POST /login
// @desc     login a user, create JWT and store in httpOnly cookie
// @access   Public

//create cookie route
router.post("/create-cookie", (req, res) => {
  const cookieData = {
    name: "cookie",
    body: "I am a cookie"
  };

  const cookieData2 = {
    name: "cookie2",
    body: "I am a cookie2"
  };

  res.cookie("firstCookie", cookieData, { httpOnly: true, maxAge: 3600000 });
  res.cookie("secondCookie", cookieData2, { httpOnly: true, maxAge: 3600000 });
  res.json(res.cookie);
});

//get cookie route
router.get("/get-cookie", (req, res) => {
  console.log(req.cookies);
  res.json(req.cookies);
});

//destroy cookies
router.delete("/delete-cookie", (req, res) => {
  res.clearCookie("firstCookie");
  res.send("cookie deleted");
});

module.exports = router;
