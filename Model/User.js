const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Phone: {
    type: Number,
    required: true,
    // unique: true,
  },
});
const User = mongoose.model("userdata", UserSchema);

module.exports = User;
// User.createIndexes();
