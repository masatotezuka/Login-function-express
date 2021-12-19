const model = require("./model");

const findUsers = async () => {
  await model.User.findAll({
    attributes: ["id", "firstName", "lastName", "email", "password"],
  })
    .then((record) => {
      const json = JSON.stringify(record);
      const obj = JSON.parse(json);
      console.log(obj);
      return obj;
      //login.jsのデータを送れない。
    })
    .catch((err) => {
      console.log(err);
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
