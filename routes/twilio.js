require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Twilio account sid
const authToken = process.env.TWILIO_ACCOUNT_AUTHTOKEN; // Twilio authentication token

const client = require('twilio')(accountSid, authToken);

const sendTextMessage = () => {
  client.messages
    .create({
      body: 'Your order with Ayutthaya has been placed!',
      to: '+16477181094', // Text this number
      from: '+19704808780' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));
};

module.exports = sendTextMessage;
