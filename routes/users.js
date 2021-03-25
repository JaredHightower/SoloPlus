let express = require("express");
let router = express.Router();
let models = require("../models");
let authService = require("../services/auth");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//! SIGNUP
router.post("/signup", function (req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username,
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: authService.hashPassword(req.body.password),
        Experience: req.body.experience,
        Language: req.body.language,
        SocialMedia: req.body.socialMedia,
      },
    })
    .spread(function (result, created) {
      if (created) {
        res.send("User successfully created");
      } else {
        res.send("This user already exists");
      }
    });
});

//! Login
router.post("/login", function (req, res, next) {
  models.users
    .findOne({
      where: {
        Username: req.body.username,
      },
    })
    .then((user) => {
      if (!user) {
        console.log("User not found");
        return res.status(401).json({
          message: "USERNAME DOES NOT EXIST",
        });
      } else {
        let passwordMatch = authService.comparePassword(
          req.body.password,
          user.Password
        );
        if (passwordMatch) {
          let token = authService.signUser(user);
          res.cookie("jwt", token);
          res.send("LOGGED IN!");
        } else {
          res.send("WRONG PASSWORD");
        }
      }
    });
});

//! Profile
router.get("/profile", function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then((user) => {
      if (user) {
        res.send(JSON.stringify(user));
      } else {
        res.status(401);
        res.send("INVALID TOKEN");
      }
    });
  }
});

module.exports = router;
