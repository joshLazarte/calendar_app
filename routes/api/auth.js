const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  User = require("../../models/Users"),
  jwt = require("jsonwebtoken"),
  passport = require("passport");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// @route    POST /api/user/register
// @desc     Register a user
// @access   Public
router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const lowerCaseUserName = req.body.userName.toLowerCase();

  const existingUser = await User.findOne({
    lower_case_username: lowerCaseUserName
  });

  if (existingUser) {
    errors.userName = "Username already exists";
    return res.status(400).json(errors);
  } else {
    const newUser = new User({
      userName: req.body.userName,
      lower_case_username: lowerCaseUserName,
      email: req.body.email
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) console.log(err);
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) console.log(err);
        newUser.password = hash;
        newUser.save((err, user) => {
          if (err) return console.log(err);
          //@TODO: implement email validation
          res.json(user);
        });
      });
    });
  }
});

// @route    POST /api/user/login
// @desc     login a user, create JWT and store in httpOnly cookie
// @access   Public
router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const lower_case_username = req.body.userName.toLowerCase();
  const password = req.body.password;

  //find user by userName
  User.findOne({ lower_case_username }).then(currentUser => {
    // check for user
    if (!currentUser) {
      errors.userName = "User not found";
      return res.status(404).json(errors);
    }

    //check password
    bcrypt.compare(password, currentUser.password).then(isMatch => {
      if (isMatch) {
        //User matched

        //create jwt payload
        const payload = {
          id: currentUser._id,
          userName: currentUser.userName,
          email: currentUser.email,
          expireTime: Date.now() + 3600000
        };
        //Sign token
        jwt.sign(
          payload,
          process.env.SECRET_KEY,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              errors.token = "token was not created";
              res.status(400).json(errors);
            }
            res.cookie("jwt", token, { httpOnly: true });
            res.status(200).json(payload);
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route    GET /api/user/current
// @desc     return current user
// @access   Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      userName: req.user.userName,
      email: req.user.email
    });
  }
);

// @route    DELETE /api/user/logout
// @desc     logout, destroys cookie
// @access   Private
router.delete("/logout", (req, res) => {
  req.cookies["jwt"] && res.clearCookie("jwt");
  res.status(200).json({ status: "logged out" });
});

module.exports = router;
