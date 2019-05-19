require("dotenv").config();
const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  databaseConfig = require("./config/database"),
  passport = require("passport"),
  mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
mongoose.connect(databaseConfig.database, databaseConfig.options);

app.use(passport.initialize());
require("./config/passport")(passport);

const authRoutes = require("./routes/api/auth.js");
const eventRoutes = require("./routes/api/event.js");
app.use("/api/user", authRoutes);
app.use("/api/event", eventRoutes);

app.listen(process.env.PORT, () =>
  console.log(`server started on port ${process.env.PORT}`)
);
