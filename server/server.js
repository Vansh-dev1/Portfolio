const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: ["POST"],
}));
app.use(express.json());

// ─── Nodemailer Transporter ───────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,   // your Gmail: vansh.lunagariya123@gmail.com
    pass: process.env.EMAIL_PASS,   // 16-char Gmail App Password
  },
});

// Verify transporter on startup
transporter.verify((error) => {
  if (error) {
    console.error("❌ Mail transporter error:", error.message);
  } else {
    console.log("✅ Mail transporter ready");
  }
});

// ─── Contact Route ────────────────────────────────────────────────────────────
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ success: false, error: "All fields are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: "Invalid email address." });
  }

  try {
    // Mail to YOU (notification)
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `📬 New message from ${name} — Portfolio`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #f9f9f9; border-radius: 10px; overflow: hidden;">
          <div style="background: #050a0f; padding: 28px 32px;">
            <h2 style="color: #00f5a0; margin: 0; font-size: 22px;">New Portfolio Message</h2>
          </div>
          <div style="padding: 28px 32px;">
            <p style="margin: 0 0 10px;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 0 0 10px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 0 0 6px;"><strong>Message:</strong></p>
            <div style="background: #fff; border-left: 4px solid #00f5a0; padding: 14px 18px; border-radius: 4px; color: #333; white-space: pre-wrap;">${message}</div>
          </div>
          <div style="padding: 16px 32px; background: #f0f0f0; font-size: 12px; color: #888;">
            Sent from your portfolio contact form
          </div>
        </div>
      `,
    });

    // Auto-reply to SENDER
    await transporter.sendMail({
      from: `"Vansh Lunagariya" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thanks for reaching out, ${name}! 👋`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #f9f9f9; border-radius: 10px; overflow: hidden;">
          <div style="background: #050a0f; padding: 28px 32px;">
            <h2 style="color: #00f5a0; margin: 0; font-size: 22px;">Hey ${name}! 👋</h2>
          </div>
          <div style="padding: 28px 32px; color: #333;">
            <p>Thanks for getting in touch! I've received your message and will get back to you as soon as possible.</p>
            <p style="margin-top: 20px; padding: 14px 18px; background: #fff; border-left: 4px solid #00f5a0; border-radius: 4px; white-space: pre-wrap; color: #555;"><em>"${message}"</em></p>
            <p style="margin-top: 20px;">In the meantime, feel free to check out my work:</p>
            <p>
              🐙 <a href="https://github.com/Vansh-dev1" style="color: #00a070;">GitHub</a> &nbsp;|&nbsp;
              💼 <a href="https://www.linkedin.com/in/vansh-lunagariya-96b3632a0/" style="color: #00a070;">LinkedIn</a>
            </p>
            <p style="margin-top: 24px;">Best,<br/><strong>Vansh Lunagariya</strong><br/>B.TECH CSE · ADIT College, Gujarat</p>
          </div>
          <div style="padding: 16px 32px; background: #f0f0f0; font-size: 12px; color: #888;">
            This is an automated reply. Please do not reply directly to this email.
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: "Message sent successfully!" });

  } catch (err) {
    console.error("❌ Email send error:", err.message);
    return res.status(500).json({ success: false, error: "Failed to send message. Please try again." });
  }
});

// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
