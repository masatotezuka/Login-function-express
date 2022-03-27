"use strict";

module.exports = (sequelize, DataTypes) => {
  const Sessions = sequelize.define("Sessions", {
    sid: {
      primaryKey: true,
      type: DataTypes.STRING,
    },
    userId: DataTypes.INTEGER,
    expires: DataTypes.DATE,
    data: DataTypes.TEXT,
  });
  Sessions.associate = (model) => {};
  return Sessions;
};
