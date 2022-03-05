const bcrypt = require("bcrypt");

const errorHandle = (filename, errorMessages) => {
  if (errorMessages.length > 0) {
    res.render(filename, errorMessages);
  }
};

const mailCheck = (fromdbUsers, checkData, messages, messageText) => {
  if (fromdbUsers === checkData) {
    messages.push(messageText);
  }
};

const validationPostUserData = (postUserData, messages, messageText) => {
  if (postUserData === "") {
    messages.push(messageText);
  }
};

const createHash = async (postUserPassword) => {
  try {
    const hash = await bcrypt.hash(postUserPassword, 10);
    return hash;
  } catch (error) {
    throw error;
  }
};

module.exports = { errorHandle, mailCheck, validationPostUserData, createHash };
