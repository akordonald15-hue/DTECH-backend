// server/routes/contacts.js
import express from "express";
import nodemailer from "nodemailer";
import Contact from "../models/Contact.js";

const router = express.Router();

//  POST /api/contacts
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    //  Save message to MongoDB
    const contact = new Contact({ name, email, message });
    await contact.save();

    //  Send email via Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // <-- your Google App Password
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // you receive the message
      subject: `New Contact Form Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Message sent successfully 🚀" });
  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({ error: "Something went wrong, please try again." });
  }
});

export default router;
