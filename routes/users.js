const User = require("../models").User;

const findAllUsers = async () => {
  try {
    const results = await User.findAll({
      attributes: ["id", "firstName", "lastName", "email", "password"],
    });
    return results;
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (newUserData, password) => {
  try {
    console.log(newUserData);
    return await User.create({
      firstName: newUserData.firstName,
      lastName: newUserData.lastName,
      email: newUserData.email,
      password: password,
    });
  } catch (error) {
    console.log(error);
  }
};

const findUser = async (UserPostData) => {
  try {
    const results = await User.findOne({
      where: { email: UserPostData },
    });
    return results;
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (hashText, postEmail) => {
  await User.update(
    {
      password: hashText,
    },
    { where: { email: postEmail } }
  );
};

//モジュールエクスポートの方法
module.exports = { findAllUsers, createUser, findUser, updateUser };
