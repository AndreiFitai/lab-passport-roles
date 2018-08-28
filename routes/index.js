const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  if (!req.user || req.user.role != "Boss") {
    res.render("index");
  } else if (req.user.role == "Boss") res.render("indexBoss");
});

module.exports = router;
