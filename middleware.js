const mailCheck = (fromdbUsers, checkData, messages, messageText) => {
  if (fromdbUsers === checkData) {
    messages.push(messageText);
  }
};

module.exports = { mailCheck };
