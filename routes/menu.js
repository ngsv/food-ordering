// All routes for the menu are defined here

const express = require('express');
const router  = express.Router();
const sendTextMessage = require('../api/twilio.js');
const fpe = require('node-fpe');
const cipher = fpe({ secret: process.env.FPE_SECRET });

module.exports = (db) => {

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
          beverages: beverages,
          user: {
            user_id: req.session.user_id,
            first_name: req.session.fname,
            last_name: req.session.lname,
            phone: req.session.phone,
            email: req.session.email,
            is_admin: req.session.is_admin
          }
        };
        res.render('menu', templateVars);
      })
      .catch(err => console.log(err.message));
  });

  router.get('/sms', (req, res) => { // GET request called when order placed with items in cart
    if (req.session.user_id !== undefined) {
      sendTextMessage(req.session.fname, req.session.lname, req.session.phone, cipher.encrypt(Date.now().toString().slice(7)));
      res.send('Logged in.');
    } else {
      res.send('Not logged in.');
    }
  });

  router.get('/sms2', (req, res) => { // GET request called when order placed without items in cart
    if (req.session.user_id !== undefined) {
      res.send('Logged in.');
    } else {
      res.send('Not logged in.');
    }
  });

  return router;
};
