const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Enter your email"],
    },
    password: {
      type: String,
      required: [true, "Enter your password"],
    },
  },
  { Timestamp: Date.now() }
);

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;
