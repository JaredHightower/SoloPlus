"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      UserId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      FirstName: DataTypes.STRING,
      LastName: DataTypes.STRING,
      Email: {
        type: DataTypes.STRING,
        unique: true,
      },
      Username: {
        type: DataTypes.STRING,
        unique: true,
      },
      Password: DataTypes.STRING,
      Experience: DataTypes.STRING,
      Language: DataTypes.STRING,
      SocialMedia: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  // users.associate = function (models) {
  //   models.users.hasMany(models.linkInformation, { foreignKey: "UserId" });
  // };

  return users;
};
