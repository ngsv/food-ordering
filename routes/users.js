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
        if (user.length === 1) {
          req.session.user_id = req.params.id;
          res.redirect('/');
        } else {
          res.send("403 Forbidden");
        }
      })
      .catch(err => console.log(err.message));
  });

  router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
  });

  return router;
};
