require("dotenv").config();
const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  databaseConfig = require("./config/database"),
  passport = require("passport"),
  mongoose = require("mongoose"),
  path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
mongoose.connect(databaseConfig.database, databaseConfig.options);

app.use(passport.initialize());
require("./config/passport")(passport);

const authRoutes = require("./routes/api/auth.js");
const eventRoutes = require("./routes/api/event.js");

if (process.env.NODE_ENV === "production") {
  app.use("/api/user", authRoutes);
  app.use("/api/event", eventRoutes);
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("./client/build/index.html"));
  });
} else {
  app.use("/calendar-app/api/user", authRoutes);
  app.use("/calendar-app/api/event", eventRoutes);
}

app.listen(process.env.PORT, () =>
  console.log(`server started on port ${process.env.PORT}`)
);
