// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const cookieSession = require('cookie-session');
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated routes for each resource
const usersRoutes = require("./routes/users");
const navigationRoutes = require("./routes/navigation");
const menuRoutes = require("./routes/menu");
const adminRoutes = require("./routes/admin");

// Mount all resource routes
app.use("/", usersRoutes(db));
app.use("/", navigationRoutes);
app.use("/", menuRoutes(db));
app.use("/", adminRoutes);

// Home page
app.get("/", (req, res) => {
  const templateVars = {
    user: {
      user_id: req.session.user_id,
      first_name: req.session.fname,
      last_name: req.session.lname,
      phone: req.session.phone,
      email: req.session.email,
      is_admin: req.session.is_admin
    }
  };
  res.render("index", templateVars);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
