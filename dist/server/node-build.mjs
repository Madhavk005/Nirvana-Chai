import path from "path";
import "dotenv/config";
import * as express from "express";
import express__default from "express";
import cors from "cors";
import "nodemailer";
const handleDemo = (req, res) => {
  const response = {
    message: "Hello from Express server"
  };
  res.status(200).json(response);
};
const handleNewsletterSignup = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    console.log("📧 Newsletter signup:", {
      email,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      type: "newsletter_subscription"
    });
    res.status(200).json({
      message: "Successfully subscribed to newsletter",
      email
    });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    res.status(500).json({ error: "Failed to process subscription" });
  }
};
const handleContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }
    console.log("📧 Contact form submission:", {
      name,
      email,
      subject: subject || "No subject",
      message: message.substring(0, 100) + (message.length > 100 ? "..." : ""),
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      type: "contact_form"
    });
    res.status(200).json({
      message: "Message sent successfully",
      data: { name, email, subject }
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};
const handleLoginAttempt = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    console.log("🔐 Login attempt:", {
      email,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      ip: req.ip || "Unknown",
      type: "login_attempt"
    });
    res.status(200).json({ message: "Login attempt logged" });
  } catch (error) {
    console.error("Login attempt logging error:", error);
    res.status(500).json({ error: "Failed to log login attempt" });
  }
};
const handleRegistration = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }
    console.log("👤 New user registration:", {
      name: `${firstName} ${lastName}`,
      email,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      type: "user_registration"
    });
    res.status(200).json({
      message: "Registration successful",
      data: { firstName, lastName, email }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Failed to process registration" });
  }
};
const handleOrderPlacement = async (req, res) => {
  try {
    const {
      shippingInfo,
      cartItems,
      paymentMethod,
      orderTotal,
      subtotal,
      shipping,
      tax
    } = req.body;
    if (!shippingInfo || !cartItems || !orderTotal) {
      return res.status(400).json({ error: "Order details are required" });
    }
    console.log("🛒 New order received:", {
      orderId: Date.now().toString(),
      customer: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
      email: shippingInfo.email,
      items: cartItems.map((item) => `${item.name} (x${item.quantity})`),
      total: `$${orderTotal.toFixed(2)}`,
      paymentMethod,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      type: "order_placement"
    });
    res.status(200).json({
      message: "Order placed successfully",
      orderId: Date.now().toString()
    });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ error: "Failed to process order" });
  }
};
function createServer() {
  const app2 = express__default();
  app2.use(cors());
  app2.use(express__default.json());
  app2.use(express__default.urlencoded({ extended: true }));
  app2.get("/health", (_req, res) => {
    res.json({
      status: "healthy",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      uptime: process.uptime()
    });
  });
  app2.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });
  app2.get("/api/demo", handleDemo);
  app2.post("/api/forms/newsletter", handleNewsletterSignup);
  app2.post("/api/forms/contact", handleContactForm);
  app2.post("/api/forms/login-attempt", handleLoginAttempt);
  app2.post("/api/forms/register", handleRegistration);
  app2.post("/api/forms/order", handleOrderPlacement);
  return app2;
}
const app = createServer();
const port = process.env.PORT || 3e3;
const __dirname = import.meta.dirname;
const distPath = path.join(__dirname, "../spa");
app.use(express.static(distPath));
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(distPath, "index.html"));
});
app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
//# sourceMappingURL=node-build.mjs.map
