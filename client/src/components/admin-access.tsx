import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, User, Lock, CheckCircle } from "lucide-react";

interface AdminAccessProps {
  onAdminAccess: () => void;
}

export default function AdminAccess({ onAdminAccess }: AdminAccessProps) {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAdminAccess = () => {
    setIsAdmin(true);
    onAdminAccess();
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-purple-600" />
        </div>
        <CardTitle className="text-xl text-purple-800">Admin Access</CardTitle>
        <CardDescription>
          Access all course content and features without registration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">Username</span>
            </div>
            <p className="text-gray-700 font-mono">admin</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">Password</span>
            </div>
            <p className="text-gray-700 font-mono">admin123</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-purple-200">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            Admin Features
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Access all courses</span>
              <Badge className="bg-green-100 text-green-800">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">No payment required</span>
              <Badge className="bg-green-100 text-green-800">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Full dashboard access</span>
              <Badge className="bg-green-100 text-green-800">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">All interactive features</span>
              <Badge className="bg-green-100 text-green-800">Enabled</Badge>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleAdminAccess}
          className="w-full bg-purple-600 hover:bg-purple-700"
          size="lg"
        >
          <Shield className="w-4 h-4 mr-2" />
          Enable Admin Access
        </Button>
        
        <p className="text-xs text-gray-500 text-center">
          Admin access bypasses all authentication and payment requirements
        </p>
      </CardContent>
    </Card>
  );
}