const express = require('express');
const router = express.Router();
const { loadOrders, loadNewOrders, loadCurrentOrders, deleteOrder, acceptOrder } = require('../db/queries.js');

router.get('/queue', (req, res) => {
  if (req.session.is_admin === true) {
    // loadOrders()
    //   .then(function(orders) {
    //     const templateVars = {
    //       orders: orders,
    //       user: {
    //         is_admin: req.session.is_admin
    //       }
    //     };
    //     res.render('queue', templateVars);
    //   });
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
