// All routes for Users are defined here

const express = require('express');
const router = express.Router();
const { getUserWithId } = require('../db/queries.js');

router.get('/login/:username', (req, res) => {
  const queryParams = [req.params.username];
  getUserWithId(queryParams)
    .then(function(user) {
      if (user !== null) {
        // Store user details to session
        req.session.user_id = user['id'];
        req.session.username = req.params.username;
        req.session.fname = user['first_name'];
        req.session.lname = user['last_name'];
        req.session.phone = user['phone_number'];
        req.session.email = user['email'];
        req.session.is_admin = user['is_admin'];

        res.redirect('/');
      } else {
        res.send("403 Forbidden"); // If user does not exist
      }
    });
});

router.get('/logout', (req, res) => {
  req.session = null; // Clears the cookies
  res.redirect('/');
});

module.exports = router;
