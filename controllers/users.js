const { Users } = require("../models");

const findAllUsers = async () => {
  try {
    const results = await Users.findAll({
      attributes: ["id", "firstName", "lastName", "email", "password"],
    });
    return results;
  } catch (error) {
    res.status(500).send(error);
  }
};

const createUser = async (newUserData, password) => {
  try {
    await Users.create({
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
    const results = await Users.findOne({
      where: { email: UserPostData },
    });
    return results;
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (hashText, postedEmail) => {
  try {
    await Users.update(
      {
        password: hashText,
      },
      { where: { email: postedEmail } }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateToken = async (postedToken, postedEmail) => {
  try {
    await Users.update(
      { verificationToken: postedToken },
      { where: { email: postedEmail } }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  findAllUsers,
  createUser,
  findUser,
  updateUser,
  updateToken,
};
