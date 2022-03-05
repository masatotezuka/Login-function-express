const { User } = require("../models");

const findAllUsers = async () => {
  try {
    const results = await User.findAll({
      attributes: ["id", "firstName", "lastName", "email", "password"],
    });
    return results;
  } catch (error) {
    res.status(500).send(error);
  }
};

const createUser = async (newUserData, password) => {
  try {
    await User.create({
      firstName: newUserData.firstName,
      lastName: newUserData.lastName,
      email: newUserData.email,
      password: password,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const findUser = async (UserPostData) => {
  try {
    const results = await User.findOne({
      where: { email: UserPostData },
    });
    return results;
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (hashText, postEmail) => {
  try {
    await User.update(
      {
        password: hashText,
      },
      { where: { email: postEmail } }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { findAllUsers, createUser, findUser, updateUser };
