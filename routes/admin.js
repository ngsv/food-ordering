const express = require('express');
const router = express.Router();
const { loadNewOrders, loadCurrentOrders, deleteOrder, acceptOrder, completeOrder, pickupOrder, getReadyOrders } = require('../db/queries.js');
const { sendTextCustomer, sendCancelText } = require('../api/twilio.js');

router.get('/queue', (req, res) => {
  if (req.session.is_admin === true) {
    loadNewOrders()
      .then(function(newOrders) {
        loadCurrentOrders()
          .then(function(currentOrders) {
            const templateVars = {
              newOrders: newOrders,
              currentOrders: currentOrders,
              user: {
                is_admin: req.session.is_admin
              }
            };
            res.render('queue', templateVars);
          });
      });
  } else {
    res.send("403 Forbidden");
  }
});

// On each page reload, update orders from 'In Progress' to 'Pick-up Ready' and then from "Pick-up Ready" to 'Complete' and sends a text to the customer
router.get('/reload', (req, res) => {
  pickupOrder(); // Updates orders from 'In Progress' to 'Pick-up Ready' if prep time has elapsed
  getReadyOrders() // Get all orders that are ready for pick-up
    .then(function(orders) {
      for (let i = 0; i < orders.length; i++) { // Loop through all orders that are ready for pick-up, sends a text to the customer, and updates the order status from 'Pick-up Ready' to 'Complete'
        const orderNum = orders[i]['order_id'];
        const firstName = orders[i]['first_name'];
        const lastName = orders[i]['last_name'];
        const phoneNum = orders[i]['phone_number'];
        completeOrder([orderNum]);
        // sendTextCustomer(firstName, lastName, phoneNum, orderNum);
      }
    });
  res.send("Complete");
});

// Deletes an order from the database - POST request called when an order is cancelled
router.post('/cancel-order', (req, res) => {
  const orderId = [req.body.orderNum];
  // sendCancelText(req.session.fname, req.session.lname, req.session.phone, orderId);
  deleteOrder(orderId);
});

// Creates a new order and stores it in the database - POST request called when an order is accepted by the restaurant
router.post('/accept-order', (req, res) => {
  const orderId = req.body.orderNum;
  const prepTime = req.body.prepTime;
  const d = new Date();
  const currentTime = d.toLocaleTimeString();
  acceptOrder([orderId, prepTime, currentTime]);
  res.send("Accepted");
});

module.exports = router;
