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
    $.ajax({
      url: '/cancel-order',
      method: 'POST',
      data: orderNum
    })
      .done(() => {
        // $("table").load(" #table");
        // $.ajax({
        //   url: '/cancel-order',
        //   method: 'GET'
        // })
        //   .done((results) => {
        //
        //   })
        //   .fail(err => console.log(err.message));
      })
      .fail(err => console.log(err.message));
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

});
