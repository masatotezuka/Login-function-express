"use strict";

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      allowNull: false,
    },
    password: { type: DataTypes.STRING, allowNull: false },
    verificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  });
  Users.associate = (model) => {};
  return Users;
};
