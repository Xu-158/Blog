const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, default: "" },
  url: { type: String, default: "" },
  description: { type: String, default: "" },
});

module.exports = mongoose.model("FriendshipLinks", schema);
