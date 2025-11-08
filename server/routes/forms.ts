import { RequestHandler } from "express";
import nodemailer from "nodemailer";

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Newsletter subscription
export const handleNewsletterSignup: RequestHandler = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Log to console instead of sending email (development mode)
    console.log("📧 Newsletter signup:", {
      email,
      timestamp: new Date().toISOString(),
      type: "newsletter_subscription",
    });

    res.status(200).json({
      message: "Successfully subscribed to newsletter",
      email: email,
    });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    res.status(500).json({ error: "Failed to process subscription" });
  }
};

// Contact form
export const handleContactForm: RequestHandler = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Name, email, and message are required" });
    }

    // Log to console instead of sending email (development mode)
    console.log("📧 Contact form submission:", {
      name,
      email,
      subject: subject || "No subject",
      message: message.substring(0, 100) + (message.length > 100 ? "..." : ""),
      timestamp: new Date().toISOString(),
      type: "contact_form",
    });

    res.status(200).json({
      message: "Message sent successfully",
      data: { name, email, subject },
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

// Login attempt notification
export const handleLoginAttempt: RequestHandler = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Log to console instead of sending email (development mode)
    console.log("🔐 Login attempt:", {
      email,
      timestamp: new Date().toISOString(),
      ip: req.ip || "Unknown",
      type: "login_attempt",
    });

    res.status(200).json({ message: "Login attempt logged" });
  } catch (error) {
    console.error("Login attempt logging error:", error);
    res.status(500).json({ error: "Failed to log login attempt" });
  }
};

// Registration notification
export const handleRegistration: RequestHandler = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Log to console instead of sending email (development mode)
    console.log("👤 New user registration:", {
      name: `${firstName} ${lastName}`,
      email,
      timestamp: new Date().toISOString(),
      type: "user_registration",
    });

    res.status(200).json({
      message: "Registration successful",
      data: { firstName, lastName, email },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Failed to process registration" });
  }
};

// Order placement notification
export const handleOrderPlacement: RequestHandler = async (req, res) => {
  try {
    const {
      shippingInfo,
      cartItems,
      paymentMethod,
      orderTotal,
      subtotal,
      shipping,
      tax,
    } = req.body;

    if (!shippingInfo || !cartItems || !orderTotal) {
      return res.status(400).json({ error: "Order details are required" });
    }

    // Log to console instead of sending email (development mode)
    console.log("🛒 New order received:", {
      orderId: Date.now().toString(),
      customer: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
      email: shippingInfo.email,
      items: cartItems.map((item: any) => `${item.name} (x${item.quantity})`),
      total: `$${orderTotal.toFixed(2)}`,
      paymentMethod,
      timestamp: new Date().toISOString(),
      type: "order_placement",
    });

    res.status(200).json({
      message: "Order placed successfully",
      orderId: Date.now().toString(),
    });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ error: "Failed to process order" });
  }
};
