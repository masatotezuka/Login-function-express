const express = require("express");
const app = express();
const router = express.Router();
const session = require("express-session");
const ejsLint = require("ejs-lint");
const dotenv = require("dotenv");

dotenv.config();

app.use(
  session({
    secret: "my_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);
// https://www.npmjs.com/package/express-session

app.use("/public", express.static("public"));
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
// https://expressjs.com/ja/4x/api.html#express.urlencoded
// app.use("/", require("./models/model"));
// router.use("/", require("./models/model"));

//ルーティング
app.use("/", require("./routes/index"));
app.use("/login", require("./routes/login"));
app.use("/newregister", require("./routes/register"));
app.use("/list-top", require("./routes/listtop"));
app.use("/logout", require("./routes/logout"));
app.use("/requestpassword", require("./routes/requestPassword"));
app.use("/resetpassword", require("./routes/resetPassword"));

app.listen(8000);
