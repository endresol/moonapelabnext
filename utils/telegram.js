const axios = require("axios");

const TELEGRAM_BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN"; // Replace this with your actual Telegram Bot token
const CHAT_ID = "YOUR_CHAT_ID"; // Replace this with the chat ID where you want to send the messages

const sendTelegram = async (message, isError = false) => {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await axios.post(url, {
      chat_id: CHAT_ID,
      text: message,
    });

    if (response.data.ok) {
      console.log(`Message sent: ${message}`);
    } else {
      console.error(`Failed to send message: ${message}`);
    }
  } catch (error) {
    console.error(`Error sending message: ${error.message}`);
  }
};

module.exports = sendTelegram;
