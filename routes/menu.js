// All routes for the menu are defined here

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get('/menu', (req, res) => {
    const query = `
      SELECT *
      FROM menu_items
    `;
    db.query(query)
      .then(data => {
        const templateVars = {
          items: data.rows,
        };
        res.render('menu', templateVars);
      })
      .catch(err => console.log(err.message));
  });

  return router;
};
