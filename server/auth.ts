import bcrypt from "bcrypt";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { storage } from "./storage";
import type { User } from "@shared/schema";

export class AuthService {
  private static readonly SALT_ROUNDS = 12;
  private static readonly MAX_LOGIN_ATTEMPTS = 5;
  private static readonly LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static async authenticateUser(username: string, password: string): Promise<{ user: User | null, error?: string }> {
    const user = await storage.getUserByUsername(username) || await storage.getUserByEmail(username);
    
    if (!user) {
      return { user: null, error: "Invalid credentials" };
    }

    // Check if account is locked
    if (user.lockedUntil && new Date() < user.lockedUntil) {
      return { user: null, error: "Account temporarily locked due to too many failed attempts" };
    }

    // Verify password
    const isValidPassword = await this.verifyPassword(password, user.password);
    
    if (!isValidPassword) {
      // Increment login attempts
      const attempts = (user.loginAttempts || 0) + 1;
      const lockUntil = attempts >= this.MAX_LOGIN_ATTEMPTS ? 
        new Date(Date.now() + this.LOCKOUT_TIME) : null;
      
      // In a real app, you'd update the user in the database
      // For now, we'll just return the error
      return { user: null, error: "Invalid credentials" };
    }

    // Reset login attempts on successful login
    // In a real app, you'd update lastLogin, reset loginAttempts, etc.
    
    return { user, error: undefined };
  }

  static async setupMFA(userId: number): Promise<{ secret: string, qrCodeUrl: string }> {
    const user = await storage.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const secret = speakeasy.generateSecret({
      name: user.email,
      issuer: "CyberShield Security Training",
      length: 32
    });

    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url!);

    // In a real app, you'd save the secret to the database
    // For now, we'll return it for immediate verification
    
    return {
      secret: secret.base32,
      qrCodeUrl
    };
  }

  static verifyMFAToken(secret: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 1
    });
  }

  static async enableMFA(userId: number, secret: string, token: string): Promise<boolean> {
    if (!this.verifyMFAToken(secret, token)) {
      return false;
    }

    // In a real app, you'd update the user's MFA settings in the database
    // For now, we'll just return true
    
    return true;
  }

  static generatePasswordResetToken(): string {
    return require('crypto').randomBytes(32).toString('hex');
  }

  static async createPasswordResetToken(email: string): Promise<string | null> {
    const user = await storage.getUserByEmail(email);
    if (!user) {
      return null;
    }

    const token = this.generatePasswordResetToken();
    const expires = new Date(Date.now() + 3600000); // 1 hour

    // In a real app, you'd save the token and expiration to the database
    
    return token;
  }

  static async resetPassword(token: string, newPassword: string): Promise<boolean> {
    // In a real app, you'd find the user by token, verify expiration,
    // hash the new password, and update the database
    
    return true;
  }
}