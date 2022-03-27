const express = require("express");
const app = express();
const session = require("express-session");
const csrf = require("csurf");
const log4js = require("log4js");
const favicon = require("serve-favicon");
const path = require("path");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const dotenv = require("dotenv");
const sequelize = require("sequelize");
const db = require("./models");

dotenv.config();

function extendDefaultFields(defaults, session) {
  return {
    data: defaults.data,
    expires: defaults.expires,
    userId: session.userId,
  };
}
// const store = new SequelizeStore({
//   db: sequelize,
//   table: "Session",
//   extendDefaultFields: extendDefaultFields,
// });

app.use(
  session({
    secret: "my_secret_key",
    store: new SequelizeStore({
      db: db,
      table: "Sessions",
      extendDefaultFields: extendDefaultFields,
    }),
    resave: false,
    saveUninitialized: false,
    maxage: 1000 * 60 * 60 * 24,
  })
);

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("public"));
app.use(
  favicon(
    path.join(__dirname, "public", "images", "pockettherapist_favicon.png")
  )
);

const csrfProtection = csrf({ cookie: false });

//GET処理以外のときに
app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

//log4jsをトライ
const logger = log4js.getLogger();
logger.level = "info";
logger.info("success access");

app.use("/", require("./routes/index"));
app.use("/login", require("./routes/login"));
app.use("/signup", require("./routes/signup"));
app.use("/list-top", require("./routes/listtop"));
app.use("/logout", require("./routes/logout"));
app.use("/requestpassword", require("./routes/requestPassword"));
app.use("/resetpassword", require("./routes/resetPassword"));

app.use((req, res) => {
  res.status(404).render("error404.ejs");
});

app.use((err, req, res, next) => {
  res.send({ error: err });
});

app.listen(8000);
