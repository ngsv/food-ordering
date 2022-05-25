// All routes for Users are defined here

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/login/:id', (req, res) => {

    const query = `
        SELECT *
        FROM users
        WHERE username = $1
      `;
    const queryParams = [req.params.id];

    db.query(query, queryParams)
      .then(data => {
        const user = data.rows;
        console.log(user);

        if (user.length === 1) { // Should return one result if username is found
          req.session.user_id = req.params.id;
          req.session.fname = user[0]['first_name'];
          req.session.lname = user[0]['last_name'];
          req.session.phone = user[0]['phone_number'];
          req.session.email = user[0]['email'];

          res.redirect('/');
        } else {
          res.send("403 Forbidden");
        }
      })
      .catch(err => console.log(err.message));
  });


  router.get('/logout', (req, res) => {
    req.session = null; // Clears the cookies
    res.redirect('/');
  });

  return router;
};
