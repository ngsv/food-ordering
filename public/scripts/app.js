// Client facing scripts here

/* eslint-env jquery */

// Accordian FAQ page
$(document).ready(function() {

  const faqs = document.querySelectorAll('.faq');

  faqs.forEach(faq => {
    faq.addEventListener('click', () => {
      faq.classList.toggle('active');
    });
  });

});
