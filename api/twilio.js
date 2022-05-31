require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Twilio account sid
const authToken = process.env.TWILIO_ACCOUNT_AUTHTOKEN; // Twilio authentication token

const client = require('twilio')(accountSid, authToken);

const sendTextRestaurant = (firstName, lastName, phone, orderNum) => {
  client.messages
    .create({
      body: `A new order has been placed by ${firstName} ${lastName}, order number: ${orderNum}`,
      to: '+16477181094',
      from: '+19704808780'
    })
    .catch((err) => console.log(err));
};

const sendTextCustomer = (firstName, lastName, phone, orderNum) => {
  client.messages
    .create({
      body: `Thank you ${firstName} ${lastName}, your order with Ayutthaya has been placed! Your order number is: ${orderNum}`,
      to: phone, // Text this number
      from: '+19704808780' // From a valid Twilio number
    })
    .catch((err) => console.log(err));
};

module.exports = {
  sendTextRestaurant,
  sendTextCustomer
};
