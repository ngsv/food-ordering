const express = require('express');
const router = express.Router();
const { loadOrders } = require('../db/queries.js');

router.get('/queue', (req, res) => {
  if (req.session.is_admin === true) {
    loadOrders()
      .then(function(orders) {
        const templateVars = {
          orders: orders,
          user: {
            username: req.session.username,
            first_name: req.session.fname,
            last_name: req.session.lname,
            phone: req.session.phone,
            email: req.session.email,
            is_admin: req.session.is_admin
          }
        };
        res.render('queue', templateVars);
      });
  } else {
    res.send("403 Forbidden");
  }
});

module.exports = router;


// order_id: orders.order_id,
// first_name: orders.first_name,
// last_name: orders.last_name,
// phone_number: orders.phone_number,
// order_time: orders.order_time,
// prep_time: orders.prep_time,
