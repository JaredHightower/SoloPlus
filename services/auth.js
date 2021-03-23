const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const models = require("../models/index");

const secretKey = "TeamSoloPlus";
let authService = {
  signUser: function (user) {
    const token = jwt.sign(
      {
        UserId: user.userId,
        Email: user.Email,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Username: user.Username,
        Password: user.Password,
      },
      secretKey,
      {
        expiresIn: "2h",
      }
    );
    return token;
  },

  //!Catches any errors
  verifyUser: function (token) {
    try {
      let decoded = jwt.verify(token, secretKey);
      return models.users.findByPk(decoded.UserId);
    } catch (err) {
      return null;
    }
  },

  hashPassword: function (userInputPassword) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userInputPassword, salt);
    return hash;
  },
  comparePassword: function (userInputPassword, hashedPassword) {
    return bcrypt.compareSync(userInputPassword, hashedPassword);
  },
};

module.exports = authService;
