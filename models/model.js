const Sequelize = require("sequelize");
const sequelize = new Sequelize("my_db", "root", "tezukamasato1370", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

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

// User.sync().then(() => {
//   // Table created
//   return User.create({
//     firstName: "John",
//     lastName: "Hancock",
//     email: "m.tezuka@backtech.co.jp",
//     password: "test",
//   });
// });

module.exports = { sequelize: sequelize, User: User };
