import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface SignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onShowLogin: () => void;
  selectedPlan: string | null;
}

export default function SignupModal({ open, onOpenChange, onShowLogin, selectedPlan }: SignupModalProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    companyName: "",
    employeeCount: ""
  });
  const { toast } = useToast();

  const signupMutation = useMutation({
    mutationFn: async (userData: typeof formData) => {
      const response = await apiRequest("POST", "/api/users/register", userData);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Account created successfully",
        description: `Welcome to Security Enhance, ${data.username}!`,
      });
      onOpenChange(false);
      setFormData({
        username: "",
        email: "",
        password: "",
        companyName: "",
        employeeCount: ""
      });
    },
    onError: (error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.username && formData.email && formData.password && formData.companyName && formData.employeeCount) {
      signupMutation.mutate(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Sign Up {selectedPlan && `- ${selectedPlan} Plan`}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Name</Label>
            <Input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              placeholder="Enter company name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Create a password"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="employeeCount">Number of Employees</Label>
            <Select value={formData.employeeCount} onValueChange={(value) => handleInputChange("employeeCount", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select employee count" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-20">1-20</SelectItem>
                <SelectItem value="21-100">21-100</SelectItem>
                <SelectItem value="101-500">101-500</SelectItem>
                <SelectItem value="500+">500+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={signupMutation.isPending}
          >
            {signupMutation.isPending ? "Creating Account..." : "Start Free Trial"}
          </Button>
        </form>
        
        <p className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <button 
            onClick={onShowLogin}
            className="text-primary hover:text-purple-800 font-medium"
          >
            Login
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
