/* eslint-env jquery */

// Scripts for menu page

$(document).ready(function() {

  // ---------------------------- Removes item from cart when button is clicked ----------------------------
  const removeCartItem = (event) => {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.parentElement.remove();
    updateCartTotal();
    updateCartBadge();
  };

  // ---------------------------- Changes the quantity for an item in the cart ----------------------------
  const quantityChanged = (event) => {
    let quantityElement = event.target;
    if (isNaN(quantityElement.value) || quantityElement.value <= 0) { // Ensures quantity minimum is 1
      quantityElement.value = 1;
    } else if (quantityElement.value > 20) { // Ensures quantity maximum is 20
      quantityElement.value = 20;
    }
    updateCartTotal();
    updateCartBadge();
  };

  // ------------------------------------ Adds a menu item to the cart ------------------------------------
  const addToCart = (event) => {
    let buttonClicked = event.target;
    let menuItem = buttonClicked.parentElement.parentElement.parentElement;
    let item = menuItem.querySelectorAll('.title-description h2')[0].innerText;
    let price = menuItem.querySelectorAll('.price-and-cart p')[0].innerText;

    addItemToCart(item, price);
    updateCartTotal();
    updateCartBadge();
  };

  // ----------------------- Create a new row in cart and adds the item to the cart -----------------------
  const addItemToCart = (item, price) => {

    let cartRow = document.createElement('div'); // Creates a new cart row
    cartRow.classList.add('cart-row');
    let cartItems = document.getElementsByClassName('cart-menu-items')[0]; // cart-menu-items is the container that holds all the cart-row divs

    // Checks if the item trying to be added is already in the cart
    let cartItemNames = document.getElementsByClassName('cart-item-title');
    for (let i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText === item) {
        alert('This item is already in your cart.');
        return;
      }
    }

    let cartRowContents = `
      <span class="cart-item cart-item-title">${item}</span>
      <span class="cart-price">${price}</span>
      <span class="cart-quantity">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="cart-quantity-btn" type="button"><i class="fa-solid fa-circle-xmark"></i></button>
      </span>
    `;

    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);

    // Add event listeners to the newly added cart items
    cartRow.getElementsByClassName('cart-quantity-btn')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
  };

  // ------------------------------------------------- Update cart total -------------------------------------------------
  const updateCartTotal = () => {

    const cartItemContainer = document.getElementsByClassName('cart-items')[0]; // .getElementsByClassName returns an array
    const cartRows = cartItemContainer.getElementsByClassName('cart-row');

    let subtotal = 0;
    let tax = 0;
    let total = 0;

    // Loops through cart and sums the price
    for (let i = 0; i < cartRows.length; i++) {
      const cartRow = cartRows[i];
      const priceElement = cartRow.getElementsByClassName('cart-price')[0];
      const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
      const price = parseFloat(priceElement.innerText.replace('$', ''));
      const quantity = quantityElement.value;

      subtotal += (price * quantity);
    }

    subtotal = subtotal.toFixed(2);
    tax = (subtotal * 0.13).toFixed(2);
    total = (subtotal * 1.13).toFixed(2);

    document.getElementsByClassName('subtotal')[0].innerText = '$ ' + subtotal;
    document.getElementsByClassName('tax')[0].innerText = '$ ' + tax;
    document.getElementsByClassName('total')[0].innerText = '$ ' + total;
  };

  // ------------------------------------------------- Update cart badge -------------------------------------------------
  const updateCartBadge = () => {
    const cartItemContainer = document.getElementsByClassName('cart-items')[0];
    const cartRows = cartItemContainer.getElementsByClassName('cart-row');
    const cartBadge = document.getElementById('cart-badge');

    let totalQuantity = 0;

    // Loops through cart to count the total number of items in the cart
    for (let i = 0; i < cartRows.length; i++) {
      const cartRow = cartRows[i];
      const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
      const quantity = parseFloat(quantityElement.value);

      totalQuantity += quantity;
    }
    cartBadge.innerText = totalQuantity;
  };

  // ---------------------------- Creates a new order when the submit order button is clicked ----------------------------
  const createOrder = (event) => {

    let buttonClicked = event.target;
    let cartItems = buttonClicked.parentElement.parentElement.getElementsByClassName('cart-menu-items')[0];
    let cartRows = buttonClicked.parentElement.parentElement.getElementsByClassName('cart-row');
    let totalCost = buttonClicked.parentElement.parentElement.getElementsByClassName('total')[0].innerText; // Get the total cost of the cart

    // Store the order items into an array of objects
    let orderItemsArray = [];

    for (let i = 0; i < cartRows.length; i++) {
      let cartRow = cartRows[i];
      let item = cartRow.getElementsByClassName('cart-item')[0].innerText;
      let quantity = cartRow.getElementsByClassName('cart-quantity-input')[0].value;
      let price = cartRow.getElementsByClassName('cart-price')[0].innerText;
      let newItem = {
        item: item,
        quantity: quantity,
        price: price
      };
      orderItemsArray.push(newItem);
    }

    let data = {
      orderItemsArray: orderItemsArray,
      totalCost: totalCost
    };

    if (cartRows.length !== 0) { // Checks if there are items in the cart
      // GET route in menu.js
      $.ajax({
        url: '/sms-restaurant',
        method: 'POST',
        data: data
      })
        .done((results) => {
          if (results === "Logged in.") {
            alert('Your order has been placed. Thank you!');

            // Clears the cart once order is submitted
            while (cartItems.hasChildNodes()) {
              cartItems.removeChild(cartItems.firstChild);
            }
          } else if (results === "Not logged in.") {
            alert('Please login to place an order.');
          }

          updateCartTotal();
          updateCartBadge();
        })
        .fail(error => console.log(`Error: ${error.message}`));
    } else if (cartRows.length === 0) { // If there are no items in the cart
      $.ajax({
        url: '/sms2-restaurant',
        method: 'GET'
      })
        .done((results) => {
          if (results === "Logged in.") {
            alert('Your cart is currently empty. Please add an item to your cart to place an order.');
          } else if (results === "Not logged in.") {
            alert('Please login to place an order.');
          }
        })
        .fail(error => console.log(`Error: ${error.message}`));
    }
  };

  // ----------------------------------------------------------------------

  // Event listener for when remove item from cart button is clicked
  const removeCartItemButtons = document.getElementsByClassName('cart-quantity-btn');
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
  }

  // Event listener for when cart item quantity is changed
  const quantityFields = document.getElementsByClassName('cart-quantity-input');
  for (let i = 0; i < quantityFields.length; i++) {
    let quantityField = quantityFields[i];
    quantityField.addEventListener('change', quantityChanged);
  }

  // Event listener for when add item to cart button is clicked
  const addToCartButtons = document.getElementsByClassName('add-to-cart');
  for (let i = 0; i < addToCartButtons.length; i++) {
    let button = addToCartButtons[i];
    button.addEventListener('click', addToCart);
  }

  // Event listener for when submit order button is clicked
  document.querySelectorAll('.submit-order-btn button')[0].addEventListener('click', createOrder);

}); // document ready
