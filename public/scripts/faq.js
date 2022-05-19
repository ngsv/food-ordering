/* eslint-env jquery */

// Scripts for FAQ page

$(document).ready(function() {

  // Accordian FAQ page
  const faqs = document.querySelectorAll('.faq');
  faqs.forEach(faq => {
    faq.addEventListener('click', () => {
      faq.classList.toggle('active');
    });
  });

});
