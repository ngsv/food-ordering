// All routes for the navigation bar are defined here

const express = require('express');
const router = express.Router();

router.get('/story', (req, res) => {
  res.render('story');
});

router.get('/faq', (req, res) => {
  res.render('faq');
});

router.get('/contact', (req, res) => {
  res.render('contact');
});

router.get('/thank-you', (req, res) => {
  res.render('thank-you');
});

router.get('/menu', (req, res) => {
  res.render('menu');
});

module.exports = router;
