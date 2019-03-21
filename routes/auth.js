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
router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const userName = req.body.userName;
  const password = req.body.password;

  //find user by email
  User.findOne({ userName }).then(currentUser => {
    // check for user
    if (!currentUser) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    
    //check password
    bcrypt.compare(password, currentUser.password).then(isMatch => {
      if (isMatch) {
        //User matched
        //create jwt payload
        const payload = { id: currentUser._id, userName: currentUser.userName};
        //Sign token
        jwt.sign(
          payload,
          process.env.SECRET_KEY,
          { expiresIn: 3600 },
          (err, token) => {
            if(err){
              errors.token = "token was not created";
              res.status(400).json(errors);
            } 
            res.cookie("jwt", token, { 
              maxAge: 3600,
              httpOnly: true,
              sameSite: true,
              signed: true,
              secure: true
            });
            res.json({
              jwt: token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
    });
});


// @route    GET /current
// @desc     return current user
// @access   Private
router.get(
  "/current",
  passport.authenticate("jwt-cookiecombo", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      userName: req.user.userName,
      email: req.user.email
    });
  }
);



//create cookie route
router.post("/create-cookie", (req, res) => {
  const cookieData = {
    name: "cookie",
    body: "I am a cookie"
  };

  res.cookie("firstCookie", cookieData, { httpOnly: true, maxAge: 3600000 });
  
  res.json({status: "success"});
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
