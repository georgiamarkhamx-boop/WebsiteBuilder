import { AlertTriangle, X, CreditCard } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatTrialMessage, type User } from "@/lib/auth";

interface TrialNotificationProps {
  user: User;
  onUpgrade?: () => void;
}

export default function TrialNotification({ user, onUpgrade }: TrialNotificationProps) {
  const [dismissed, setDismissed] = useState(false);
  
  if (!user.trialStatus || dismissed) return null;
  
  const { trialStatus } = user;
  const message = formatTrialMessage(trialStatus);
  
  if (!message) return null;
  
  const isUrgent = trialStatus.daysRemaining <= 3;
  const isExpired = trialStatus.isExpired;
  
  return (
    <div className={`border-l-4 p-4 mb-4 ${
      isExpired 
        ? 'bg-red-50 border-red-500' 
        : isUrgent 
          ? 'bg-orange-50 border-orange-500'
          : 'bg-blue-50 border-blue-500'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <AlertTriangle className={`w-5 h-5 mt-0.5 ${
            isExpired 
              ? 'text-red-600' 
              : isUrgent 
                ? 'text-orange-600'
                : 'text-blue-600'
          }`} />
          <div className="flex-1">
            <p className={`text-sm font-medium ${
              isExpired 
                ? 'text-red-800' 
                : isUrgent 
                  ? 'text-orange-800'
                  : 'text-blue-800'
            }`}>
              {message}
            </p>
            
            {isExpired && (
              <p className="text-sm text-red-700 mt-1">
                Access to courses and features has been restricted.
              </p>
            )}
            
            <div className="mt-3">
              <Button
                size="sm"
                onClick={onUpgrade}
                className={`mr-2 ${
                  isExpired || isUrgent
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <CreditCard className="w-4 h-4 mr-1" />
                {isExpired ? "Upgrade Now" : "View Plans"}
              </Button>
              
              {!isExpired && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setDismissed(true)}
                >
                  <X className="w-4 h-4 mr-1" />
                  Dismiss
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {!isExpired && (
          <button
            onClick={() => setDismissed(true)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}