// Client facing scripts here

/* eslint-env jquery */

$(document).ready(function() {

  // Accordian FAQ page
  const faqs = document.querySelectorAll('.faq');
  faqs.forEach(faq => {
    faq.addEventListener('click', () => {
      faq.classList.toggle('active');
    });
  });

  // Remove item from cart
  const removeCartItemButtons = document.getElementsByClassName('cart-quantity-btn');
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
  }

  // Update cart item quantity
  const quantityFields = document.getElementsByClassName('cart-quantity-input');
  for (let i = 0; i < quantityFields.length; i++) {
    let quantityField = quantityFields[i];
    quantityField.addEventListener('change', quantityChanged);
  }

  // Add item to cart
  const addToCartButtons = document.getElementsByClassName('add-to-cart');
  for (let i = 0; i < addToCartButtons.length; i++) {
    let button = addToCartButtons[i];
    button.addEventListener('click', addToCart);
  }

  // Submit order
  document.querySelectorAll('.submit-order-btn button')[0].addEventListener('click', submitOrder);

});

// Event listener for when remove cart item button is clicked
const removeCartItem = (event) => {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.parentElement.remove();
  updateCartTotal();
};

// Event listener for when the quantity is changed for an item in the cart
const quantityChanged = (event) => {
  let quantityElement = event.target;
  if (isNaN(quantityElement.value) || quantityElement.value <= 0) {
    quantityElement.value = 1;
  } else if (quantityElement.value > 20) {
    quantityElement.value = 20;
  }
  updateCartTotal();
};

// Event listener for when the add to cart button is clicked
const addToCart = (event) => {
  let buttonClicked = event.target;
  let menuItem = buttonClicked.parentElement.parentElement.parentElement;
  let item = menuItem.querySelectorAll('.title-description h2')[0].innerText;
  let price = menuItem.querySelectorAll('.price-and-cart p')[0].innerText;

  addItemToCart(item, price);
  updateCartTotal();
};

// Event listener for when submit order button is clicked
const submitOrder = (event) => {

  let buttonClicked = event.target;
  let cartItems = buttonClicked.parentElement.parentElement.getElementsByClassName('cart-menu-items')[0];
  let cartRows = buttonClicked.parentElement.parentElement.getElementsByClassName('cart-row');

  if (cartRows.length !== 0) { // Only alerts user if the cart is not empty
    alert('Your order has been placed. Thank you!');
    createOrder();
  }

  while (cartItems.hasChildNodes()) {
    console.log(cartItems);
    cartItems.removeChild(cartItems.firstChild);
  }

  updateCartTotal();
};

// Create a new row in cart and adds the item to the cart
const addItemToCart = (item, price) => {

  let cartRow = document.createElement('div');
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

// Update cart total
const updateCartTotal = () => {

  const cartItemContainer = document.getElementsByClassName('cart-items')[0]; // .getElementsByClassName returns an array
  const cartRows = cartItemContainer.getElementsByClassName('cart-row');

  let subtotal = 0;
  let tax = 0;
  let total = 0;

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

// const sendTextMessage = () => {
//   client.messages
//     .create({
//       body: 'Your order has been placed!',
//       to: '+16477181094', // Text this number
//       from: '+19704808780' // From a valid Twilio number
//     })
//     .then((message) => console.log(message.sid))
//     .catch((err) => console.log(err));
// };

const createOrder = () => {
  $.ajax({
    url: '/menu',
    method: 'POST'
  })
    .done(results => console.log(results))
    .fail(error => console.log(`Error: ${error.message}`));
};
