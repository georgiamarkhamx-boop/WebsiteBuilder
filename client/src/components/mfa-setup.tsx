import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Shield, Smartphone, Key, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MFASetupProps {
  qrCodeUrl?: string;
  secret?: string;
  onVerify: (code: string) => void;
  onClose: () => void;
}

export default function MFASetup({ qrCodeUrl, secret, onVerify, onClose }: MFASetupProps) {
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const handleVerify = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter a 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    try {
      await onVerify(verificationCode);
      toast({
        title: "MFA Enabled",
        description: "Multi-factor authentication has been successfully enabled",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Invalid verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-green-600" />
        </div>
        <CardTitle className="text-xl">Enable Multi-Factor Authentication</CardTitle>
        <CardDescription>
          Add an extra layer of security to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-blue-600" />
            Step 1: Install Authenticator App
          </h4>
          <p className="text-sm text-gray-600 mb-2">
            Download and install an authenticator app on your phone:
          </p>
          <div className="flex gap-2">
            <Badge variant="outline">Google Authenticator</Badge>
            <Badge variant="outline">Authy</Badge>
            <Badge variant="outline">Microsoft Authenticator</Badge>
          </div>
        </div>

        {qrCodeUrl && (
          <div className="bg-gray-50 p-4 rounded-lg border text-center">
            <h4 className="font-semibold mb-2">Step 2: Scan QR Code</h4>
            <img src={qrCodeUrl} alt="QR Code" className="mx-auto mb-2" />
            <p className="text-xs text-gray-500">
              Or manually enter this secret: <code className="bg-gray-200 px-1 rounded">{secret}</code>
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="verification-code" className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            Step 3: Enter Verification Code
          </Label>
          <Input
            id="verification-code"
            placeholder="Enter 6-digit code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            maxLength={6}
            className="text-center text-lg font-mono"
          />
          <p className="text-sm text-gray-500">
            Enter the 6-digit code from your authenticator app
          </p>
        </div>

        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 text-green-800">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Security Benefits</span>
          </div>
          <ul className="text-sm text-green-700 mt-1 space-y-1">
            <li>• Protects against password breaches</li>
            <li>• Prevents unauthorized access</li>
            <li>• Complies with security standards</li>
          </ul>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleVerify}
            disabled={isVerifying || verificationCode.length !== 6}
            className="flex-1"
          >
            {isVerifying ? "Verifying..." : "Enable MFA"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}