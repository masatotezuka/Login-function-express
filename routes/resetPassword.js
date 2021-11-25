const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tezukamasato1370",
  database: "my_db",
});

router.get("/:email", (req, res) => {
  res.render("reset-password.ejs", {
    errorUndefined: [],
    email: [req.params.email],
  });
  console.log(req.params.email);
});

router.post("/:email", (req, res) => {
  const password = req.body.password;
  const email = req.params.email;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    connection.query(
      "UPDATE users SET password = ? WHERE email = ?",
      [hash, email],
      (err, results) => {
        if (err) throw err;
        console.log(results);
        req.session.userId = results.insertId;
        console.log("アップデート完了");
        res.redirect("/list-top");
      }
    );
  });
});

module.exports = router;
