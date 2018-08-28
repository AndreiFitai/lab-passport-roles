const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("connect-flash");

/* GET signup page */
router.get("/signup", (req, res, next) => {
  res.render("signup");
});

// POST signup page
router.post("/signup", (req, res, next) => {
  const { email, password, role } = req.body;
  const encrypted = bcrypt.hashSync(password, 10);
  User.findOne({ email }).then(data => {
    console.log(data);
    if (data) {
      console.log("user exists");
      res.redirect("/");
    } else {
      new User({ email, password: encrypted, role }).save().then(user => {
        res.send(user);
      });
    }
  });
});

/* GET signup page */
router.get("/signin", (req, res, next) => {
  res.render("signin");
});

router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin",
    failureFlash: true,
    passReqToCallback: true
  })
);

module.exports = router;
