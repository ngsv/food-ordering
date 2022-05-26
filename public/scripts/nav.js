/* eslint-env jquery */

// Navbar scripts - social media icons

$(document).ready(function () {

  document.getElementById('facebook-btn').onclick = function() {
    window.open('https://www.facebook.com/', '_blank');
  };

  document.getElementById('twitter-btn').onclick = function() {
    window.open('https://www.twitter.com/', '_blank');
  };

  document.getElementById('instagram-btn').onclick = function() {
    window.open('https://www.instagram.com/', '_blank');
  };

});
