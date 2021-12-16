const { resolveConfig } = require("prettier");
const model = require("./model");

const findUsers = async () => {
  await findAllUsers();
};

findAllUsers = () => {
  return new Promise((resolve, reject) => {
    model.User.findAll({
      attributes: ["id", "firstName", "lastName", "email", "password"],
    })
      .then((record) => {
        console.log("FROM DB" + record[0].firstName);
        resolve();
        return record[0].firstName;
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const createUser = async (newUserData, password) => {
  await model.User.create({
    firstName: newUserData.firstName,
    lastName: newUserData.lastName,
    email: newUserData.email,
    password: password,
  });
  await model.User.findOne({
    where: { email: newUserData.email },
  })
    .then((data) => {
      console.log(`返却前${data[0]["id"]}`);
      return data[0]["id"];
    })
    .catch((error) => {
      return error;
    });
};
//セッションIDを追加する方法
//新規ユーザーのIDを返却する方法

//モジュールエクスポートの方法
module.exports = { findUsers: findUsers, createUser: createUser };
