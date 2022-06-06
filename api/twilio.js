require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Twilio account sid
const authToken = process.env.TWILIO_ACCOUNT_AUTHTOKEN; // Twilio authentication token

const client = require('twilio')(accountSid, authToken);

// Send a text message to the restaurant when a new order is placed
const sendTextRestaurant = (firstName, lastName, phone, orderNum) => {
  client.messages
    .create({
      body: `A new order has been placed by ${firstName} ${lastName}, order number: ${orderNum}.`,
      to: '+16477181094',
      from: '+19704808780'
    })
    .catch((err) => console.log(err));
};

// Send a text message to the customer when the order is ready for pick-up
const sendTextCustomer = (firstName, lastName, phone, orderNum) => {
  client.messages
    .create({
      body: `Thank you ${firstName} ${lastName}, your order with Ayutthaya is ready for pickup! Your order number is: ${orderNum}.`,
      to: phone, // Text this number
      from: '+19704808780' // From a valid Twilio number
    })
    .catch((err) => console.log(err));
};

// Send a text message to the customer when the order is cancelled
const sendCancelText = (firstName, lastName, phone, orderNum) => {
  client.messages
    .create({
      body: `Hello ${firstName} ${lastName}. I regret to inform you that we are currently unable to process your order (order number: ${orderNum}). Please place a new order or contact our customer support.`,
      to: phone,
      from: '+19704808780' // From a valid Twilio number
    })
    .catch((err) => console.log(err));
};

module.exports = {
  sendTextRestaurant,
  sendTextCustomer,
  sendCancelText
};
