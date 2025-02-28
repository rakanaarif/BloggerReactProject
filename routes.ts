import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertConsultationSchema, insertSubscriptionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express) {
  app.post("/api/consultations", async (req, res) => {
    try {
      const data = insertConsultationSchema.parse(req.body);
      const consultation = await storage.createConsultation(data);
      
      // Update user credits
      const user = await storage.getUser(data.userId);
      if (user) {
        await storage.updateUserCredits(
          user.id,
          user.credits - data.charCount
        );
      }
      
      res.json(consultation);
    } catch (error) {
      res.status(400).json({ error: "Invalid consultation data" });
    }
  });

  app.get("/api/consultations/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const consultations = await storage.getConsultations(userId);
    res.json(consultations);
  });

  app.post("/api/subscriptions", async (req, res) => {
    try {
      const data = insertSubscriptionSchema.parse(req.body);
      const subscription = await storage.createSubscription(data);
      res.json(subscription);
    } catch (error) {
      res.status(400).json({ error: "Invalid subscription data" });
    }
  });

  app.post("/api/credits/add", async (req, res) => {
    const schema = z.object({
      userId: z.number(),
      amount: z.number()
    });

    try {
      const { userId, amount } = schema.parse(req.body);
      const user = await storage.getUser(userId);
      
      if (user) {
        await storage.updateUserCredits(userId, user.credits + amount);
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
