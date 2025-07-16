import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { login, register } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";

interface LoginFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export default function LoginForm({ onSuccess, onClose }: LoginFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    companyName: "",
    employeeCount: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isLogin) {
        const result = await login(formData.username || formData.email, formData.password);
        if (result.requireMFA) {
          toast({
            title: "MFA Required",
            description: "Please enter your MFA token to continue.",
          });
          return;
        }
        
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
      } else {
        const user = await register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          companyName: formData.companyName,
          employeeCount: formData.employeeCount,
        });
        
        toast({
          title: "Account Created!",
          description: `Welcome ${user.username}! Your 30-day free trial has started.`,
        });
      }
      
      // Refresh the page data
      queryClient.invalidateQueries();
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{isLogin ? "Sign In" : "Start Free Trial"}</CardTitle>
        <CardDescription>
          {isLogin 
            ? "Enter your credentials to access your account" 
            : "Create your account and get 30 days of free access"
          }
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                required
                placeholder="Enter your username"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">{isLogin ? "Username or Email" : "Email"}</Label>
            <Input
              id="email"
              type={isLogin ? "text" : "email"}
              value={isLogin ? formData.username : formData.email}
              onChange={(e) => handleInputChange(isLogin ? "username" : "email", e.target.value)}
              required
              placeholder={isLogin ? "Enter username or email" : "Enter your email address"}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
                placeholder="Enter your password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          {!isLogin && (
            <>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="Enter your company name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="employeeCount">Company Size</Label>
                <select
                  id="employeeCount"
                  value={formData.employeeCount}
                  onChange={(e) => handleInputChange("employeeCount", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-1000">201-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>
            </>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLogin ? "Sign In" : "Start Free Trial"}
          </Button>
          
          <Separator />
          
          <div className="text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Button
              type="button"
              variant="link"
              className="p-0 ml-1 h-auto font-semibold"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Start Free Trial" : "Sign In"}
            </Button>
          </div>
          
          {onClose && (
            <Button type="button" variant="outline" onClick={onClose} className="w-full">
              Cancel
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}