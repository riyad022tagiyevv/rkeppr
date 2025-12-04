const axios = require("axios");
const { whatsappApiUrl, token } = require("./config");

async function sendWhatsAppMessage(phone, text) {
  try {
    const res = await axios.post(whatsappApiUrl, {
      token,
      to: phone,
      body: text
    });

    console.log("Message sent to:", phone, res.data);
  } catch (error) {
    console.log("WhatsApp error:", error.response?.data || error);
  }
}

module.exports = sendWhatsAppMessage;
