const model = require("./model");

const findAllUsers = async () => {
  try {
    const results = await model.User.findAll({
      attributes: ["id", "firstName", "lastName", "email", "password"],
    });
    // const json = JSON.stringify(results);
    // const obj = JSON.parse(json);
    return results;
    // login.jsのデータを送れない。
    // .catch((err) => {
    //   console.log(err);
    // });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (newUserData, password) => {
  await model.User.create({
    firstName: newUserData.firstName,
    lastName: newUserData.lastName,
    email: newUserData.email,
    password: password,
  });
  const newUser = await model.User.findOne({
    where: { email: newUserData.email },
  });
  req.session.userId = newUser.id;
  console.log(newUser.id);
  console.log(req.session.userId);
};
//セッションIDを追加する方法
//新規ユーザーのIDを返却する方法

//モジュールエクスポートの方法
module.exports = { findAllUsers, createUser };
