const model = require("./model");

const findAllUsers = async () => {
  try {
    const results = await model.User.findAll({
      attributes: ["id", "firstName", "lastName", "email", "password"],
    });
    return results;
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
};

const findUser = async (UserPostData) => {
  const results = await model.User.findOne({
    where: { email: UserPostData.email },
  });
  return results;
};

//セッションIDを追加する方法
//新規ユーザーのIDを返却する方法

//モジュールエクスポートの方法
module.exports = { findAllUsers, createUser, findUser };
