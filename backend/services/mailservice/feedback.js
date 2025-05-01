import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Send to admin
    await transporter.sendMail({
      from: `"Eco Bloom Feedback" <${process.env.EMAIL_USER}>`,
      to: "aryanbhandari4077@gmail.com",
      subject: `🌿 New Feedback from ${name}`,
      html: `
        <h3>New Feedback</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    // Confirmation to user
    await transporter.sendMail({
      from: `"Eco Bloom Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thanks for your feedback, ${name}! 🌱`,
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for your message! Our team will reach out if necessary.</p>
        <p>— Eco Bloom Team</p>
      `,
    });

    res.status(200).json({ message: "Feedback sent successfully." });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: "Failed to send emails." });
  }
});

export default router;
