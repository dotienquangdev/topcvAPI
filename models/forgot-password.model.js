const mongoose = require("mongoose");
const generate = require("../helper/generate");
const forgotPasswordSchema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    expiresAt: {
      type: Date,
      expires: 180,
      // expires: 180, 180 giay gui lai OTP
    },
  },
  {
    timestamps: true,
  }
);
const ForgotPassword = mongoose.model(
  "ForgotPassword",
  forgotPasswordSchema,
  "forgot-password"
);

module.exports = ForgotPassword;
