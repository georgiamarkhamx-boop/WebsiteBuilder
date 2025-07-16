import { apiRequest, queryClient } from "./queryClient";

export interface User {
  id: number;
  username: string;
  email: string;
  subscriptionTier: string;
  companyName?: string;
  trialStatus?: {
    daysRemaining: number;
    isExpired: boolean;
    endDate: string;
  };
}

export async function login(username: string, password: string): Promise<{ user: User; requireMFA?: boolean }> {
  const response = await apiRequest("POST", "/api/auth/login", { username, password });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }
  
  const data = await response.json();
  
  if (data.requireMFA) {
    return { user: null, requireMFA: true };
  }
  
  // Invalidate queries to refresh with authenticated state
  queryClient.invalidateQueries();
  
  return { user: data.user };
}

export async function register(userData: {
  username: string;
  email: string;
  password: string;
  companyName?: string;
  employeeCount?: string;
}): Promise<User> {
  const response = await apiRequest("POST", "/api/auth/register", userData);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }
  
  const data = await response.json();
  
  // Invalidate queries to refresh with authenticated state
  queryClient.invalidateQueries();
  
  return data.user;
}

export async function logout(): Promise<void> {
  const response = await apiRequest("POST", "/api/auth/logout", {});
  if (!response.ok) {
    throw new Error("Logout failed");
  }
  
  // Clear all queries
  queryClient.clear();
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await apiRequest("GET", "/api/auth/profile", {});
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.user;
  } catch (error) {
    return null;
  }
}

export function formatTrialMessage(trialStatus: User['trialStatus']): string {
  if (!trialStatus) return "";
  
  if (trialStatus.isExpired) {
    return "Your trial has expired. Please upgrade to continue access.";
  }
  
  if (trialStatus.daysRemaining <= 3) {
    return `Trial expires in ${trialStatus.daysRemaining} days. Upgrade now to avoid interruption.`;
  }
  
  if (trialStatus.daysRemaining <= 7) {
    return `${trialStatus.daysRemaining} days remaining in your trial.`;
  }
  
  return `Free trial active - ${trialStatus.daysRemaining} days remaining.`;
}