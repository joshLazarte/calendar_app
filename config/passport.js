//const JwtCookieComboStrategy = require('passport-jwt-cookiecombo');
const JwtStrategy = require("passport-jwt").Strategy;
//const ExtractJwt = require("passport-jwt").ExtractJwt;
//const mongoose = require("mongoose");
const User = require("../models/Users");

const opts = {};

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.SECRET_KEY;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
