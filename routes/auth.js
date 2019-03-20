const express = require('express'),
      router  = express.Router(),
      bcrypt  = require("bcryptjs"),
      User    = require('../models/Users'),
      passport = require('passport');

//handle sign up logic
router.post("/register", function(req, res){
    const newUser= new User({
        userName: req.body.userName,
        email: req.body.email
    });
    
    bcrypt.genSalt(10, (err, salt) => {
        if(err) console.log(err);
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err) console.log(err);
            newUser.password = hash;
            newUser.save((err, user) => {
              if(err) return console.log(err);
              res.json(User);
            });
        });
    });
});


module.exports = router;