const express = require("express");
const app = express();

const VERIFY_TOKEN = "my_verify_token";

app.get("/facebook/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

app.post("/facebook/webhook", (req, res) => {
  res.status(200).send("EVENT_RECEIVED");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
