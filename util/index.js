const bcrypt = require("bcrypt");
const moment = require("moment");
const uuid = require("uuid");

const createUuid = () => {
  const currentDate = moment().format("YYYY-MM-DD");
  return `${uuid.v4()}-${currentDate}`;
};

const mailCheck = (userFromUserModel, checkData, messageText) => {
  if (userFromUserModel === checkData) {
    throw new Error(messageText);
  }
};

const validationPostUserData = (postUserData, messageText) => {
  if (postUserData === "") {
    throw new Error(messageText);
  }
};

const createHash = async (postUserPassword) => {
  try {
    const hash = await bcrypt.hash(postUserPassword, 10);
    return hash;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createUuid,
  mailCheck,
  validationPostUserData,
  createHash,
};
