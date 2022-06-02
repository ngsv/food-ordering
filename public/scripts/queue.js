$(document).ready(function() {

  $(".order-details").hide(); // Hide the order details initially

  // When order details button is clicked
  const faqs = document.querySelectorAll('.faq');
  faqs.forEach(faq => {
    faq.addEventListener('click', () => {
      faq.classList.toggle('active');
    });
  });

  // Update queue prep time input for new orders
  const quantityChanged = (event) => {
    let quantityElement = event.target;
    if (isNaN(quantityElement.value) || quantityElement.value <= 0) {
      quantityElement.value = 1;
    } else if (quantityElement.value > 90) {
      quantityElement.value = 90;
    }
  };

  // Cancels a new order placed
  const cancelOrder = (event) => {
    let buttonClicked = event.target;
    let order = buttonClicked.parentElement.parentElement.parentElement;
    let orderNum = order.getElementsByClassName('row-id')[0].innerText;
    let data = {
      orderNum: orderNum
    };
    buttonClicked.parentElement.parentElement.parentElement.remove();
    $.ajax({
      url: '/cancel-order',
      method: 'POST',
      data: data
    })
      .fail(err => console.log(err.message));
  };

  // Accepts a new order placed
  const acceptOrder = (event) => {
    let buttonClicked = event.target;
    let order = buttonClicked.parentElement.parentElement.parentElement;
    let orderNum = order.getElementsByClassName('row-id')[0].innerText;
    let prepTime = order.getElementsByClassName('prepTime-input')[0].value;
    let data = {
      orderNum: orderNum,
      prepTime: prepTime
    };

    if (prepTime > 0) { // Ensures a prep time of at least 1 minute
      buttonClicked.parentElement.parentElement.parentElement.remove();

      $.ajax({
        url: '/accept-order',
        method: 'POST',
        data: data
      })
        .done((results) => {
          if (results) {
            $('#current-orders').load(location.href + " #current-orders"); // Refresh current orders div (move the accepted order down to the current order section)
            setTimeout(() => { // Wait the amount of minutes specified by the prep time, then update the order status and refresh the current orders div
              $.ajax({
                url: '/order-complete',
                method: 'POST',
                data: data
              })
                .done((results) => {
                  if (results) {
                    $('#current-orders').load(location.href + " #current-orders"); // Refresh current orders div
                  }
                })
                .fail(err => console.log(err.message));
            }, prepTime * 1000 * 60);
          }
        })
        .fail(err => console.log(err.message));
    } else {
      alert("Please specify a prep time.")
    }
  };

  // Slides order details up and down when button is clicked
  const orderDetails = (event) => {
    let buttonClicked = event.target;
    let tableRow = buttonClicked.parentElement.parentElement;
    console.log(tableRow);
    // let orderDetailsButton = tableRow.getElementsByClassName('expand-order-btn')[0];
    let orderDetails = tableRow.getElementsByClassName('order-details')[0];
    if ($(orderDetails).is(":visible")) {
      $(orderDetails).slideUp(400);
    } else {
      $(orderDetails).slideDown(400);
    }

    buttonClicked.classList.toggle('active');
  };

  // Event listener for when the prep time is changed for a new order in the queue
  const quantityFields = document.getElementsByClassName('prepTime-input');
  for (let i = 0; i < quantityFields.length; i++) {
    let quantityField = quantityFields[i];
    quantityField.addEventListener('change', quantityChanged);
  }

  // Event listener for when a cancel order button is clicked
  const cancelOrderButtons = document.querySelectorAll('.table-row .cancel-btn');
  for (let i = 0; i < cancelOrderButtons.length; i++) {
    let button = cancelOrderButtons[i];
    button.addEventListener('click', cancelOrder);
  }

// Event listener for when an accept order button is clicked
  const acceptOrderButtons = document.querySelectorAll('.table-row .submit-btn');
  for (let i = 0; i < acceptOrderButtons.length; i++) {
    let button = acceptOrderButtons[i];
    button.addEventListener('click', acceptOrder);
  }

  // Event listener for when an order details button is clicked
  const orderDetailButtons = document.querySelectorAll('.table-row .expand-order-btn');
  for (let i = 0; i < orderDetailButtons.length; i++) {
    let button = orderDetailButtons[i];
    button.addEventListener('click', orderDetails);
  }

});
