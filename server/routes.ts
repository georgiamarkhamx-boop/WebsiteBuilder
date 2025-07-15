import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
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

  // User registration route
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

  // User login route
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
