// Scripts for queue page

$(document).ready(function() {

  // -------------------- Update order from 'In Progress' to 'Completed' if prep time has elapsed since order was accepted --------------------
  const reload = () => {
    $.ajax({
      url: '/reload',
      method: 'GET',
    })
      .done(() => {
        $("#current-orders").load(location.href + " #current-orders"); // Refresh Current Orders div
      })
      .fail(err => console.log(err.message));
  };

  reload(); // Call on page load
  setInterval(reload, 60000); //60000 ms == 60 seconds (auto-refreshes page every 60 seconds)

  // --------------------------------------- Update queue prep time input for new orders ---------------------------------------
  const quantityChanged = (event) => {
    event.stopPropagation();
    let quantityElement = event.target;
    if (isNaN(quantityElement.value) || quantityElement.value <= 0) { // Ensure quantity minimum is 1
      quantityElement.value = 1;
    } else if (quantityElement.value > 90) { // Ensure quantity maximum is 90
      quantityElement.value = 90;
    }
  };

  // ----------------------------------------------- Cancels a new order placed -----------------------------------------------
  const cancelOrder = (event) => {
    event.stopPropagation();
    let buttonClicked = event.target;
    let order = buttonClicked.parentElement.parentElement.parentElement;
    let tableRows = buttonClicked.closest('.table-rows');
    let orderNum = order.getElementsByClassName('row-id')[0].innerText;
    let name = order.getElementsByClassName('row-customer')[0].innerText;
    const fName = name.split(" ")[0];
    const lName = name.split(" ")[1];
    const phone = order.getElementsByClassName('row-phone')[0].innerText;
    let data = {
      orderNum: orderNum,
      fName: fName,
      lName: lName,
      phone: phone
    };
    tableRows.remove(); // Remove the row from the New Orders div for the order that was cancelled

    // Sends the order number so the order can be deleted in the database
    $.ajax({
      url: '/cancel-order',
      method: 'POST',
      data: data
    })
      .fail(err => console.log(err.message));
  };

  // ----------------------------------------------- Accepts a new order placed -----------------------------------------------
  const acceptOrder = (event) => {
    event.stopPropagation();
    let buttonClicked = event.target;
    let order = buttonClicked.parentElement.parentElement.parentElement;
    let tableRows = buttonClicked.closest('.table-rows');
    let orderNum = order.getElementsByClassName('row-id')[0].innerText;
    let prepTime = order.getElementsByClassName('prepTime-input')[0].value;
    let data = {
      orderNum: orderNum,
      prepTime: prepTime
    };
    
    if (prepTime > 0) { // Ensures a prep time of at least 1 minute
      tableRows.remove(); // Remove the row from the New Orders div for the order that was accepted

      // Sends the order number and prep time so the status can be updated in the database
      $.ajax({
        url: '/accept-order',
        method: 'POST',
        data: data
      })
        .then(() => {
          $("#current-orders").load(location.href + " #current-orders>");
        })
        .done(() => {
          $("#current-orders").load(location.href + " #current-orders>"); // Refresh current orders div (move the accepted order down to the current order section)
        })
        .fail(err => console.log(err.message));
    } else {
      alert("Please specify a prep time.");
    }
  };

  // ----------------------------------------------- Slides order details up and down when button is clicked -----------------------------------------------
  const orderDetails = (event) => {
    event.stopPropagation();
    let buttonClicked = event.target;
    let tableRow = buttonClicked.parentElement.parentElement;
    let orderDetail = tableRow.getElementsByClassName('order-details')[0];
    buttonClicked.classList.toggle('active'); // Toggles button class for animations
    orderDetail.classList.toggle('active'); // Toggles order details div for animations
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
  $(document).on('click', '.expand-order-btn', orderDetails);
});
