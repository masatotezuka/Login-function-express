const express = require("express");
const app = express();
const session = require("express-session");
const ejsLint = require("ejs-lint");
const dotenv = require("dotenv").config();

app.use;

app.use(
  session({
    secret: "my_secret_key",
    resave: false,
    saveUninitialized: false,
    maxage: 1000 * 60 * 60 * 24,
  })
);

app.use("/public", express.static("public"));
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/index"));
app.use("/login", require("./routes/login"));
app.use("/signup", require("./routes/signup"));
app.use("/list-top", require("./routes/listtop"));
app.use("/logout", require("./routes/logout"));
app.use("/requestpassword", require("./routes/requestPassword"));
app.use("/resetpassword", require("./routes/resetPassword"));

app.listen(8000);
