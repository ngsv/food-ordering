const express = require('express');
const router = express.Router();
const { loadOrders, deleteOrder, acceptOrder } = require('../db/queries.js');

router.get('/queue', (req, res) => {
  if (req.session.is_admin === true) {
    loadOrders()
      .then(function(orders) {
        const templateVars = {
          orders: orders,
          user: {
            is_admin: req.session.is_admin
          }
        };
        res.render('queue', templateVars);
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
});

// router.get('/cancel-order', (req, res) => {
//   if (req.session.is_admin === true) {
//     loadOrders()
//       .then(function(orders) {
//         const templateVars = {
//           orders: orders,
//           user: {
//             is_admin: req.session.is_admin
//           }
//         };
//         res.render('queue', templateVars);
//       });
//   }
// });

module.exports = router;


// order_id: orders.order_id,
// first_name: orders.first_name,
// last_name: orders.last_name,
// phone_number: orders.phone_number,
// order_time: orders.order_time,
// prep_time: orders.prep_time,
