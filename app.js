const express = require("express");
const app = express();
const session = require("express-session");
const ejsLint = require("ejs-lint");
const dotenv = require("dotenv").config();
const csrf = require("csurf");

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

// const csrfProtection = csrf({ cookie: false });
// app.use(csrfProtection);

//3回リクエストが送信されている.
// app.use((req, res, next) => {
//   const method = req.method;
//   if (method === "GET") {
//     res.locals.csrfToken = req.csrfToken();
//     console.log(res.locals.csrfToken);
//     res.locals.csrfField = `<input type="hide", name="_token", value=${res.locals.csrfToken} />`;
//   } else if (method === "POST" || "PUT" || "DELETE" || "PATCH") {
//     console.log(req.body._csrf);
//     console.log(res.locals.csrfToken);
//     if (req.body._csrf !== res.locals.csrfToken) {
//       return res.status(419).send("page expired ");
//     }
//   }
//   next();
// });

app.use("/", require("./routes/index"));
app.use("/login", require("./routes/login"));
app.use("/signup", require("./routes/signup"));
app.use("/list-top", require("./routes/listtop"));
app.use("/logout", require("./routes/logout"));
app.use("/requestpassword", require("./routes/requestPassword"));
app.use("/resetpassword", require("./routes/resetPassword"));

app.use((req, res, next) => {
  return res.status(404).render("error404.ejs");
});

app.listen(8000);
