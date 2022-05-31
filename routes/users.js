// All routes for Users are defined here

const express = require('express');
const router = express.Router();
const { getUserWithId } = require('../db/queries.js')

module.exports = (db) => {

  router.get('/login/:id', (req, res) => {
    const queryParams = [req.params.id];
    getUserWithId(queryParams)
      .then(function(user) {
        if (user !== null) {
          req.session.user_id = req.params.id;
          req.session.fname = user['first_name'];
          req.session.lname = user['last_name'];
          req.session.phone = user['phone_number'];
          req.session.email = user['email'];
          req.session.is_admin = user['is_admin'];

          res.redirect('/');
        } else {
          res.send("403 Forbidden");
        }
      });
  });


  router.get('/logout', (req, res) => {
    req.session = null; // Clears the cookies
    res.redirect('/');
  });

  return router;
};
