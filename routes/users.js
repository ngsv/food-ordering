// All routes for Users are defined here

const express = require('express');
const router  = express.Router();

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

        console.log(data.rows);
        // Store user information of logged in user
        const userId = data.rows[0]["id"];
        const userFname = data.rows[0]["first_name"];
        const userLname = data.rows[0]["last_name"];
        const userPhone = data.rows[0]["phone_number"];
        const userEmail = data.rows[0]["email"];

        if (user.length === 1) { // Should return one result if username is found
          req.session.user_id = req.params.id;
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
