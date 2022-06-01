$(document).ready(function() {

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
    buttonClicked.parentElement.parentElement.parentElement.remove();

    $.ajax({
      url: '/accept-order',
      method: 'POST',
      data: data
    })
      .fail(err => console.log(err.message));

    $('#current-orders').load(location.href + " #current-orders"); // Refresh current orders div
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

});
