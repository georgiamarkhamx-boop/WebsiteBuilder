import { 
  users, courses, enrollments, assessments, certificates,
  type User, type InsertUser, type Course, type InsertCourse,
  type Enrollment, type InsertEnrollment, type Assessment, type InsertAssessment,
  type Certificate, type InsertCertificate
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Courses
  getAllCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  getCoursesByCategory(category: string): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;

  // Enrollments
  getUserEnrollments(userId: number): Promise<Enrollment[]>;
  getEnrollment(userId: number, courseId: number): Promise<Enrollment | undefined>;
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  updateEnrollmentProgress(id: number, progress: number, completed?: boolean, score?: number): Promise<Enrollment | undefined>;

  // Assessments
  getUserAssessments(userId: number): Promise<Assessment[]>;
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;

  // Certificates
  getUserCertificates(userId: number): Promise<Certificate[]>;
  getCertificate(certificateId: string): Promise<Certificate | undefined>;
  createCertificate(certificate: InsertCertificate): Promise<Certificate>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private courses: Map<number, Course>;
  private enrollments: Map<number, Enrollment>;
  private assessments: Map<number, Assessment>;
  private certificates: Map<number, Certificate>;
  private currentUserId: number;
  private currentCourseId: number;
  private currentEnrollmentId: number;
  private currentAssessmentId: number;
  private currentCertificateId: number;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.enrollments = new Map();
    this.assessments = new Map();
    this.certificates = new Map();
    this.currentUserId = 1;
    this.currentCourseId = 1;
    this.currentEnrollmentId = 1;
    this.currentAssessmentId = 1;
    this.currentCertificateId = 1;

    this.seedData();
  }

  private seedData() {
    // Seed courses
    const coursesData: InsertCourse[] = [
      {
        title: "Cyber Basics",
        description: "Essential cybersecurity knowledge for all employees, covering passwords, phishing, social engineering, and more.",
        category: "general",
        duration: 45,
        difficulty: "Beginner",
        tags: ["Quizzes", "Videos", "Games"],
        icon: "🔐",
        isPopular: true,
        isNew: false,
        content: {}
      },
      {
        title: "Data Protection",
        description: "Learn how to handle sensitive data, comply with regulations like GDPR, and prevent data breaches.",
        category: "general,compliance",
        duration: 60,
        difficulty: "Intermediate",
        tags: ["Scenarios", "Videos", "Certificate"],
        icon: "🛡️",
        isPopular: false,
        isNew: true,
        content: {}
      },
      {
        title: "Secure Remote Work",
        description: "Essential security practices for remote workers, including VPN usage, home network security, and cloud sharing.",
        category: "general",
        duration: 30,
        difficulty: "Beginner",
        tags: ["Simulations", "Quizzes", "Certificate"],
        icon: "🏠",
        isPopular: false,
        isNew: false,
        content: {}
      },
      {
        title: "Email Security",
        description: "Learn to identify phishing attempts, business email compromise, and safe email practices.",
        category: "general",
        duration: 45,
        difficulty: "Beginner",
        tags: ["Simulations", "Games", "Certificate"],
        icon: "📧",
        isPopular: false,
        isNew: false,
        content: {}
      },
      {
        title: "Social Engineering Defense",
        description: "Recognize and respond to social engineering attacks in various forms, from phone calls to in-person visits.",
        category: "general",
        duration: 60,
        difficulty: "Intermediate",
        tags: ["Role-play", "Videos", "Certificate"],
        icon: "🎭",
        isPopular: false,
        isNew: false,
        content: {}
      },
      {
        title: "Mobile Device Security",
        description: "Protect smartphones and tablets from common threats, including public Wi-Fi risks and app permissions.",
        category: "general",
        duration: 30,
        difficulty: "Beginner",
        tags: ["Tutorials", "Quizzes", "Certificate"],
        icon: "📱",
        isPopular: false,
        isNew: false,
        content: {}
      },
      {
        title: "Secure Software Development",
        description: "Best practices for building secure applications, including SAST/DAST, secure coding, and DevSecOps.",
        category: "technical",
        duration: 120,
        difficulty: "Advanced",
        tags: ["Hands-on", "Labs", "Certificate"],
        icon: "💻",
        isPopular: false,
        isNew: false,
        content: {}
      },
      {
        title: "AI Model Security",
        description: "Security considerations for AI/ML development, including model validation, adversarial attacks, and data privacy.",
        category: "technical",
        duration: 90,
        difficulty: "Advanced",
        tags: ["Simulations", "Case Studies", "Certificate"],
        icon: "🤖",
        isPopular: false,
        isNew: true,
        content: {}
      },
      {
        title: "Cloud Security",
        description: "Secure cloud infrastructure deployment, configuration management, and compliance in AWS, Azure, and GCP.",
        category: "technical",
        duration: 100,
        difficulty: "Advanced",
        tags: ["Hands-on", "Labs", "Certificate"],
        icon: "☁️",
        isPopular: false,
        isNew: false,
        content: {}
      },
      {
        title: "Incident Response Leadership",
        description: "Executive decision-making during security incidents, crisis communication, and post-incident analysis.",
        category: "leadership",
        duration: 75,
        difficulty: "Intermediate",
        tags: ["Scenarios", "TTX", "Certificate"],
        icon: "👔",
        isPopular: true,
        isNew: false,
        content: {}
      },
      {
        title: "Security Governance",
        description: "Building effective security programs, risk management frameworks, and security culture in organizations.",
        category: "leadership",
        duration: 90,
        difficulty: "Advanced",
        tags: ["Frameworks", "Case Studies", "Certificate"],
        icon: "📊",
        isPopular: false,
        isNew: false,
        content: {}
      },
      {
        title: "GDPR Compliance",
        description: "Comprehensive guide to GDPR compliance, including data mapping, privacy impact assessments, and breach response.",
        category: "compliance",
        duration: 80,
        difficulty: "Intermediate",
        tags: ["Templates", "Checklists", "Certificate"],
        icon: "📋",
        isPopular: false,
        isNew: false,
        content: {}
      },
      {
        title: "ISO 27001 Implementation",
        description: "Step-by-step guide to implementing ISO 27001 information security management system in your organization.",
        category: "compliance",
        duration: 120,
        difficulty: "Advanced",
        tags: ["Frameworks", "Templates", "Certificate"],
        icon: "🛡️",
        isPopular: false,
        isNew: false,
        content: {}
      },
      // Market Research-Based Courses
      {
        title: "Board-Level Cybersecurity Leadership",
        description: "Strategic cybersecurity decision-making for executives and board members during crisis situations.",
        category: "leadership",
        duration: 90,
        difficulty: "Advanced",
        tags: ["TTX", "Crisis Management", "Strategic"],
        icon: "🧠",
        isPopular: true,
        isNew: true,
        content: {}
      },
      {
        title: "Dynamic Compliance Framework",
        description: "Adaptive compliance training that adjusts to your jurisdiction, industry, and regulatory requirements.",
        category: "compliance",
        duration: 100,
        difficulty: "Intermediate",
        tags: ["NIST", "ISO", "Adaptive", "Real-time"],
        icon: "🔄",
        isPopular: false,
        isNew: true,
        content: {}
      },
      {
        title: "Zero-to-One Security Maturity",
        description: "Complete security program foundation for organizations with no existing cybersecurity infrastructure.",
        category: "general",
        duration: 180,
        difficulty: "Beginner",
        tags: ["Templates", "Policies", "Checklists"],
        icon: "🛠️",
        isPopular: true,
        isNew: true,
        content: {}
      },
      {
        title: "Healthcare Cybersecurity",
        description: "Specialized cybersecurity training for healthcare organizations, covering HIPAA, patient data, and medical device security.",
        category: "sector-specific",
        duration: 120,
        difficulty: "Intermediate",
        tags: ["HIPAA", "Medical Devices", "Patient Data"],
        icon: "🏥",
        isPopular: false,
        isNew: true,
        content: {}
      },
      {
        title: "Education Sector Security",
        description: "Cybersecurity for schools and educational institutions, including student data protection and remote learning security.",
        category: "sector-specific",
        duration: 90,
        difficulty: "Intermediate",
        tags: ["FERPA", "Student Data", "Remote Learning"],
        icon: "🎓",
        isPopular: false,
        isNew: true,
        content: {}
      },
      {
        title: "Non-Profit & Charity Security",
        description: "Cybersecurity essentials for non-profit organizations, including donor data protection and volunteer security.",
        category: "sector-specific",
        duration: 75,
        difficulty: "Beginner",
        tags: ["Donor Data", "Volunteer Training", "Budget-Friendly"],
        icon: "🤝",
        isPopular: false,
        isNew: true,
        content: {}
      },
      {
        title: "Interactive Policy Builder",
        description: "Create, test, and validate cybersecurity policies through realistic scenario simulations.",
        category: "technical",
        duration: 150,
        difficulty: "Advanced",
        tags: ["Policy Testing", "Scenarios", "Live Updates"],
        icon: "🧩",
        isPopular: false,
        isNew: true,
        content: {}
      },
      {
        title: "Global Privacy Laws Navigator",
        description: "Navigate international privacy regulations including GDPR, CCPA, PDPA, and other regional data protection laws.",
        category: "compliance",
        duration: 110,
        difficulty: "Advanced",
        tags: ["GDPR", "CCPA", "PDPA", "Global"],
        icon: "🔐",
        isPopular: true,
        isNew: true,
        content: {}
      },
      {
        title: "Cyber Insurance Readiness",
        description: "Prepare for cyber insurance applications and claims through maturity assessment and risk simulation.",
        category: "leadership",
        duration: 85,
        difficulty: "Intermediate",
        tags: ["Insurance", "Risk Assessment", "Claims"],
        icon: "📉",
        isPopular: false,
        isNew: true,
        content: {}
      },
      {
        title: "Post-Incident Crisis Management",
        description: "Executive decision-making after a cybersecurity incident, including communication, legal, and recovery strategies.",
        category: "leadership",
        duration: 95,
        difficulty: "Advanced",
        tags: ["Crisis Communication", "Legal", "Recovery"],
        icon: "🤯",
        isPopular: true,
        isNew: true,
        content: {}
      },
      {
        title: "Remote Workforce Security",
        description: "Comprehensive security training for distributed teams, covering VPN, cloud security, and home office risks.",
        category: "general",
        duration: 60,
        difficulty: "Intermediate",
        tags: ["Remote Work", "VPN", "Cloud Security"],
        icon: "📱",
        isPopular: true,
        isNew: false,
        content: {}
      },
      {
        title: "Human Risk Assessment Platform",
        description: "360-degree evaluation of human security risks, decision-making patterns, and organizational vulnerability.",
        category: "leadership",
        duration: 120,
        difficulty: "Advanced",
        tags: ["Risk Scoring", "Decision Analysis", "Heatmaps"],
        icon: "🔁",
        isPopular: false,
        isNew: true,
        content: {}
      },
      {
        title: "DevSecOps Integration",
        description: "Integrate security into development workflows with hands-on labs for CI/CD security and automated testing.",
        category: "technical",
        duration: 140,
        difficulty: "Advanced",
        tags: ["CI/CD", "Automation", "Security Testing"],
        icon: "⚙️",
        isPopular: false,
        isNew: true,
        content: {}
      },
      {
        title: "Vendor Risk Management",
        description: "Assess and manage cybersecurity risks in your supply chain and third-party relationships.",
        category: "leadership",
        duration: 100,
        difficulty: "Intermediate",
        tags: ["Supply Chain", "Third-Party", "Risk Assessment"],
        icon: "🔗",
        isPopular: false,
        isNew: true,
        content: {}
      },
      {
        title: "Quantum Computing Security",
        description: "Prepare for the quantum computing era with post-quantum cryptography and future-proofing strategies.",
        category: "technical",
        duration: 80,
        difficulty: "Advanced",
        tags: ["Post-Quantum", "Cryptography", "Future-Proofing"],
        icon: "⚛️",
        isPopular: false,
        isNew: true,
        content: {}
      },
      {
        title: "IoT & OT Security",
        description: "Secure Internet of Things and Operational Technology systems in industrial and smart environments.",
        category: "technical",
        duration: 110,
        difficulty: "Advanced",
        tags: ["IoT", "OT", "Industrial", "Smart Systems"],
        icon: "🏭",
        isPopular: false,
        isNew: true,
        content: {}
      },
      {
        title: "Dark Web Monitoring",
        description: "Advanced techniques for monitoring dark web activities and protecting against emerging threats.",
        category: "technical",
        duration: 90,
        difficulty: "Advanced",
        tags: ["Dark Web", "Threat Intelligence", "Monitoring"],
        icon: "🕵️",
        isPopular: false,
        isNew: true,
        content: {}
      },
      {
        title: "Crisis Communication",
        description: "Master cybersecurity incident communication strategies for internal teams, customers, and media.",
        category: "leadership",
        duration: 70,
        difficulty: "Intermediate",
        tags: ["Communication", "Media", "Stakeholders"],
        icon: "📢",
        isPopular: false,
        isNew: true,
        content: {}
      },
      // AI & Business Growth Courses
      {
        title: "AI for Business Growth",
        description: "Learn how to leverage AI tools and strategies to accelerate business growth, improve efficiency, and gain competitive advantage.",
        category: "ai_business",
        duration: 90,
        difficulty: "Intermediate",
        tags: ["AI Tools", "Strategy", "ROI", "Automation"],
        icon: "🤖",
        isPopular: true,
        isNew: true,
        content: {}
      },
      {
        title: "ChatGPT for Business",
        description: "Master ChatGPT and other AI assistants to streamline workflows, content creation, and decision-making processes. Perfect for beginners - no technical background required!",
        category: "ai_business",
        duration: 60,
        difficulty: "Beginner",
        tags: ["ChatGPT", "Productivity", "Content Creation", "Beginner Friendly"],
        icon: "💬",
        isPopular: true,
        isNew: true,
        content: {}
      },
      {
        title: "AI-Powered Marketing",
        description: "Transform your marketing strategy with AI tools for personalization, automation, and data-driven insights.",
        category: "ai_business",
        duration: 75,
        difficulty: "Intermediate",
        tags: ["Marketing", "Personalization", "Analytics"],
        icon: "📈",
        isPopular: false,
        isNew: true,
        content: {}
      },
      {
        title: "Machine Learning for Business",
        description: "Understand how to implement machine learning solutions to solve real business problems and drive innovation. Technical experience recommended.",
        category: "ai_business",
        duration: 120,
        difficulty: "Advanced",
        tags: ["ML", "Data Science", "Innovation", "Technical"],
        icon: "🧠",
        isPopular: false,
        isNew: true,
        content: {}
      },
      // Tech for Founders Courses
      {
        title: "Tech Stack for Startups",
        description: "Choose the right technology stack for your startup, from MVP to scale, including cloud architecture and databases.",
        category: "founders",
        duration: 90,
        difficulty: "Intermediate",
        tags: ["Tech Stack", "MVP", "Cloud", "Databases"],
        icon: "🏗️",
        isPopular: true,
        isNew: true,
        content: {}
      },
      {
        title: "No-Code Solutions for Founders",
        description: "Build and scale your business using no-code tools and platforms without hiring developers. Ideal for non-technical founders!",
        category: "founders",
        duration: 60,
        difficulty: "Beginner",
        tags: ["No-Code", "Automation", "MVP", "Non-Technical"],
        icon: "⚡",
        isPopular: true,
        isNew: true,
        content: {}
      },
      {
        title: "Data Analytics for Founders",
        description: "Make data-driven decisions with analytics tools, KPI tracking, and business intelligence for startups.",
        category: "founders",
        duration: 75,
        difficulty: "Intermediate",
        tags: ["Analytics", "KPIs", "Business Intelligence"],
        icon: "📊",
        isPopular: false,
        isNew: true,
        content: {}
      },
      {
        title: "Scaling Tech Teams",
        description: "Learn how to build, manage, and scale technology teams as your startup grows from 1 to 100+ employees. For experienced leaders and managers.",
        category: "founders",
        duration: 80,
        difficulty: "Advanced",
        tags: ["Team Building", "Scaling", "Management", "Leadership"],
        icon: "👥",
        isPopular: false,
        isNew: true,
        content: {}
      },
      {
        title: "Product Management Fundamentals",
        description: "Master product management principles, user research, roadmap planning, and feature prioritization.",
        category: "founders",
        duration: 100,
        difficulty: "Intermediate",
        tags: ["Product Management", "User Research", "Roadmaps"],
        icon: "🎯",
        isPopular: true,
        isNew: true,
        content: {}
      },
      {
        title: "Cybersecurity for Startups",
        description: "Essential cybersecurity practices for startups, including data protection, compliance, and risk management.",
        category: "founders",
        duration: 60,
        difficulty: "Beginner",
        tags: ["Security", "Compliance", "Risk Management"],
        icon: "🔒",
        isPopular: false,
        isNew: true,
        content: {}
      }
    ];

    coursesData.forEach(courseData => {
      this.createCourse(courseData);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date(),
      companyName: insertUser.companyName || null,
      employeeCount: insertUser.employeeCount || null,
      mfaSecret: null,
      mfaEnabled: false,
      lastLogin: null,
      loginAttempts: 0,
      lockedUntil: null,
      passwordResetToken: null,
      passwordResetExpires: null
    };
    this.users.set(id, user);
    return user;
  }

  // Course methods
  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async getCoursesByCategory(category: string): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(
      course => course.category.includes(category)
    );
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.currentCourseId++;
    const course: Course = { 
      ...insertCourse, 
      id,
      content: insertCourse.content || {},
      tags: insertCourse.tags || null,
      icon: insertCourse.icon || null,
      isPopular: insertCourse.isPopular || false,
      isNew: insertCourse.isNew || false
    };
    this.courses.set(id, course);
    return course;
  }

  // Enrollment methods
  async getUserEnrollments(userId: number): Promise<Enrollment[]> {
    return Array.from(this.enrollments.values()).filter(
      enrollment => enrollment.userId === userId
    );
  }

  async getEnrollment(userId: number, courseId: number): Promise<Enrollment | undefined> {
    return Array.from(this.enrollments.values()).find(
      enrollment => enrollment.userId === userId && enrollment.courseId === courseId
    );
  }

  async createEnrollment(insertEnrollment: InsertEnrollment): Promise<Enrollment> {
    const id = this.currentEnrollmentId++;
    const enrollment: Enrollment = { 
      ...insertEnrollment, 
      id,
      enrolledAt: new Date(),
      completedAt: insertEnrollment.completed ? new Date() : null,
      userId: insertEnrollment.userId || null,
      courseId: insertEnrollment.courseId || null,
      progress: insertEnrollment.progress || null,
      completed: insertEnrollment.completed || false,
      score: insertEnrollment.score || null
    };
    this.enrollments.set(id, enrollment);
    return enrollment;
  }

  async updateEnrollmentProgress(id: number, progress: number, completed?: boolean, score?: number): Promise<Enrollment | undefined> {
    const enrollment = this.enrollments.get(id);
    if (!enrollment) return undefined;

    const updatedEnrollment: Enrollment = {
      ...enrollment,
      progress,
      completed: completed ?? enrollment.completed,
      score: score ?? enrollment.score,
      completedAt: completed ? new Date() : enrollment.completedAt
    };

    this.enrollments.set(id, updatedEnrollment);
    return updatedEnrollment;
  }

  // Assessment methods
  async getUserAssessments(userId: number): Promise<Assessment[]> {
    return Array.from(this.assessments.values()).filter(
      assessment => assessment.userId === userId
    );
  }

  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const id = this.currentAssessmentId++;
    const assessment: Assessment = { 
      ...insertAssessment, 
      id,
      completedAt: new Date(),
      userId: insertAssessment.userId || null,
      score: insertAssessment.score || null,
      answers: insertAssessment.answers || {},
      results: insertAssessment.results || {}
    };
    this.assessments.set(id, assessment);
    return assessment;
  }

  // Certificate methods
  async getUserCertificates(userId: number): Promise<Certificate[]> {
    return Array.from(this.certificates.values()).filter(
      certificate => certificate.userId === userId
    );
  }

  async getCertificate(certificateId: string): Promise<Certificate | undefined> {
    return Array.from(this.certificates.values()).find(
      certificate => certificate.certificateId === certificateId
    );
  }

  async createCertificate(insertCertificate: InsertCertificate): Promise<Certificate> {
    const id = this.currentCertificateId++;
    const certificate: Certificate = { 
      ...insertCertificate, 
      id,
      issuedAt: new Date(),
      userId: insertCertificate.userId || null,
      courseId: insertCertificate.courseId || null
    };
    this.certificates.set(id, certificate);
    return certificate;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllCourses(): Promise<Course[]> {
    return await db.select().from(courses);
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course || undefined;
  }

  async getCoursesByCategory(category: string): Promise<Course[]> {
    return await db.select().from(courses).where(eq(courses.category, category));
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const [course] = await db
      .insert(courses)
      .values(insertCourse)
      .returning();
    return course;
  }

  async getUserEnrollments(userId: number): Promise<Enrollment[]> {
    return await db.select().from(enrollments).where(eq(enrollments.userId, userId));
  }

  async getEnrollment(userId: number, courseId: number): Promise<Enrollment | undefined> {
    const [enrollment] = await db.select().from(enrollments)
      .where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, courseId)));
    return enrollment || undefined;
  }

  async createEnrollment(insertEnrollment: InsertEnrollment): Promise<Enrollment> {
    const [enrollment] = await db
      .insert(enrollments)
      .values(insertEnrollment)
      .returning();
    return enrollment;
  }

  async updateEnrollmentProgress(id: number, progress: number, completed?: boolean, score?: number): Promise<Enrollment | undefined> {
    const [enrollment] = await db
      .update(enrollments)
      .set({ 
        progress, 
        completed: completed || false, 
        score: score || null,
        completedAt: completed ? new Date() : null 
      })
      .where(eq(enrollments.id, id))
      .returning();
    return enrollment || undefined;
  }

  async getUserAssessments(userId: number): Promise<Assessment[]> {
    return await db.select().from(assessments).where(eq(assessments.userId, userId));
  }

  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const [assessment] = await db
      .insert(assessments)
      .values(insertAssessment)
      .returning();
    return assessment;
  }

  async getUserCertificates(userId: number): Promise<Certificate[]> {
    return await db.select().from(certificates).where(eq(certificates.userId, userId));
  }

  async getCertificate(certificateId: string): Promise<Certificate | undefined> {
    const [certificate] = await db.select().from(certificates).where(eq(certificates.certificateId, certificateId));
    return certificate || undefined;
  }

  async createCertificate(insertCertificate: InsertCertificate): Promise<Certificate> {
    const [certificate] = await db
      .insert(certificates)
      .values(insertCertificate)
      .returning();
    return certificate;
  }
}

export const storage = new MemStorage();
