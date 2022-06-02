// All routes for the menu are defined here

const express = require('express');
const router  = express.Router();
const { getAllMenuItems } = require('../db/queries.js');
const { sendTextRestaurant } = require('../api/twilio.js');
const { newOrder } = require('../db/queries.js');
const fpe = require('node-fpe');
const cipher = fpe({ secret: process.env.FPE_SECRET });

module.exports = (db) => {

  router.get('/menu', (req, res) => {
    getAllMenuItems()
      .then(function(menu) {
        const templateVars = {
          appetizers: menu.appetizers,
          mains: menu.mains,
          sides: menu.sides,
          desserts: menu.desserts,
          beverages: menu.beverages,
          user: {
            is_admin: req.session.is_admin
          }
        };
        res.render('menu', templateVars);
      });
  });

  router.post('/sms-restaurant', (req, res) => { // GET request called when order placed with items in cart
    if (req.session.username !== undefined) {
      const orderNum = cipher.encrypt(Date.now().toString().slice(7));
      const userId = req.session.user_id;
      const d = new Date();
      const currentTime = d.toLocaleTimeString();
      const totalCost = parseFloat(req.body.totalCost.slice(2) * 100);
      sendTextRestaurant(req.session.fname, req.session.lname, req.session.phone, orderNum);
      const queryParams = [orderNum, userId, currentTime, totalCost];
      newOrder(queryParams);
      res.send('Logged in.');
    } else {
      res.send('Not logged in.');
    }
  });

  router.get('/sms2-restaurant', (req, res) => { // GET request called when order placed without items in cart
    if (req.session.username !== undefined) {
      res.send('Logged in.');
    } else {
      res.send('Not logged in.');
    }
  });

  return router;
};
