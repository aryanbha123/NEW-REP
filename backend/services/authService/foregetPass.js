import express from "express";
import { transporter, User } from "models-pms";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const router = express.Router();

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
  otpCode: { type: String, required: true },
  expiry: { type: Date, required: true },
});

const OTP = mongoose.model("OTP", otpSchema);

// 📌 Send OTP for password reset
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    
    // Respond generically to prevent email enumeration
    if (!user) return res.json({ message: "If this email exists, an OTP has been sent." });

    // Check if OTP already exists and is not expired
    const existingOtp = await OTP.findOne({ email });
    if (existingOtp && existingOtp.expiry > Date.now()) {
      return res.status(429).json({ message: "OTP already sent. Try again later." });
    }

    // Remove previous OTPs for this email
    await OTP.deleteMany({ email });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const hashedOtp = await bcrypt.hash(otp, 10);
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    const otpDocument = new OTP({ email, otpCode: hashedOtp, expiry });
    await otpDocument.save();

    // Send OTP via email
    await transporter.sendMail({
      from: process.env.MAIL_SENDER || "slalaarsh@gmail.com",
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
    });

    res.json({ message: "If this email exists, an OTP has been sent." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Reset password using OTP
router.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const otpDocument = await OTP.findOne({ email });
    if (!otpDocument) {
      return res.status(400).json({ message: "OTP not requested or expired" });
    }

    if (otpDocument.expiry < Date.now()) {
      await OTP.deleteOne({ email });
      return res.status(400).json({ message: "OTP expired" });
    }

    const isOtpValid = await bcrypt.compare(otp, otpDocument.otpCode);
    if (!isOtpValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    await OTP.deleteOne({ email });

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
