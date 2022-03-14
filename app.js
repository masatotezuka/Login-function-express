const express = require("express");
const app = express();
const session = require("express-session");
const ejsLint = require("ejs-lint");
const dotenv = require("dotenv").config();
const csrf = require("csurf");
const log4js = require("log4js");
const favicon = require("serve-favicon");
const path = require("path");

app.use(
  session({
    secret: "my_secret_key",
    resave: false,
    saveUninitialized: false,
    maxage: 1000 * 60 * 60 * 24,
  })
);

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("public"));
app.use(
  favicon(
    path.join(__dirname, "public", "image", "pockettherapist_favicon.png")
  )
);
const csrfProtection = csrf({ cookie: false });
app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

const logger = log4js.getLogger();

logger.level = "info";
logger.info("hello");

app.use("/", require("./routes/index"));
app.use("/login", require("./routes/login"));
app.use("/signup", require("./routes/signup"));
app.use("/list-top", require("./routes/listtop"));
app.use("/logout", require("./routes/logout"));
app.use("/requestpassword", require("./routes/requestPassword"));
app.use("/resetpassword", require("./routes/resetPassword"));

app.use((req, res, next) => {
  res.status(404).render("error404.ejs");
});

app.listen(8000);
