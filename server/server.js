const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;
const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: "*",
  methods: ["POST", "GET"],
}));
app.use(express.json());

// ─── Contact Route ────────────────────────────────────────────────────────────
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ success: false, error: "All fields are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: "Invalid email address." });
  }

  try {
    // Mail to YOU (notification)
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "vansh.lunagariya123@gmail.com",
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
    await resend.emails.send({
      from: "onboarding@resend.dev",
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

// ─── Keep alive (prevents Render free tier from sleeping) ────────────────────
setInterval(() => {
  const url = process.env.RENDER_URL;
  if (url) {
    fetch(`${url}/api/health`)
      .then(() => console.log("✅ Server kept alive"))
      .catch(() => {});
  }
}, 14 * 60 * 1000);

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});