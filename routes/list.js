const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/list", (req, res, next) => {
  if (!req.user || req.user.role != "Boss") {
    res.render("index");
  } else if (req.user.role == "Boss") {
    User.find({ role: { $ne: req.user.role } }).then(data => {
      const newData =  data.map(el => {
        if (el.role === "Developer") return {email: el.email, isDeveloper: true}
        else if (el.role === "TA") return {email: el.email, isTa: true}
        else return {email: el.email, isTa: true}
      }) 
      console.log(newData)

      res.render("list", {newData});
    });
  }
});

router.post("/list", (req, res, next) => {
  const { email, role } = req.body;
  User.update({ email }, { $set: {role}}).then(data => {
    res.redirect("list")
  });
});


module.exports = router;
