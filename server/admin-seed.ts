import { db } from "./db";
import { users } from "@shared/schema";
import { AuthService } from "./auth";

const createAdminUsers = async () => {
  console.log("Creating admin users...");
  
  // Create full business account with all features
  const businessAdmin = {
    username: "business_admin",
    email: "admin@cybershield-enterprise.com",
    password: await AuthService.hashPassword("CyberShield2024!"),
    companyName: "CyberShield Enterprise",
    employeeCount: "500+",
    role: "admin",
    department: "IT Security",
    mfaEnabled: false,
    isActive: true,
    subscriptionTier: "enterprise"
  };

  // Create SOC team member account
  const socUser = {
    username: "soc_analyst",
    email: "soc@cybershield-enterprise.com", 
    password: await AuthService.hashPassword("SOCTeam2024!"),
    companyName: "CyberShield Enterprise",
    employeeCount: "500+",
    role: "soc_analyst",
    department: "Security Operations",
    mfaEnabled: false,
    isActive: true,
    subscriptionTier: "enterprise"
  };

  // Create HR user account
  const hrUser = {
    username: "hr_manager",
    email: "hr@cybershield-enterprise.com",
    password: await AuthService.hashPassword("HRSecure2024!"),
    companyName: "CyberShield Enterprise", 
    employeeCount: "500+",
    role: "hr_manager",
    department: "Human Resources",
    mfaEnabled: false,
    isActive: true,
    subscriptionTier: "enterprise"
  };

  // Create Engineer account
  const engineerUser = {
    username: "engineer",
    email: "engineer@cybershield-enterprise.com",
    password: await AuthService.hashPassword("Engineer2024!"),
    companyName: "CyberShield Enterprise",
    employeeCount: "500+", 
    role: "engineer",
    department: "Engineering",
    mfaEnabled: false,
    isActive: true,
    subscriptionTier: "enterprise"
  };

  try {
    await db.insert(users).values([businessAdmin, socUser, hrUser, engineerUser]);
    console.log("Admin users created successfully!");
    console.log("\n=== LOGIN CREDENTIALS FOR FULL PLATFORM ACCESS ===");
    console.log("\n1. BUSINESS ADMIN (Full Access to All Features):");
    console.log("   Username: business_admin");
    console.log("   Email: admin@cybershield-enterprise.com");
    console.log("   Password: CyberShield2024!");
    console.log("   Access: All courses, TTX, assessments, company customization");
    
    console.log("\n2. SOC ANALYST (Technical Security Focus):");
    console.log("   Username: soc_analyst");
    console.log("   Email: soc@cybershield-enterprise.com");
    console.log("   Password: SOCTeam2024!");
    console.log("   Access: All technical courses, advanced TTX scenarios");
    
    console.log("\n3. HR MANAGER (Personnel Security Focus):");
    console.log("   Username: hr_manager");
    console.log("   Email: hr@cybershield-enterprise.com");
    console.log("   Password: HRSecure2024!");
    console.log("   Access: Basic awareness, personnel security, privacy training");
    
    console.log("\n4. ENGINEER (Development Security Focus):");
    console.log("   Username: engineer");
    console.log("   Email: engineer@cybershield-enterprise.com");
    console.log("   Password: Engineer2024!");
    console.log("   Access: Secure development, physical security, technical training");
    
  } catch (error) {
    console.error("Error creating admin users:", error);
  }
};

createAdminUsers();