const express = require('express');
const router = express.Router();

router.get('/queue', (req, res) => {
  const templateVars = {
    user: {
      user_id: req.session.user_id,
      first_name: req.session.fname,
      last_name: req.session.lname,
      phone: req.session.phone,
      email: req.session.email,
      is_admin: req.session.is_admin
    }
  };
  if (req.session.is_admin === true) {
    res.render('queue', templateVars);
  } else {
    res.send("403 Forbidden");
  }
});

module.exports = router;
