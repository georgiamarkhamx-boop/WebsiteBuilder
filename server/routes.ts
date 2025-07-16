import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { AuthService } from "./auth";
import { insertUserSchema, insertEnrollmentSchema, insertAssessmentSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Course routes
  app.get("/api/courses", async (req, res) => {
    try {
      const category = req.query.category as string;
      const courses = category === "all" || !category 
        ? await storage.getAllCourses()
        : await storage.getCoursesByCategory(category);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const courseId = parseInt(req.params.id);
      const course = await storage.getCourse(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch course" });
    }
  });

  // Enrollment routes
  app.post("/api/enrollments", async (req, res) => {
    try {
      const enrollmentData = {
        userId: req.body.userId || 1, // Default user for demo
        courseId: req.body.courseId,
        progress: 0,
        completed: false
      };

      const validatedData = insertEnrollmentSchema.parse(enrollmentData);
      const enrollment = await storage.createEnrollment(validatedData);
      res.json(enrollment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid enrollment data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create enrollment" });
    }
  });

  app.get("/api/enrollments/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const enrollments = await storage.getUserEnrollments(userId);
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch enrollments" });
    }
  });

  app.patch("/api/enrollments/:id", async (req, res) => {
    try {
      const enrollmentId = parseInt(req.params.id);
      const { progress, completed, score } = req.body;
      
      const enrollment = await storage.updateEnrollmentProgress(enrollmentId, progress, completed, score);
      if (!enrollment) {
        return res.status(404).json({ message: "Enrollment not found" });
      }
      res.json(enrollment);
    } catch (error) {
      res.status(500).json({ message: "Failed to update enrollment" });
    }
  });

  // Assessment routes
  app.post("/api/assessments", async (req, res) => {
    try {
      const assessmentData = {
        userId: req.body.userId || 1, // Default user for demo
        type: req.body.type,
        answers: req.body.answers,
        score: req.body.score,
        results: req.body.results
      };

      const validatedData = insertAssessmentSchema.parse(assessmentData);
      const assessment = await storage.createAssessment(validatedData);
      res.json(assessment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid assessment data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create assessment" });
    }
  });

  app.get("/api/assessments/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const assessments = await storage.getUserAssessments(userId);
      res.json(assessments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch assessments" });
    }
  });

  // Secure user registration with trial setup
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email) || 
                           await storage.getUserByUsername(validatedData.username);
      
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await AuthService.hashPassword(validatedData.password);
      
      // Set up 30-day trial
      const trialStartDate = new Date();
      const trialEndDate = new Date();
      trialEndDate.setDate(trialStartDate.getDate() + 30);
      
      // Create user with trial setup
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
        subscriptionTier: "trial",
        trialStartDate,
        trialEndDate,
        isTrialExpired: false
      });

      // Set up session
      req.session.userId = user.id;
      req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        subscriptionTier: user.subscriptionTier,
        trialEndDate: user.trialEndDate
      };

      res.status(201).json({ 
        message: "Account created successfully! Your 30-day free trial has started.",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          subscriptionTier: user.subscriptionTier,
          trialEndDate: user.trialEndDate,
          daysRemaining: Math.ceil((trialEndDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        }
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: error.message });
    }
  });

  // Legacy registration route
  app.post("/api/users/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      const user = await storage.createUser(validatedData);
      res.json({ id: user.id, username: user.username, email: user.email });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  // Secure authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password, mfaToken } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      const { user, error } = await AuthService.authenticateUser(username, password);
      
      if (error || !user) {
        return res.status(401).json({ message: error || "Authentication failed" });
      }

      // Check trial status
      let trialStatus = null;
      if (user.subscriptionTier === "trial" && user.trialEndDate) {
        const daysRemaining = Math.ceil((new Date(user.trialEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        const isExpired = daysRemaining <= 0;
        
        trialStatus = {
          daysRemaining: Math.max(0, daysRemaining),
          isExpired,
          endDate: user.trialEndDate
        };
        
        if (isExpired) {
          return res.status(403).json({ 
            message: "Your 30-day trial has expired. Please upgrade to continue access.",
            trialExpired: true,
            redirectTo: "/pricing"
          });
        }
      }

      // Check MFA if enabled
      if (user.mfaEnabled && user.mfaSecret) {
        if (!mfaToken) {
          return res.status(200).json({ requireMFA: true });
        }
        
        const mfaValid = AuthService.verifyMFAToken(user.mfaSecret, mfaToken);
        if (!mfaValid) {
          return res.status(401).json({ message: "Invalid MFA token" });
        }
      }

      // Set up session
      req.session.userId = user.id;
      req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        subscriptionTier: user.subscriptionTier,
        trialEndDate: user.trialEndDate
      };

      res.json({ 
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          subscriptionTier: user.subscriptionTier,
          mfaEnabled: user.mfaEnabled,
          trialStatus
        }
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get current user session/profile
  app.get("/api/auth/profile", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Calculate trial status
      let trialStatus = null;
      if (user.subscriptionTier === "trial" && user.trialEndDate) {
        const daysRemaining = Math.ceil((new Date(user.trialEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        trialStatus = {
          daysRemaining: Math.max(0, daysRemaining),
          isExpired: daysRemaining <= 0,
          endDate: user.trialEndDate
        };
      }

      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          subscriptionTier: user.subscriptionTier,
          companyName: user.companyName,
          trialStatus
        }
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Logout
  app.post("/api/auth/logout", async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: "Could not log out" });
        }
        res.clearCookie('connect.sid');
        res.json({ message: "Logged out successfully" });
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/auth/setup-mfa", async (req, res) => {
    try {
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({ message: "User ID required" });
      }

      const { secret, qrCodeUrl } = await AuthService.setupMFA(userId);
      
      res.json({ secret, qrCodeUrl });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/auth/enable-mfa", async (req, res) => {
    try {
      const { userId, secret, token } = req.body;
      
      if (!userId || !secret || !token) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const success = await AuthService.enableMFA(userId, secret, token);
      
      if (!success) {
        return res.status(400).json({ message: "Invalid verification token" });
      }

      res.json({ message: "MFA enabled successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Legacy login route (less secure)
  app.post("/api/users/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await storage.getUserByEmail(email);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({ id: user.id, username: user.username, email: user.email });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Enrollment routes
  app.post("/api/enrollments", async (req, res) => {
    try {
      const enrollmentData = {
        userId: req.body.userId || 1, // Default user for demo
        courseId: req.body.courseId,
        progress: req.body.progress || 0,
        completed: req.body.completed || false,
        score: req.body.score
      };

      const validatedData = insertEnrollmentSchema.parse(enrollmentData);
      const enrollment = await storage.createEnrollment(validatedData);
      res.json(enrollment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid enrollment data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create enrollment" });
    }
  });

  app.get("/api/enrollments/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const enrollments = await storage.getUserEnrollments(userId);
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch enrollments" });
    }
  });

  // Demo quiz submission
  app.post("/api/quiz/submit", async (req, res) => {
    try {
      const { answer, scenario } = req.body;
      
      let feedback = "";
      let correct = false;
      
      if (scenario === "email-security") {
        switch (answer) {
          case "verify":
            feedback = "✅ Excellent! Verifying through a different communication channel is the best practice. This helps confirm the request is legitimate before taking action.";
            correct = true;
            break;
          case "forward":
          case "report":
            feedback = "⚠️ Good thinking, but not the best approach. While involving others can help, direct verification with the sender is more effective.";
            correct = false;
            break;
          case "buy":
            feedback = "❌ This is dangerous! Gift card requests are a common phishing tactic. Always verify unusual requests through a different channel.";
            correct = false;
            break;
          default:
            feedback = "Please select an answer.";
        }
      }

      res.json({ feedback, correct });
    } catch (error) {
      res.status(500).json({ message: "Failed to process quiz submission" });
    }
  });

  // Statistics for dashboard
  app.get("/api/stats", async (req, res) => {
    try {
      const courses = await storage.getAllCourses();
      const stats = {
        totalCourses: courses.length,
        coursesByCategory: {
          general: courses.filter(c => c.category.includes("general")).length,
          technical: courses.filter(c => c.category.includes("technical")).length,
          leadership: courses.filter(c => c.category.includes("leadership")).length,
          compliance: courses.filter(c => c.category.includes("compliance")).length,
        },
        popularCourses: courses.filter(c => c.isPopular).length,
        newCourses: courses.filter(c => c.isNew).length,
      };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
