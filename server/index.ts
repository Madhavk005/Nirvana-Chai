import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleNewsletterSignup,
  handleContactForm,
  handleLoginAttempt,
  handleRegistration,
  handleOrderPlacement,
} from "./routes/forms";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check endpoint
  app.get("/health", (_req, res) => {
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Form submission routes
  app.post("/api/forms/newsletter", handleNewsletterSignup);
  app.post("/api/forms/contact", handleContactForm);
  app.post("/api/forms/login-attempt", handleLoginAttempt);
  app.post("/api/forms/register", handleRegistration);
  app.post("/api/forms/order", handleOrderPlacement);

  return app;
}
