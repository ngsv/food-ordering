// All routes for the menu are defined here

const express = require('express');
const router = express.Router();
const { getAllMenuItems } = require('../db/queries.js');
const { sendTextRestaurant } = require('../api/twilio.js');
const { newOrder } = require('../db/queries.js');
const fpe = require('node-fpe');
const cipher = fpe({
  secret: process.env.FPE_SECRET
});

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

// POST request called when order placed with items in cart
router.post('/sms-restaurant', (req, res) => {
  if (req.session.username !== undefined) { // Checks if the user is logged in when placing the order
    const orderNum = cipher.encrypt(Date.now().toString().slice(7));
    const userId = req.session.user_id;
    const d = new Date();
    const currentTime = d.toLocaleTimeString();
    const totalCost = parseFloat(req.body.totalCost.slice(2) * 100);
    const orderItemsArray = req.body.orderItemsArray;
    sendTextRestaurant(req.session.fname, req.session.lname, req.session.phone, orderNum); // Sends text message to the restaurant when a new order is placed
    const queryParams = [orderNum, userId, currentTime, totalCost, orderItemsArray];
    newOrder(queryParams); // Creates a new order and stores it in the database
    res.send('Logged in.');
  } else {
    res.send('Not logged in.');
  }
});

// GET request called when order placed without items in cart
router.get('/sms2-restaurant', (req, res) => {
  if (req.session.username !== undefined) { // Checks if the user is logged in when placing the order
    res.send('Logged in.');
  } else {
    res.send('Not logged in.');
  }
});

module.exports = router;
