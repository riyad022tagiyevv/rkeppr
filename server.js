const express = require("express");
const sendWhatsApp = require("./sendWhatsApp");
const { customerReceiver, donnerciReceiver } = require("./config");

const app = express();
app.use(express.json());

app.post("/order", async (req, res) => {
  const order = req.body;

  // Mesaj hazırlayırıq
  const msgForCashier = `Yeni sifariş №${order.id}\nMəhsullar:\n${order.items.join("\n")}`;
  const msgForKitchen  = `Hazırlamaq üçün sifariş:\n${order.items.join("\n")}`;

  // 1) Kassirə göndəririk
  await sendWhatsApp(customerReceiver, msgForCashier);

  // 2) Dönerçiyə göndəririk
  await sendWhatsApp(donnerciReceiver, msgForKitchen);

  res.json({ ok: true });
});

// Server start
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
