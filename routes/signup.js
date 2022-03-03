const express = require("express");
const router = express.Router();
const users = require("./users");
const middleware = require("../middleware");

router.get("/", async (req, res, next) => {
  const db = await users.findAllUsers();
  console.log(db);
  res.render("signup.ejs", { messages: [] });
  next();
});

// async (newUserData, password) => {
//   try {
//     console.log(newUserData);
//     await User.create({
//       firstName: newUserData.firstName,
//       lastName: newUserData.lastName,
//       email: newUserData.email,
//       password: password,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

router.post("/", async (req, res, next) => {
  const signupUserData = req.body;
  const messages = [];
  console.log(typeof signupUserData.firstName);
  validationSignupData(signupUserData, messages);
  const userDataFromUsers = await users.findUser(signupUserData.email);
  console.log(`19行目:${userDataFromUsers}`);
  if (userDataFromUsers !== null) {
    middleware.mailCheck(
      userDataFromUsers.email,
      signupUserData.email,
      messages,
      "Already exist user Email"
    );
  }
  const hashText = await middleware.createHash(signupUserData.password);
  await users.createUser(signupUserData, hashText);
  console.log("Heloo!");
  if (messages.length > 0) {
    console.log(messages);
    res.status(400).render("signup.ejs", { messages: messages });
  } else {
    const newUserFromUsers = await users.findUser(signupUserData);
    console.log(newUserFromUsers);
    req.session.userId = newUserFromUsers.id;
    res.status(200).redirect("/list-top");
  }
});

const validationSignupData = (signupUserData, messages) => {
  middleware.validationPostUserData(
    signupUserData.firstName,
    messages,
    "Not written name"
  );
  middleware.validationPostUserData(
    signupUserData.lastName,
    messages,
    "Not written name"
  );
  middleware.validationPostUserData(
    signupUserData.email,
    messages,
    "Not written email"
  );
  middleware.validationPostUserData(
    signupUserData.password,
    messages,
    "Not written password"
  );
};

module.exports = router;
