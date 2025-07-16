import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, type User } from "@/lib/auth";
import { createContext, useContext, ReactNode } from "react";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
});

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthWrapperProps {
  children: ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/profile"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const value = {
    user: user || null,
    isLoading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}