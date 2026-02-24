const mongoose = require("mongoose");

const bearSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  breed: {
    type: String,
  },
  gender: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bear", bearSchema);
