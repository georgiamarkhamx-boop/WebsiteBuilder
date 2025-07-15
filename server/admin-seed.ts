import { db } from "./db";
import { users } from "@shared/schema";

const createAdminUser = async () => {
  console.log("Creating admin user...");
  
  const adminUser = {
    username: "admin",
    email: "admin@cybershield.com",
    password: "admin123", // In production, this should be hashed
    companyName: "CyberShield Admin",
    employeeCount: "1-10"
  };

  try {
    await db.insert(users).values(adminUser);
    console.log("Admin user created successfully!");
    console.log("Login credentials:");
    console.log("Username: admin");
    console.log("Email: admin@cybershield.com");
    console.log("Password: admin123");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

createAdminUser();