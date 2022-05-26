/* eslint-env jquery */

// Scripts for home page - three tiles

$(document).ready(function() {

  document.getElementById("story-tile").onclick = function() {
    location.href = '/story';
  };

  document.getElementById("menu-tile").onclick = function() {
    location.href = '/menu';
  };

  document.getElementById("faq-tile").onclick = function() {
    location.href = '/faq';
  };

});
