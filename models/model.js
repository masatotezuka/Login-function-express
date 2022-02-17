const Sequelize = require("sequelize");
const config = require("../config/config");
const sequelize = new Sequelize(
  config.DATABASE,
  config.USERNAME,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: "mysql",
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

User.sync();

module.exports = { sequelize: sequelize, User: User };
