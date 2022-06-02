const express = require('express');
const router = express.Router();
const { loadNewOrders, loadCurrentOrders, deleteOrder, acceptOrder, completeOrder, getUserOrder } = require('../db/queries.js');
const { sendTextCustomer } = require('../api/twilio.js');

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

router.post('/cancel-order', (req, res) => {
  const orderId = [req.body.orderNum];
  deleteOrder(orderId);
});

router.post('/accept-order', (req, res) => {
  const orderId = req.body.orderNum;
  const prepTime = req.body.prepTime;
  acceptOrder([orderId, prepTime]);
  res.send("Accepted");
});

router.post('/order-complete', (req, res) => {
  const orderId = [req.body.orderNum];
  completeOrder(orderId);
  getUserOrder(orderId)
    .then(function(order) {
      console.log(order);
      sendTextCustomer(order[0].first_name, order[0].last_name, order[0].phone_number, order[0].order_id);
    });
  res.send("Complete");
});

module.exports = router;
