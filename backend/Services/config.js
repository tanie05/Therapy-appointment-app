const mongoose = require("mongoose");
require('dotenv').config();

const MONGOURI = process.env.MONGOURI;

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB!");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to MongoDB:", err);
});

module.exports = mongoose;
