let express = require("express");
let router = express.Router();
let models = require("../models");
let authService = require("../services/auth");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

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

module.exports = router;
