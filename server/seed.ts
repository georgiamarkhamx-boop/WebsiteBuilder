import { db } from "./db";
import { courses } from "@shared/schema";

const seedData = async () => {
  console.log("Seeding database with course data...");
  
  const coursesData = [
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
    }
  ];

  try {
    await db.insert(courses).values(coursesData);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedData();