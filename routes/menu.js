// All routes for the menu are defined here

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // router.get('/menu', (req, res) => {
  //   const query = `
  //     SELECT *
  //     FROM menu_items
  //   `;
  //   db.query(query)
  //     .then(data => {
  //       console.log(data.rows);
  //       const templateVars = {
  //         items: data.rows,
  //       };
  //       res.render('menu', templateVars);
  //     })
  //     .catch(err => console.log(err.message));
  // });

  router.get('/menu', (req, res) => {
    const query = `
      SELECT *
      FROM menu_items
    `;
    db.query(query)
      .then(data => {

        const appetizers = [];
        const mains = [];
        const sides = [];
        const desserts = [];
        const beverages = [];

        let menuItems = data.rows;

        // Sort menu items by categories and place in it's own array
        for (let i = 0; i < menuItems.length; i++) {
          if (menuItems[i]["category_id"] === 1) {
            appetizers.push(menuItems[i]);
          } else if (menuItems[i]["category_id"] === 2) {
            mains.push(menuItems[i]);
          } else if (menuItems[i]["category_id"] === 3) {
            sides.push(menuItems[i]);
          } else if (menuItems[i]["category_id"] === 4) {
            desserts.push(menuItems[i]);
          } else if (menuItems[i]["category_id"] === 5) {
            beverages.push(menuItems[i]);
          }
        }

        const templateVars = {
          appetizers: appetizers,
          mains: mains,
          sides: sides,
          desserts: desserts,
          beverages: beverages
        };
        res.render('menu', templateVars);
      })
      .catch(err => console.log(err.message));
  });

  return router;
};
