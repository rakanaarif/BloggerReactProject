import { type User, type InsertUser, type Consultation, type InsertConsultation, type Subscription, type InsertSubscription } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserCredits(id: number, credits: number): Promise<void>;
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  getConsultations(userId: number): Promise<Consultation[]>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  getActiveSubscription(userId: number): Promise<Subscription | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private consultations: Map<number, Consultation>;
  private subscriptions: Map<number, Subscription>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.consultations = new Map();
    this.subscriptions = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id, isAdmin: false, credits: 0 };
    this.users.set(id, user);
    return user;
  }

  async updateUserCredits(id: number, credits: number): Promise<void> {
    const user = await this.getUser(id);
    if (user) {
      this.users.set(id, { ...user, credits });
    }
  }

  async createConsultation(consultation: InsertConsultation): Promise<Consultation> {
    const id = this.currentId++;
    const newConsultation: Consultation = {
      ...consultation,
      id,
      timestamp: new Date()
    };
    this.consultations.set(id, newConsultation);
    return newConsultation;
  }

  async getConsultations(userId: number): Promise<Consultation[]> {
    return Array.from(this.consultations.values()).filter(
      (consultation) => consultation.userId === userId
    );
  }

  async createSubscription(subscription: InsertSubscription): Promise<Subscription> {
    const id = this.currentId++;
    const newSubscription: Subscription = {
      ...subscription,
      id,
      active: true
    };
    this.subscriptions.set(id, newSubscription);
    return newSubscription;
  }

  async getActiveSubscription(userId: number): Promise<Subscription | undefined> {
    return Array.from(this.subscriptions.values()).find(
      (subscription) => subscription.userId === userId && subscription.active
    );
  }
}

export const storage = new MemStorage();
