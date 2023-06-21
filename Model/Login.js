const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
    // unique: true,
  },

  password: {
    type: String,
    // required: true,
    // unique: true,
  },
});
const login = mongoose.model("logindata", UserSchema);

module.exports = login;
// User.createIndexes();
