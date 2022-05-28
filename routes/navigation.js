// All routes for the navigation bar are defined here

const express = require('express');
const router = express.Router();


router.get('/story', (req, res) => {
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
  res.render('story', templateVars);
});

router.get('/faq', (req, res) => {
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
  res.render('faq', templateVars);
});

router.get('/contact', (req, res) => {
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
  res.render('contact', templateVars);
});

router.get('/thank-you', (req, res) => {
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
  res.render('thank-you', templateVars);
});


module.exports = router;
